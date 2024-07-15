
### 常见问题

#### 日志路径

修改logback-spring.xml下的LOG_HOME的value值

#### 配置数据库

application.yml中

#### Druid连接池配置

* application.yml中配置druid
* 参考链接：https://blog.csdn.net/nothingavenger/article/details/114119585
* 监控地址：http://localhost:8009/druid/index.html

#### mysql主键id过长

https://blog.csdn.net/qq_46728644/article/details/120772577

#### yml不起作用

需要maven clean一下

#### 注意实体字段最好是String类型

实体字段最好是String类型，mybatis-plus的update的时候，null的不更新

#### 打包步骤

maven clean -> maven package

https://blog.csdn.net/weixin_42822484/article/details/107893586

#### 配置文件上传大小

application.yml中multipart下

#### 静态资源路径配置

https://blog.csdn.net/cylcjsg/article/details/128102776?

#### 跨域配置

见CorsConfig.java





