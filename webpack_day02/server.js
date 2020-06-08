const express = require('express');
const webpack = require('webpack');
//中间件
const middle = require('webpack-dev-middleware');
const app = express();

const config = require('./webpack.config.js');

const compiler = webpack(config);

app.use(middle(compiler));

app.get('/user',(req,res)=>{
    res.json({name:'珠峰架构1'});
})

app.listen(3000);