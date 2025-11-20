# ==============================
# Create or Fix .env for Vite
# ==============================

Write-Host "🔧 Setting up .env file for Vite..."

# Path for .env file in current folder
$envPath = Join-Path (Get-Location) ".env"

# Prompt for API key and token
$apiKey = Read-Host "Enter your Constant Contact API Key (Client ID)"
$accessToken = Read-Host "Enter your Constant Contact Access Token"

# .env file content
$envContent = @"
VITE_CC_API_KEY=$apiKey
VITE_CC_ACCESS_TOKEN=$accessToken
"@

# Write content to .env file
Set-Content -Path $envPath -Value $envContent -Encoding UTF8

# Confirm file creation
if (Test-Path $envPath) {
    Write-Host "✅ .env file created successfully at:" $envPath -ForegroundColor Green
    Write-Host "`nContents:"
    Get-Content $envPath
} else {
    Write-Host "❌ Failed to create .env file. Try running PowerShell as Administrator." -ForegroundColor Red
}

# Optional: show hidden files to verify visually
Write-Host "`n👁  Showing hidden files in this folder (so you can see .env)..."
attrib -h ".env"
Write-Host "`nDone!"
