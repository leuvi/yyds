# 快速开发脚手架


## 安装

```sh
$ npm i -g yyds
```

## 使用

```javascript
//初始化
$ yyds init [project]

//版本信息
$ yyds -v

//帮助
$ yyds -h
```

## Node环境集成工具包

```javascript
import { cp, rm, sed, log } from 'yyds'

//文件拷贝
cp(dir, outdir)

//文件删除
rm(dir)

//文件内容替换
sed(grepString, newString, file)

//命令行美化输出 
//color: hex格式(#ff3300) type: -i 反转色 -u 下划线
log(text, [color,] [type])
```