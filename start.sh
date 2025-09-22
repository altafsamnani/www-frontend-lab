#!/bin/sh
set -e

echo "Starting Vue frontend on Railway..."

# Set default port if not provided
PORT=${PORT:-8080}
echo "Using port: $PORT"

# Create nginx config with correct port
sed "s/PORT_PLACEHOLDER/$PORT/g" /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Test nginx config
echo "Testing Nginx configuration..."
nginx -t

# Start nginx
echo "Starting Nginx on port $PORT..."
exec nginx -g "daemon off;"