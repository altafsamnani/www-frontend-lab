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

copy-files:
	if [ ! -f .env ]; then cp .env.example .env; fi