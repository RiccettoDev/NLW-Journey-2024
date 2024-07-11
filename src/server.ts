import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
  return 'Hello NLW!'
})

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!!!');

})