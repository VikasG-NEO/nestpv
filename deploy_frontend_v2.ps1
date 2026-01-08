$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "ROBUST Frontend Deployment -> /var/www/nestunion-frontend"
Write-Host "---------------------------------------------------"

# 1. Build Frontend
Write-Host "Step 1: Building Frontend..."
Set-Location Frontend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Frontend Build Failed!"
    exit 1
}
Set-Location ..

# 2. Prepare /var/www directory (standard web location)
$RemotePath = "/var/www/nestunion-frontend"

Write-Host "Step 2: Preparing Remote Directory ($RemotePath)..."
Write-Host "Enter 'KVM 2' if prompted."

# Create dir and set permissions (755 is standard for web directories)
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "mkdir -p $RemotePath && chmod 755 $RemotePath"

# Clear old files
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "rm -rf $RemotePath/*"

# 3. Upload new files
Write-Host "Step 3: Uploading files..."
scp -o StrictHostKeyChecking=no -r Frontend/dist/* root@31.97.203.108:$RemotePath/

# 4. Update Nginx Config if needed (we upload the local one to be sure)
Write-Host "Step 4: Updating Nginx Config..."
scp -o StrictHostKeyChecking=no nginx.conf root@31.97.203.108:/etc/nginx/sites-available/nestunion

# 5. Fix Permissions & Restart Nginx
Write-Host "Step 5: Setting Permissions & Restarting Nginx..."
# Ensure www-data (Nginx user) owns the files
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "chown -R www-data:www-data $RemotePath && systemctl reload nginx"

Write-Host "---------------------------------------------------"
Write-Host "Deployed Successfully to Standard Web Directory!"
Write-Host "---------------------------------------------------"
