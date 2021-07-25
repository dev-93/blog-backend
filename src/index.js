require('dotenv').config();
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const { PORT } = process.env;

const api = require("./api");

const app = new Koa();
const router = new Router();

//라우터 설정
router.use('/api', api.routes());

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라웉 ㅓ적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;

app.listen(port, () => {
    console.log(`Listening to port %d`, port);
});