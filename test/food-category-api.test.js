import mongoose from 'mongoose'
import Category from '../models/food-category.js'
import supertest from 'supertest'
import app from '../app.js'

describe('crud api for food-category', () => {
    beforeAll(async () => {
        await mongoose.connect(
            'mongodb://localhost:27017/restaurant-backend-test'
        )
    })

    afterEach(async () => {
        await Category.deleteMany({}) // clear the collecion
    })

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close()
    })

    test('GET /cat/:catId', async () => {
        const categoryInstance = await Category({
            name: 'bevarages/coffee',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        expect.assertions(3)
        await supertest(app)
            .get(`/cat/${categoryInstance._id}`)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toEqual(
                    categoryInstance._id.toString()
                )
                expect(response.body.name).toEqual(categoryInstance.name)
                expect(response.body.organizationId).toEqual(
                    categoryInstance.organizationId.toString()
                )
                // expect(response.body.createdAt).toEqual(
                //     new Date(categoryInstance.createdAt).toJSON()
                // )
                // expect(response.body.updatedAt).toEqual(
                //     new Date(categoryInstance.updatedAt).toJSON()
                // )
            })
    })

    test('DELETE /cat/:catId', async () => {
        const categoryInstance = await Category({
            name: 'bevarages/coffee',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        expect.assertions(1)
        await supertest(app)
            .delete(`/cat/${categoryInstance._id}`)
            .expect(204)
            .then(async (response) => {
                // collection should be empty
                const recordCount = await Category.find({}).count()
                expect(recordCount).toBe(0)
            })
    })

    test('POST /cat', async () => {
        const data = {
            name: 'bevarages/coffee',
            organizationId: '638dd4271f96291623cdb7b0',
        }

        expect.assertions(3)
        await supertest(app)
            .post(`/cat/`)
            .send(data)
            .expect(200)
            .then(async (response) => {
                const recordCount = await Category.findOne({
                    _id: response.body._id,
                }).count()
                expect(recordCount).toBe(1) // check record count in database
                expect(response.body.name).toEqual(data.name)
                expect(response.body.organizationId).toEqual(
                    data.organizationId
                )
            })
    })

    test('PUT /cat/:catId', async () => {
        const newCat = await Category({
            name: 'bevarages/coffee',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        const data = {
            name: 'bevarages/tea',
            organizationId: '63903a41bbb5e190715cfdc4',
        }

        expect.assertions(4)
        await supertest(app)
            .put(`/cat/${newCat._id}`)
            .send(data)
            .expect(200)
            .then(async (response) => {
                const recordCount = await Category.findOne({
                    _id: response.body._id,
                }).count()
                expect(recordCount).toBe(1) // check record count in database
                expect(response.body._id).toEqual(newCat._id.toString())
                expect(response.body.name).toEqual(data.name)
                expect(response.body.organizationId).toEqual(
                    data.organizationId
                )
            })
    })

    test('GET /cat/:catId => 404', async () => {
        await supertest(app).get('/cat/638dd4271f96291623cdb7b0').expect(404)
    })

    test('DELETE /cat/:catId => 404', async () => {
        await supertest(app).delete('/cat/638dd4271f96291623cdb7b0').expect(404)
    })

    test('PUT /cat/:catId => 404', async () => {
        const data = {
            name: 'bevarages/coffee',
            organizationId: '638dd4271f96291623cdb7b0',
        }
        await supertest(app)
            .put('/cat/638dd4271f96291623cdb7b0')
            .send(data)
            .expect(404)
    })

    test('POST /cat => 422', async () => {
        const data = {
            name: 'gau',
            organizationId: 12345,
        }

        expect.assertions(1)
        await supertest(app)
            .post(`/cat/`)
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
                        msg: 'invalid organization id provided',
                        param: 'organizationId',
                        value: data.organizationId,
                    },
                ])
            })
    })

    test('PUT /cat/:catId => 422', async () => {
        const newCat = await Category({
            name: 'bevarages/coffee',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        const data = {
            name: 'gau',
            organizationId: 12345,
        }

        expect.assertions(1)
        await supertest(app)
            .put(`/cat/${newCat._id}`)
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
