const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry:{
        home:'./src/home.js',
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'build')
    },
    module:{
        rules:[
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
    watch:true, // 监控状态，每次代码修改后重新build
    watchOptions:{
        pill:1000, //每秒问我1000次
        aggreatmentTime:500,// 防抖，输入代码停留500毫秒后打包
        ignored:/node_modules/ // 不需要监控的文件
    },
    devtool:'cheap-module-eval-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
        }),
    ]
}