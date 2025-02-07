# win.ps1
$ErrorActionPreference = 'Stop'

Write-Host "=== Lokio CLI Installer ===" -ForegroundColor Cyan

# Tetapkan path instalasi
$installDir = "$env:USERPROFILE\lokio"
$exePath = "$installDir\lokio.exe"
$exeUrl = "https://github.com/any-source/lokio/releases/download/latest/windows.exe"

# Buat direktori instalasi
if (-not (Test-Path $installDir)) {
    Write-Host "Membuat direktori instalasi..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $installDir | Out-Null
}

# Unduh executable
Write-Host "Mengunduh Lokio CLI..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $exeUrl -OutFile $exePath
} catch {
    Write-Host "Gagal mengunduh Lokio CLI: $_" -ForegroundColor Red
    exit 1
}

# Tambahkan ke PATH
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$installDir*") {
    Write-Host "Menambahkan Lokio ke PATH..." -ForegroundColor Yellow
    [Environment]::SetEnvironmentVariable(
        "Path",
        "$userPath;$installDir",
        "User"
    )
}

Write-Host "`n✨ Lokio CLI berhasil diinstal!" -ForegroundColor Green
Write-Host "Lokasi: $exePath" -ForegroundColor Gray
Write-Host "`nGunakan 'lokio' dari Command Prompt atau PowerShell" -ForegroundColor Cyan
Write-Host "Contoh: lokio --help`n" -ForegroundColor Yellow