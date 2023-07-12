import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, res: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return res.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
