#!/bin/bash
set -e

# 1. Install Nginx if missing
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    apt-get update
    apt-get install -y nginx
fi

# 2. Prepare Web Directory (Fixing 500 Error)
echo "Setting up web directory..."
mkdir -p /var/www/nestunion

# Clean directory first to ensure no stale files (Fixes "Updates not showing")
rm -rf /var/www/nestunion/*
# Move uploaded files from /root staging to /var/www
cp -r /root/nestunion-frontend/* /var/www/nestunion/

# 3. Set Permissions (CRITICAL)
echo "Fixing permissions..."
chown -R www-data:www-data /var/www/nestunion
chmod -R 755 /var/www/nestunion

# 4. Configure Firewall
echo "Configuring Firewall..."
ufw allow 'Nginx Full'
ufw allow 80/tcp
ufw allow 3000/tcp
# Force enable if not active
ufw --force enable

# 5. Setup Nginx Config
echo "Configuring Nginx..."
cp /root/nginx.conf /etc/nginx/sites-available/nestunion
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/nestunion /etc/nginx/sites-enabled/

# 6. Restart Nginx
echo "Restarting Nginx..."
systemctl restart nginx

echo "Nginx Setup Complete! Serving from /var/www/nestunion"
