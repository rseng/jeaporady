# Check boards under a root against a schema.
# Copyright @vsoch, 2020

import os
from glob import glob
import jsonschema
import yaml
import sys

schema_url = "http://json-schema.org/draft-07/schema"


category_properties = {
    "name": {"type": "string"},
    "questions": {
        "type": "array",
        "items": {
            "type": "object",
            "required": ["Q", "A", "points"],
            "properties": {
                "Q": {"type": "string"},
                "A": {"type": "string"},
                "img": {"type": "string"},
                "isDailyDouble": {"type": "boolean"},
                "points": {"type": "number"},
            },
            "additionalProperties": False,
        },
    },
}


category = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": category_properties,
        "required": ["name", "questions"],
        "additionalProperties": False,
    },
}
properties = {
    "single": category,
    "double": category,
    "final": {
        "type": "array",
        "items": {
            "type": "object",
            "required": ["Q", "A", "id", "name"],
            "properties": {
                "name": {"type": "string"},
                "Q": {"type": "string"},
                "A": {"type": "string"},
                "id": {"type": "string"},
            },
            "additionalProperties": False,
        },
    },
}


board_schema = {
    "$schema": schema_url,
    "title": "Board Schema",
    "type": "object",
    "required": [
        "board",
    ],
    "properties": {
        "board": {
            "type": "object",
            "properties": properties,
            "required": ["single", "double", "final"],
            "additionalProperties": False,
        },
    },
    "additionalProperties": False,
}

here = os.path.abspath(os.path.dirname(__file__))
root = os.path.dirname(here)


def read_board(filepath):
    """
    read in a Jeaporady board
    """
    with open(filepath, "r") as fd:
        data = yaml.load(fd.read(), Loader=yaml.SafeLoader)
    return data


def check_board(filename):
    """
    check a single board
    """
    board = read_board(filename)
    print("checking board: %s" % filename)

    # opocity to daily double?
    if "board" not in board:
        sys.exit(f'Top level key "board" missing in {filename}')
    board = board["board"]
    for roundname in ["single", "double", "final"]:
        if roundname not in board:
            sys.exit(f'Second level key "{roundname}" missing in {filename}')

    # Each six rounds
    for roundname in ["single", "double"]:
        number = len(board[roundname])
        if number != 6:
            sys.exit(
                f"Round {roundname} in {filename} is required to have 6 categories (columns) but found {number}"
            )
    # Final needs 2 or more
    if len(board["final"]) < 2:
        sys.exit(f"Final category must have 2+ entries.")

    # Finally validate with jsonschema
    jsonschema.validate({"board": board}, schema=board_schema)

    # Make sure number of questions consistent
    counts = {"single": 0, "double": 0}

    # Make sure we only see one daily double
    dd = {"single": 0, "double": 0}

    # Each Q and A and key cannot have quotes, and if single quote included, must be escaped
    for roundname in ["single", "double"]:
        boards = board[roundname]
        for entry in boards:
            # Number questions per column need to be consistent
            if not counts[roundname]:
                counts[roundname] = len(entry["questions"])
            if counts[roundname] != len(entry["questions"]):
                sys.exit(
                    "Expecting {count[roundname]} questions in round {roundname} for {entry['name']} but found len(entry['questions'])."
                )
            check_quotes(entry["name"])
            for q in entry["questions"]:
                check_quotes(q["Q"])
                check_quotes(q["A"])
                if "isDailyDouble" in q and q["isDailyDouble"] == True:
                    dd[roundname] += 1

    for q in board["final"]:
        check_quotes(q["name"])
        check_quotes(q["Q"])
        check_quotes(q["A"])

    # One daily double is required in the single round
    if dd["single"] != 1:
        sys.exit(
            f"One 'isDailyDouble' is required in the single, round! Found {dd['single']}"
        )

    # Up to two are allowed in the double round
    if dd["double"] > 2:
        sys.exit(
            f"Up to two 'isDailyDouble' can be present in the double round! Found {dd['double']}"
        )


def check_quotes(string):
    """
    Ensure that no single quotes are used, and if so, they are escaped
    """
    quotes = string.count("'")
    escaped = string.count("'")
    if quotes != escaped:
        sys.exit(
            f"Found unescaped single quote in {string}! All quotes need to be escaped. Double quotes are allowed"
        )


def main():
    """
    a small helper to check boards
    """
    boards = os.path.join(root, "_data", "boards")
    for board in glob("%s/*" % boards):
        check_board(board)


if __name__ == "__main__":
    main()
