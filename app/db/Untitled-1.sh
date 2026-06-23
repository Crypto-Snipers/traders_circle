
root@srv1582965:/home/ubuntu/traders_circle# curl -I https://traderscircle.tradecartel.in/_next/static/chunks/79f5d97f199cd79d.css
HTTP/1.1 404 Not Found
Server: nginx/1.24.0 (Ubuntu)
Date: Mon, 22 Jun 2026 14:08:51 GMT
Content-Type: text/plain; charset=utf-8
Connection: keep-alive
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
Vary: Accept-Encoding\

server {
    server_name traderscircle.tradecartel.in www.traderscircle.tradecartel.in;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    location /_next/static/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;

        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(ico|css|js|gif|jpe?g|png|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;

        expires 30d;
        add_header Cache-Control "public";
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/traderscircle.tradecartel.in/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/traderscircle.tradecartel.in/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = traderscircle.tradecartel.in) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name traderscircle.tradecartel.in www.traderscircle.tradecartel.in;
    return 404; # managed by Certbot
}

sudo certbot --nginx -d traderscircle.tradecartel.in -d www.traderscircle.tradecartel.in

sudo ln -s /etc/nginx/sites-available/traderscircle.tradecartel.in /etc/nginx/sites-enabled/

pm2 start npm --name traderscircle -- start -- --port 3001\




bAxmU2YZs7PI2AgF

mongodb+srv://visheshpurkait_db_user:bAxmU2YZs7PI2AgF@cluster0.azkb8od.mongodb.net/?appName=Cluster0