const request = require('supertest');
const app = require('../app');

let id;

test('GET/ directors debe traer todos los directores',async () => { 
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST/ directors debe crear un director', async () => { 
    const newDirector = {
        firstName: 'Guillermo',
        lastName: 'del toro',
        nationality: 'estados unidos',
        image: 'http//guillermo.png',
        birthday: '1960-10-10'
    }
    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newDirector.name);
 });

 test('PUT / directors/:id debe actualizar un director', async() => {
    const updateDirector = {
      firstName: 'Guillermo actual',
      lastName: 'del toro',
      nationality: 'estados unidos',
      image: 'http//guillermo.png',
      birthday: '1960-10-10'
    }
    const res = await request(app).put(`/directors/${id}`).send(updateDirector);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateDirector.name);
 });

 test('DELETE / directors/:id debe eliminar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
 });