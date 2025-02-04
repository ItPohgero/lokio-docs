#!/usr/bin/bash

# Binary Installation Script
# Author: [Your Name]
# Version: 1.0.0
# Description: Automated binary download and installation utility

# Strict error handling
set -euo pipefail

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Logging function
log() {
    local level="$1"
    local message="$2"
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    
    case "$level" in
        "INFO")
            echo -e "${GREEN}[INFO]${NC} $timestamp - $message"
            ;;
        "WARN")
            echo -e "${YELLOW}[WARN]${NC} $timestamp - $message" >&2
            ;;
        "ERROR")
            echo -e "${RED}[ERROR]${NC} $timestamp - $message" >&2
            ;;
    esac
}

# Progress bar function
progress_bar() {
    local duration="$1"
    local columns=$(tput cols)
    local progress_width=$((columns - 20))

    for ((i=0; i<=100; i+=2)); do
        printf "\r["
        printf "%*s" "$((i * progress_width / 100))" | tr ' ' '='
        printf "%*s" "$((progress_width - i * progress_width / 100))" | tr ' ' ' '
        printf "] %3d%%" "$i"
        sleep "$duration"
    done
    echo
}

# Configuration
GITHUB_REPO="any-source/lokio"
VERSION="1.0.1"
BINARY_NAME="lokio"
BASE_URL="https://github.com/${GITHUB_REPO}/releases/download/${VERSION}"
DOWNLOAD_URL="${BASE_URL}/mac"

INSTALL_DIRS=(
    "/usr/local/bin"
    "$HOME/.local/bin"
)

SHELL_CONFIG_FILES=(
    "$HOME/.bashrc"
    "$HOME/.zshrc"
    "$HOME/.bash_profile"
)

# Validate system requirements
validate_system() {
    if [[ "$OSTYPE" != *"darwin"* ]]; then
        log "ERROR" "This script is designed for macOS only."
        exit 1
    }

    if ! command -v curl &> /dev/null; then
        log "ERROR" "curl is required but not installed."
        exit 1
    }
}

# Download binary with progress
download_binary() {
    log "INFO" "Downloading ${BINARY_NAME} binary (version ${VERSION})..."
    
    if ! curl -L -o "${BINARY_NAME}" -# "${DOWNLOAD_URL}"; then
        log "ERROR" "Failed to download binary from ${DOWNLOAD_URL}"
        exit 1
    fi
}

# Determine installation directory
select_install_directory() {
    for dir in "${INSTALL_DIRS[@]}"; do
        if [[ -w "$dir" ]]; then
            echo "$dir"
            return 0
        fi
    done
    
    log "ERROR" "No writable installation directory found."
    exit 1
}

# Install binary
install_binary() {
    local install_dir="$1"
    
    log "INFO" "Installing to ${install_dir}..."
    
    # Add progress visualization
    progress_bar 0.05
    
    if [[ "$install_dir" == "/usr/local/bin" ]]; then
        sudo mv "${BINARY_NAME}" "${install_dir}/"
    else
        mkdir -p "$install_dir"
        mv "${BINARY_NAME}" "${install_dir}/"
        
        # Update PATH in shell config files
        for config_file in "${SHELL_CONFIG_FILES[@]}"; do
            if [[ -f "$config_file" ]]; then
                if ! grep -q 'export PATH="$HOME/.local/bin:$PATH"' "$config_file"; then
                    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$config_file"
                    log "INFO" "Updated PATH in ${config_file}"
                fi
            fi
        done
    fi
    
    chmod +x "${install_dir}/${BINARY_NAME}"
}

# Verify installation
verify_installation() {
    if command -v "$BINARY_NAME" &> /dev/null; then
        log "INFO" "${BINARY_NAME} successfully installed!"
        "$BINARY_NAME" --help || log "WARN" "No help output available."
    else
        log "ERROR" "Installation of ${BINARY_NAME} failed."
        exit 1
    fi
}

# Main execution
main() {
    log "INFO" "Starting ${BINARY_NAME} installation process..."
    
    validate_system
    download_binary
    install_dir=$(select_install_directory)
    install_binary "$install_dir"
    verify_installation
    
    log "INFO" "Installation completed successfully! 🎉"
}

# Run main function
main