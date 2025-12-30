#!/bin/bash
echo "1. Backing up resolv.conf..."
cp /etc/resolv.conf /etc/resolv.conf.bak

echo "2. Updating DNS to Google (8.8.8.8)..."
echo "nameserver 8.8.8.8" > /etc/resolv.conf
echo "nameserver 8.8.4.4" >> /etc/resolv.conf

echo "3. Verifying DNS..."
cat /etc/resolv.conf

echo "4. Restarting Backend with updated environment..."
# Ensure we are in the right directory
cd /var/www/nestunion-backend || cd /root/nestunion-backend

# Delete and start to ensure fresh environment and DNS context
pm2 delete nestunion-backend 2>/dev/null || true
pm2 start dist/main.js --name nestunion-backend --update-env

echo "5. Waiting for logs..."
sleep 5
pm2 logs nestunion-backend --lines 20 --nostream
