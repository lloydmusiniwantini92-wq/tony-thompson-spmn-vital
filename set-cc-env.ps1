# Prompt for Constant Contact API Key
$apiKey = Read-Host "Enter your CONSTANT_CONTACT_API_KEY"

# Prompt for Constant Contact Access Token
$accessToken = Read-Host "Enter your CONSTANT_CONTACT_ACCESS_TOKEN"

Write-Host "`nSetting environment variables in Netlify..." -ForegroundColor Cyan

# Set environment variables using Netlify CLI
netlify env:set CONSTANT_CONTACT_API_KEY $apiKey
netlify env:set CONSTANT_CONTACT_ACCESS_TOKEN $accessToken

Write-Host "`nDone! ??" -ForegroundColor Green
Write-Host "Restart Netlify Dev:" -ForegroundColor Yellow
Write-Host "    netlify dev" -ForegroundColor White
