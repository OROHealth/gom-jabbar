FROM alpine:3.14.0

# hadolint ignore=DL3018
RUN apk --no-cache add bash shadow tini
SHELL ["/bin/bash", "-o", "pipefail", "-o", "errexit", "-u", "-c"]

RUN set -ex; \
  # Create a group and user
  groupadd orohealth && useradd orohealth -g orohealth -u 1000 -m; \
  # create app dir and grant permissions
  mkdir -p /usr/local/app; \
  chown orohealth:orohealth -R /usr/local/app

WORKDIR /usr/local/app

COPY --chown=orohealth:orohealth botney-trap.sh .
RUN ["chmod", "+x", "/usr/local/app/botney-trap.sh"]

USER orohealth
ENTRYPOINT ["tini", "--", "/usr/local/app/botney-trap.sh"]