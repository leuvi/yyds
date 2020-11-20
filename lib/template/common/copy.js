const { cp, log } = require('ldssite')

cp('dist/*.html', '../www.ludashi.com/www/')

log('拷贝成功', '-u')