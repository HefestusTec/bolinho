#!/bin/bash

# Define paths and names
APP_NAME="Bolinho"
RELATIVE_PATH="$(dirname "$0")"
START_SCRIPT_PATH="$(dirname "$0")/start.sh"
LOGO_PATH="$(dirname "$0")/src/web/build/logo192.png"  # Assuming the logo is in the same directory as setup.sh
DESKTOP_ENTRY_PATH="$HOME/.local/share/applications/Bolinho.desktop"
DESKTOP_SHORTCUT_DIR="$HOME/Desktop"

# Create the .desktop file
echo "[Desktop Entry]" > "$DESKTOP_ENTRY_PATH"
echo "Version=1.0" >> "$DESKTOP_ENTRY_PATH"
echo "Type=Application" >> "$DESKTOP_ENTRY_PATH"
echo "Name=$APP_NAME" >> "$DESKTOP_ENTRY_PATH"
echo "Exec=$START_SCRIPT_PATH" >> "$DESKTOP_ENTRY_PATH"
echo "Icon=$LOGO_PATH" >> "$DESKTOP_ENTRY_PATH"
echo "Terminal=true" >> "$DESKTOP_ENTRY_PATH"

# Make it executable
chmod +x "$DESKTOP_ENTRY_PATH"

# Copy desktop entry to Desktop
cp "$DESKTOP_ENTRY_PATH" "$RELATIVE_PATH/"

echo "Instalação completa. Bolinho agora está acessivel no menu."
