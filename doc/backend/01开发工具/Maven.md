#### **安装包下载**

<https://maven.apache.org/download.cgi>

#### **环境变量**

```
## 配置环境变量
MAVEN_HOME C:\Program Files\apache-maven-3.6.3
Path %MAVEN_HOME%\bin

## 测试安装
mvn -v
```

**阿里云的镜像库**

```
<mirrors>
     <mirror>
          <id>aliyunmaven</id>
          <mirrorOf>*</mirrorOf>
          <name>阿里云公共仓库</name>
          <url>https://maven.aliyun.com/repository/public</url>
     </mirror>
</mirrors>
```

