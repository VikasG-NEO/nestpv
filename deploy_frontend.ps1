$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "Starting Frontend Deployment to KVM VPS (31.97.203.108)"
Write-Host "---------------------------------------------------"

# 1. Build Frontend Locally
Write-Host "Step 1/3: Building Frontend..."
Set-Location Frontend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Frontend Build Failed!"
    exit 1
}
Set-Location ..
Write-Host "Build Complete!"

# 2. Prepare Remote Directory & firewall
Write-Host "Step 2/3: Preparing Remote Server..."
Write-Host "NOTE: Enter 'KVM 2' if asked for password."
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "mkdir -p /root/nestunion-frontend && ufw allow 80/tcp || true"

# 3. Copy Files
Write-Host "Step 3/3: Copying build files to server..."
Write-Host "Enter 'KVM 2' when prompted."
scp -o StrictHostKeyChecking=no -r Frontend/dist/* root@31.97.203.108:/root/nestunion-frontend/

# 4. Start Web Server
Write-Host "Starting Web Server..."
$startScript = "
command -v serve >/dev/null 2>&1 || npm install -g serve
pm2 delete nestunion-frontend 2>/dev/null || true
pm2 start serve --name nestunion-frontend -- -s /root/nestunion-frontend -l 80
pm2 save
"
# Fix line endings on the fly just in case
ssh -o StrictHostKeyChecking=no root@31.97.203.108 $startScript

Write-Host "---------------------------------------------------"
Write-Host "Frontend Deployed Successfully!"
Write-Host "Access your site here: http://31.97.203.108"
Write-Host "---------------------------------------------------"
