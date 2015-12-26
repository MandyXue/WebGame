# web技术课程项目
小游戏+简单后端实现记分功能

## 配置

1. 安装nodejs

2. 安装express
	```bash
	$ npm install express -g
	$ npm install express-generator -g
	```
3. 安装ejs
	```bash
	$ npm install ejs
	```

4. 创建工程
	```bash
	$ express your_project_name
	```

5. 安装依赖
	```bash
	$ cd your_project_name
	$ npm install
	```

6. 配置Mysql数据库
	Table: record
	```
	+----------+-------------+-------+-----+
	| Field    | Type        | Null  | Key |
	+----------+-------------+-------+-----+
	| id       | int(11)     | NO    | PK  |
	| record   | int(11)     | NO    |     |
	| username | varchar(45) | YES   |     |
	+----------+-------------+-------+-----+
	```

7. 修改数据库信息
	1. 打开```conf/db.js```
	2. 配置password和database名称
8. 运行
	```bash
	$ npm start
	```


参考：[初识NodeJS服务端开发](http://www.tuicool.com/articles/JfqYN3I)