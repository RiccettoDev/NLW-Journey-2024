import type { FastifyInstance } from "fastify";
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function confirmParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId/confirm', {
    schema: {
      params: z.object({
        participantId: z.string().uuid(),
      })
    },
  }, async (request, reply) => {

    const { participantId } = request.params

    const participant = await prisma.participant.findUnique({
      where: {
        id: participantId,
      }
    })

    if (!participant) {
      throw new ClientError('Participant not found.')
    }

    if (participant.is_confirme) {
      return reply.redirect(`http://localhost:3000/trips/${participant.trip_id}`)
    }

    await prisma.participant.update({
      where: {
        id: participantId,
      },
      data: {
        is_confirme: true,
      }
    })

    return reply.redirect(`http://localhost:3000/trips/${participant.trip_id}`)
  })
}