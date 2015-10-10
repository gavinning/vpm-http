// 处理get请求，主要用于安装，查找，预览等命令
var fs = require('fs');
var path = require('path');
var http = require('http');
var request = require('request');


/**
 * 下载
 * @param   {String}   url      下载地址
 * @param   {String}   filepath 写入地址
 * @param   {Function} fn       回调函数
 */
exports.download = function(url, filepath, fn){
    var output = fs.createWriteStream(filepath)
    request
        .get(url)
        .on('error', function(e) {
            fn(e)
        })
        .pipe(output)
        output.on('close', fn)
}


/**
 * 上传
 * @param   {String|Object}   url|options   上传接口|Options，参看request.api
 * @param   {String}          filepath      上传目标文件路径
 * @param   {Function}        fn            回调函数
 */
exports.upload = function(url, filepath, fn){
    // 提交请求
    try{
        fs.createReadStream(filepath).pipe(request.post(url, fn))
    }
    catch(e){ fn(e) }
}

// 返回查询的信息
exports.query = function(url, fn){
    request(url, fn)
}

exports.reg = function(url, data, fn){
    request.post({url: url, form: data}, fn)
}

exports.login = function(url, data, fn){
    request.post({url: url, form: data}, fn)
}
