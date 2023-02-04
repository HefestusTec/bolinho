# from a raspberry pi 3b+ running Raspberry Pi OS (64-bit) 

# install dependencies
sudo apt-get update
# install chrome
sudo apt-get install -y chromium-browser

# install nodejs
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# install python3.10
sudo apt-get install -y python3.10

# install pip
sudo apt-get install -y python3-pip

# install python dependencies
sudo pip3 install -r requirements.txt

# install node dependencies
npm install
npm run installDep

# make the application autostart
sudo cp bolinho.desktop /etc/xdg/autostart/bolinho.desktop
