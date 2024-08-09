// import { createServer } from "node:http";

// const server = createServer((req, res) => {
//     res.write('Hello world')

//     return res.end()
// })

// server.listen(3333)

import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

const database = new DatabasePostgres();

server.post("/videos", async (req, reply) => {
  const { title, description, duration } = req.body;

  await database.create({
    title,
    description,
    duration,
  });

  console.log(database.list());

  return reply.status(201).send();
});

server.get("/videos", async (req) => {
  const search = req.query.search;

  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", async (req, reply) => {
  const videosId = req.params.id;
  const { title, description, duration } = req.body;

  await database.update(videosId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", async (req, reply) => {
  const videoId = req.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
});
