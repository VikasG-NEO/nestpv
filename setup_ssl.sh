#!/bin/bash
set -e

echo "------------------------------------------------"
echo "SETTING UP SSL (HTTPS)"
echo "------------------------------------------------"

# 1. Install Certbot
if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
fi

# 2. Run Certbot
# This will try to prove ownership of nestunion.in
# If DNS is wrong, THIS WILL FAIL.
echo "Requesting Certificate..."
certbot --nginx \
    -d nestunion.in \
    -d www.nestunion.in \
    --non-interactive \
    --agree-tos \
    --register-unsafely-without-email \
    --redirect

echo "------------------------------------------------"
echo "HTTPS Enabled Successfully!"
echo "------------------------------------------------"
