// webpack 是node写出来的，所以配置文件要用node写法
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development', //模式。默认两种，production development
    entry:'./src/index.js', //入口
    output:{ 
        filename:'bundle.[hash:8].js', //打包后的文件名加上8位的hash戳
        path:path.join(__dirname,'build'), //路径必须是一个绝对路径
    },
    plugins:[ // 数组 放着所有的插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:{
                removeAttributeQuotes:true, // 去掉双引号
                collapseWhitespace:true //html压缩
            },
            hash:true //html引用的资源加上hash戳
        })
    ],
    devServer:{ //开发服务器配置
        port:8080,
        progress:true, //进度条
        contentBase:'./build',
        compress:true //GZIP压缩
    } 
}