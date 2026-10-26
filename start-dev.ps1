# One-click launcher for Frontend (React) and Backend (Spring Boot)
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host " Starting Employee Management System" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# 1. Start Backend (Spring Boot) in a new window
Write-Host "[1/2] Starting Spring Boot Backend (emp-api)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\emp-api'; Write-Host 'Starting Spring Boot...' -ForegroundColor Green; .\gradlew.bat bootRun"

# 2. Start Frontend (React + Vite) in a new window
Write-Host "[2/2] Starting React Frontend (emp-web)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\emp-web'; Write-Host 'Starting Vite Dev Server...' -ForegroundColor Green; npm run dev"

Write-Host "`nAll services launched successfully in separate terminal windows!" -ForegroundColor Green
