# For an Orange pi 5 running Orangepi5_1.1.6_ubuntu_jammy_desktop_xfce_linux5.10.110 
# OS image available at directly https://drive.google.com/file/d/1KbPiXUC3WJOzpK-zrzqBk9Li1ky8qWQr/view?usp=drive_link
# or here https://drive.google.com/drive/folders/1i5zQOg1GIA4_VNGikFl2nPM0Y2MBw2M0 

# install dependencies
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt install python3-pip -y

# Install pip Packages
pip install -r src/requirements.txt
