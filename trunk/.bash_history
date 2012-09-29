./vmware-install.pl
rpm -ivh http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm
ps -pf |grep nginx
ps -df |grep nginx
service nginx restart
rpm -ivh http://download.Fedora.RedHat.com/pub/epel/6/x86_64/epel-release-6-5.noarch.rpm
rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
rpm -ivh http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm
rpm -ivh http://mirror.iprimus.com.au/epel/epel-release-6-7.noarch.rpm
rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
gedit /etc/yum.repos.d/remi.repo
yum -y install nginx mysql-server php-fpm php-cli php-pdo php-mysql php-mcrypt php-mbstring php-gd php-tidy php-xml php-xmlrpc php-pear php-pecl-memcache php-eaccelerator
vi /etc/php-fpm.conf
cd /etc/php-fpm.d/
ls
vi www.conf
chown -R nginx:nginx /var/lib/php/session
cd /var/lib/php
ls
mkdir session
ls
chown -R nginx:nginx /var/lib/php/session
chown -R nginx:nginx /var/www/
chmod -R 775 /var/www/
service nginx start
service php-fpm start
cd /etc/nginx
ls
vi nginx.conf
cd conf.d
ls
vi default.conf
service php-fpm start
service nginx start
service nginx restart
service php-fpm start
vi default.conf
cd //
cd /etc/nginx
vi nginx.conf
service nginx restart
service php-fpm start
cd /etc/php-fpm.d/
vi www.conf
service php-fpm start
service mysqld start
chkconfig nginx on
chkconfig php-fpm on
chkconfig mysqld on
yum install redis
yum install php-redis
chkconfig redis on
service redis start
yum install mongo-10gen mongo-10gen-server
vi /etc/yum.repos.d/10gen.repo
yum install mongo-10gen mongo-10gen-server
vi /etc/yum.repos.d/10gen.repo
cd /etc/yum.repos.d
ls
vi nginx.repo
ls
vi 10gen.repo
yum install mongo-10gen mongo-10gen-server
vi 10gen.repo
rpm http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/RPMS/mongo-10gen-2.2.0-mongodb_1.x86_64.rpm
rpm -ivh http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/RPMS/mongo-10gen-2.2.0-mongodb_1.x86_64.rpm
yum install mongo-10gen mongo-10gen-server
cd /etc/yum.repos.d
vi 10gen.repo
yum install mongo-10gen mongo-10gen-server
service mongod start
chkconfig mongod on
cd ..
ls
vi hosts
cd nginx
ls
cd conf.d
ls
vi default.conf
cp default.conf dinghaochi.com.conf
ls
vi dinghaochi.com.conf
service nginx restart
vi dinghaochi.com.conf
service nginx restart
chmod -R 777 /var/log/nginx
service nginx restart
vi dinghaochi.com.conf
service nginx restart

service nginx restart
cd /var/www
cd ..
chmod -R 777 www
cd /etc/nginx/conf.d
ls
vi dinghaochi.com.conf
service nginx restart
yum install gphpedit 
yum install gphpedit
vi dinghaochi.com.conf
service nginx restart
