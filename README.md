# web技术课程项目
卡牌小游戏+简单后端实现记分功能

## 配置

### 命令行配置

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

8. 给id添加自增
	```
	alter table record modify id integer auto_increment;
	```

7. 修改数据库信息
	1. 打开```conf/db.js```
	2. 配置password和database名称

8. 运行
	```bash
	$ npm start
	```

### Webstorm配置

1. Configuration -> Javascript File: ```bin/www```

2. Browser/Live Edit: ```http://localhost:3000```

参考：[初识NodeJS服务端开发](http://www.tuicool.com/articles/JfqYN3I)

## 游戏说明

1. 此卡牌游戏一共有8关，每关会提供9组相同的卡片，目的是将配对的卡片连续翻出来。
![snapshot1](https://github.com/MandyXue/WebGame/blob/master/public/images/snapshot1.png?raw=true)
2. 刚开始会提供8秒的时间看卡片，然后卡片全部反向，游戏开始。在游戏中，如果连续两下翻出一模一样的两张卡片，卡片会保持正面，否则卡片会再次反向，直至所有卡片都被翻到正面。
![snapshot2](https://github.com/MandyXue/WebGame/blob/master/public/images/snapshot2.png?raw=true)
3. 并且游戏包含了后端与前端，后端实现了两个简单的功能，第一个是添加记录，即游戏结束时弹窗会要求玩家输入姓名，保存游戏记录。
![snapshot3](https://github.com/MandyXue/WebGame/blob/master/public/images/snapshot3.png?raw=true)
4. 后端的第二个功能就是查看游戏的排行榜，玩家可以随时点击右上角的button来查看游戏的前三名。
![snapshot4](https://github.com/MandyXue/WebGame/blob/master/public/images/snapshot4.png?raw=true)

## 代码说明

### 代码架构

1. 代码整体架构如下，由express框架生成：
```
WebGame/
├── bin/
│   └── www
│
├── conf/
│   └── db.js
│
├── dao/
|   ├── recordSqlMapping.js
│   └── recordDao.js
|
├── log/
│   └── ...
|
├── node_modules/
│   └── ...
|
├── public/
│   ├── images
|   |  └── ...
|   |
│   ├── javascripts
|   |  ├── bootstrap.min.js
|   |  ├── common.js
|   |  ├── main.js
│   |  └── jquery-1.11.3.min.js
|   |
│   ├── stylesheets
|   |  ├── bootstrap.min.css
|   |  └── style.css
|   |
|   └── favicon.ico
|
├── routes/
|   ├── index.js
│   └── records.js
|
├── util/
│   └── util.js
|
├── views/
│   └── index.html
|
├── package.json
|
└── app.js
```

2. app.js
	项目入口，相当于php中的 index.php 或java ee项目中的 index.html

3. node_modules
	存放项目的依赖库

4. package.json
	项目依赖配置及开发者信息

5. public
	静态文件如 css,js,images

6. routes
	路由文件

7. Views
	页面文件，这里使用的是ejs方式，即用普通的html文件即可

### 代码说明

1. common.js
	主要实现了一些基本函数，核心函数如下：

	1. 加载图片
	```js
	function img_preload(img, callback) {
	    var onload_img = 0;
	    var tmp_img = [];
	    for (var i = 0, imgnum = img.length; i < imgnum; i++) {
	        tmp_img[i] = new Image();
	        tmp_img[i].src = img[i];
	        if (tmp_img[i].complete) {
	            onload_img++;
	        } else {
	            tmp_img[i].onload = function() {
	                onload_img++;
	            }
	        }
	    }
	    var et = setInterval(
	        function() {
	            if (onload_img == img.length) { // 定时器,判断图片完全加载后调用callback
	                clearInterval(et);
	                callback();
	            }
	        }, 200);
	}
	```

	2. 打乱数组元素，用于随机放牌
	```js
	function shuffle(arr){
	    var tmparr = [];
	    var num = arr.length;
	    for(var i=0; i<num; i++){
	        tmparr.push(arr.splice(Math.random()*arr.length,1).pop());
	    }
	    return tmparr;
	}
	```

	3. 其他函数参看注释即可

2. main.js
	实现了游戏的主要功能，例如开始游戏、随机抽取扑克牌、翻转扑克牌动画、计时等，核心函数如下：
	1. 检查翻牌成功与否
	```js
	check_turn = function(key){
        is_lock = 1;

        if(leveldata[first]['cardno']==leveldata[key]['cardno']){ // 配对成功
            matchnum ++;

            if(matchnum==cardnum){
                var et = setTimeout(function(){
                    message('success', levelup);
                }, 225);
            }

            first = -1;
            is_lock = 0;

        }else{ // 配对失败,将翻开的牌翻转

            var et = setTimeout(function(){
                turn_animate(first);
                leveldata[first]['turn'] = 0;
                turn_animate(key);
                leveldata[key]['turn'] = 0;

                first = -1;

                if(is_over==0){
                    is_lock = 0;
                }

            }, 300);
        }
    }
	```

	2. 游戏动画
	```js
	message = function(type, callback){

        is_lock = 1;

        var message = document.getElementById('message');
        var processed = 0;
        var opacity = 0;
        var soundtime = {
            'start': 1500,
            'success': 4000,
            'fail': 6000,
            'clear': 4000
        };

        disp('message','show');
        setClass(message,'message_' + type);
        setOpacity(message, opacity);
        setPosition(message, 'left', 0);
        setPosition(message, 'top', 390);

        var et = setInterval(function(){
            var message_left = getPosition(message,'left');
            processed = processed + 25;

            if(processed>=500 && processed<=750){
                opacity = opacity+10;
                setPosition(message, 'left', message_left + 30);
                setOpacity(message, opacity);
            }else if(processed>=soundtime[type] && processed<=soundtime[type]+250){
                opacity = opacity-10;
                setPosition(message, 'left', message_left + 35);
                setOpacity(message, opacity);
            }else if(processed>soundtime[type]+250){
                disp('message','hide');
                clearInterval(et);
                if(typeof(callback)!='undefined'){
                    callback();
                }
            }

        },25);
    }
	```

3. style.css
	主要实现了一些样式，用CSS3实现了翻转动画，例如：
	```css
	.flip.out {
	    -webkit-transform: rotateY(-90deg) scale(.9);
	    -webkit-animation-name: flipouttoleft;
	    -webkit-animation-duration: 175ms;
	    -moz-transform: rotateY(-90deg) scale(.9);
	    -moz-animation-name: flipouttoleft;
	    -moz-animation-duration: 175ms;
	}
	```

====
Copyright © Mandy Xue


