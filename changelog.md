### v2.0.0
新增代理支持，除``upload``接口走直连外其他接口均可走代理
```
var HTTP = require('vpm-http')
var http = HTTP.instance({proxy: 'http://proxy.ilinco.com'})
```
