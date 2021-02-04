# Quickly create project cli


## install

```sh
$ npm i -g yyds
```

## usage

```javascript
//init
$ yyds init [project]

//version
$ yyds -v

//help
$ yyds -h
```

## integration toolkit

```javascript
import { cp, rm, sed, log } from 'yyds'

//copy
cp(dir, outdir)

//delete
rm(dir)

//replace string
sed(grepString, newString, file)

//beautiful output
//color: hex(#ff3300) type: -i reverse color -u underline
log(text, [color,] [type])
```