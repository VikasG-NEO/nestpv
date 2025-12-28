$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "Enabling HTTPS for nestunion.in"
Write-Host "---------------------------------------------------"
Write-Host "IMPORTANT: This will only work if you have configured"
Write-Host "your DNS (A Record) to point to 31.97.203.108"
Write-Host "---------------------------------------------------"

# 1. Upload Script
Write-Host "Step 1: Uploading SSL script..."
scp -o StrictHostKeyChecking=no setup_ssl.sh root@31.97.203.108:/root/setup_ssl.sh

# 2. Execute
Write-Host "Step 2: Installing Certificates..."
$cmd = "sed -i 's/\r$//' /root/setup_ssl.sh && chmod +x /root/setup_ssl.sh && /root/setup_ssl.sh"
ssh -o StrictHostKeyChecking=no root@31.97.203.108 $cmd
