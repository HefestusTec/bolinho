# from a raspberry pi 3b+ running Raspberry Pi OS (64-bit) 

# install dependencies
sudo apt-get update

# install chrome
sudo apt-get install -y chromium-browser

# install npm
sudo apt-get install -y npm

# enable chromium hardware acceleration
sudo apt-get install -y libgl1-mesa-dri libgl1-mesa-glx libgbm-dev

# make the application autostart
sudo cp bolinho.desktop /etc/xdg/autostart/bolinho.desktop
