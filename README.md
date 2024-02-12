# AWS Lambda Typescript Dockerized Dev Environment Template

Just a simple boilerplate project you can start with if you wan to develop lambda in typescript without the need of serverless framework. It handles swc/tsc, add jest, eslint, prettier, create production ready lambda, and allow seamless development in typescript with on the fly compilation. I use the official lambda docker images.

## Todo list

* [x] dockerize
* [x] makefile
* [x] eslint
* [x] prettier
* [x] setup ~~vitest~~ jest + swc (because too much struggle making vitest work with tsc and swc)
* [x] swc for faster builds
* [x] add a way to run it locally for dev (official lambda runtime image + swc-node handler)
* [x] automate production build (official docker image with build steps)
* [ ] readme (in progress)

## Development

### Dev Requirements

* docker
* docker-compose
* make

### Dev Commands

* `make dev` - will pull/build/install and start the lambda locally
  * rerun for reintsall or run `make clean` to remove dependencies and all images and containers
  * will run on port 3000, you can change in `docker-compose.yaml`
* `make bash` - will open a bash shell in the in the dev-container (where you can run `npm` commands etc)
  * this is meant to be used instead of installing npm locally so you don't have to handle any compatibility issues (in your personal bash you only run make commands or perhaps docker commands if you know what you are doing)
* `make quality` - will run the tests, typecheck and linters + fixes
  * you can run those steps individually with withing the dev-container (`make bash`) with `npm run test`, `npm run typecheck`, `npm run lint` and `npm run format`
* `make test` - will run all tests once
* `make test-watch` - will run all new tests (based on git diff) and rerun on change.
* `make clean` - will remove all dependencies and all images and containers
* `make build` - will build the production image in /dist folder (just to see the output if needed)
* `make prod` - will run the production image

### Local endpoint

Use the local api with postman or equivalent

```text
http://localhost:3000/2015-03-31/functions/function/invocations + body json = {}
```

Use the local api with curl

```bash
curl "http://localhost:3000/2015-03-31/functions/function/invocations" -d '{}'
```

:warning: **Note**: the body must be JSON, even if it's empty

### Project structure

```bash
.
├──src  # source code (typescript)
│   └── index.ts # the lambda entrypoint (handler)
├── bootstrap.js # (see below for details)
├── docker-compose.prod.yaml # to run prod container locally (see below for details)
├── docker-compose.yaml # to run des containers locally (see below for details)
├── Dockerfile.devEnv # docker image to run dev commands (npm etc) (see below for details)
├── Dockerfile.devLambda # docker image to execute .src/index.ts (via bootstrap.js) (see below for details)
├── Dockerfile.prodLambda # docker image to execute the built production app (see below for details)
└──  Makefile # where all the command you need to run are defined (see "Dev Commands" above)
```

* `bootstrap.js` - **For dev purpose only**. The file executed by de devLambda container, it's the entrypoint of the container. This allow it to transpile the typescript code on the fly so you don't need to build or refresh anything when you dev while `make dev` is running.
* `docker-compose.prod.yaml` - **For dev purpose only**. The file used when `make prod`, to run the prodLambda container, so you can test the production build locally.
* `docker-compose.yaml` - **For dev purpose only**. The file used when `make dev`, to run the devLambda container so you have a fast interactive dev environment.
* `Dockerfile.devEnv` - **For dev purpose only**. The image used to contain all your dev tools for dev such as npm. If you need to run anything you can use `make bash` to open a bash shell in this dev container. (to install new dependencies for example)
* `Dockerfile.devLambda` - **For dev purpose only**. The image used to run the lambda locally with typescript transpiling on the fly via `bootstrap.js`. It's based on the official lambda runtime image.
* `Dockerfile.prodLambda` - The image used to run the production build of the lambda. I is either meant to be used locally while debugging final production build with `make prod`, but also can be used to deploy the production image to AWS. It's based on the official lambda runtime image.

### Random things to know

#### Environment variables (.env)

* `TS_COMPILER`: (`swc | tsc`) - to select the compiler to use for production build (used when `npm run build` (or via `make prod`) to automatically switch to `build:swc` or `build:tsc`)
  * It's recommended to use `tsc` here to have typechecking.
* `TS_COMPILER_DEV`: (`swc | tsc`) - to select the compiler to use for development (used via `make dev`)
  * Using swc will significantly speed up development but will disable typechecking
* `TS_COMPILER_TEST`: (`swc | tsc`) - to select the compiler to use when runing tests (used via `make test` or `make test-watch`)
  * Using swc will significantly speed up test start time but will disable tests typechecking

## Production

### Prod Requirements

* docker

### Prod Commands

Build the production image from the Dockerfile.prodLambda

```bash
docker build -t {{image_name}}:latest -f Dockerfile.prodLambda .
```

(_replace `{{image_name}}` with the name of the image you want to use_)

Run the production image

```bash
docker run -p {{port}}:8080 {{image_name}}:latest
```

(_replace `{{image_name}}` with the name of the image you want to use and `{{port}}` with the port you want to use_)

Deploy the production image to AWS

TODO
