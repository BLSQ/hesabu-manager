# Bluesquare hesabu manager

[![Codeship Status for BLSQ/hesabu-manager](https://app.codeship.com/projects/26ac2980-f254-0137-7e72-028602bdcca6/status?branch=master)](https://app.codeship.com/projects/375752)

Is a dhis2 (react) app to manage a blsq hesabu project. It connects to the Hesabu api and allows you to manage your Hesabu from within DHIS2.

It will become the new frontend to the existing [Hesabu API](https://github.com/blsq/orbf2) project. While the [Hesabu API](https://github.com/blsq/orbf2) rails views are not going away, this will serve as more user friendly way to configure a Hesabu project.

## Other apps repos:

- [Hesabu API](https://github.com/blsq/orbf2)
- [ORBF Rules Engine](https://github.com/blsq/orbf-rules_engine)
- [Hesabu Ruby Solver](https://github.com/blsq/hesabu)
- [Hesabu Golang Solver](https://github.com/blsq/hesabu-go)

# Development

## Getting started

Run the app. This a [CRA](https://github.com/facebook/create-react-app) app, so all standard commands works as expected.

```bash
yarn start
```

## Committing

This project uses automated semantic versionning based on commit messages or PR titles.
Everything you want to appear in the CHANGELOG.md file please consider using this commit message formatting:

```
feat: A new feature
fix: A bug fix
docs: Documentation only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
```

### Formatting/linting

By default there is a pre-commit hook (provided by [husky](https://github.com/typicode/husky#readme)) that will run `prettifier-eslint`.

If you want to avoid this hook, run with `HUSKY_SKIP_HOOKS=1`, and run `yarn format` yourself.

# Deploy

TODO
