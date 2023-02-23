# from a raspberry pi 3b+ running Raspberry Pi OS (64-bit) 

# install dependencies
sudo apt-get update
sudo apt-get upgrade

# Install pip Packages
pip install -r requirements.txt

# enable chromium hardware acceleration
sudo apt-get install -y libgl1-mesa-dri libgl1-mesa-glx libgbm-dev

# make the application autostart
sudo cp bolinho.desktop /etc/xdg/autostart/bolinho.desktop
