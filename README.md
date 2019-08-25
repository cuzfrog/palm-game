[![Build Status](https://travis-ci.org/cuzfrog/palm-game.svg?branch=master)](https://travis-ci.org/cuzfrog/palm-game)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Verion](https://img.shields.io/badge/dynamic/json.svg?color=informational&label=UI-version&query=%24.version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fcuzfrog%2Fpalm-game%2Fmaster%2Fui%2Fpackage.json)](./ui/package.json)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/82590dbed2e848e9aecc381d7cf054fb)](https://www.codacy.com/app/cuzfrog1/palm-game?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cuzfrog/palm-game&amp;utm_campaign=Badge_Grade)
# palm-game
A palm game console built on Typescript + React + Redux + RxJS.

<p align="center"><img src="./doc/QR_code.png"></p>

## Todo list

- [x] Snake
- [x] Tetris
- [ ] more games
- [ ] optimize on mobile client
- [ ] better appearance/css

## Games

* Change game: `select` or <img src="./doc/keyboard/1.png" width="16" height="16">
* Start game: `start` or <img src="./doc/keyboard/2.png" width="16" height="16">
* Increase level: <img src="./doc/keyboard/A.png" width="16" height="16">
* Decrease level: <img src="./doc/keyboard/D.png" width="16" height="16">
* Pause game: during game `start` or <img src="./doc/keyboard/2.png" width="16" height="16">
* Quit game: when game paused `select` or <img src="./doc/keyboard/1.png" width="16" height="16"> 2 times

### Tetris
<img src="./doc/tetris-capture.gif" width=150>

* Move: <img src="./doc/keyboard/A.png" width="16" height="16"> <img src="./doc/keyboard/D.png" width="16" height="16"> <img src="./doc/keyboard/S.png" width="16" height="16">
* Rotate: <img src="./doc/keyboard/J.png" width="16" height="16">
* Hard drop: <img src="./doc/keyboard/K.png" width="16" height="16">

### Snake
<img src="./doc/snake-capture.gif" width=150>

* Change direction: <img src="./doc/keyboard/A.png" width="16" height="16"> <img src="./doc/keyboard/D.png" width="16" height="16"> <img src="./doc/keyboard/S.png" width="16" height="16"> <img src="./doc/keyboard/W.png" width="16" height="16">

## Performance

Prod build:
* Snake - per frame <10ms 

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
