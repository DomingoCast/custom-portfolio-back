![job and talent](https://user-images.githubusercontent.com/48081621/162180679-3f1db5bd-72bc-4300-b99e-91d6c5f0a0e6.png)

# jnt-copy

The main goal is to create an API that emulates the workings of Job and Talent. Where you have Workers and Companies. And it's working on our [website](http://ec2-3-85-237-21.compute-1.amazonaws.com/)

### Table of contents

-   [jnt-copy](#jnt-copy)
    -   [Table of contents](#table-of-contents)
    -   [Getting started](#getting-started)
    -   [Usage](#usage)
    -   [Development](#development)
        -   [Architecture](#architecture)
        -   [Testing](#testing)
        -   [After finishing a task](#after-finishing-a-task)
        -   [Additional files](#additional-files)
    -   [Release](#release)
    -   [Copyright and license](#copyright-and-license)

---

## Getting started

First, clone the repo and install the dependencies.
`npm install`.

Keep in mind that we use `npm` for managing Node packages. If you try installing the dependencies with `yarn`, it will generate a `yarn.lock` file that will likely cause problems with the existing `package-lock.json`.

---

## Usage

First you will have to create a `.env` file with the information shown in `.env.example`

-   To run de production version image locally run `docker compose up` removing the `docker-compose.override.yml`.
-   To run de development version image locally run `docker compose up` which automatically will work with `docker-compose.override.yml`

---

## Development

TBD

### Architecture

While developing, we follow an [Hexagonal Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>).

If this is new for you, here are some useful links:

-   [Arquitectura Hexagonal en Node + Typescript](https://www.youtube.com/watch?v=b5ngTWAPNeg) (Spanish)
-   [Arquitectura Hexagonal con Typescript en APIs web con Nodejs](https://www.plainconcepts.com/es/recursos/typescript-apis-web-nodejs-arquitectura-hexagonal/) (Spanish)
-   ["Ready for changes with Hexagonal Architecture" - Netflix case study](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749)

### Testing

TBD

### After finishing a task

Before pushing your changes, make sure to test and run the linter to ensure the code follows the rules, or the CI pipeline will throw an error and fail:

`npm run test:prod`

`npm run lint:fix`

### Additional files

In the root folder of the project, you'll find several config files. Let's go over the most important ones:

-   `Dockerfile`: we need to replicate a given environment to work under the same conditions. With this file, we configure the Docker image we use.
-   `docker-compose.yml`: we need to work with a server and a database. With this file we configure both Docker containers
-   `docker-compose.yml`: to work with the image in the directory and not in the Docker hub and for more development aidance we override the settings with this file.
-   In the `ADR` folder there are the decissions of the technologies we have chosen for the project

---

## Release

We use [Gihub Actions](https://github.com/features/actions) as _CI/CD_ service.

**[Codeship governance project](http://ec2-3-85-237-21.compute-1.amazonaws.com/)**

Every time you make a pull request to `main` or commit to a branch that has one, the steps `.github/workflows/test.yml` will run.

Every time a branch is merged to `main`, the steps `.github/workflows/build-and-deploy.yml` will run. And the new changes will be deployed.

---

## Copyright and license

(c) Jobandtalent.
