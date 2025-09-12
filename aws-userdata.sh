#!/bin/bash
set -e

echo "🚀 Starting EC2 setup for Next.js + MongoDB app..."

# Update system
sudo apt update -y && sudo apt upgrade -y

# Install Git
sudo apt install -y git

# Install Node.js 18 & npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Install PM2 globally
sudo npm install -g pm2
echo "✅ PM2 version: $(pm2 -v)"

# Create app directory
APP_DIR="/home/ubuntu/nextjs-mongo-app"
if [ ! -d "$APP_DIR" ]; then
  mkdir -p "$APP_DIR"
  echo "✅ Created app directory at $APP_DIR"
fi

# Allow PM2 to restart on reboot
pm2 startup systemd -u ubuntu --hp /home/ubuntu
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo "✅ EC2 setup completed. Ready for GitHub Actions deployment."

