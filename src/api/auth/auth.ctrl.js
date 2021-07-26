import Joi from "@hapi/joi";
import User from "../../models/user";

// POST /api/auth/register
export const register = async ctx => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password: Joi.string().required(),
    });
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { username, password } = ctx.request.body;
    try {
        const exists = await User.findByUsername(username);
        if (exists) {
            ctx.status = 409;
            return;
        }

        const user = new User({
            username,
        });
        await user.setPassword(password);
        await user.save();

        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
    } catch(e) {
        ctx.throw(500, e);
    }
};


// POST /api/auth/login
export const login = async ctx => {
    const { username, password } = ctx.request.body;
    
    if(!username || !password) { // username이나 password 둘 중 하나 없으면 에러
        ctx.status = 401;
        return;
    }

    try {
        const user = await User.findByUsername(username);
        if(!user) { // 계정 존재 하지 않으면 에러
            ctx.status = 401;
            return;
        }

        const valid = await user.checkPassword(password);
        if (!valid) { // 잘못된 비밀번호시 에러
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const check = async ctx => {
    // 로그인 상태 확인
};

export const logout = async ctx => {
    // 로그아웃
};