# TODO: change GROUP to Orange Pi user group
echo 'SUBSYSTEM=="usb", MODE="0660", GROUP="Poleto"' > /etc/udev/rules.d/00-usb-permissions.rules
udevadm control --reload-rules
