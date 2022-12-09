import mongoose from 'mongoose'
import Department from '../models/department.js'
import supertest from 'supertest'
import app from '../app.js'

describe('crud api for department model', () => {
    beforeAll(async () => {
        await mongoose.connect(
            'mongodb://localhost:27017/restaurant-backend-test'
        )
    })

    afterEach(async () => {
        await Department.deleteMany({}) // clear the collecion
    })

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close()
    })

    test('GET /depart/:departId', async () => {
        const departInstance = await Department({
            name: 'ground floor',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        expect.assertions(3)
        await supertest(app)
            .get(`/depart/${departInstance._id}`)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toEqual(departInstance._id.toString())
                expect(response.body.name).toEqual(departInstance.name)
                expect(response.body.organizationId).toEqual(
                    departInstance.organizationId.toString()
                )
                // expect(response.body.createdAt).toEqual(
                //     new Date(departInstance.createdAt).toJSON()
                // )
                // expect(response.body.updatedAt).toEqual(
                //     new Date(departInstance.updatedAt).toJSON()
                // )
            })
    })

    test('DELETE /depart/:departId', async () => {
        const departInstance = await Department({
            name: 'ground floor',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        expect.assertions(1)
        await supertest(app)
            .delete(`/depart/${departInstance._id}`)
            .expect(204)
            .then(async (response) => {
                // collection should be empty
                const recordCount = await Department.find({}).count()
                expect(recordCount).toBe(0)
            })
    })

    test('POST /depart', async () => {
        const data = {
            name: 'ground floor',
            organizationId: '638dd4271f96291623cdb7b0',
        }

        expect.assertions(2)
        await supertest(app)
            .post(`/depart/`)
            .send(data)
            .expect(200)
            .then(async (response) => {
                // check data in database
                const departInstance = await Department.findOne({
                    _id: response.body._id,
                })
                expect(response.body.name).toEqual(data.name)
                expect(response.body.organizationId).toEqual(
                    data.organizationId
                )
            })
    })

    test('PUT /depart/:departId', async () => {
        const newDepart = await Department({
            name: 'ground floor',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        const data = {
            name: 'top floor',
            organizationId: '63903a41bbb5e190715cfdc4',
        }

        expect.assertions(2)
        await supertest(app)
            .put(`/depart/${newDepart._id}`)
            .send(data)
            .expect(200)
            .then(async (response) => {
                const departInstance = await Department.findOne({
                    _id: newDepart._id,
                })
                expect(response.body.name).toEqual(data.name)
                expect(response.body.organizationId).toEqual(
                    data.organizationId
                )
            })
    })

    test('GET /depart/:departId => 404', async () => {
        await supertest(app).get('/depart/638dd4271f96291623cdb7b0').expect(404)
    })

    test('DELETE /depart/:departId => 404', async () => {
        await supertest(app)
            .delete('/depart/638dd4271f96291623cdb7b0')
            .expect(404)
    })

    test('PUT /depart/:departId => 404', async () => {
        const data = {
            name: 'ground floor',
            organizationId: '638dd4271f96291623cdb7b0',
        }
        await supertest(app)
            .put('/depart/638dd4271f96291623cdb7b0')
            .send(data)
            .expect(404)
    })

    test('POST /depart => 422', async () => {
        const data = {
            name: 'gau',
            organizationId: 12345,
        }

        expect.assertions(1)
        await supertest(app)
            .post(`/depart/`)
            .send(data)
            .expect(422)
            .then(async (response) => {
                expect(response.body.errors).toEqual([
                    {
                        location: 'body',
                        msg: 'name should be at least 5 characters in length',
                        param: 'name',
                        value: data.name,
                    },
                    {
                        location: 'body',
                        msg: 'invalid organization id provided',
                        param: 'organizationId',
                        value: data.organizationId,
                    },
                ])
            })
    })

    test('PUT /depart/:departId => 422', async () => {
        const newDepart = await Department({
            name: 'ground floor',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        const data = {
            name: 'gau',
            organizationId: 12345,
        }

        expect.assertions(1)
        await supertest(app)
            .put(`/depart/${newDepart._id}`)
            .send(data)
            .expect(422)
            .then(async (response) => {
                expect(response.body.errors).toEqual([
                    {
                        location: 'body',
                        msg: 'name should be at least 5 characters in length',
                        param: 'name',
                        value: data.name,
                    },
                    {
                        location: 'body',
                        msg: 'invalid organization id provided',
                        param: 'organizationId',
                        value: data.organizationId,
                    },
                ])
            })
    })

    // test('POST /org', async () => {})
})
