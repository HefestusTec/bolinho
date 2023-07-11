# For an Orange pi 5 running Orangepi5_1.1.6_ubuntu_jammy_desktop_xfce_linux5.10.110 
# OS image available at directly https://drive.google.com/file/d/1KbPiXUC3WJOzpK-zrzqBk9Li1ky8qWQr/view?usp=drive_link
# or here https://drive.google.com/drive/folders/1i5zQOg1GIA4_VNGikFl2nPM0Y2MBw2M0 

# install dependencies
sudo apt-get update
sudo apt-get upgrade
sudo apt install python3-pip

# Install pip Packages
pip install -r requirements.txt

# Build an executable
python -m eel src/main.py src/web/build --onefile --name Bolinho --icon ./src/web/build/favicon.ico

# make the application autostart
sudo cp bolinho.desktop /etc/xdg/autostart/bolinho.desktop
