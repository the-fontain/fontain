# Fontain

> Easy Font Management

## Getting Started

With [node](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed, install fontain with a single command.

##### As CLI

```sh
$ npm install -g fontain
```

##### As Node Module

```sh
$ npm install fontain
```

Create a `font.json` file:

Advanced Options

```json
"fonts": {
   "config": {
     "charset": "full",
     "path": "fonts"
   },
   "open-sans": "*",
   "lato": "all",
   "roboto": ["thin", "regular", "bold"]
}
```

Simplest Options

```json
"fonts": ["open-sans", "lato", "roboto"]
```