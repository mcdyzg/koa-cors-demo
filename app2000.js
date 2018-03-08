// 本server接收跨域请求
const koa = require('koa')
const app = new koa()
const cors = require('@koa/cors');


// 使用koa-cors中间件做跨域资源共享，完美 response headers的设置如下
// Access-Control-Allow-Headers:content-type
// Access-Control-Allow-Methods:GET,HEAD,PUT,POST,DELETE,PATCH
// Access-Control-Allow-Origin:http://localhost:3000
// Connection:keep-alive
// Date:Thu, 08 Mar 2018 06:15:03 GMT
// Vary:Origin

// app.use(cors())
// app.use(async (ctx)=>{
//     ctx.status = 200
//     ctx.body = {
//         a:1,
//     }
//     return
// })










// 自己实现cors
// app.use(async(ctx,next)=>{
//
//     const requestOrigin = ctx.get('Origin');
//
//     // requestOrigin ==> http://localhost:3000
//     let origin = requestOrigin
//
//     if(ctx.method !== 'OPTIONS') {
//         // 获取到Authorization信息可用于token机制
//         console.log(ctx.get('Authorization'),ctx.request.header.authorization)
//
//         ctx.set('Access-Control-Allow-Origin',origin)
//         // ctx.set('Access-Control-Max-Age', 4000);
//         ctx.status = 200
//         ctx.body = {name:1}
//     }else{
//         let allowedMethods  ='GET,HEAD,PUT,POST,DELETE,PATCH'
//         // 服务器必须设置以下三个字段浏览器才能接着发送真正的请求
//         ctx.set('Access-Control-Allow-Origin',origin)
//         // 如果是optoins(Preflighted)的请求，服务器必须在res设置
//         ctx.set('Access-Control-Allow-Methods',allowedMethods)
//         let allowHeaders = ctx.get('Access-Control-Request-Headers');
//         ctx.set('Access-Control-Allow-Headers', allowHeaders);
//         // 本参数告诉浏览器preflignted请求的有效时间，即在接下来的20s里，浏览器都不需要发送options请求了
//         ctx.set('Access-Control-Max-Age',20)
//         // 204请求完成但不需要返回response体
//         ctx.status = 204;
//     }
//
//     return;
// })













// 自己实现跨域接收cookie
app.use(async(ctx,next)=>{

    const requestOrigin = ctx.get('Origin');

    // requestOrigin ==> http://localhost:3000
    let origin = requestOrigin

    if(ctx.method !== 'OPTIONS') {
        // 获取到Authorization信息可用于token机制
        console.log(ctx.get('Authorization'),ctx.request.header.authorization)

        ctx.set('Access-Control-Allow-Origin',origin)
        // ctx.set('Access-Control-Max-Age', 4000);

        // 本参数表示服务器告诉浏览器允许携带cookie
        ctx.set('Access-Control-Allow-Credentials', 'true');

        ctx.status = 200
        ctx.body = {name:1}
    }else{
        let allowedMethods  ='GET,HEAD,PUT,POST,DELETE,PATCH'

        // 服务器必须设置以下三个字段浏览器才能接着发送真正的请求
        ctx.set('Access-Control-Allow-Origin',origin)
        // 如果是optoins(Preflighted)的请求，服务器必须在res设置
        ctx.set('Access-Control-Allow-Methods',allowedMethods)
        let allowHeaders = ctx.get('Access-Control-Request-Headers');
        ctx.set('Access-Control-Allow-Headers', allowHeaders);

        // 本参数告诉浏览器preflignted请求的有效时间，即在接下来的20s里，浏览器都不需要发送options请求了
        ctx.set('Access-Control-Max-Age',20)

        // 本参数表示服务器告诉浏览器允许携带cookie
        ctx.set('Access-Control-Allow-Credentials', 'true');

        // 204请求完成但不需要返回response体
        ctx.status = 204;
    }

    return;
})



// https://itbilu.com/javascript/js/VkiXuUcC.html

app.listen('2000')
