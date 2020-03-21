// 配置跨域请求
module.exports = {
    devServer: {
        proxy: {
            // 匹配到请求链接中有 /api 则进行代理 ，如 http://127.0.0.1:8080/api/xxx
            '/api': {
                //要代理访问的接口域名
                // target: 'http://121.36.2.172:3888/video',
                target: 'http://127.0.0.1:3888/video',
                //如果项目部署有统一路径，则使用该配置或者删除后面的pathRewrite配置
                // target: 'http://121.36.2.172:3888/api',

                // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接受请求的数据，这样服务端和服务端进行数据的交互就不会有跨域访问的问题
                changeOrigin: true,

                // 开启 webSocket 跨域请求代理
                ws: true,

                pathRewrite: {
                    // 这里理解成为用 '/api’ 代替 target 里面的地址，如访问：http://127.0.0.1:8080/api/getuser 会代理成 http://121.36.2.172:3888/getuser
                    '^/api': ''
                }
            }
        }
    }
}