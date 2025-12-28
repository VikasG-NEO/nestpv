$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "Starting Frontend Deployment via Nginx (31.97.203.108)"
Write-Host "---------------------------------------------------"

# 1. Build Frontend
Write-Host "Step 1/4: Building Frontend..."
Set-Location Frontend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Frontend Build Failed!"
    exit 1
}
Set-Location ..

# 2. Upload Files
Write-Host "Step 2/4: Uploading Files..."
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "mkdir -p /root/nestunion-frontend"

# Upload dist folder
scp -o StrictHostKeyChecking=no -r Frontend/dist/* root@31.97.203.108:/root/nestunion-frontend/

# Upload config and setup script to /root/ first (safe location)
scp -o StrictHostKeyChecking=no nginx.conf root@31.97.203.108:/root/nginx.conf
scp -o StrictHostKeyChecking=no setup_nginx.sh root@31.97.203.108:/root/setup_nginx.sh

# 3. Execute Setup
Write-Host "Step 3/4: Configuring Nginx on Server..."
# Fix line endings (CRLF -> LF) and execute
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "sed -i 's/\r$//' /root/setup_nginx.sh && chmod +x /root/setup_nginx.sh && /root/setup_nginx.sh"

Write-Host "---------------------------------------------------"
Write-Host "Deployed Successfully via Nginx!"
Write-Host "Access here: http://31.97.203.108"
Write-Host "---------------------------------------------------"
