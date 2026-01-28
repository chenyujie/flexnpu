#!/usr/bin/env bash

set -e

# -----------------------------------------------------------------------------
# Usage and command-line argument parsing
# -----------------------------------------------------------------------------
function usage() {
    echo "Usage: $0"
    echo
    exit 1
}

ENABLE_WEBSERVER=1 # Default to enable web server

# -----------------------------------------------------------------------------
# Host ID logic:
#   1. By default, use the system hostname if length <= 32
#   2. Otherwise, use the full MD5 hash of the hostname (32 hex chars)
# -----------------------------------------------------------------------------
CURRENT_HOSTNAME="$(hostname)"
if [ ${#CURRENT_HOSTNAME} -le 32 ]; then
  DEFAULT_HOST_ID="$CURRENT_HOSTNAME"
else
  DEFAULT_HOST_ID="$(echo -n "$CURRENT_HOSTNAME" | md5sum | cut -d ' ' -f 1)"
fi

HOST_ID="$DEFAULT_HOST_ID"

# Parse arguments
for arg in "$@"; do
  case $arg in
    --disable-webserver)
      ENABLE_WEBSERVER=0
      shift
      ;;
    --host-id=*)
      HOST_ID="${arg#*=}"
      shift
      ;;
    *)
      usage
      ;;
  esac
done

# -----------------------------------------------------------------------------
# Replace env variables
# -----------------------------------------------------------------------------
export LD_LIBRARY_PATH="/usr/lib/x86_64-linux-gnu/"
PY=python3

# -----------------------------------------------------------------------------
# Function(s)
# -----------------------------------------------------------------------------


# -----------------------------------------------------------------------------
# Start components based on flags
# -----------------------------------------------------------------------------
if [[ "${ENABLE_WEBSERVER}" -eq 1 ]]; then
    echo "Starting nginx..."
    echo "set \$WORKDIR $(pwd);" > `pwd`/nginx/env.variables
    nginx -c `pwd`/nginx/nginx.conf

    echo "Starting agent_server..."
    while true; do
        cd "$PYTHONPATH" && "$PY" app.py &
        wait;
        sleep 1;
    done &
fi

wait
