const Router = require("koa-router");
const api = new Router();

// 라우터 설정
router.get('/test', ctx => {
    ctx.body = "test 성공";
});

module.exports = api;
