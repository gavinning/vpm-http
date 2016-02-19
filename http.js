// 处理get请求，主要用于安装，查找，预览等命令
var fs = require('fs');
var path = require('path');
var http = require('http');
var request = require('request');
var Class = require('aimee-class');
var App = module.exports = Class.create();

App.include({

    __init: function(opt){
        opt = opt || {};

        !opt.proxy ?
            this.request = request :
            this.request = request.defaults({'proxy': opt.proxy});
    },

    /**
     * 下载
     * @param   {String}   url      下载地址
     * @param   {String}   filepath 写入地址
     * @param   {Function} fn       回调函数
     */
    download: function(url, filepath, fn){
        var output = fs.createWriteStream(filepath)
        this.request
            .get(url)
            .on('error', function(e) {
                fn(e)
            })
            .pipe(output)
            output.on('close', fn)
    },

    /**
     * 上传
     * @param   {String|Object}   url|options   上传接口|Options，参看request.api
     * @param   {String}          filepath      上传目标文件路径
     * @param   {Function}        fn            回调函数
     */
    upload: function(url, filepath, fn){
        // 提交请求
        try{
            fs.createReadStream(filepath).pipe(request.post(url, fn))
        }
        catch(e){ fn(e) }
    },

    // 返回查询的信息
    query: function(url, fn){
        this.request(url, fn)
    },

    reg: function(url, data, fn){
        this.request.post({url: url, form: data}, fn)
    },

    login: function(url, data, fn){
        this.request.post({url: url, form: data}, fn)
    }
})
