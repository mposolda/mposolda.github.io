# Project: Mather

## What it is

Mather is a browser-based math practice web app. It presents arithmetic examples one at a time, the child types an answer, and at the end it shows a score with a reward picture (cars or rabbits). There is no backend — everything runs client-side as plain HTML/CSS/JavaScript with no build step or framework.

The main entry point is [`mather.html`](../../mather.html).

## Goals and objectives

- Generate varied math exercises aligned with Czech primary school curriculum
- Support children aged 8–12 (roughly grades 2–6)
- Grow over time by adding new example types as the children advance in school
- Keep the app simple enough that the parent (developer) can maintain it easily

## Key users

- Two children, ages 8–12, who use the app directly in the browser
- The parent, who develops and maintains the app

## Architecture overview

| File | Role |
|------|------|
| `mather.html` | Entry point; loads all scripts, contains the config UI (radio buttons generated dynamically) and the exercise UI |
| `mather.js` | Core runtime: `Mather` class handles the exercise loop, scoring, and summary rendering |
| `config.js` | `Config` + `ConfigProvider` — reads the radio button selection, delegates factory lookup to `exampleRegistry` |
| `example.js` | Base classes (`Example`, `ExampleFactory`) shared by all example types |
| `registry.js` | `ExampleRegistry` class + global `exampleRegistry` instance — holds all registered example types |
| `example-*.js` | One file per example type; contains a factory class, example classes, and a self-registration call |

## Example types (as of initial wiki creation)

| Radio button id | Label (Czech) | File |
|-----------------|---------------|------|
| `smallMultiplication` | Malá násobilka | `example-small-multiplication.js` |
| `weights` | Převody jednotek | `example-units.js` |
| `arithmetic4thClass` | Aritmetika 4. třída | `example-arithmetic-4th-class.js` |
| `romeNumbers` | Římská čísla | `example-rome-numbers.js` |
| `brackets5thClass` | Závorky 5. třída | `example-brackets-5th-class.js` |
| `decimals5thClass` | Desetinná čísla 5. třída | `example-decimals-5th-class.js` |
| `greatestCommonDivisor6thClass` | NSD / NSN | `example-greatest-common-divisor-6th-class.js` |

## Adding a new example type — checklist

When a new example type is requested, **two files** must be updated:

1. **Create `example-<name>.js`** — follow the pattern:
   - A `*Factory` class extending `ExampleFactory` with `createExample()` and other required methods
   - One or more example classes extending `Example` (or a shared abstract base in the same file)
   - Use `randomNumber(from, to)` for random integers
   - Use Czech decimal notation (commas) in display strings via `.replaceAll(".", ",")`
   - At the bottom, call `exampleRegistry.register({ id: '<key>', label: '<Czech label>', factory: () => new <FactoryClass>() })`

2. **`mather.html`** — add `<script src="./example-<name>.js"></script>` in `<head>` (before `mather.js`)

`config.js` and the radio button list **do not need to be touched**.
