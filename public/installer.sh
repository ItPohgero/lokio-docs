#!/bin/bash

set -e  # Hentikan eksekusi jika ada error

# URL unduhan
URL="https://github.com/any-source/lokio/releases/download/1.0.1/mac"
BINARY_NAME="lokio"
INSTALL_DIR="/usr/local/bin"
LOCAL_DIR="$HOME/.local/bin"

# Unduh file
echo "Mengunduh $BINARY_NAME dari $URL..."
curl -L -o "$BINARY_NAME" "$URL"

# Beri izin eksekusi
chmod +x "$BINARY_NAME"

# Pindahkan ke lokasi yang sesuai
if [ -w "$INSTALL_DIR" ]; then
    echo "Memindahkan $BINARY_NAME ke $INSTALL_DIR..."
    sudo mv "$BINARY_NAME" "$INSTALL_DIR/"
elif [ -d "$LOCAL_DIR" ]; then
    echo "Memindahkan $BINARY_NAME ke $LOCAL_DIR..."
    mv "$BINARY_NAME" "$LOCAL_DIR/"
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"
    source "$HOME/.zshrc"
else
    echo "Tidak dapat memindahkan $BINARY_NAME. Silakan pindahkan secara manual."
    exit 1
fi

# Verifikasi instalasi
if command -v $BINARY_NAME &> /dev/null; then
    echo "$BINARY_NAME berhasil diinstal!"
    $BINARY_NAME --help || echo "Tidak ada output bantuan."
else
    echo "Gagal menginstal $BINARY_NAME."
    exit 1
fi
