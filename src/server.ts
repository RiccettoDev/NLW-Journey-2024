import fastify from 'fastify'
import { createTrip } from './routes/create-trip'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

const app = fastify()

// dependências do zod
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// rotas

// rota de criação
app.register(createTrip)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!!!');

})