server {
  listen       80;
  server_name  plat-test.nhf.cn;
  access_log  logs/plat-test.nhf.cn.log  main;
 # root         /data/wwwwebroot/test/plat;
 # index index.html;
  # Load configuration files for the default server block.
  #include /etc/nginx/default.d/*.conf;

  rewrite ^(.*) https://$server_name$1 permanent;

  location / {
      root   /data/wwwwebroot/test/plat;
      index  index.html index.htm;
      client_max_body_size    200m;
      
  }

 location  /api-hosp/ {

    proxy_pass http://api-test.nhf.cn/wjj-hosp-webmanager/;
 }


   location  /api-follow/ {

    proxy_pass http://api-test.nhf.cn/wjj-hosp-follow/;
 }  

 location  /api-longhua/ {
proxy_pass http://api-test.nhf.cn/wjj-longhua-project/;
 }
  location /api-xk/ {
       proxy_pass http://api-test.nhf.cn/wjj-web-manager-xk/;
  }

  location /api-rep/ {
       proxy_pass http://api-test.nhf.cn/wjj-report-system/;
  }
 

  location /api-mid/ {
proxy_pass http://api-test.nhf.cn/wjj-goods-region/;

  }

  location /api-goods/ {
      proxy_pass http://api-test.nhf.cn/wjj-goods-center/;

  }

  location /api-purchase/ {

proxy_pass http://api-test.nhf.cn/wjj-service-package/;
  }

 location /api/ {
  #rewrite ^/api/(.*)$ /$1 break;
  proxy_pass http://api-test.nhf.cn/wjj-web-manager/;
 }

  location /api-saas/ {
       proxy_pass https://api-test.nhf.cn/wjj-saas-system/;
  }

   location  /api-system/ {

    proxy_pass https://api-test.nhf.cn/wjj-com-system/;
 }

  location /api-base/ {
      proxy_pass https://api-test.nhf.cn/;
  }


  error_page 404 /404.html;
      location = /40x.html {
  }

  error_page 500 502 503 504 /50x.html;
      location = /50x.html {
  }
}


  # HTTPS server
  #
  server {
      listen       443 ssl http2;
      server_name  plat-test.nhf.cn;
        access_log  logs/plat-test.nhf.cn.log  main;

      ssl_certificate      cert/nhf.cn.pem;
      ssl_certificate_key  cert/nhf.cn.key;

      ssl_session_cache    shared:SSL:1m;
      ssl_session_timeout  5m;

      ssl_ciphers  HIGH:!aNULL:!MD5;
      ssl_prefer_server_ciphers  on;
      add_header Access-Control-Allow-Origin *;
      
  location / {
      root   /data/wwwwebroot/test/plat;
      index  index.html index.htm;
client_max_body_size    200m;
  }

  location /api-xk/ {
       proxy_pass https://api-test.nhf.cn/wjj-web-manager-xk/;
  }


  location /api-rep/ {
       proxy_pass https://api-test.nhf.cn/wjj-report-system/;
  }



  location  /api-mid/ {
      proxy_pass https://api-test.nhf.cn/wjj-goods-region/;
      
  }  

  location /api-goods/ {
      proxy_pass https://api-test.nhf.cn/wjj-goods-center/;

  }
  


     location /api/ {
  #rewrite ^/api/(.*)$ /$1 break;
  proxy_pass https://api-test.nhf.cn/wjj-web-manager/;
 }

  location /api-saas/ {
       proxy_pass https://api-test.nhf.cn/wjj-saas-system/;
  }
  

  location /api-purchase/ {

      proxy_pass https://api-test.nhf.cn/wjj-service-package/;
  }


  location  /api-longhua/ {
      proxy_pass https://api-test.nhf.cn/wjj-longhua-project/;
 }


  location  /api-hosp/ {

   proxy_pass  https://api-test.nhf.cn/wjj-hosp-webmanager/;
 }    


   location  /api-follow/ {

    proxy_pass https://api-test.nhf.cn/wjj-hosp-follow/;
 }  

    location  /api-system/ {

    proxy_pass https://api-test.nhf.cn/wjj-com-system/;
 }

  location /api-base/ {
      proxy_pass https://api-test.nhf.cn/;
  }
}