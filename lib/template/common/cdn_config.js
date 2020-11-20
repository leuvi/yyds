const json = {
  oss: {
    region: 'oss-cn-qingdao',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: 'lds-file'
  },
  projectName: 'test',  // OSS上传对应的目录
  dir: './dist/static', // 本地需要上传的目录或文
  staticPath: '//cdn-file.ludashi.com/web/test'
};

module.exports = json;
