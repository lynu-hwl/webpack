// webpack 是node写出来的，所以配置文件要用node写法
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode:'development', //模式。默认两种，production development
    entry:'./src/index.js', //入口
    output:{ 
        filename:'bundle.js', //打包后的文件名加上8位的hash戳
        path:path.join(__dirname,'build'), //路径必须是一个绝对路径
    },
    module:{
        rules:[
            {
                /**
                 * 从右向左执行，从下向上执行，css-loader解决‘@imoirt’这样的引入，style-loader是把css问价插入到html中
                 */
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader, //把css文件分离出来，在html中以link标签的方式引入
                    'css-loader'
                ]
            }
        ]   
    },
    plugins:[ // 数组 放着所有的插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'index.css'
        })
    ],
    devServer:{ //开发服务器配置
        port:8080,
        progress:true, //进度条
        contentBase:'./build',
        compress:true //GZIP压缩
    } 
}