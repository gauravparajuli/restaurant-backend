import { validationResult } from 'express-validator'

import FoodItem from '../models/food-item.js'

export const getFoodItem = async (req, res, next) => {
    const { foodItmId } = req.params
    try {
        const foodItemInstance = await FoodItem.findOne({ _id: foodItmId })
        if (!foodItemInstance) {
            const error = new Error(
                `food item with id ${foodItmId} was not found.`
            )
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        res.status(200).json(foodItemInstance)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const getAllFoodItems = async (req, res, next) => {
    try {
        const foodMenu = await FoodItem.find({})

        // check if current user is authorized to access this info here

        res.status(200).json(foodMenu)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const saveFoodItem = async (req, res, next) => {
    const { name, foodUnit, unitPrice, foodCategoryId, organizationId } =
        req.body
    const errors = validationResult(req)
    try {
        if (!errors.isEmpty()) {
            const error = new Error(
                'input validation failed, entered data is incorrect.'
            )
            error.statusCode = 422
            error.errors = errors.array()
            throw error
        }

        const newFoodItem = new FoodItem({
            name,
            foodUnit,
            unitPrice,
            foodCategoryId,
            organizationId,
        })
        await newFoodItem.save()
        res.status(200).json(newFoodItem)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const deleteFoodItem = async (req, res, next) => {
    const { foodItmId } = req.params
    try {
        const foodItemInstance = await FoodItem.findOne({ _id: foodItmId })
        if (!foodItemInstance) {
            const error = new Error(
                `food item with id ${foodItmId} was not found.`
            )
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        await FoodItem.deleteOne({ _id: foodItmId })

        res.status(204).send()
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const updateFoodItem = async (req, res, next) => {
    const { foodItmId } = req.params
    const { name, foodUnit, unitPrice, foodCategoryId, organizationId } =
        req.body
    const errors = validationResult(req)
    try {
        if (!errors.isEmpty()) {
            const error = new Error(
                'input validation failed, entered data is incorrect.'
            )
            error.statusCode = 422
            error.errors = errors.array()
            throw error
        }

        // check if FoodItem exists
        const foodItemInstance = await FoodItem.findOne({ _id: foodItmId })
        if (!foodItemInstance) {
            const error = new Error(
                `food item with id ${foodItmId} was not found.`
            )
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        foodItemInstance.name = name
        foodItemInstance.organizationId = organizationId
        foodItemInstance.foodUnit = foodUnit
        foodItemInstance.unitPrice = unitPrice
        foodItemInstance.foodCategoryId = foodCategoryId

        await foodItemInstance.save()

        res.status(200).json(foodItemInstance)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}
