#!/usr/bin/env bash
set -eo pipefail

# Create installation directory and ensure it exists
install_dir="$HOME/.lokio"
bin_dir="$install_dir/bin"
mkdir -p "$bin_dir" || {
    echo "error: Failed to create directory $bin_dir"
    exit 1
}

# Download the correct version based on architecture
platform=$(uname -ms)
case $platform in
'Darwin x86_64')
    target=darwin-x64
    ;;
'Darwin arm64')
    target=darwin-aarch64
    ;;
'Linux aarch64' | 'Linux arm64')
    target=linux-aarch64
    ;;
'Linux x86_64' | *)
    target=linux-x64
    ;;
esac

# Check if running in Rosetta on Mac
if [[ $target = darwin-x64 ]]; then
    if [[ $(sysctl -n sysctl.proc_translated 2>/dev/null) = 1 ]]; then
        target=darwin-aarch64
        echo "Info: Your shell is running in Rosetta 2. Using $target build."
    fi
fi

# Download URL
github_repo="https://github.com/any-source/lokio"
download_url="$github_repo/releases/latest/download/lokio-$target.zip"
exe="$bin_dir/lokio"

# Download with verification
echo "Downloading lokio for $target..."
curl --fail --location --progress-bar --output "$bin_dir/lokio.zip" "$download_url" || {
    echo "error: Failed to download lokio"
    exit 1
}

# Extract with verification
cd "$bin_dir"
unzip -o lokio.zip || {
    echo "error: Failed to extract lokio.zip"
    rm -f lokio.zip
    exit 1
}

# Find the extracted executable and rename it
extracted_exe=$(find . -type f -name "lokio-*" -not -name "*.zip")
if [ -n "$extracted_exe" ]; then
    mv "$extracted_exe" lokio || {
        echo "error: Failed to rename lokio executable"
        exit 1
    }
else
    echo "error: Could not find extracted lokio executable"
    exit 1
fi

# Set permissions
chmod +x lokio || {
    echo "error: Failed to set permissions on lokio executable"
    exit 1
}

# Clean up
rm -f lokio.zip

# Verify installation
if [ -x "$exe" ]; then
    echo "Successfully installed lokio to $exe"
    
    # Detect current shell and set appropriate config file
    shell_config="$HOME/.profile"  # Default fallback
    profile_config="$HOME/.profile"  # Default fallback

    # Check for ZSH
    if [ -n "${ZSH_VERSION:-}" ]; then
        shell_config="$HOME/.zshrc"
        profile_config="$HOME/.zprofile"
    # Check for Bash
    elif [ -n "${BASH_VERSION:-}" ]; then
        shell_config="$HOME/.bashrc"
        profile_config="$HOME/.bash_profile"
    fi
    
    # Function to add PATH to a config file
    add_path_to_config() {
        local config_file="$1"
        if [ -f "$config_file" ]; then
            if ! grep -q "export PATH=\"$bin_dir:\$PATH\"" "$config_file"; then
                echo -e "\n# Added by lokio installer" >> "$config_file"
                echo "export PATH=\"$bin_dir:\$PATH\"" >> "$config_file"
                echo "Added lokio to PATH in $config_file"
            fi
        else
            echo "# Added by lokio installer" > "$config_file"
            echo "export PATH=\"$bin_dir:\$PATH\"" >> "$config_file"
            echo "Created and added lokio to PATH in $config_file"
        fi
    }
    
    # Add PATH to both shell config and profile
    add_path_to_config "$shell_config"
    if [ "$shell_config" != "$profile_config" ]; then
        add_path_to_config "$profile_config"
    fi
    
    # Make lokio immediately available in current session
    export PATH="$bin_dir:$PATH"
    echo "Lokio is now available in your current session"
    
    # Source the shell config file in the current session
    case "$SHELL" in
        */zsh)
            source "$HOME/.zshrc" 2>/dev/null || true
            ;;
        */bash)
            source "$HOME/.bashrc" 2>/dev/null || true
            ;;
    esac
    
    # Verify the installation
    if "$exe" -v 2>/dev/null; then
        echo "Lokio installation verified successfully"
    else
        echo "lokio is installed but you need to restart your terminal or run:"
        echo "   source $shell_config"
    fi
else
    echo "error: Installation verification failed"
    exit 1
fi