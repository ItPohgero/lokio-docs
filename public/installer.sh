#!/usr/bin/env bash

# Strict mode
set -euo pipefail

# Configuration
GITHUB_REPO="any-source/lokio"
VERSION="1.0.1"
BINARY_NAME="lokio"
BASE_URL="https://github.com/${GITHUB_REPO}/releases/download/${VERSION}"
DOWNLOAD_URL="${BASE_URL}/mac"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Logging function
log() {
    local level="$1"
    local message="$2"
    local timestamp
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    
    case "$level" in
        "info")
            echo -e "${GREEN}[INFO]${NC} $timestamp - $message"
            ;;
        "warn")
            echo -e "${YELLOW}[WARN]${NC} $timestamp - $message" >&2
            ;;
        "error")
            echo -e "${RED}[ERROR]${NC} $timestamp - $message" >&2
            ;;
    esac
}

# Check system compatibility
check_system() {
    if [[ "$OSTYPE" != *"darwin"* ]]; then
        log "error" "This installation script is for macOS only."
        exit 1
    }
}

# Download binary
download_binary() {
    log "info" "Downloading $BINARY_NAME binary..."
    if ! curl -L -o "$BINARY_NAME" "$DOWNLOAD_URL"; then
        log "error" "Failed to download binary"
        exit 1
    fi
}

# Determine installation directory
get_install_directory() {
    local install_dirs=("/usr/local/bin" "$HOME/.local/bin")
    
    for dir in "${install_dirs[@]}"; do
        if [[ -w "$dir" ]]; then
            echo "$dir"
            return 0
        fi
    done
    
    log "error" "No writable installation directory found"
    exit 1
}

# Install binary
install_binary() {
    local install_dir="$1"
    
    # Make binary executable
    chmod +x "$BINARY_NAME"
    
    # Move to installation directory
    if [[ "$install_dir" == "/usr/local/bin" ]]; then
        sudo mv "$BINARY_NAME" "$install_dir/"
    else
        mkdir -p "$install_dir"
        mv "$BINARY_NAME" "$install_dir/"
        
        # Update PATH in shell configuration
        local shell_configs=(
            "$HOME/.bashrc"
            "$HOME/.zshrc"
            "$HOME/.bash_profile"
        )
        
        for config in "${shell_configs[@]}"; do
            if [[ -f "$config" ]]; then
                if ! grep -q 'export PATH="$HOME/.local/bin:$PATH"' "$config"; then
                    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$config"
                    log "info" "Updated PATH in $config"
                fi
            fi
        done
    fi
}

# Verify installation
verify_installation() {
    if command -v "$BINARY_NAME" &> /dev/null; then
        log "info" "$BINARY_NAME successfully installed!"
        "$BINARY_NAME" --help
    else
        log "error" "Installation failed"
        exit 1
    fi
}

# Main installation process
main() {
    log "info" "Starting $BINARY_NAME installation"
    
    check_system
    download_binary
    install_dir=$(get_install_directory)
    install_binary "$install_dir"
    verify_installation
    
    log "info" "Installation completed successfully! 🎉"
}

# Execute main function
main