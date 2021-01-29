server {
	listen 80;
	listen [::]:80;

	root /home/nickbagley/hw02/bagleysite.com;

	index index.html;

	server_name hw02.bagleysite.com;

	location / {
		try_files $uri $uri/ =404;
	}
}
