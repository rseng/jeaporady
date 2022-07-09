# Research Software Engineer Jeopardy!

This is an interactive Jeopardy game for research software engineers! 

**under development**

## Usage

You can write a custom board under [_data/boards](_data/boards) and make sure
to add it to the [_data/games.yaml](_data/games.yaml) file, and add a markdown
file to [boards](boards) that will ensure it renders at the URL. As an example:

 - The example board data is at _data/boards/example.yaml
 - It has name "Example Board" and data file "example" (matching the above under boards, no extension)
 - The file pages/boards.md has a permalink of `/boards/example/` that matches the data file above.

We will eventually have testing to ensure that the data is formatted correctly, etc.

## How will it work?

After I familiarize again with the game, I'm planning on making some questions / topics
around Research Software Engineering. If I can do that, then we can host a fun game!!

## TODO

- add workflow that looks for changed file in data, validates
- remember how the game works so I could host it :)

## Thanks

The original source credit goes to [nominalaeon](https://codepen.io/nominalaeon/pen/NWWqBVY)
and the original MIT license is included [here](.github/LICENSE.txt).

