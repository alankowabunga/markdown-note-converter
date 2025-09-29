# 使用 Nginx 官方輕量映像
FROM nginx:alpine

# 將當前目錄的 index.html 複製到 Nginx 預設靜態目錄
COPY index.html /usr/share/nginx/html/index.html

# 對外開放 port 80
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]