$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "Fixing Remote Backend Environment"
Write-Host "---------------------------------------------------"

$ServerIP = "31.97.203.108"
$User = "root"

# 1. Check if local .env exists
if (-not (Test-Path "backend\.env")) {
    Write-Error "Local backend\.env not found! Cannot upload."
    exit 1
}

Write-Host "Preparing to upload backend/.env to server..."
Write-Host "NOTE: You may be prompted for the server password."

# 2. Upload to potential locations
# We try /var/www/nestunion-backend (used by deploy_full.ps1)
# And /root/nestunion-backend (used by setup_server.sh)

$Targets = @("/var/www/nestunion-backend", "/root/nestunion-backend")

foreach ($Target in $Targets) {
    Write-Host "Checking if $Target exists on server..."
    # Try to verify directory exists
    $CheckCmd = "if [ -d ""$Target"" ]; then echo EXISTS; fi"
    $Result = ssh -o StrictHostKeyChecking=no $User@$ServerIP $CheckCmd
    
    if ($Result -match "EXISTS") {
        Write-Host "Uploading .env to $Target..."
        scp -o StrictHostKeyChecking=no backend/.env $User@$ServerIP`:$Target/.env
    }
    else {
        Write-Host "Skipping $Target (Not found)."
    }
}

# 3. Restart PM2
Write-Host "Restarting Backend Process (pm2)..."
$RestartCmd = "pm2 restart nestunion-backend || pm2 start /var/www/nestunion-backend/dist/main.js --name nestunion-backend"
ssh -o StrictHostKeyChecking=no $User@$ServerIP $RestartCmd

Write-Host "---------------------------------------------------"
Write-Host "Fix Applied. Please wait 10-20 seconds and refresh the site."
Write-Host "---------------------------------------------------"
