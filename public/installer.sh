#!/bin/bash

set -e  # Hentikan eksekusi jika ada error

# URL unduhan
URL="https://github.com/any-source/lokio/releases/download/1.0.1/mac"
BINARY_NAME="lokio"
INSTALL_DIR="$HOME/.local/bin"

# Pesan selamat datang
echo "============================================="
echo " Selamat datang di Instalasi $BINARY_NAME! "
echo "============================================="
echo ""

# Pastikan direktori instalasi ada
mkdir -p "$INSTALL_DIR"

# Unduh file
echo "🔄 Mengunduh $BINARY_NAME dari $URL..."
curl -L -o "$BINARY_NAME" "$URL"

# Beri izin eksekusi
chmod +x "$BINARY_NAME"

# Pindahkan ke lokasi yang sesuai
echo "🚚 Memindahkan $BINARY_NAME ke $INSTALL_DIR..."
mv "$BINARY_NAME" "$INSTALL_DIR/"

# Tambahkan ~/.local/bin ke PATH jika belum ada
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
    echo "🔧 Menambahkan $INSTALL_DIR ke PATH..."
    echo "export PATH=\"$INSTALL_DIR:\$PATH\"" >> "$HOME/.bashrc"
    echo "export PATH=\"$INSTALL_DIR:\$PATH\"" >> "$HOME/.zshrc"
    source "$HOME/.bashrc"
    source "$HOME/.zshrc"
fi

# Verifikasi instalasi
if command -v $BINARY_NAME &> /dev/null; then
    echo "🎉 $BINARY_NAME berhasil diinstal!"
    echo "🛠️  Menjalankan $BINARY_NAME --help untuk melihat opsi yang tersedia..."
    $BINARY_NAME --help || echo "ℹ️  Tidak ada output bantuan."
else
    echo "❌ Gagal menginstal $BINARY_NAME. Silakan coba lagi atau hubungi dukungan."
    exit 1
fi

echo ""
echo "============================================="
echo " Terima kasih telah menggunakan $BINARY_NAME! "
echo "============================================="