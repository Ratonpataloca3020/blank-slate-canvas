#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec bash "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

command -v timeout >/dev/null || {
  echo "build-verified.sh requires GNU timeout." >&2
  exit 69
}

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

if command -v node >/dev/null 2>&1; then
  runner=(node)
elif command -v bun >/dev/null 2>&1; then
  runner=(bun --bun)
else
  echo "Neither node nor bun is available to run the build." >&2
  exit 69
fi

echo "Running bounded vinext build with ${runner[0]}..."
timeout \
  --signal=TERM \
  --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
  "${SITES_BUILD_TIMEOUT:-5m}" \
  "${runner[@]}" "${vinext}" build

bash "${script_dir}/validate-artifact.sh"
