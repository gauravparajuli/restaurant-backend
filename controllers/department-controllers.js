import { validationResult } from 'express-validator'

import Department from '../models/department.js'

export const getDepartment = async (req, res, next) => {
    const { departId } = req.params
    try {
        const departInstance = await Department.findOne({ _id: departId })
        if (!departInstance) {
            const error = new Error(
                `department with id ${departId} was not found.`
            )
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        res.status(200).json(departInstance)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const getAllDepartments = async (req, res, next) => {
    try {
        const departList = await Department.find({})

        // check if current user is authorized to access this info here

        res.status(200).json(departList)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const saveDepartment = async (req, res, next) => {
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

        const newDepart = new Department({ name, organizationId })
        await newDepart.save()
        res.status(200).json(newDepart)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const deleteDepartment = async (req, res, next) => {
    const { departId } = req.params
    try {
        const departInstance = await Department.findOne({ _id: departId })
        if (!departInstance) {
            const error = new Error(
                `department with id ${departId} was not found.`
            )
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        await Department.deleteOne({ _id: departId })

        res.status(204).send()
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const updateDepartment = async (req, res, next) => {
    const { departId } = req.params
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

        // check if department exists
        const departInstance = await Department.findOne({ _id: departId })
        if (!departInstance) {
            const error = new Error(
                `department with id ${departId} was not found.`
            )
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        departInstance.name = name
        departInstance.organizationId = organizationId

        await departInstance.save()

        res.status(200).json(departInstance)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}
