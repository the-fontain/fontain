# Fontr

> Font Dependency Manager

Install Fontr

```sh
npm install -g fontr
```

## How fontr works?

Create a `fontr.yml` file where contains a font list:

```yml
fontr:
    fonts:
        - open-sans
        - helvetica-neue

    path: "fonts" # fonts folder is default
```

Then run:

```sh
fontr install
```
