$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "Building and Deploying NestUnion (Frontend)"
Write-Host "---------------------------------------------------"

# 1. Build Frontend
Write-Host "Step 1: Building Frontend..."
Set-Location "Frontend"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed!"
    exit 1
}
Set-Location ..

# 2. Upload to Server
# We assume standard Nginx root /var/www/html. 
# If your site is hosted elsewhere (e.g. /var/www/nestunion), please edit this path.
Write-Host "Step 2: Uploading to /var/www/html on 31.97.203.108..."
Write-Host "You may be prompted for the root password."

# Using scp to copy contents of dist to /var/www/html
scp -r -o StrictHostKeyChecking=no Frontend/dist/* root@31.97.203.108:/var/www/html/

# 3. Validation
Write-Host "Step 3: Restarting Nginx..."
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "systemctl restart nginx"

Write-Host "---------------------------------------------------"
Write-Host "Deployment Complete! Please check https://nestunion.in"
Write-Host "To see changes locally, run: cd Frontend; npm run dev"
Write-Host "---------------------------------------------------"
