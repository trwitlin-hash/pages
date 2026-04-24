#!/bin/bash
# deploy.sh — Upload site to DreamHost via SFTP
# Usage: ./deploy.sh
#
# Requires deploy.env (copy from deploy.env.example and fill in credentials)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/deploy.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ deploy.env not found."
  echo "   Copy deploy.env.example → deploy.env and fill in your credentials."
  exit 1
fi

source "$ENV_FILE"

if [ -z "$SFTP_HOST" ] || [ -z "$SFTP_USER" ] || [ -z "$SFTP_PASS" ] || [ -z "$SFTP_PATH" ]; then
  echo "❌ deploy.env is missing one or more required values."
  exit 1
fi

echo "🚀 Deploying to $SFTP_HOST/$SFTP_PATH..."

# Use rsync over SSH (DreamHost supports this — faster than plain SFTP)
# Excludes git data, scripts, and credentials
rsync -avz --progress \
  --exclude='.git/' \
  --exclude='.gitignore' \
  --exclude='.DS_Store' \
  --exclude='deploy.sh' \
  --exclude='deploy.env' \
  --exclude='deploy.env.example' \
  --exclude='CNAME' \
  -e "sshpass -p '$SFTP_PASS' ssh -o StrictHostKeyChecking=no" \
  "$SCRIPT_DIR/" \
  "$SFTP_USER@$SFTP_HOST:$SFTP_PATH/"

echo "✅ Done! Site live at https://teabagpress.com"
