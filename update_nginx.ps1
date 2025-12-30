$ErrorActionPreference = "Stop"
Write-Host "Updating Nginx Config to allow 50MB Uploads..."

# 1. Upload new nginx.conf
Write-Host "Uploading nginx.conf..."
scp -o StrictHostKeyChecking=no nginx.conf root@31.97.203.108:/etc/nginx/sites-available/nestunion

# 2. Check syntax and restart
Write-Host "Restarting Nginx..."
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "nginx -t && systemctl reload nginx"

Write-Host "Done! Large file uploads should now work."
