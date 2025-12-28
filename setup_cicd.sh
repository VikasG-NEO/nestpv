#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

echo "--- Starting CI/CD Environment Setup ---"

# 1. Update and Install Basics
apt-get update
apt-get install -y curl git unzip

# 2. Install Node.js v20
if ! command -v node &> /dev/null; then
    echo "Installing Node.js v20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
else
    echo "Node.js is already installed."
fi

# 3. Install Global Tools (PM2, NestCLI)
npm install -g pm2 @nestjs/cli

# 4. Setup Directories
mkdir -p /root/nestunion-backend
mkdir -p /root/nestunion-cicd

echo "--- Environment Setup Complete ---"
node -v
npm -v
git --version
pm2 -v
