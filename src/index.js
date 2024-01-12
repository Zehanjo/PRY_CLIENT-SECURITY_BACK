const fastify = require('fastify')({logger: true});
const { routes } = require('./routes/app.routes');
fastify.register(require('@fastify/formbody'));

require("dotenv").config();


fastify.get("/hola",(request,reply) => {
    reply.send({hello:"world"})
})

const start = async () => {
    await fastify.register(require("@fastify/cors"), {
        origin: "*",
        methods: ['GET', 'POST'],
        credentials: true
    })

    routes.forEach(route =>{
        fastify.route(route);
    })

    fastify.listen({port: process.env.FASTIFY_PORT | 3000},err =>{

        if(err) throw err
        console.log(`Server listening on ${fastify.server.address().port}`);
    })
}

start();