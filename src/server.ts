import fastify from 'fastify'
import cors from '@fastify/cors'
import { createTrip } from './routes/create-trip'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { confirmTrip } from './routes/confirm-trip'
import { confirmParticipant } from './routes/confirm-participant'
import { createActivity } from './routes/create-activity'
import { getActivities } from './routes/get-activities'
import { createLink } from './routes/create-link'
import { getLinks } from './routes/get-links'
import { getParticipants } from './routes/get-participants'
import { createInvite } from './routes/create-invite'
import { updateTrip } from './routes/update-trip'
import { getTripDetails } from './routes/get-trip-details'

const app = fastify()

app.register(cors, {
  origin: '*',
})

// dependências do zod
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// rotas

// rota de criação de viagem
app.register(createTrip)
// rota de confirmação viagem
app.register(confirmTrip)
// rota de confirmação de participante
app.register(confirmParticipant)
// rota de criação de atividade
app.register(createActivity)
// rota de listagem das atividades
app.register(getActivities)
// rota de criação de links
app.register(createLink)
// rota de listagem dos links
app.register(getLinks)
// rota que lista os participantes
app.register(getParticipants)
// rota de criação de convite
app.register(createInvite)
// rota de edição de viagem
app.register(updateTrip)
// rota de listagem dos detalhes da viagem
app.register(getTripDetails)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!!!');

})