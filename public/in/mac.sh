#!/bin/bash

set -e  # Hentikan eksekusi jika ada error

# URL unduhan
URL="https://github.com/any-source/lokio/releases/download/latest/mac"
BINARY_NAME="lokio"
INSTALL_DIR="$HOME/.local/bin"

# Pesan selamat datang
echo "============================================="
echo "$BINARY_NAME! Assistant"
echo "============================================="
echo ""

# Pastikan direktori instalasi ada
mkdir -p "$INSTALL_DIR"

# Unduh file
curl -L -o "$BINARY_NAME" "$URL"

# Beri izin eksekusi
chmod +x "$BINARY_NAME"

# Pindahkan ke lokasi yang sesuai
echo "🚚 Memindahkan $BINARY_NAME ke $INSTALL_DIR..."
mv "$BINARY_NAME" "$INSTALL_DIR/"

# Tambahkan ~/.local/bin ke PATH jika belum ada
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
    echo "🔧 Menambahkan $INSTALL_DIR ke PATH..."
    if [[ "$SHELL" == *"zsh"* ]]; then
        echo "export PATH=\"$INSTALL_DIR:\$PATH\"" >> "$HOME/.zshrc"
        source "$HOME/.zshrc"
    else
        echo "export PATH=\"$INSTALL_DIR:\$PATH\"" >> "$HOME/.bashrc"
        source "$HOME/.bashrc"
    fi
fi

# Verifikasi instalasi
if command -v $BINARY_NAME &> /dev/null; then
    echo "🎉 $BINARY_NAME Intall successfully!"
    echo "🛠️  Run $BINARY_NAME to show command line"
    $BINARY_NAME
else
    echo "❌ Failed to install $BINARY_NAME."
    exit 1
fi

echo ""
echo "============================================="
echo " Tahnks for using $BINARY_NAME! "
echo "============================================="