const request = require('supertest');
const app = require('../app');

let id;

test('GET/ actors debe traer todos los actores', async() => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ actors debe crear un actor', async() => {
    const newActor = {
        firstName: 'Keanus',
        lastName: 'Reeves',
        nationality: 'Canadience',
        image: 'http//keanus.png',
        birthday: '1964-09-02'
    }
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newActor.name);
});

test('PUT/ actors/:id actualizar un actor', async() => {
    const updateActor = {
        firstName: 'Keanus actual',
        lastName: 'Reeves',
        nationality: 'Canadience',
        image: 'http//keanus.png',
        birthday: '1964-09-02'
    }
    const res = await request(app).put(`/actors/${id}`).send(updateActor);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateActor.name);
});

 test('DELETE / actors/:id debe eliminar un genero', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
 });

