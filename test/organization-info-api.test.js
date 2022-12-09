import mongoose from 'mongoose'
import OrganizationInfo from '../models/organization-info.js'
import supertest from 'supertest'
import app from '../app.js'

describe('crud api for organization info model', () => {
    beforeAll(async () => {
        await mongoose.connect(
            'mongodb://localhost:27017/restaurant-backend-test'
        )
    })

    afterEach(async () => {
        await OrganizationInfo.deleteMany({}) // clear the collecion
    })

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close()
    })

    test('GET /org/:orgId', async () => {
        const newInfo = await OrganizationInfo({
            name: 'burger house',
            address: 'radhe radhe',
            phone: '12345',
        }).save()

        expect.assertions(4)
        await supertest(app)
            .get(`/org/${newInfo._id}`)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toEqual(newInfo._id.toString())
                expect(response.body.name).toEqual(newInfo.name)
                expect(response.body.address).toEqual(newInfo.address)
                expect(response.body.phone).toEqual(newInfo.phone)
                // expect(response.body.createdAt).toEqual(
                //     new Date(newInfo.createdAt).toJSON()
                // )
                // expect(response.body.updatedAt).toEqual(
                //     new Date(newInfo.updatedAt).toJSON()
                // )
            })
    })

    test('DELETE /org/:orgId', async () => {
        const newInfo = await OrganizationInfo({
            name: 'burger house',
            address: 'radhe radhe',
            phone: '12345',
        }).save()

        expect.assertions(1)
        await supertest(app)
            .delete(`/org/${newInfo._id}`)
            .expect(204)
            .then(async (response) => {
                // collection should be empty
                const recordCount = await OrganizationInfo.find({}).count()
                expect(recordCount).toBe(0)
            })
    })

    test('POST /org', async () => {
        const data = {
            name: 'burger house',
            address: 'radhe radhe',
            phone: '12345',
        }

        expect.assertions(3)
        await supertest(app)
            .post(`/org/`)
            .send(data)
            .expect(200)
            .then(async (response) => {
                // check data in database
                const info = await OrganizationInfo.findOne({
                    _id: response.body._id,
                })
                expect(info.name).toEqual(data.name)
                expect(info.address).toEqual(data.address)
                expect(info.phone).toEqual(data.phone)
            })
    })

    test('PUT /org/:orgId', async () => {
        const data = await OrganizationInfo({
            name: 'burger house',
            address: 'radhe radhe',
            phone: '12345',
        }).save()

        const newData = {
            name: 'pizza hut',
            address: 'durbar marg',
            phone: '678910',
        }

        expect.assertions(3)
        await supertest(app)
            .put(`/org/${data._id}`)
            .send(newData)
            .expect(200)
            .then(async (response) => {
                // check data in database
                const info = await OrganizationInfo.findOne({
                    _id: response.body._id,
                })
                expect(info.name).toEqual(newData.name)
                expect(info.address).toEqual(newData.address)
                expect(info.phone).toEqual(newData.phone)
            })
    })

    test('GET /org/:orgId => 404', async () => {
        await supertest(app).get('/org/638dd4271f96291623cdb7b0').expect(404)
    })

    test('DELETE /org/:orgId => 404', async () => {
        await supertest(app).delete('/org/638dd4271f96291623cdb7b0').expect(404)
    })

    test('PUT /org/:orgId => 404', async () => {
        const data = {
            name: 'pizza hut',
            address: 'durbar marg',
            phone: '12345',
        }
        await supertest(app)
            .put('/org/638dd4271f96291623cdb7b0')
            .send(data)
            .expect(404)
    })

    test('POST /org => 422', async () => {
        const data = {
            name: 'gau',
            address: 'rav',
            phone: '123',
        }

        expect.assertions(1)
        await supertest(app)
            .post(`/org/`)
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
                        msg: 'address should be at least 5 characters in length',
                        param: 'address',
                        value: data.address,
                    },
                    {
                        location: 'body',
                        msg: 'phone should be at least 5 characters in length',
                        param: 'phone',
                        value: data.phone,
                    },
                ])
            })
    })

    test('PUT /org/:orgId => 422', async () => {
        const data = await OrganizationInfo({
            name: 'burger house',
            address: 'radhe radhe',
            phone: '12345',
        }).save()

        const newData = {
            name: 'gau',
            address: 'rav',
            phone: '123',
        }

        expect.assertions(1)
        await supertest(app)
            .put(`/org/${data._id}`)
            .send(newData)
            .expect(422)
            .then(async (response) => {
                expect(response.body.errors).toEqual([
                    {
                        location: 'body',
                        msg: 'name should be at least 5 characters in length',
                        param: 'name',
                        value: newData.name,
                    },
                    {
                        location: 'body',
                        msg: 'address should be at least 5 characters in length',
                        param: 'address',
                        value: newData.address,
                    },
                    {
                        location: 'body',
                        msg: 'phone should be at least 5 characters in length',
                        param: 'phone',
                        value: newData.phone,
                    },
                ])
            })
    })

    // test('POST /org', async () => {})
})
