# Bluesquare hesabu manager

[https://github.com/BLSQ/hesabu-manager/workflows/Build%20and%20publish%20to%20s3%20bucket/badge.svg](https://github.com/BLSQ/hesabu-manager/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/172b174db9e2461c41bc/maintainability)](https://codeclimate.com/github/BLSQ/hesabu-manager/maintainability)

Is a dhis2 (react) app to manage a blsq hesabu project. It connects to the Hesabu api and allows you to manage your Hesabu from within DHIS2.

It will become the new frontend to the existing [Hesabu API](https://github.com/blsq/orbf2) project. While the [Hesabu API](https://github.com/blsq/orbf2) rails views are not going away, this will serve as more user friendly way to configure a Hesabu project.

## Other apps repos:

- [Hesabu API](https://github.com/blsq/orbf2)
- [ORBF Rules Engine](https://github.com/blsq/orbf-rules_engine)
- [Hesabu Ruby Solver](https://github.com/blsq/hesabu)
- [Hesabu Golang Solver](https://github.com/blsq/hesabu-go)

# Development

## create a .env

### .env to point to a prod dhis2 and prod hesabu api

```bash
REACT_APP_DHIS2_URL=
REACT_APP_USER=
REACT_APP_PASSWORD=
```

### .env to point to a prod dhis2 and local hesabu api

```bash
REACT_APP_DHIS2_URL=
REACT_APP_USER=
REACT_APP_PASSWORD=

REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TOKEN=<<your_project_token>>
```

## .env to point to a play dhis2 and mock hesabu api

```bash
REACT_APP_DHIS2_URL=https://play.dhis2.org/2.30
REACT_APP_USER=admin
REACT_APP_PASSWORD=district

REACT_APP_API_URL=http://localhost:4567/api
REACT_APP_API_TOKEN=<<unused>>
```

Don't forget to start the mock server (ruby required)

```bash
cd ../mock-server
bundle install
bundle exec ruby app.rb
```

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

- except for debugging purpose don't deploy individually, or from your laptop.
- the cra app is build based on the `development` branch by github actions and published to s3
- the deployment of this s3 artefact is done via a rake task in the `orbf2` [repository](https://github.com/blsq/orbf2) to target all the dhis2 configured in the database.
