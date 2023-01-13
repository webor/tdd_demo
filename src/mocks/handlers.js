import { rest } from 'msw'
export const handlers = [
    rest.post('https://test_demo/api/login', (req, res, ctx) => {
        const { username, password } = req.body;
        if (username == 'pushpa' && password == 'fire hai') {
            return res(
                ctx.delay(2000),
                ctx.json({ username })
            )
        } else {
            return res(
                ctx.delay(2000),
                ctx.status(400),
                ctx.json({ message: 'Either username or password incorrect' })
            );
        }
    })
];