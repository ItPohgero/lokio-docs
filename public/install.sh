#!/usr/bin/env bash
set -euo pipefail

# Tentukan direktori instalasi
install_dir="$HOME/.lokio"
bin_dir="$install_dir/bin"
mkdir -p "$bin_dir" || {
    echo "error: Gagal membuat direktori $bin_dir"
    exit 1
}

# Tentukan platform
platform=$(uname -ms)
case $platform in
    'Darwin x86_64') target=darwin-x64 ;;
    'Darwin arm64') target=darwin-aarch64 ;;
    'Linux aarch64' | 'Linux arm64') target=linux-aarch64 ;;
    'Linux x86_64' | *) target=linux-x64 ;;
esac

# Periksa jika berjalan di Rosetta pada Mac
if [[ $target == "darwin-x64" && $(sysctl -n sysctl.proc_translated 2>/dev/null) == "1" ]]; then
    target=darwin-aarch64
    echo "Info: Deteksi Rosetta 2, menggunakan $target build."
fi

# Unduh file
github_repo="https://github.com/any-source/lokio"
download_url="$github_repo/releases/latest/download/lokio-$target.zip"
exe="$bin_dir/lokio"

echo "Lokio downloaded for $target..."
curl --fail --location --progress-bar --output "$bin_dir/lokio.zip" "$download_url" || {
    echo "error: Failed to download Lokio"
    exit 1
}

# Ekstrak file
cd "$bin_dir"
unzip -o lokio.zip || {
    echo "error: Failed to extract lokio.zip"
    rm -f lokio.zip
    exit 1
}

# Cari file yang diekstrak dan ubah namanya
extracted_exe=$(find . -type f -name "lokio-*" -not -name "*.zip")
if [[ -n "$extracted_exe" ]]; then
    mv "$extracted_exe" lokio || {
        echo "error: Failed to change lokio name"
        exit 1
    }
else
    echo "error: Cannot find Lokio execution files"
    exit 1
fi

# Berikan izin eksekusi
chmod +x lokio || {
    echo "error: Failed to give permission to execute"
    exit 1
}

# Hapus file zip setelah ekstraksi sukses
rm -f lokio.zip

# Verifikasi instalasi
if [[ ! -x "$exe" ]]; then
    echo "error: Failing installation, file cannot be executed"
    exit 1
fi

# Tentukan file konfigurasi shell
shell_config=""
if [[ -n "${ZSH_VERSION:-}" ]]; then
    shell_config="$HOME/.zshrc"
elif [[ -n "${BASH_VERSION:-}" ]]; then
    shell_config="$HOME/.bashrc"
else
    shell_config="$HOME/.profile"
fi

# Tambahkan ke PATH jika belum ada
if [[ -f "$shell_config" && ! $(grep -qF "export PATH=\"$bin_dir:\$PATH\"" "$shell_config") ]]; then
    echo -e "\n# Added by the installer lokio" >> "$shell_config"
    echo "export PATH=\"$bin_dir:\$PATH\"" >> "$shell_config"
    echo "Lokio has been added to path on $shell_config"
fi

# Terapkan perubahan PATH langsung di sesi saat ini
export PATH="$bin_dir:$PATH"

# Muat ulang konfigurasi shell dengan aman
set +u
if [[ -f "$shell_config" ]]; then
    source "$shell_config" 2>/dev/null || true
fi
set -u

# Cek apakah `lokio` sekarang bisa langsung dijalankan
if command -v lokio &> /dev/null; then
    echo "✅ Lokio installation was successful!You can directly use 'lokio'"
else
    echo "⚠️ Installation is successful, but Lokio has not been recognized.Try running:"
    echo "   source $shell_config  (or restart terminal)"
fi
