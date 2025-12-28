$ErrorActionPreference = "Stop"

Write-Host "---------------------------------------------------"
Write-Host "Running Improved Diagnostics (31.97.203.108)"
Write-Host "---------------------------------------------------"

# 1. Upload the script
Write-Host "Step 1: Uploading diagnostic script..."
Write-Host "Enter 'KVM 2' if prompted."
scp -o StrictHostKeyChecking=no diagnose.sh root@31.97.203.108:/root/diagnose.sh

# 2. Run the script (Sanitized)
Write-Host "Step 2: Running diagnostics..."
$runCmd = "sed -i 's/\r$//' /root/diagnose.sh && chmod +x /root/diagnose.sh && /root/diagnose.sh"
ssh -o StrictHostKeyChecking=no root@31.97.203.108 $runCmd

Write-Host "---------------------------------------------------"
