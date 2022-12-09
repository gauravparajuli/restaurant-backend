import mongoose from 'mongoose'
import FoodItem from '../models/food-item.js'
import supertest from 'supertest'
import app from '../app.js'

describe('crud api for food-item model', () => {
    beforeAll(async () => {
        await mongoose.connect(
            'mongodb://localhost:27017/restaurant-backend-test'
        )
    })

    afterEach(async () => {
        await FoodItem.deleteMany({}) // clear the collecion
    })

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close()
    })

    test('GET /food/:foodItmId', async () => {
        const foodItemInstance = await FoodItem({
            name: 'Espresso',
            foodUnit: 'cup',
            unitPrice: 100,
            foodCategoryId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        expect.assertions(6)
        await supertest(app)
            .get(`/food/${foodItemInstance._id}`)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toEqual(
                    foodItemInstance._id.toString()
                )
                expect(response.body.name).toEqual(foodItemInstance.name)
                expect(response.body.foodUnit).toEqual(
                    foodItemInstance.foodUnit
                )
                expect(response.body.unitPrice).toEqual(
                    foodItemInstance.unitPrice
                )
                expect(response.body.foodCategoryId).toEqual(
                    foodItemInstance.foodCategoryId.toString()
                )
                expect(response.body.organizationId).toEqual(
                    foodItemInstance.organizationId.toString()
                )
                // expect(response.body.createdAt).toEqual(
                //     new Date(foodItemInstance.createdAt).toJSON()
                // )
                // expect(response.body.updatedAt).toEqual(
                //     new Date(foodItemInstance.updatedAt).toJSON()
                // )
            })
    })

    test('DELETE /food/:foodItmId', async () => {
        const foodItemInstance = await FoodItem({
            name: 'Espresso',
            foodUnit: 'cup',
            unitPrice: 100,
            foodCategoryId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        expect.assertions(1)
        await supertest(app)
            .delete(`/food/${foodItemInstance._id}`)
            .expect(204)
            .then(async (response) => {
                // collection should be empty
                const recordCount = await FoodItem.find({}).count()
                expect(recordCount).toBe(0)
            })
    })

    test('POST /food', async () => {
        const data = {
            name: 'Espresso',
            foodUnit: 'cup',
            unitPrice: 100,
            foodCategoryId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }

        expect.assertions(6)
        await supertest(app)
            .post(`/food/`)
            .send(data)
            .expect(200)
            .then(async (response) => {
                const recordCount = await FoodItem.find({
                    _id: response.body._id,
                }).count()
                expect(recordCount).toBe(1) // check record count in database
                expect(response.body.name).toEqual(data.name)
                expect(response.body.foodUnit).toEqual(data.foodUnit)
                expect(response.body.unitPrice).toEqual(data.unitPrice)
                expect(response.body.foodCategoryId).toEqual(
                    data.foodCategoryId
                )
                expect(response.body.organizationId).toEqual(
                    data.organizationId.toString()
                )
            })
    })

    test('PUT /food/:foodItmId', async () => {
        const newFoodItem = await FoodItem({
            name: 'Espresso',
            foodUnit: 'cup',
            unitPrice: 100,
            foodCategoryId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        const data = {
            name: 'Cappucino',
            foodUnit: 'cup',
            unitPrice: 240,
            organizationId: '6392e889c8c917421058666b',
            foodCategoryId: '638dd4271f96291623cdb7b0',
        }

        expect.assertions(6)
        await supertest(app)
            .put(`/food/${newFoodItem._id}`)
            .send(data)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toEqual(newFoodItem._id.toString())
                expect(response.body.name).toEqual(data.name)
                expect(response.body.foodUnit).toEqual(data.foodUnit)
                expect(response.body.unitPrice).toEqual(data.unitPrice)
                expect(response.body.foodCategoryId).toEqual(
                    data.foodCategoryId
                )
                expect(response.body.organizationId).toEqual(
                    data.organizationId
                )
            })
    })

    test('GET /food/:foodItmId => 404', async () => {
        await supertest(app).get('/food/638dd4271f96291623cdb7b0').expect(404)
    })

    test('DELETE /food/:foodItmId => 404', async () => {
        await supertest(app)
            .delete('/food/638dd4271f96291623cdb7b0')
            .expect(404)
    })

    test('PUT /food/:foodItmId => 404', async () => {
        const data = {
            name: 'Cappucino',
            foodUnit: 'cup',
            unitPrice: 240,
            organizationId: '6392e889c8c917421058666b',
            foodCategoryId: '638dd4271f96291623cdb7b0',
        }
        await supertest(app)
            .put('/food/638dd4271f96291623cdb7b0')
            .send(data)
            .expect(404)
    })

    test('POST /food => 422', async () => {
        const data = {
            name: 'rio',
            foodUnit: 'c',
            unitPrice: 12.246,
            organizationId: 12345,
            foodCategoryId: 12345,
        }

        expect.assertions(1)
        await supertest(app)
            .post(`/food/`)
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
                        msg: 'unit should be at least 3 characters in length',
                        param: 'foodUnit',
                        value: data.foodUnit,
                    },
                    {
                        location: 'body',
                        msg: 'price must be an integer',
                        param: 'unitPrice',
                        value: data.unitPrice,
                    },
                    {
                        location: 'body',
                        msg: 'invalid food category id provided',
                        param: 'foodCategoryId',
                        value: data.foodCategoryId,
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

    test('PUT /food/:foodItmId => 422', async () => {
        const newFoodItem = await FoodItem({
            name: 'Espresso',
            foodUnit: 'cup',
            unitPrice: 100,
            foodCategoryId: '6392e889c8c917421058666b',
            organizationId: '638dd4271f96291623cdb7b0',
        }).save()

        const data = {
            name: 'rio',
            foodUnit: 'c',
            unitPrice: 12.246,
            organizationId: 12345,
            foodCategoryId: 12345,
        }

        expect.assertions(1)
        await supertest(app)
            .put(`/food/${newFoodItem._id}`)
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
                        msg: 'unit should be at least 3 characters in length',
                        param: 'foodUnit',
                        value: data.foodUnit,
                    },
                    {
                        location: 'body',
                        msg: 'price must be an integer',
                        param: 'unitPrice',
                        value: data.unitPrice,
                    },
                    {
                        location: 'body',
                        msg: 'invalid food category id provided',
                        param: 'foodCategoryId',
                        value: data.foodCategoryId,
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
