#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

# Firewall
echo "Configuring Firewall..."
ufw allow 3000/tcp || true
iptables -I INPUT -p tcp --dport 3000 -j ACCEPT || true

# Install deps if missing
command -v node >/dev/null 2>&1 || { 
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
}
command -v pm2 >/dev/null 2>&1 || npm install -g pm2 @nestjs/cli

mkdir -p /root/nestunion-backend
cd /root/nestunion-backend

# Install dependencies
npm install

# Build
npm run build

# Start/Restart
echo "Restarting Backend..."
pm2 delete nestunion-backend 2>/dev/null || true
pm2 start dist/main.js --name nestunion-backend

echo "Waiting for checking logs..."
sleep 5
pm2 logs nestunion-backend --lines 20 --nostream
