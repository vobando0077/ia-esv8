#!/bin/bash
V8_BUILD_DIR="$HOME/v8/v8/out.gn/x64.release"
TARGET_DIR="/workspaces/ia-esv8"
echo "[*] Juntando los bártulos de V8..."
cp "$V8_BUILD_DIR/d8" "$TARGET_DIR/" 2>/dev/null && chmod +x "$TARGET_DIR/d8" && echo "[+] d8 copiado con éxito."
cp "$V8_BUILD_DIR/icudtl.dat" "$TARGET_DIR/" 2>/dev/null && echo "[+] icudtl.dat copiado con éxito."
cp "$V8_BUILD_DIR/snapshot_blob.bin" "$TARGET_DIR/" 2>/dev/null && echo "[+] snapshot_blob.bin copiado con éxito."
echo "[*] ¡Listo, mi nek! Todos los archivos ya están en su cantón."
