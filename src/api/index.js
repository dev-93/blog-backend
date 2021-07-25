const Router = require("koa-router");
const posts = require("./posts");

const api = new Router();

// 라우터 설정
api.use('/posts', posts.routes());

module.exports = api;
