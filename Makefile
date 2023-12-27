COMPOSE = docker compose -f docker-compose.yaml
RUN_IN_DEV_ENV 			?= $(COMPOSE) run --rm --service-ports dev-env
RUN_IN_LAMBDA_DEV 	?= $(COMPOSE) run --rm --service-ports lambda-dev
RUN_IN_LAMBDA_PROD 	?= $(COMPOSE) run --rm --service-ports lambda-prod

dev: docker-pull docker-build npm-install start-dev
prod: docker-pull docker-build start-prod
clean: npm-clean docker-clean

bash: ## run bash within dev-env container
	$(RUN_IN_DEV_ENV) bash

quality: ## run test, typecheck, lint, and format with npm within dev-env container
	$(RUN_IN_DEV_ENV) npm run quality

start-dev: ## run app within lambda-dev container
	$(RUN_IN_LAMBDA_DEV)
start-prod: ## run app within lambda-prod container
	$(RUN_IN_LAMBDA_PROD)

### Docker
docker-pull: ## pull docker images
	$(COMPOSE) pull --ignore-pull-failures
docker-build: ## build images from Dockerfiles
	$(COMPOSE) build --force-rm
docker-clean: ## remove all containers, images, volumes, and networks
	$(COMPOSE) down --rmi all --volumes --remove-orphans

### NPM (within dev-env container)
npm-install: ## install app dependencies with npm within dev-env container
	$(RUN_IN_DEV_ENV) npm install
npm-build: ## build app with npm within dev-env container
	$(RUN_IN_DEV_ENV) npm run build
npm-update: ## update app dependencies with npm within dev-env container
	$(RUN_IN_DEV_ENV) npm update
npm-upgrade: ## upgrade app dependencies with npm within dev-env container
	$(RUN_IN_DEV_ENV) npx npm-check-updates -u
	$(RUN_IN_DEV_ENV) npm install
npm-clean: ## remove node_modules directory and dist directory
	$(RUN_IN_DEV_ENV) npm run clean