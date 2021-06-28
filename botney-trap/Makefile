SRC = $(wildcard *.tf ./*/*.tf)
platform := $(shell uname)
pydeps := pyyaml
modules = $(shell ls -1 ./*.tf ./*/*.tf | xargs -I % dirname %)

build:
	@bash scripts/build

plan:
	@bash scripts/plan

test:
	@bash scripts/test.sh

docs.md: $(SRC)
	@bash scripts/docs.sh

.PHONY: build