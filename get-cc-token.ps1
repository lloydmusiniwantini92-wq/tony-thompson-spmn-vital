Write-Host "`n=== Constant Contact Token Generator ===`n" -ForegroundColor Cyan
$ClientID = Read-Host "Enter your CLIENT ID"
$SecureSecret = Read-Host "Enter your CLIENT SECRET (hidden)" -AsSecureString
$Ptr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureSecret)
$PlainSecret = [System.Runtime.InteropServices.Marshal]::PtrToStringUni($Ptr)
$AuthCode = Read-Host "Enter your AUTHORIZATION CODE (from redirect URL)"
$Body = "grant_type=authorization_code&client_id=$ClientID&client_secret=$PlainSecret&code=$AuthCode&redirect_uri=https://localhost"
Write-Host "`nRequesting Access Token from Constant Contact..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Method POST -Uri "https://authz.constantcontact.com/oauth2/default/v1/token" -Headers @{"Content-Type"="application/x-www-form-urlencoded"} -Body $Body
    Write-Host "`n=== RESPONSE RECEIVED ===" -ForegroundColor Green
    $response.Content
} catch {
    Write-Host "`nERROR:" -ForegroundColor Red
    Write-Host $_
}
Write-Host "`nDone!`n" -ForegroundColor Cyan
