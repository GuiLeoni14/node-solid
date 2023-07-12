import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, res: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await res.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await res.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return res
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}
