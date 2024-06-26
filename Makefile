.PHONY: install

ifeq (,$(wildcard .env))
$(shell cp .env.example .env > /dev/null)
endif

include .env

NPM := npm

install: copy-files npm-install up

reinstall: remove npm-install up

remove: 
    $(shell -R node_modules")

npm-install: 
	${NPM} install

up:
	${NPM} run dev

npm-upgrade:
	${NPM} upgrade

copy-files:
	if [ ! -f .env ]; then cp .env.example .env; fi

auth: #Authetnicate with AWS
	aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 590183993062.dkr.ecr.eu-west-1.amazonaws.com

build-push: build push
build:
	docker build -t intra-backend-base-image .

push: ## Push to Prod Image
	docker tag intra-backend-base-image:latest 590183993062.dkr.ecr.eu-west-1.amazonaws.com/intra-backend-base-image:latest
	docker push 590183993062.dkr.ecr.eu-west-1.amazonaws.com/intra-backend-base-image:latest