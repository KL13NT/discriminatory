<center>

<h1 align="center">ValaLearn</h1>

<p align="center">Delightful online learning.</p>

<p align="center">
	<a href="https://travis-ci.com/KL13NT/valalearn">
		<img src="https://travis-ci.com/KL13NT/valalearn.svg?token=TW6VrBoCscbKQsMfY5CH&branch=master" alt="Build Status" />
	</a>
	<a href="https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=KL13NT/valalearn&utm_campaign=Badge_Grade">
		<img src="https://api.codacy.com/project/badge/Grade/5aa6071531354bbf873310e59d938828" alt="Codacy Badge" />
	</a>
	<a href="https://kl13nt.github.io/valalearn/coverage/index.html">
		<img src="./docs/coverage/badges/coverage.svg" alt="Coverage" />
	</a>
</p>

</center>

## Table of Contents

- [Lifecycle](#Lifecycle)
- [Project Structure](#Project-Structure)
- [Naming Rules](#Naming-Rules)
- [Development Environment](#Development-Environment)
  - [Linting](#Linting)
  - [Testing](#Testing)

## Workflow

> IMPORTANT: Run `yarn build:local` before pushing. This is to ensure your commits are valid since it lints and tests your code, as well as producing new docs.

Commits follow a schema that's defined as `[<type>] <commit_message>`, where `<type>` is one of:

- `bug`: Bug fixes and commits related to them
- `feature`: Feature updates and incremental additions
- `docs`: Documentation updates
- `config`: Configuration changes
- `amend`: Fixing older commits and/or rebasing them
- `refactor`: Adding tests and refactoring code
- `test`: Added tests only

All commits are on `feature-branch` or `developer-name` branch by default and new releases are then PR'ed/Rebased into `develop` which in turn gets PR'ed into `master` which starts the CI stages:

- **lint**: Enforces ESLint rules
- **test**: Runs Jest unit tests, and creates and runs storybook snapshot testing
- **cypress:run**: Runs Cypress integration tests for views
- **build**: Builds using Parcel into /dist
- **build-storybook**: Builds component documentation into /docs
- **deploy**: Deploys website assets to firebase hosting from /dist

> You're well advised to make sure tests and linting pass on your machine locally before pushing.

## Project Structure

### Frontend-related

```
src/
	components/
	controllers/ - Helper functions that control data flow.
	pages/
	views/
	utils/
dist/
docs/ - Components documentation generated using Storybook
```

### Configuration

Folders used to store related configuration files

```
.firebase/
.storybook/
cypress/
```

### DevOps

```

functions/ - Serverless firebase functions for API endpoints
tests/ - General testing. Component tests accompany their components in `components/`
tests/integration - Cypress integration tests
```

Stack:

- **Styling**: [Sass (Indented Syntax)](https://sass-lang.com/)
- **Static Templating**: [Pug](https://pugjs.org/)
- **View**: [React](reactjs.org/)
- **State Management**: _Not decided yet_, React.Context will probably suffice.
- **Unit Testing**: [Jest](jestjs.io/)
- **E2E Testing**: [Cypress](https://docs.cypress.io/)
- **Component development & snapshot testing**: [Storybook](storybook.js.org/)
- **CI/CD**: [TravisCI](https://docs.travis-ci.com/user/tutorial/)
- **Hosting**: [Firebase Hosting](https://firebase.google.com/docs/hosting/)
- **API**: [Firebase Serverless Functions](https://github.com/firebase/quickstart-js/tree/master/functions)
- **Database**: [Firebase Firestore](https://github.com/firebase/quickstart-js/tree/master/firestore)
- **Data Validation**: [@hapi/joi](https://hapi.dev/module/joi/#install)

## Naming Rules

### Files

- Folders are all lower-case
- Components: `TitleCase.jsx`
- Sass modules: `ComponentName.module.sass`
- Global styling uses the `<filename>.global.sass` format
- Files that export classes use TitleCase (Pascal Case) `ClassName.js`
- All others use camelCase `util.js`
- File names containing more than 1 word should separate words with `-` `db-utils.js`
- Tests are named as: `testname.test.js`

### Variables

- Variables use camelCase `let fetchedData`
- _Global_/Module-scoped constants use CONSTANT_CASE `const ARROW_UP_KEY_CODE`
- Functions use camelCase `function renderWithLabel(){}`
- Objects use camelCase `let fetchedData = {}`
- Classes use TitleCase (Pascal Case) `class DatabaseClient`

> Avoid globals unless necessary. Use module-scoped variables instead.

## Development Environment

This section describes the linters used, testing frameworks, and their configuration.

### Linting

Please follow the linting rules in `.eslintrc.js` and use only that. Prettier has some weird rules that hinder productivity instead of boost it. ESLint is the only linter used in this repo, and is used for formatting as well.

### Testing

We use 3 types of tests:

- Unit tests for functions and components
- Functional tests for application rendering and design consistency
- Accessibility testing which ensures all components are accessible

#### Units Tests

Create a `modulename.test.js` file in which you use Jest to write the unit tests. If it's a React component file use Enzyme as well as Jest renderer to make sure component states change properly.

#### Functional Tests

For this we use Cypress. Cypress integrates seamlessly with the code and allows us to simulate user actions in a headless browser. All you have to do is create new tests and simulate them.

#### Accessibility Tests

Accessibility tests go according to the [React accessibility standards](https://reactjs.org/docs/accessibility.html). There are also automated tests that start with the development server using aXe's `react-axe` in addition to ESLint jsx-a11y rules.
