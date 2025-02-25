# jokeapi

TS wrapper for Sv443's jokeapi (https://jokeapi.dev/)

## Install

```
npm i @bitstep/jokeapi
```

## Usage

```
let jokeClient = new JokeAPI()
let joke = await jokeClient.getRandomJoke()
```

## Mapped endpoints

| Endpoint    | Method          |
| ----------- | --------------- |
| /ping       | ping()          |
| /categories | getCategories() |
| /flags      | getFlags()      |
| /joke       | getJoke()       |
| /joke       | getRandomJoke() |

## Support

Join [Bitstep Discord server](https://discord.gg/rdxfDxRqYv) for further support.
