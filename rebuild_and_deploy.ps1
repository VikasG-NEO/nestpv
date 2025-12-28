$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "Re-Building and Deploying NestUnion (Frontend)"
Write-Host "---------------------------------------------------"

# 0. Clean old build
Write-Host "Step 0: Cleaning old build..."
if (Test-Path "Frontend/dist") {
    Remove-Item -Path "Frontend/dist" -Recurse -Force
}

# 1. Build Frontend
Write-Host "Step 1: Building Frontend (Fresh)..."
Set-Location "Frontend"
npm install
# Set API URL for production
"VITE_API_URL=https://nestunion.in" | Out-File -FilePath .env -Encoding utf8
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed!"
    exit 1
}
Set-Location ..

# 2. Upload to Server
Write-Host "Step 2: Uploading to /var/www/html on 31.97.203.108..."
Write-Host "You may be prompted for the root password."

# Clear remote directory first to avoid stale files
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "rm -rf /var/www/html/*"

# Using scp to copy contents of dist to /var/www/html
scp -r -o StrictHostKeyChecking=no Frontend/dist/* root@31.97.203.108:/var/www/html/

# 3. Validation
Write-Host "Step 3: Restarting Nginx to clear cache..."
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "systemctl restart nginx"

Write-Host "---------------------------------------------------"
Write-Host "Deployment Complete!"
Write-Host "IMPORTANT: Please open https://nestunion.in in an INCOGNITO window to see changes."
Write-Host "---------------------------------------------------"
