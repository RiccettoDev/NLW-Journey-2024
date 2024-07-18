import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";

export async function getParticipants(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/participants', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      }),
    },
  }, async (request) => {
    const { tripId } = request.params

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            is_confirme: true,
          }
        },
      },
    })

    if (!trip) {
      throw new ClientError('Trip not found.')
    }



    return { participants: trip.participants }
  })
}