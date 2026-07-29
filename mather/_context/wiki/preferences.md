# Working Preferences

## Code style

- Match the existing code style exactly — ES6 classes, private fields with `#`, no imports/exports, no build tooling
- Do not add comments unless explicitly asked
- Use `randomNumber(from, to)` for all random integer generation
- Display strings use Czech decimal notation: `.replaceAll(".", ",")`
- Keep example class constructors self-contained: generate numbers, compute result, build `asStr` — all in the constructor
- Minimal changes: only touch what is necessary for the task

## When adding a new example type

- Follow the factory + example class pattern established in existing `example-*.js` files
- Always update all three required files: the new `example-*.js`, `mather.html`, and `config.js`
- Use a camelCase key for the radio button `id` that matches the `case` in `config.js`
- The Czech label in `mather.html` should describe the topic and grade, consistent with existing labels

## Communication preferences

- Primary task: adding new example types aligned with the Czech school curriculum
- No need to explain every change — brief summary of what was done and which files were modified is enough
- Ask if unsure about the grade level, topic difficulty, or number ranges for a new example type

## Working with AI

- Expect the AI to figure out which files need updating — do not ask the user to list them
- Follow existing patterns without introducing new abstractions or refactors
- Do not add features, error handling, or polish beyond what was asked
- Keep suggestions minimal and grounded in the existing codebase
