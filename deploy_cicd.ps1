$ErrorActionPreference = "Stop"

Write-Host "Setting up CI/CD Environment on KVM (31.97.203.108)..."

# 1. Copy Setup Script
Write-Host "Copying setup script..."
scp -o StrictHostKeyChecking=no setup_cicd.sh root@31.97.203.108:/root/

# 2. Execute Setup
Write-Host "Executing setup on remote server..."
Write-Host "Please enter 'KVM 2' if asked for password."
ssh -o StrictHostKeyChecking=no root@31.97.203.108 "sed -i 's/\r$//' /root/setup_cicd.sh && chmod +x /root/setup_cicd.sh && /root/setup_cicd.sh"

Write-Host "-------------------------------------------"
Write-Host "CI/CD Environment Ready!"
Write-Host "Git, Node.js, and PM2 are installed on the server."
Write-Host "-------------------------------------------"
