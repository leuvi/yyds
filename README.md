# 鲁大师前端项目脚手架

## 安装

```sh
$ npm install -g ldssite
```

## 使用

```javascript
//初始化
$ ldssite init [project]

//版本信息
$ ldssite -v

//帮助
$ ldssite -h
```

## Node环境集成工具包

```javascript
import { cp, rm, sed, log } from 'ldssite'

//文件拷贝 cp('dist/*.html', '../www.ludashi.com/www')
cp(dir, outdir)

//文件删除
rm(dir)

//文件内容替换
sed(grepString, newString, file)

//命令行美化输出 
//color: hex格式(#ff3300) type: -i 反转色 -u 下划线
log(text, [color,] [type])
```