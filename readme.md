# Fountain

> Easy Font Management

## Getting Started

With [node](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed, install fountain with a single command.

##### As CLI

```sh
$ npm install -g fountain
```

##### As Node Module

```sh
$ npm install fountain
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