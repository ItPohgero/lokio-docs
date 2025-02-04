# win.ps1 - Script instalasi untuk Windows

# URL unduhan
$URL = "https://github.com/any-source/lokio/releases/download/latest/windows.exe"
$BINARY_NAME = "lokio.exe"
$INSTALL_DIR = "$env:USERPROFILE\AppData\Local\bin"

# Fungsi untuk menampilkan pesan status
function Print-Status {
    param ([string]$message)
    Write-Host "==> $message" -ForegroundColor Cyan
}

# Fungsi untuk menampilkan pesan sukses
function Print-Success {
    param ([string]$message)
    Write-Host "[✓] $message" -ForegroundColor Green
}

# Fungsi untuk menampilkan pesan error
function Print-Error {
    param ([string]$message)
    Write-Host "[✗] $message" -ForegroundColor Red
}

Print-Status "Installing $BINARY_NAME..."

# Pastikan direktori instalasi ada
if (-Not (Test-Path $INSTALL_DIR)) {
    New-Item -ItemType Directory -Path $INSTALL_DIR | Out-Null
    Print-Success "Install directory created: $INSTALL_DIR"
} else {
    Print-Success "Install directory already exists: $INSTALL_DIR"
}

# Unduh file
Print-Status "Downloading $BINARY_NAME..."
Invoke-WebRequest -Uri $URL -OutFile "$INSTALL_DIR\$BINARY_NAME"
Print-Success "$BINARY_NAME downloaded successfully."

# Tambahkan direktori instalasi ke PATH jika belum ada
Print-Status "Checking PATH..."
$currentPath = [Environment]::GetEnvironmentVariable("PATH", [EnvironmentVariableTarget]::User)
if (-Not ($currentPath -split ";" -contains $INSTALL_DIR)) {
    [Environment]::SetEnvironmentVariable("PATH", "$currentPath;$INSTALL_DIR", [EnvironmentVariableTarget]::User)
    Print-Success "$INSTALL_DIR added to PATH."
} else {
    Print-Success "$INSTALL_DIR is already in PATH."
}

# Verifikasi instalasi
Print-Status "Verifying installation..."
if (Get-Command $BINARY_NAME -ErrorAction SilentlyContinue) {
    Print-Success "$BINARY_NAME successfully installed!"
    & "$INSTALL_DIR\$BINARY_NAME"
} else {
    Print-Error "Failed to install $BINARY_NAME."
    exit 1
}