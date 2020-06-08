const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 1) cleanWebpackPlugin
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 2) copyWebpackPlugin
// const CopyWebpackPlugin=require('copy-webpack-plugin');
// 3) bannerPlugin       内置
// const WebPack = require('webpack');

module.exports = {
    mode:'development',
    entry:{ 
        index:'./src/index',
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    devtool:'cheap-module-eval-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
        }),
        // new CleanWebpackPlugin(),
        // new CopyWebpackPlugin([
        //     {
        //         from:'./public',
        //         to:__dirname+'/dist'
        //     }
        // ]),
        // new WebPack.BannerPlugin('胡文林')
    ],
    resolve:{ // 解析 
        modules:[path.resolve('node_modules')], //模块指定目录查找
        mainFields:['style','main'], // 先找package.json中的哪一项
        extensions:['.js','.css','.json'] // 添加扩展名的先后顺序
        // mainFiles:[]// 入口文件的名字，默认是index.js
        // alias:{
        //     bootstrap:'bootstrap/dist/css/bootstrap.css'
        // }
    },
    devServer:{
        // 1.重写的方式，把请求代理到express服务器
        // proxy:{
        //     '/api':{
        //         target:'http://localhost:3000',
        //         pathRewrite:{'^/api':''},
        //     }
        // }
        // 2.我们前端只想单纯模拟数据
        // before(app){
        //     app.get('/user',(req,res)=>{
        //         res.json({name:'珠峰架构2'});
        //     })
        // }
        // 3.有服务端，不想用代理来处理，能不能在服务器中启动webpack,前端和服务端公用一个端口
        
    }
}