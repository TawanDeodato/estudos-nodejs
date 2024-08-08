// import { createServer } from "node:http";

// const server = createServer((req, res) => {
//     res.write('Hello world')

//     return res.end()
// })

// server.listen(3333)

import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DatabaseMemory();

server.post("/videos", (req, reply) => {
  database.create({
    title: "Video 01",
    description: "Esse é o vídeo 01",
    duration: 180,
  });

  console.log(database.list());

  return reply.status(201).send();
});

server.get("/hello", () => {
  return "Hello";
});
server.get("/node", () => {
  return "Hello NodeJS";
});

server.listen({
  port: 3333,
});
