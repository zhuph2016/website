[开始 下载nvm - nvm中文官网](https://nvm.uihtm.com/doc/download-nvm.html)

[使用nvm管理node多版本（安装、卸载nvm，配置环境变量，更换npm淘宝镜像）_node 版本管理-CSDN博客](https://blog.csdn.net/goods_yao/article/details/137854626)

[nvm-windows:一个针对Windows平台的Node.js版本管理工具，是用Go语言编写的。 - AtomGit | GitCode](https://gitcode.com/gh_mirrors/nv/nvm-windows/)

nvm-desktop

[Release NVM Desktop v4.1.2 · 1111mp/nvm-desktop](https://github.com/1111mp/nvm-desktop/releases/tag/v4.1.2)



Node

**NVM（Node Version Manager）** 是一款

[轻量级](https://so.csdn.net/so/search?q=%E8%BD%BB%E9%87%8F%E7%BA%A7&spm=1001.2101.3001.7020)Node.js版本管理工具，可在同一台设备上安装和切换多个Node.js版本，解决不同项目间的版本冲突问题。



<https://github.com/coreybutler/nvm-windows/releases>



1. 查找nvm安装目录：

nvm root  # 输出例如 D:\nvm

1. 编辑 settings.txt，添加：

node_mirror: <https://npmmirror.com/mirrors/node/>

npm_mirror: <https://npmmirror.com/mirrors/npm/>



npm config set prefix "D:\07ProgramFiles\nodejs\\node_global"

npm config set cache "D:\07ProgramFiles\nodejs\\node_cache"





npm

npm config set registry <https://registry.npm.aliyun.com/>

npm config set registry <https://registry.npm.taobao.org>



<https://blog.csdn.net/qq_48401062/article/details/149454996>

<https://blog.csdn.net/Nicolecocol/article/details/136788200>