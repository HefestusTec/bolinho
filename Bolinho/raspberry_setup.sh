# from a raspberry pi 3b+ running Raspberry Pi OS (64-bit) 

# install dependencies
sudo apt-get update
sudo apt-get upgrade
sudo apt install python3-pip

# Install pip Packages
pip install -r requirements.txt

# make the application autostart
sudo cp bolinho.desktop /etc/xdg/autostart/bolinho.desktop
