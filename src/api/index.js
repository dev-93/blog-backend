import Router from "koa-router";
import posts from "./posts";

const api = new Router();

// 라우터 설정
api.use('/posts', posts.routes());

module.exports = api;
