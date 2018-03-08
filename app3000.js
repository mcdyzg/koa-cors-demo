// 本server作为发送跨域请求的服务器，只渲染一个主页就可
const koa = require('koa')
const views = require('koa-views')
const app = new koa()

app.use(views('./', {}));

app.use(async (ctx)=>{
    await ctx.render('index.html')
    return
})

app.listen('3000')
