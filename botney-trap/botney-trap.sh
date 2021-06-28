#!/usr/bin/env bash

# Please Use Google Shell Style: https://google.github.io/styleguide/shell.xml

# ---- Start unofficial bash strict mode boilerplate
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -o errexit  # always exit on error
set -o errtrace # trap errors in functions as well
set -o pipefail # don't ignore exit codes when piping output
set -o posix    # more strict failures in subshells
# set -x          # enable debugging

IFS=$'\n\t'
# ---- End unofficial bash strict mode boilerplate

# https://stackoverflow.com/questions/16640054/minimal-web-server-using-netcat
# https://funprojects.blog/2021/04/11/a-web-server-in-1-line-of-bash/
RESPONSE="HTTP/1.1 200 OK\r\nConnection: keep-alive\r\n\r\n${2:-"OK"}\r\n"


while true; do echo "Time to go to sleep Basherbot from ${ENV}"; sleep 2; done

while true; do { echo -e 'HTTP/1.1 200 OK\r\n'; sh test; } | nc -l 8080; done

# #!/usr/bin/env bash
# while true; do { echo -en "$RESPONSE"; sleep 2; } | nc -l "${1:-8080}"; do
#   echo "Time to go to sleep Basherbot from ${ENV}";
#   sleep 2;
# done