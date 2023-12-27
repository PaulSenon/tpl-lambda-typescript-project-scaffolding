# AWS Lambda Typescript Dockerized Dev Environment Template

## WIP

This is not usable yet, it's a work in progress.
Only the project scaffolding is done but it's currently just a hello world lambda.

## Todo list

* [x] dockerize
* [x] makefile
* [x] eslint
* [x] prettier
* [x] setup vitest
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
