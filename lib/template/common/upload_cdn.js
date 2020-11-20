var config;
let chalk = require('chalk');
try {
  config = require('./cdn_config');
} catch (err) {
  console.log(
    chalk.red(
      '\n\n	👿 👿 👿  配置文件不存在\n\n'
    )
  );
  process.exit();
}
let OSS = require('ali-oss');
let fs = require('fs');
let client = new OSS(config.oss);
let async = require('async');

function findFiles(dir) {
  function walk(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) results = results.concat(walk(file));
      else results.push(file);
    });
    return results;
  }
  return walk(dir);
}

async function uploadFile(file) {
  let stream = fs.createReadStream(file);
  let size = fs.statSync(file).size;

  let fileName = file.replace('./dist', '');
  let result = await client.putStream('web/' + config.projectName + fileName, stream, {
    contentLength: size
  });
  return result;
}

const filelist = findFiles(config.dir);

async.mapLimit(
  filelist,
  1,
  async function(url) {
    const response = await uploadFile(url);
    console.log(response.url);
    return response.url;
  },
  (err, results) => {
    if (err) throw err;
    console.log(chalk.green('上传完成'));
  }
);
