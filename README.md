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

### Hosting

The host should run the game locally, and this is important so the questions aren't
public and nobody can cheat! This means you will:

```bash
$ bundle exec jekyll serve
```

And open your browser to `http://localhost:4000/jeaporady/` to get started!
To host, you can bring your own style, but generally:

1. Use [https://ccg.buzz/host/](https://ccg.buzz/host/) to host a game, and send the buzzer code to your participants.
2. I find it helpful to have an external monitor (shared on Zoom) to show the game, and then have this buzz page on my other computer to keep track of who buzzed in first. You'll also want the question yaml open to see if they get the right answer (or not).
3. You can introduce the categories at the start of the game.
4. For each round, have contestants select a topic for a particular amount. Clicking the question will open it up, and then click the square in the top right to show the answer and minimize the question.
5. There are two rounds and a final question - to proceed between rounds click the leftmost square in the bottom right.
6. The final question is the square at the bottom right (to the right).
7. It probably is easiest to keep score in a spreadsheet or similar.

See the rules below for details about gameplay. You should read these rules to your contestants before playing!
I haven't figured out how daily doubles work yet! After I familiarize again with the game, I'm planning on making some questions / topics
around Research Software Engineering. If I can do that, then we can host a fun game!!

### Rules

We can use a derivation of [these rules](https://tag.rutgers.edu/wp-content/uploads/2014/05/Jeopardy-instructions.pdf)
and you can decide whether to use teams or individuals. I'll summarize a simple version here.

1. Choose a team or person to start first.
2. They can choose a category and dollar amount, and are asked the question.
3. At the end of the host reading the question they have 5 seconds to respond.
4. The first to buzz in gets to answer - in the form of a question "Who is..." or "What is.." etc.
 - If correct, the team gets the dollar amount, and to choose the next question.
 - If incorrect, you can either deduct the amount and let others try, or it might be easier to just give others a chance to answer.
 - If nobody gets it, the host reads the answer and then the last person correct gets to choose the question.
5. Daily double (I don't think) is implemented yet, but if/when it is, the team gets to put in a wager for some amount.
6. The final question has a category, and teams get to put down an amount to guess, and then they win or lose that amount. They have 30 seconds to guess, etc.


## TODO

- add workflow that looks for changed file in data, validates
- remember how the game works so I could host it :)

## Thanks

The original source credit goes to [nominalaeon](https://codepen.io/nominalaeon/pen/NWWqBVY)
and the original MIT license is included [here](.github/LICENSE.txt).

