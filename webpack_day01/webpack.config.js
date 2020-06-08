// webpack 是node写出来的，所以配置文件要用node写法
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');

module.exports = {
    mode:'development', //模式。默认两种，production development
    entry:'./src/index.js', //入口
    output:{ 
        filename:'bundle.js', //打包后的文件名加上8位的hash戳
        path:path.join(__dirname,'build'), //路径必须是一个绝对路径
        // publicPath:'http://localhost:8080/'
    },
    module:{
        rules:[
            // {
            //     test:require.resolve('jquery'),
            //     use:'expose-loader?$'
            // },
            {
                test:/\.html$/,
                use:'html-withimg-loader'
            },
            {
                test:/\.(JPG|JPEG)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024*1024,
                            outputPath:'img/',
                            publicPath:'http://localhost:8080/img',
                            esModule:false
                        }
                    },
                    // {
                    //     loader:'file-loader',
                    //     options:{
                    //         esModule:false
                    //     }
                    // }
                ]

            },
            {
                /**
                 * 从右向左执行，从下向上执行，css-loader解决‘@imoirt’这样的引入，style-loader是把css问价插入到html中
                 */
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/\.js$/,
                use:{
                    loader:'eslint-loader'
                },
                enforce:'pre'//previous 前置，把此loader放在normal loader前执行
            },
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{ //babel-loader把es6转成es5
                            presets:[
                                '@babel/preset-env'
                            ],
                            plugins:[
                                '@babel/plugin-transform-runtime'
                            ]
                        }
                    }
                ],
                include:path.resolve(__dirname,'src'),
                exclude:/node_modules/
            },
        ]   
    },
    plugins:[ // 数组 放着所有的插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/index.css'
        })
    ],
    externals:{
        jquery:'jQuery'
    },
    devServer:{ //开发服务器配置
        port:8080,
        progress:true, //进度条
        contentBase:'./build',
        compress:true //GZIP压缩
    } 
};