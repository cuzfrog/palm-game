[![Build Status](https://travis-ci.org/cuzfrog/palm-game.svg?branch=master)](https://travis-ci.org/cuzfrog/palm-game)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Verion](https://img.shields.io/badge/dynamic/json.svg?color=informational&label=UI-version&query=%24.version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fcuzfrog%2Fpalm-game%2Fmaster%2Fui%2Fpackage.json)](./ui/package.json)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/82590dbed2e848e9aecc381d7cf054fb)](https://www.codacy.com/app/cuzfrog1/palm-game?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cuzfrog/palm-game&amp;utm_campaign=Badge_Grade)
# palm-game

A palm game console built on Typescript + React + RxJS.

## Todo list

- [x] MVP
- [ ] more games
- [ ] optimize on mobile client
- [ ] better appearance

## Games

* Change game: `select` or `J`
* Start game: `start` or `K`
* Increase level: `A`
* Decrease level: `D`
* Pause game: during game `start` or `K`
* Quit game: when game paused `select` or `J` 2 times

### Snake

* Change direction: `A`, `W`, `S`, `D`

## Build & Run

1. install `node/npm`
2. `cd ui`
3. `npm install`
4. `npx webpack-dev-server`
5. open your browser at `127.0.0.1:9000`

## Acknowledgement

Some Css styles are borrowed from the Internet.

## Author

Cause Chung(cuzfrog@gmail.com)
