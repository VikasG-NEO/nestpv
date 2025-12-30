#!/bin/bash
export TERM=xterm

echo "------------------------------------------------"
echo "DEEP DIAGNOSTICS REPORT"
echo "------------------------------------------------"

echo "1. NGINX STATUS:"
systemctl status nginx --no-pager -n 3
echo ""

echo "2. LISTENING PORTS (Are we listening on 80?):"
ss -tulnp | grep :80
echo ""

echo "3. FIREWALL RULES (UFW):"
ufw status verbose
echo ""

echo "4. IPTABLES (Raw check):"
iptables -L INPUT -n --line-numbers | head -n 20
echo ""

echo "5. WEB DIRECTORY PERMISSIONS:"
ls -ld /var/www/nestunion
ls -la /var/www/nestunion | head -n 5
echo ""

echo "6. INTERNAL TEST (Curl Localhost):"
# -v for verbose to see handshake
curl -v http://localhost 2>&1 | head -n 20
echo ""

echo "7. EXTERNAL IP CHECK:"
curl -s ifconfig.me
echo ""

echo "8. BACKEND STATUS (PM2):"
if command -v pm2 &> /dev/null; then
    pm2 list
else
    echo "PM2 not found"
fi
echo ""

echo "9. BACKEND PORT CHECK (:3000):"
ss -tulnp | grep :3000
echo ""

echo "10. INTERNAL BACKEND TEST:"
curl -v http://localhost:3000 2>&1 | head -n 20
echo ""
