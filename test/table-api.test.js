import mongoose from 'mongoose'
import Table from '../models/table.js'
import supertest from 'supertest'
import app from '../app.js'

describe('crud api for table model', () => {
    beforeAll(async () => {
        await mongoose.connect(
            'mongodb://localhost:27017/restaurant-backend-test'
        )
    })

    afterEach(async () => {
        await Table.deleteMany({}) // clear the collecion
    })

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close()
    })

    test('GET /table/:tableId', async () => {
        const tableInstance = await Table({
            name: 'table 1',
            departmentId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        expect.assertions(3)
        await supertest(app)
            .get(`/table/${tableInstance._id}`)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toEqual(tableInstance._id.toString())
                expect(response.body.name).toEqual(tableInstance.name)
                expect(response.body.organizationId).toEqual(
                    tableInstance.organizationId.toString()
                )
                // expect(response.body.createdAt).toEqual(
                //     new Date(tableInstance.createdAt).toJSON()
                // )
                // expect(response.body.updatedAt).toEqual(
                //     new Date(tableInstance.updatedAt).toJSON()
                // )
            })
    })

    test('DELETE /table/:tableId', async () => {
        const tableInstance = await Table({
            name: 'table 1',
            departmentId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        expect.assertions(1)
        await supertest(app)
            .delete(`/table/${tableInstance._id}`)
            .expect(204)
            .then(async (response) => {
                // collection should be empty
                const recordCount = await Table.find({}).count()
                expect(recordCount).toBe(0)
            })
    })

    test('POST /table', async () => {
        const data = {
            name: 'table 1',
            departmentId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }

        expect.assertions(4)
        await supertest(app)
            .post(`/table/`)
            .send(data)
            .expect(200)
            .then(async (response) => {
                const recordCount = await Table.find({
                    _id: response.body._id,
                }).count()
                expect(recordCount).toBe(1) // check record count in database
                expect(response.body.name).toEqual(data.name)
                expect(response.body.departmentId).toEqual(data.departmentId)
                expect(response.body.organizationId).toEqual(
                    data.organizationId
                )
            })
    })

    test('PUT /table/:tableId', async () => {
        const newTable = await Table({
            name: 'table 1',
            departmentId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        const data = {
            name: 'table 5',
            organizationId: '6392e889c8c917421058666b',
            departmentId: '638dd4271f96291623cdb7b0',
        }

        expect.assertions(4)
        await supertest(app)
            .put(`/table/${newTable._id}`)
            .send(data)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toEqual(newTable._id.toString())
                expect(response.body.name).toEqual(data.name)
                expect(response.body.departmentId).toEqual(data.departmentId)
                expect(response.body.organizationId).toEqual(
                    data.organizationId
                )
            })
    })

    test('GET /table/:tableId => 404', async () => {
        await supertest(app).get('/table/638dd4271f96291623cdb7b0').expect(404)
    })

    test('DELETE /table/:tableId => 404', async () => {
        await supertest(app)
            .delete('/table/638dd4271f96291623cdb7b0')
            .expect(404)
    })

    test('PUT /table/:tableId => 404', async () => {
        const data = {
            name: 'table 1',
            departmentId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }
        await supertest(app)
            .put('/table/638dd4271f96291623cdb7b0')
            .send(data)
            .expect(404)
    })

    test('POST /table => 422', async () => {
        const data = {
            name: 'gau',
            organizationId: 12345,
            departmentId: 12345,
        }

        expect.assertions(1)
        await supertest(app)
            .post(`/table/`)
            .send(data)
            .expect(422)
            .then((response) => {
                expect(response.body.errors).toEqual([
                    {
                        location: 'body',
                        msg: 'name should be at least 5 characters in length',
                        param: 'name',
                        value: data.name,
                    },
                    {
                        location: 'body',
                        msg: 'invalid department id provided',
                        param: 'departmentId',
                        value: data.departmentId,
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

    test('PUT /table/:tableId => 422', async () => {
        const newTable = await Table({
            name: 'table 1',
            departmentId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        const data = {
            name: 'gau',
            organizationId: 12345,
            departmentId: 12345,
        }

        expect.assertions(1)
        await supertest(app)
            .put(`/table/${newTable._id}`)
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
                        msg: 'invalid department id provided',
                        param: 'departmentId',
                        value: data.departmentId,
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
