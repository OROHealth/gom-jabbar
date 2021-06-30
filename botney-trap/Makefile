#gnu makefile
# This Makefile provides macro control of the microservice core of Whale&Jaguar Platform
# ecosystem. It performs tasks like:
#
#   * Verify dependencies are present
#   * Pre configuration and project bootstrapping
#   * Launching project
#
#
# Exit codes:
#
#   All failures should exit with a detailed code that can be used for
#   troubleshooting. The current exit codes are:
#
#     0: Success!
#   102: Required dependency is not installed.
#

###############################################################################
### Loaded Configuration
### Load configuration from external files. Configuration variables defined in
### later files have precedent and will overwrite those defined in previous
### files. The -include directive ensures that no error is thrown if a file is
### not found, which is the case if config.local.mk does not exist.
###############################################################################
define REQUIRED_SOFTWARE
docker \
make
endef

all: setup build

###############################################################################
### setup ENV
###############################################################################

.PHONY: setup
setup:
	@bash scripts/setup
	@echo "You can set the environment variables necessary to connect with AWS, digitalocean and cloudflare. See the .env file"

###############################################################################
### Build CLI
###############################################################################

.PHONY: build
build: dependencies volume-create
	@bash scripts/build

# create volume
.PHONY: volume-create
volume-create:
	@docker volume create botney || true

###############################################################################
### init CLI
###############################################################################

.PHONY: init
init:
	@bash scripts/init

###############################################################################
### apply infrastructure
###############################################################################

.PHONY: infra
infra:
	@bash scripts/infra

###############################################################################
### deploy apps
###############################################################################

.PHONY: deploy
deploy:
	@bash scripts/deploy

###############################################################################
### destroy infra
###############################################################################

.PHONY: destroy
destroy:
	@bash scripts/destroy

###############################################################################
### Verify prerequisite software is installed.
###############################################################################
is-not-installed=! (command -v $(1) >/dev/null)

define dependency-template
dependency-$(1):
	@if ( $(call is-not-installed,$(1)) ); \
	then \
	  echo "Dependency" $(1) " not found in path." \
	  && exit 102; \
	else \
	  echo "Dependency" $(1) "found."; \
	fi;
endef
$(foreach pkg,$(REQUIRED_SOFTWARE),$(eval $(call dependency-template,$(pkg))))

.PHONY: dependencies
dependencies: $(foreach pkg,$(REQUIRED_SOFTWARE),dependency-$(pkg))

###############################################################################
### Clean
### Clean services with `docker-compose rm`
### Removes all containers, volumes and local networks.
###############################################################################
.PHONY: clean
clean:
	@docker volume rm botney || true

###############################################################################
### Dynamically list all targets.
### See: https://stackoverflow.com/a/26339924
###############################################################################
.PHONY: list
list:
	@$(MAKE) -pRrq -f $(MAKEFILE_LIST) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs -n 1
