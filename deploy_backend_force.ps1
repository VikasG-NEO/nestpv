$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "FAST BACKEND FIX (Force Upload & Restart)"
Write-Host "---------------------------------------------------"

# 1. Prepare temp dir
$backendTmp = "backend_deploy_fix_tmp"
if (Test-Path $backendTmp) { Remove-Item $backendTmp -Recurse -Force }
New-Item -ItemType Directory -Path $backendTmp | Out-Null

# 2. Copy only source files (src, package.json, tsconfig.json)
Write-Host "Step 1: Preparing files..."
Copy-Item "backend/src" $backendTmp -Recurse
Copy-Item "backend/package.json" $backendTmp
Copy-Item "backend/tsconfig.json" $backendTmp
Copy-Item "backend/tsconfig.build.json" $backendTmp

# 3. Upload to server
$RemoteBackendPath = "/var/www/nestunion-backend"
Write-Host "Step 2: Uploading to $RemoteBackendPath..."
Write-Host "Enter 'KVM 2' if prompted."

# Upload
scp -r -o StrictHostKeyChecking=no $backendTmp/* root@31.97.203.108:$RemoteBackendPath/

# Cleanup
Remove-Item $backendTmp -Recurse -Force

# 4. Remote Build & Restart
Write-Host "Step 3: Building and Restarting Backend..."
$SSHCommand = "export PATH=`$PATH:/root/.nvm/versions/node/v20.10.0/bin:/usr/bin; cd $RemoteBackendPath && npm install && npm run build && pm2 restart nestunion-backend"
ssh -o StrictHostKeyChecking=no root@31.97.203.108 $SSHCommand

Write-Host "---------------------------------------------------"
Write-Host "Backend Updated!"
Write-Host "---------------------------------------------------"
