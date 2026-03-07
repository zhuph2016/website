<https://www.minio.org.cn/docs/minio/kubernetes/upstream/index.html>

<https://blog.csdn.net/zxf347085420/article/details/152075063>

<https://www.cnblogs.com/whaleX/p/19144972>



<https://www.minio.org.cn/download.shtml#/windows>

<https://dl.min.io/aistor/minio/release/windows-amd64/minio>

<https://dl.minio.org.cn/server/minio/release/windows-amd64/minio.exe>

<https://dl.min.io/server/minio/release/windows-amd64/minio.exe>

minio.RELEASE.2025-04-22T22-12-26Z server D:\13ProgramFiles\minio\data --console-address ":9001"

minio.exe server D:\13ProgramFiles\minio\data --console-address ":9001"



<http://localhost:9000/blog/avatar.jpg>



```
D:\13ProgramFiles\minio>minio.RELEASE.2025-04-22T22-12-26Z server D:\13ProgramFiles\minio\data --console-address ":9001"
INFO: Formatting 1st pool, 1 set(s), 1 drives per set.
INFO: WARNING: Host local has more than 0 drives of set. A host failure will result in data becoming unavailable.
MinIO Object Storage Server
Copyright: 2015-2025 MinIO, Inc.
License: GNU AGPLv3 - https://www.gnu.org/licenses/agpl-3.0.html
Version: RELEASE.2025-04-22T22-12-26Z (go1.24.2 windows/amd64)

API: http://192.168.0.103:9000  http://172.25.240.1:9000  http://192.168.244.1:9000  http://192.168.29.1:9000  http://127.0.0.1:9000
   RootUser: minioadmin
   RootPass: minioadmin

WebUI: http://192.168.0.103:9001 http://172.25.240.1:9001 http://192.168.244.1:9001 http://192.168.29.1:9001 http://127.0.0.1:9001
   RootUser: minioadmin
   RootPass: minioadmin

CLI: https://min.io/docs/minio/linux/reference/minio-mc.html#quickstart
   $ mc alias set 'myminio' 'http://192.168.0.103:9000' 'minioadmin' 'minioadmin'

Docs: https://docs.min.io
WARN: Detected default credentials 'minioadmin:minioadmin', we recommend that you change these values with 'MINIO_ROOT_USER' and 'MINIO_ROOT_PASSWORD' environment variables
INFO:
+---------------------------------------------------------------------------------------+
| You are running an older version of MinIO released 4 months before the latest release |
| Update: Run `mc admin update ALIAS`                                                   |
+---------------------------------------------------------------------------------------+
```

<http://localhost:9001/login>

当我们对接第三方服务要用到对象存储时，这些服务往往都是支持AWS S3的。比如说一个直播的回放功能，需要对象存储来存储回放的视频，由于MinIO兼容AWS S3的大多数API，我们可以直接拿它当AWS S3来使用。

<https://s3browser.com/>