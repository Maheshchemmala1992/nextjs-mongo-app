#!/bin/bash

# Update system
apt update -y && apt upgrade -y

# Install dependencies
apt install -y git curl build-essential ufw nginx

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Allow Nginx traffic (optional)
ufw allow 'Nginx Full'

# PM2 startup config
pm2 startup systemd -u ubuntu --hp /home/ubuntu | tee /tmp/pm2-startup.sh
bash /tmp/pm2-startup.sh
