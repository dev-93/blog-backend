require('dotenv').config();
// import Koa from "Koa"; 
import Router from "koa-router";
import bodyParser from "koa-bodyparser"; 
import mongoose from "mongoose"; 
import cors from "@koa/cors";
import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";

// const { PORT, MONGO_URI } = process.env;

// mongoose
// .connect(MONGO_URI, {useNewUrlParser: true, useFindAndModify: false})
//     .then(() => {
//         console.log("Conneted to Mongo DB");
//     })
//     .catch(e => {
//         console.error(e);
//     });

// const app = new Koa();
// const router = new Router();

// app.use(cors());
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});


// //라우터 설정
// router.use('/api', api.routes());

// // 라우터 적용 전에 bodyParser 적용
// app.use(bodyParser());
// app.use(jwtMiddleware);

// // app 인스턴스에 라우터 적용
// app.use(router.routes()).use(router.allowedMethods());

module.exports = app; 