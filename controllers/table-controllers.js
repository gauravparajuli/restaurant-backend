import { validationResult } from 'express-validator'

import Table from '../models/table.js'

export const getTable = async (req, res, next) => {
    const { tableId } = req.params
    try {
        const tableInstance = await Table.findOne({ _id: tableId })
        if (!tableInstance) {
            const error = new Error(`table with id ${tableId} was not found.`)
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        res.status(200).json(tableInstance)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const getAllTables = async (req, res, next) => {
    try {
        const tableList = await Table.find({})

        // check if current user is authorized to access this info here

        res.status(200).json(tableList)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const saveTable = async (req, res, next) => {
    const { name, departmentId, organizationId } = req.body
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

        const newTable = new Table({ name, organizationId, departmentId })
        await newTable.save()
        res.status(200).json(newTable)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const deleteTable = async (req, res, next) => {
    const { tableId } = req.params
    try {
        const tableInstance = await Table.findOne({ _id: tableId })
        if (!tableInstance) {
            const error = new Error(`table with id ${tableId} was not found.`)
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        await Table.deleteOne({ _id: tableId })

        res.status(204).send()
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const updateTable = async (req, res, next) => {
    const { tableId } = req.params
    const { name, organizationId, departmentId } = req.body
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

        // check if Table exists
        const tableInstance = await Table.findOne({ _id: tableId })
        if (!tableInstance) {
            const error = new Error(`table with id ${tableId} was not found.`)
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        tableInstance.name = name
        tableInstance.organizationId = organizationId
        tableInstance.departmentId = departmentId

        await tableInstance.save()

        res.status(200).json(tableInstance)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}
