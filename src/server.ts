import fastify from 'fastify'
import cors from '@fastify/cors'
import { createTrip } from './routes/create-trip'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { confirmTrip } from './routes/confirm-trip'
import { confirmParticipant } from './routes/confirm-participant'
import { createActivity } from './routes/create-activity'

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

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!!!');

})