require('dotenv').config();
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");

const api = require("./api");

const { PORT, MONGO_URI } = process.env;

mongoose
.connect(MONGO_URI, {useNewUrlParser: true, useFindAndModify: false})
    .then(() => {
        console.log("Conneted to Mongo DB");
    })
    .catch(e => {
        console.error(e);
    });

const app = new Koa();
const router = new Router();

//라우터 설정
router.use('/api', api.routes());

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;

app.listen(port, () => {
    console.log(`Listening to port %d`, port);
});