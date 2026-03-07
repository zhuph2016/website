​	软件开发的工具众多，给人的感觉总是“工欲善其事，必先利其器”。除此之外软件等相关工具的资源寻找、安装、使用等相关疑难杂症总是特别耗时的，私以为这些工作是不需要思考的，同时也想整理一下这些资源，以备需要的时候同样的坑再踩一次。

​	软件开发的工具众多，给人的感觉总是“工欲善其事，必先利其器”。除此之外软件等相关工具的资源寻找、安装、使用等相关疑难杂症总是特别耗时的，私以为这些工作是不需要思考的，同时也想整理一下这些资源，以备需要的时候同样的坑再踩一次。

# **电脑设置**

## **护眼配置**

电脑管家 #CCE8CF RGB(204, 232, 207)

## **开机启动**

```shell
shell:startup
```

## **系统监控**

<https://github.com/zhongyang219/TrafficMonitor>

# 开发工具

## SublimeText

[Sublime Text下载地址](http://www.sublimetext.com/3)

## JavaDecompiler

[Java Decompiler 下载地址](http://java-decompiler.github.io/) 

NATAPP 内网穿透

[NATAPP-内网穿透工具下载](https://natapp.cn/)

## SwaggerEditor

 [Swagger Editor](https://editor.swagger.io/)

## YAPi

 [YApi 接口管理平台](https://hellosean1025.github.io/yapi/) 

# 网站资源

## 镜像工具

 [mirrors工具下载](https://mirrors.dtops.cc/) 

## slf4j

 [SLF4J Binary files下载](https://www.slf4j.org/download.html)

## Apache

 [Apache Commons](https://commons.apache.org/) 

## 菜鸟教程

 [菜鸟教程](https://www.runoob.com/)  

# Windows

## 1. JDK

系统变量→新建JAVA_HOME变量 

```bash
JAVA_HOME  C:\Program Files\Java\jdk1.8.0_121
```

系统变量→寻找Path变量→编辑

```
Path  %JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;
```

系统变量→新建[CLASS](https://product.pconline.com.cn/itbk/digital/ydcc/1107/2482198.html)PATH变量（1.5之后不需要）

```
CLASSPATH  .;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar  
```

安装配置检查

cmd 命令行窗口执行

```
java -version
```

## 2. Git

```bash
-- 用户名标识 (实际也可以填写您的github仓库的名称)
git config --global user.name "zhuph"
-- 邮箱标识 (可以填写github仓库的邮箱)
git config --global user.email "1038190357@qq.com"  
-- 创建秘钥
ssh-keygen -t rsa
-- 生成文件路径
C:\Users\Zhuph\.ssh\id_rsa.pub
```

[Git安装教程](https://www.cnblogs.com/hdlan/p/14395189.html)

[Git连接github仓库](https://www.cnblogs.com/hdlan/p/14395681.html)

#### **账户信息**

### 查看git的全局配置

git config --global --list

### 仓库配置

### 配置用户名

git config --global user.name "zhuph"

### 配置邮箱 

git config --global user.email "zhuph@qq.com.cn"

##生存秘钥对
ssh-keygen -t rsa 

##公钥
C:\Users\zhuph\.ssh\id_rsa.pub

#### **代码统计**

git log --author="zhuph"  --since=2022-04-13 --until=2025-10-25 --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -

## 3. Maven

高级系统设置–>环境变量->编辑变量Path

```
-- 新建变量
MAVEN_HOME C:\Program Files\apache-maven-3.5.4

-- path添加安装路径
%MAVEN_HOME%\bin

-- 然后win+R运行cmd，输入
mvn -version
```

[Maven安装和配置&详细步骤](https://blog.csdn.net/weixin_56800176/article/details/127949796)

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

<!--
 | This is the configuration file for Maven. It can be specified at two levels:
 |
 |  1. User Level. This settings.xml file provides configuration for a single user,
 |                 and is normally provided in ${user.home}/.m2/settings.xml.
 |
 |                 NOTE: This location can be overridden with the CLI option:
 |
 |                 -s /path/to/user/settings.xml
 |
 |  2. Global Level. This settings.xml file provides configuration for all Maven
 |                 users on a machine (assuming they're all using the same Maven
 |                 installation). It's normally provided in
 |                 ${maven.conf}/settings.xml.
 |
 |                 NOTE: This location can be overridden with the CLI option:
 |
 |                 -gs /path/to/global/settings.xml
 |
 | The sections in this sample file are intended to give you a running start at
 | getting the most out of your Maven installation. Where appropriate, the default
 | values (values used when the setting is not specified) are provided.
 |
 |-->
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
  <!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
  <localRepository>D:\03Repository</localRepository>

  <!-- interactiveMode
   | This will determine whether maven prompts you when it needs input. If set to false,
   | maven will use a sensible default value, perhaps based on some other setting, for
   | the parameter in question.
   |
   | Default: true
  <interactiveMode>true</interactiveMode>
  -->

  <!-- offline
   | Determines whether maven should attempt to connect to the network when executing a build.
   | This will have an effect on artifact downloads, artifact deployment, and others.
   |
   | Default: false
  <offline>false</offline>
  -->

  <!-- pluginGroups
   | This is a list of additional group identifiers that will be searched when resolving plugins by their prefix, i.e.
   | when invoking a command line like "mvn prefix:goal". Maven will automatically add the group identifiers
   | "org.apache.maven.plugins" and "org.codehaus.mojo" if these are not already contained in the list.
   |-->
  <pluginGroups>
    <!-- pluginGroup
     | Specifies a further group identifier to use for plugin lookup.
    <pluginGroup>com.your.plugins</pluginGroup>
    -->
  </pluginGroups>

  <!-- proxies
   | This is a list of proxies which can be used on this machine to connect to the network.
   | Unless otherwise specified (by system property or command-line switch), the first proxy
   | specification in this list marked as active will be used.
   |-->
  <proxies>
    <!-- proxy
     | Specification for one proxy, to be used in connecting to the network.
     |
    <proxy>
      <id>optional</id>
      <active>true</active>
      <protocol>http</protocol>
      <username>proxyuser</username>
      <password>proxypass</password>
      <host>proxy.host.net</host>
      <port>80</port>
      <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy>
    -->
  </proxies>

  <!-- servers
   | This is a list of authentication profiles, keyed by the server-id used within the system.
   | Authentication profiles can be used whenever maven must make a connection to a remote server.
   |-->
  <servers>
    <!-- server
     | Specifies the authentication information to use when connecting to a particular server, identified by
     | a unique name within the system (referred to by the 'id' attribute below).
     |
     | NOTE: You should either specify username/password OR privateKey/passphrase, since these pairings are
     |       used together.
     |
    <server>
      <id>deploymentRepo</id>
      <username>repouser</username>
      <password>repopwd</password>
    </server>
    -->

    <!-- Another sample, using keys to authenticate.
    <server>
      <id>siteServer</id>
      <privateKey>/path/to/private/key</privateKey>
      <passphrase>optional; leave empty if not used.</passphrase>
    </server>
    -->
  </servers>

  <!-- mirrors
   | This is a list of mirrors to be used in downloading artifacts from remote repositories.
   |
   | It works like this: a POM may declare a repository to use in resolving certain artifacts.
   | However, this repository may have problems with heavy traffic at times, so people have mirrored
   | it to several places.
   |
   | That repository definition will have a unique id, so we can create a mirror reference for that
   | repository, to be used as an alternate download site. The mirror site will be the preferred
   | server for that repository.
   |-->
  <mirrors>
    <!-- mirror
     | Specifies a repository mirror site to use instead of a given repository. The repository that
     | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
     | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
     |
    <mirror>
      <id>mirrorId</id>
      <mirrorOf>repositoryId</mirrorOf>
      <name>Human Readable Name for this Mirror.</name>
      <url>http://my.repository.com/repo/path</url>
    </mirror>
     -->
	<mirror>
      <id>mirrorId</id>
      <mirrorOf>central</mirrorOf>
      <name>Human Readable Name for this Mirror.</name>
      <url>http://central.maven.org/maven2/</url>
    </mirror>
    <mirror>
      <id>mirrorId</id>
      <mirrorOf>repositoryId</mirrorOf>
      <name>Human Readable Name for this Mirror.</name>
      <url>http://my.repository.com/repo/path</url>
    </mirror>
	<mirror>
		 <id>alimaven</id>
		<name>aliyun maven</name>
		<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
		<mirrorOf>central</mirrorOf>
	</mirror>
	<mirror>


	<!-- 这里使用的是阿里的远程maven镜像，目前国内大多数都使用它 -->
	<mirror>
		 <id>alimaven</id>
		<name>aliyun maven</name>
		<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
		<mirrorOf>central</mirrorOf>
	</mirror>
	
  </mirrors>

  <!-- profiles
   | This is a list of profiles which can be activated in a variety of ways, and which can modify
   | the build process. Profiles provided in the settings.xml are intended to provide local machine-
   | specific paths and repository locations which allow the build to work in the local environment.
   |
   | For example, if you have an integration testing plugin - like cactus - that needs to know where
   | your Tomcat instance is installed, you can provide a variable here such that the variable is
   | dereferenced during the build process to configure the cactus plugin.
   |
   | As noted above, profiles can be activated in a variety of ways. One way - the activeProfiles
   | section of this document (settings.xml) - will be discussed later. Another way essentially
   | relies on the detection of a system property, either matching a particular value for the property,
   | or merely testing its existence. Profiles can also be activated by JDK version prefix, where a
   | value of '1.4' might activate a profile when the build is executed on a JDK version of '1.4.2_07'.
   | Finally, the list of active profiles can be specified directly from the command line.
   |
   | NOTE: For profiles defined in the settings.xml, you are restricted to specifying only artifact
   |       repositories, plugin repositories, and free-form properties to be used as configuration
   |       variables for plugins in the POM.
   |
   |-->
  <profiles>
    <!-- profile
     | Specifies a set of introductions to the build process, to be activated using one or more of the
     | mechanisms described above. For inheritance purposes, and to activate profiles via <activatedProfiles/>
     | or the command line, profiles have to have an ID that is unique.
     |
     | An encouraged best practice for profile identification is to use a consistent naming convention
     | for profiles, such as 'env-dev', 'env-test', 'env-production', 'user-jdcasey', 'user-brett', etc.
     | This will make it more intuitive to understand what the set of introduced profiles is attempting
     | to accomplish, particularly when you only have a list of profile id's for debug.
     |
     | This profile example uses the JDK version to trigger activation, and provides a JDK-specific repo.
    <profile>
      <id>jdk-1.4</id>

      <activation>
        <jdk>1.4</jdk>
      </activation>

      <repositories>
        <repository>
          <id>jdk14</id>
          <name>Repository for JDK 1.4 builds</name>
          <url>http://www.myhost.com/maven/jdk14</url>
          <layout>default</layout>
          <snapshotPolicy>always</snapshotPolicy>
        </repository>
      </repositories>
    </profile>
    -->

    <!--
     | Here is another profile, activated by the system property 'target-env' with a value of 'dev',
     | which provides a specific path to the Tomcat instance. To use this, your plugin configuration
     | might hypothetically look like:
     |
     | ...
     | <plugin>
     |   <groupId>org.myco.myplugins</groupId>
     |   <artifactId>myplugin</artifactId>
     |
     |   <configuration>
     |     <tomcatLocation>${tomcatPath}</tomcatLocation>
     |   </configuration>
     | </plugin>
     | ...
     |
     | NOTE: If you just wanted to inject this configuration whenever someone set 'target-env' to
     |       anything, you could just leave off the <value/> inside the activation-property.
     |
    <profile>
      <id>env-dev</id>

      <activation>
        <property>
          <name>target-env</name>
          <value>dev</value>
        </property>
      </activation>

      <properties>
        <tomcatPath>/path/to/tomcat/instance</tomcatPath>
      </properties>
    </profile>
    -->
  </profiles>

  <!-- activeProfiles
   | List of profiles that are active for all builds.
   |
  <activeProfiles>
    <activeProfile>alwaysActiveProfile</activeProfile>
    <activeProfile>anotherAlwaysActiveProfile</activeProfile>
  </activeProfiles>
  -->
</settings>
```

## 4. MySQL

**1. 下载**

[MySQL下载地址](https://dev.mysql.com/) 

[mysql数据库安装指南](https://zhuanlan.zhihu.com/p/37152572)

**2. 配置环境变量**

系统变量→寻找Path变量→编辑

```
C:\Program Files\MySQL\MySQL Server 8.0\bin


```

**3. 连接客户端问题**

mysql8 之前的版本中加密规则是mysql_native_password,而在mysql8之后,加密规则是caching_sha2_password

![1680268168139](../01%20%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7/ToolNote.assets/1680268168139.png)

修改加密规则

```
1、登录Mysql：

mysql -u root -p

2、修改账户密码加密规则并更新用户密码

// 修改加密规则（可以直接复制）
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
// 更新一下用户的密码（可以直接复制）
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

3、刷新权限并重置密码

// 刷新权限（可以直接复制）
FLUSH PRIVILEGES;

4、重置密码

//此处请自定义密码，红色的root就是博主自定义的密码
alter user 'root'@'localhost' identified by 'root';

此处将密码改为root


```



1.编译安装  2. rpm redcat package management 3. yum 4. 压缩包



[NavicatPremium17的安装和破解 · GitBook](https://gitbook.yumesakura.com/LNMP%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E5%92%8C%E7%BD%91%E7%AB%99%E7%A8%8B%E5%BA%8F%E9%83%A8%E7%BD%B2%E4%BB%A5%E5%8F%8A%E5%A4%87%E4%BB%BD%E6%95%B0%E6%8D%AE%E5%BA%93/%E6%AD%A5%E9%AA%A44%EF%BC%9A%E6%95%B0%E6%8D%AE%E5%BA%93%E5%A4%87%E4%BB%BD%E5%92%8C%E6%81%A2%E5%A4%8D/NavicatPremium17%E7%9A%84%E5%AE%89%E8%A3%85%E5%92%8C%E7%A0%B4%E8%A7%A3.html)



IDEA 

<https://github.com/dromara/fast-request/issues/61>

[IntelliJ IDEA 2025.3 最新破解教程 免费激活码 永久激活工具 一键激活2099 亲测 | ide激活网](https://blog.idejihuo.com/jetbrains/intellij-idea-2025-3-latest-crack-tutorial-free-activation-code-permanent-activation-tool-2099.html)

## 5. Node安装

**1. 修改npm配置路径**

**查看当前npm的配置环境**

npm config ls

**修改路径 module、cache** 

mkdir E:\nodejs\node_modules\npm\node_global_modules 
mkdir E:\nodejs\node_modules\npm\node_cache

**2. 修改路径**

module对应prefix，cache对应cache

D:\03Repository\node_modules\npm\node_cache

npm config set prefix "D:\03Repository\node_modules\npm\node_global_modules" 
npm config set cache "D:\03Repository\node_modules\npm\node_cache"

## 6. Oracle

管理口令 确认口令 zhuph123



![1642242052212](../01%20%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7/ToolNote.assets/1642242052212.png)

![1642242233517](../01%20%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7/ToolNote.assets/1642242233517.png)

https://localhost:1158/em

## **Fiddler**

[Fiddler Everywhere for Windows](https://www.telerik.com/download/fiddler/fiddler-everywhere-windows)

[Wireshark、Burpsuite、Charles三大抓包神器抓取https明文-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1875746)

Xmind

[XMind ZEN v10.3.1绿色版.7z - 蓝奏云](https://lcllfj.lanzoui.com/iA9dtuzvn6f)

Google离线版

<https://www.google.cn/chrome/next-steps.html?extra=stablechannel&platform=win64&standalone=1&statcb=0&installdataindex=empty&defaultbrowser=0>

RESP

[redis/RedisDesktopManager](https://github.com/redis/RedisDesktopManager)

[Redis Insight](https://redis.io/insight/)

HBuiler

[HBuilderX-高效极客技巧](https://www.dcloud.io/hbuilderx.html)

EditPlus

用户名：Vovan 学习码：3AG46-JJ48E-CEACC-8E6EW-ECUAW

[EditPlus](https://www.lanzoux.com/b0f1hq5fa)

### 镜像

<https://github.moeyy.xyz/>

<https://www.cnblogs.com/ting1/p/18356265>

[ 清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)

<https://mirrors.tuna.tsinghua.edu.cn/github-release/>

https://redis.io/insight/

# MacOS

# Linux

## 1. VMware

![1645236143481](../01%20%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7/ToolNote.assets/1645236143481.png)

![1645236474469](../01%20%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7/ToolNote.assets/1645236474469.png)

![1645236663553](../01%20%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7/ToolNote.assets/1645236663553.png)

  2





# 笔记杂烩

[Java程序猿搬砖笔记(六)](https://blog.csdn.net/a1275302036/article/details/120455724)

# 资源检索

https://www.zysou.com/

# 开发工具



https://www.slf4j.org/

https://commons.apache.org/

https://editor.swagger.io/

https://hellosean1025.github.io/yapi/

https://www.runoob.com/soap/soap-tutorial.html



https://www.bejson.com/devtools/properties2yaml/

https://nginx.org/

# 常用工具

https://jsoncrack.com/editor

https://www.processon.com/



https://cron.ciding.cc/

https://www.geeksforgeeks.org/

https://base64.us/

https://www.sojson.com/

https://www.toolscat.com/



https://www.hutool.cn/docs/#/

https://www.yonsum.com/#/

https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-search.html#java-rest-high-search-response-aggs

https://www.zhuayuya.com/

https://www.oschina.net/

https://www.cnblogs.com/

https://clickhouse.com/docs/zh/sql-reference/statements

https://www.nowcoder.com/

https://help.jeecg.com/java/

https://daily-blog.chlinlearn.top/

https://www.cnblogs.com/Can-daydayup/p/18579652

https://gitee.com/xiaonuobase/snowy

https://v2.aichatoszx.com/

https://cli.im/url

https://mvnrepository.com/

https://mybatis.net.cn/java-api.html

https://mybatis.net.cn/java-api.html#google_vignette

https://bgithub.xyz/

https://www.ej-technologies.com/jprofiler/download

https://www.edrawsoft.cn/

https://mp.weixin.qq.com/s/XUHnLCbq7mDWhOc9imTVzg

https://pdai.tech/

https://www.luogu.com.cn/

https://bbs.nansin.top/

https://juejin.cn/

https://cron.ciding.cc/

https://yiyan.baidu.com/

https://www.ruanyifeng.com/blog/

https://github.com/lenve/vhr

https://leetcode.cn/

https://leetcode.cn/circle/article/48kq9d/

https://www.cnblogs.com/makemylife

https://www.xuxueli.com/xxl-job/#%E3%80%8A%E5%88%86%E5%B8%83%E5%BC%8F%E4%BB%BB%E5%8A%A1%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0XXL-JOB%E3%80%8B

https://time.geekbang.org/column/intro/100020801

https://github.com/binghe001/BingheGuide

https://www.xzgzs.com/3365.html?btwaf=38241893

http://jets.idejihuo.com/v2/

https://www.cnblogs.com/ting1/p/18356265

http://yun.java1234.com/

https://daily-blog.chlinlearn.top/product

# IDEA

https://plugins.jetbrains.com/

https://appsoftea.com/zh/jetbrains-license-server/

https://www.likecs.com/show-308251194.html

https://blog.idejihuo.com/jetbrains/intellij-idea-2023-3-3-permanent-activation-code-cracking-tutorial-permanent-cracking.html

https://blog.csdn.net/lianghecai52171314/article/details/105637251

https://www.cnblogs.com/lhongsen/p/16555746.html

# 虚拟机工具

## virtualbox

https://www.virtualbox.org/wiki/Download_Old_Builds

## vmware

https://www.zhihu.com/question/485959084/answer/3576929956

## MAC

https://blog.csdn.net/weixin_43299649/article/details/82881567

https://blog.csdn.net/u011415782/article/details/78505422

http://t.zoukankan.com/feiquan-p-10768246.html

https://binghe.blog.csdn.net/article/details/103140592?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-3-103140592-blog-104032360.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-3-103140592-blog-104032360.pc_relevant_default&utm_relevant_index=5

# 开源镜像

https://developer.aliyun.com/mirror/

https://mirrors.huaweicloud.com/home

https://archive.apache.org/dist/tomcat/tomcat-connectors/native/1.2.30/binaries/

https://maven.aliyun.com/mvn/view

https://central.sonatype.com/?smo=true

https://www.webjars.org/

https://mvnrepository.com/

# 相关网站

https://cloud.tencent.com/developer/user/1212940

https://cloud.tencent.com/developer/article/1980144

https://cloud.tencent.com/developer/column

https://ibaotu.com/?spm=sketchchina

[IT营_众猿腾IT营专注全栈IT教育](https://www.itying.com/)

# 支付宝开发

https://auth.alipay.com/login/ant_sso_index.htm?goto=https%3A%2F%2Fopenhome.alipay.com%2Fplatform%2FappDaily.htm%3Ftab%3Daccount

https://blog.csdn.net/luomingyi2016/article/details/78947605

# 微信开发

https://pay.weixin.qq.com/doc/v2?from=https%3A%2F%2Fpay.weixin.qq.com%2Fwiki%2Fdoc%2Fapi%2Findex.html

# 开源项目学习

https://gitee.com/xiaonuobase/snowy#https://gitee.com/link?target=https%3A%2F%2Fgitcode.com%2Fxiaonuobase%2FSnowy

https://github.com/

https://github.com/trending/java?since=monthly

https://github.com/MisterBooo/LeetCodeAnimation

https://listen1.github.io/listen1/

# Java 全栈知识体系

https://pdai.tech/

