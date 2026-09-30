.PHONY: install

ifeq (,$(wildcard .env))
$(shell cp .env.example .env > /dev/null)
endif

include .env

NPM := npm

install: copy-files npm-install up
reinstall: remove npm-install up

remove: 
	rm -rfv node_modules package-lock.json

npm-install: 
	${NPM} install

npm-update: 
	${NPM} update

npm-check:
	${NPM} i -g npm-check-updates	

npm-build: 
	${NPM} run build

# To ignore ts errors and only build
npm-build-only: 
	${NPM} run build-only	

up:
	${NPM} run dev

npm-upgrade:
	${NPM} upgrade

version: 
	${NPM} list vue

copy-files:
	if [ ! -f .env ]; then cp .env.example .env; fi

auth: #Authetnicate with AWS
	aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 590183993062.dkr.ecr.eu-west-1.amazonaws.com

build-push: build push
build:
	docker build -t www-frontend-image --platform linux/amd64 .

push: ## Push to Prod Image
	docker tag  www-frontend-image:latest 590183993062.dkr.ecr.eu-west-1.amazonaws.com/www-frontend-image:latest
	docker push 590183993062.dkr.ecr.eu-west-1.amazonaws.com/www-frontend-image:latest