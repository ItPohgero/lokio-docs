#!/bin/bash

set -e  # Hentikan eksekusi jika ada error

# URL unduhan
URL="https://github.com/any-source/lokio/releases/download/latest/mac"
BINARY_NAME="lokio"
INSTALL_DIR="$HOME/.local/bin"

# Fungsi untuk menampilkan pesan status
print_status() {
    echo -e "\n\033[1m==> $1\033[0m"
}

# Fungsi untuk menampilkan pesan sukses
print_success() {
    echo -e "\033[32m[✓] $1\033[0m"
}

# Fungsi untuk menampilkan pesan error
print_error() {
    echo -e "\033[31m[✗] $1\033[0m"
}

print_status "Installing $BINARY_NAME..."
# Pastikan direktori instalasi ada
mkdir -p "$INSTALL_DIR"

# Unduh file
curl -L -o "$BINARY_NAME" "$URL" --progress-bar

# Beri izin eksekusi
chmod +x "$BINARY_NAME"

# Pindahkan ke lokasi yang sesuai
mv "$BINARY_NAME" "$INSTALL_DIR/"

# Tambahkan ~/.local/bin ke PATH jika belum ada
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
    if [[ "$SHELL" == *"zsh"* ]]; then
        echo "export PATH=\"$INSTALL_DIR:\$PATH\"" >> "$HOME/.zshrc"
        source "$HOME/.zshrc"
    else
        echo "export PATH=\"$INSTALL_DIR:\$PATH\"" >> "$HOME/.bashrc"
        source "$HOME/.bashrc"
    fi
    print_success "$INSTALL_DIR successfully added to path"
else
    print_success "$INSTALL_DIR already in path"
fi

# Verifikasi instalasi
if command -v $BINARY_NAME &> /dev/null; then
    print_success "$BINARY_NAME successfully installed!"
    $BINARY_NAME
else
    print_error "❌ Failed to install $BINARY_NAME."
    exit 1
fi