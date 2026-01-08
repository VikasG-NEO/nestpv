$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "FULL STACK DEPLOYMENT (Frontend + Backend)"
Write-Host "---------------------------------------------------"

# --- FRONTEND DEPLOYMENT ---
Write-Host "Step 1: Deploying Frontend..."
./rebuild_and_deploy.ps1
if ($LASTEXITCODE -ne 0) { exit 1 }

# --- BACKEND DEPLOYMENT ---
Write-Host "---------------------------------------------------"
Write-Host "Step 2: Preparing Backend..."

# Create a temporary folder for backend
$backendTmp = "backend_deploy_tmp"
if (Test-Path $backendTmp) { Remove-Item $backendTmp -Recurse -Force }
New-Item -ItemType Directory -Path $backendTmp | Out-Null

# Copy backend files (excluding node_modules and .git)
Copy-Item "backend/*" $backendTmp -Recurse
# Remove exclusion candidates if copied
if (Test-Path "$backendTmp/node_modules") { Remove-Item "$backendTmp/node_modules" -Recurse -Force }
if (Test-Path "$backendTmp/.env") { Remove-Item "$backendTmp/.env" -Force } # Don't overwrite prod env

# Upload to server
# We assume the backend is in /var/www/nestunion/backend or /root/nestunion/backend
# ADJUST THIS PATH IF NEEDED:
$RemoteBackendPath = "/var/www/nestunion-backend" 

Write-Host "Step 3: Uploading Backend to $RemoteBackendPath..."
Write-Host "NOTE: If your backend is in a different folder, please edit this script (deploy_full.ps1) line 29."
Write-Host "You may be prompted for the root password."

# Ensure remote dir exists
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "mkdir -p $RemoteBackendPath"

# Upload
scp -r -o StrictHostKeyChecking=no $backendTmp/* root@31.97.203.108:$RemoteBackendPath/

# Cleanup tmp
Remove-Item $backendTmp -Recurse -Force

# Remote Build & Restart
Write-Host "Step 4: Building and Restarting Backend..."
$SSHCommand = "cd $RemoteBackendPath && npm install && npm run build && pm2 restart nestunion-backend"
ssh -o StrictHostKeyChecking=no root@31.97.203.108 $SSHCommand

Write-Host "---------------------------------------------------"
Write-Host "Step 5: Updating Nginx Configuration..."
$NginxConfPath = "nginx.conf"
$RemoteNginxPath = "/etc/nginx/sites-available/nestunion"
$RemoteNginxLink = "/etc/nginx/sites-enabled/nestunion"

if (Test-Path $NginxConfPath) {
    Write-Host "Uploading nginx.conf..."
    scp -o StrictHostKeyChecking=no $NginxConfPath root@31.97.203.108:$RemoteNginxPath
    
    Write-Host "Linking and Testing Nginx config..."
    $NginxCmd = "ln -sf $RemoteNginxPath $RemoteNginxLink && nginx -t && systemctl reload nginx"
    ssh -o StrictHostKeyChecking=no root@31.97.203.108 $NginxCmd
}
else {
    Write-Warning "nginx.conf not found! Skipping Nginx update."
}

Write-Host "---------------------------------------------------"
Write-Host "Full Deployment Complete!"
Write-Host "---------------------------------------------------"
