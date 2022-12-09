import { validationResult } from 'express-validator'

import Category from '../models/food-category.js'

export const getCategory = async (req, res, next) => {
    const { catId } = req.params
    try {
        const categoryInstance = await Category.findOne({ _id: catId })
        if (!categoryInstance) {
            const error = new Error(`category with id ${catId} was not found.`)
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        res.status(200).json(categoryInstance)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const getAllCategorys = async (req, res, next) => {
    try {
        const categoryList = await Category.find({})

        // check if current user is authorized to access this info here

        res.status(200).json(categoryList)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const saveCategory = async (req, res, next) => {
    const { name, organizationId } = req.body
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

        const newCategory = new Category({ name, organizationId })
        await newCategory.save()
        res.status(200).json(newCategory)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const deleteCategory = async (req, res, next) => {
    const { catId } = req.params
    try {
        const categoryInstance = await Category.findOne({ _id: catId })
        if (!categoryInstance) {
            const error = new Error(`category with id ${catId} was not found.`)
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        await Category.deleteOne({ _id: catId })

        res.status(204).send()
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const updateCategory = async (req, res, next) => {
    const { catId } = req.params
    const { name, organizationId } = req.body
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

        // check if Category exists
        const categoryInstance = await Category.findOne({ _id: catId })
        if (!categoryInstance) {
            const error = new Error(`category with id ${catId} was not found.`)
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        categoryInstance.name = name
        categoryInstance.organizationId = organizationId

        await categoryInstance.save()

        res.status(200).json(categoryInstance)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}
