# Ensure script stops on error
$ErrorActionPreference = "Stop"

# Define installation directory
$installDir = Join-Path $env:USERPROFILE ".lokio"
$binDir = Join-Path $installDir "bin"

# Create installation directory
try {
    New-Item -ItemType Directory -Force -Path $binDir | Out-Null
} catch {
    Write-Error "Failed to create directory $binDir"
    exit 1
}

# Determine platform
$arch = if ([Environment]::Is64BitOperatingSystem) { "x64" } else { "x86" }
$target = "windows-$arch"

# Download URLs
$githubRepo = "https://github.com/any-source/lokio"
$downloadUrl = "$githubRepo/releases/latest/download/lokio-$target.zip"
$exePath = Join-Path $binDir "lokio.exe"

# Download file
Write-Host "Downloading Lokio for $target..."
try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile (Join-Path $binDir "lokio.zip") -UseBasicParsing
} catch {
    Write-Error "Failed to download Lokio"
    exit 1
}

# Extract file
try {
    Expand-Archive -Path (Join-Path $binDir "lokio.zip") -DestinationPath $binDir -Force
    
    # Find and rename extracted file
    $extractedExe = Get-ChildItem -Path $binDir -Filter "lokio-*" -Exclude "*.zip" | Select-Object -First 1
    if ($extractedExe) {
        Move-Item -Path $extractedExe.FullName -Destination $exePath -Force
    } else {
        Write-Error "Cannot find Lokio execution files"
        exit 1
    }
} catch {
    Write-Error "Failed to extract lokio.zip"
    Remove-Item -Path (Join-Path $binDir "lokio.zip") -Force -ErrorAction SilentlyContinue
    exit 1
}

# Clean up zip file
Remove-Item -Path (Join-Path $binDir "lokio.zip") -Force

# Verify installation
if (-not (Test-Path $exePath)) {
    Write-Error "Installation failed, executable not found"
    exit 1
}

# Add to PATH
$userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if (-not $userPath.Contains($binDir)) {
    $newPath = "$binDir;$userPath"
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
    $env:PATH = "$binDir;$env:PATH"
    Write-Host "Added Lokio to PATH in User environment variables"
}

# Verify lokio can be executed
try {
    $null = Get-Command "lokio.exe" -ErrorAction Stop
    Write-Host "✅ Lokio installation was successful! You can directly use 'lokio'"
} catch {
    Write-Host "⚠️ Installation is successful, but Lokio needs a terminal restart to be recognized."
    Write-Host "   Please restart your terminal to use Lokio."
}