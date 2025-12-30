$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "CORRECT Frontend Deployment (Targeting /root/nestpv/Frontend/dist)"
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

# 2. Upload to the ACTUAL Nginx root
$RemotePath = "/root/nestpv/Frontend/dist"

Write-Host "Step 2: Uploading to $RemotePath..."
Write-Host "Enter 'KVM 2' if prompted."

# Ensure directory exists
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "mkdir -p $RemotePath"

# clear old files to be safe
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "rm -rf $RemotePath/*"

# Upload
scp -o StrictHostKeyChecking=no -r Frontend/dist/* root@31.97.203.108:$RemotePath/

# 3. Restart Nginx
Write-Host "Step 3: Restarting Nginx..."
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "systemctl restart nginx"

Write-Host "---------------------------------------------------"
Write-Host "Deployed Successfully to correct location!"
Write-Host "---------------------------------------------------"
