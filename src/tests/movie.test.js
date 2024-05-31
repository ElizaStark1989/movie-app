const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

let id;

test ('GET /movies debe traer todas las peliculas', async() => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ movies debe crear una pelicula', async () => { 
    const newMovie = {
        name: 'Advengers',
        image: 'http//advenger.com',
        synopsis: 'grupo de super heroes luchan por salvar el mundo',
        releaseYear: 2012
    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name);
 });

 test('PUT / movies/:id debe actualizar una pelicula', async() => {
    const updateMovie = {
        name: 'the advengers'
    }
    const res = await request(app).put(`/movies/${id}`).send(updateMovie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateMovie.name);
 });

 test('POST /movies/:id/genres debe insertar los generos de una pelicula', async () => {
    const genre = await Genre.create({
       name:'drama'
    })
    const res = await request(app)
       .post(`/movies/${id}/genres`)
       .send([genre.id]);
    await genre.destroy(200);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
 });

 test('POST /movies/:id/actors debe insertar los actores de una pelicula', async () => {
   const actor = await Actor.create({
        firstName: 'Ana ',
        lastName: 'de Armas',
        nationality: 'Canadience',
        image: 'http//ana.png',
        birthday: '1990-09-02'
   })
   const res = await request(app)
      .post(`/movies/${id}/actors`)
      .send([actor.id]);
   await actor.destroy(200);
   expect(res.status).toBe(200);
   expect(res.body).toBeInstanceOf(Array);
   expect(res.body.length).toBe(1);
 });

 test('POST /movies/:id/directors debe insertar los directores', async () => {
   const director = await Director.create({
      firstName: 'Quentin',
        lastName: 'Tarantino',
        nationality: 'estados unidos',
        image: 'http//quentin.png',
        birthday: '1960-10-10'
   })
   const res = await request(app)
      .post(`/movies/${id}/directors`)
      .send([director.id]);
   await director.destroy(200);
   expect(res.status).toBe(200);
   expect(res.body).toBeInstanceOf(Array);
   expect(res.body.length).toBe(1);
 });

 test('DELETE / movies/:id debe eliminar una pelicula', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
 });