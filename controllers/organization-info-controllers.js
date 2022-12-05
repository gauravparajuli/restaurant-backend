import { validationResult } from 'express-validator'

import OrganizationInfo from '../models/organization-info.js'

export const getOrganizationInfo = async (req, res, next) => {
    const { orgId } = req.params
    try {
        const orgInfo = await OrganizationInfo.findOne({ _id: orgId })
        if (!orgInfo) {
            const error = new Error(
                `organization with id ${orgId} was not found.`
            )
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        res.status(200).json(orgInfo)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const saveOrganizationInfo = async (req, res, next) => {
    const { name, address, phone } = req.body
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

        const newOrg = new OrganizationInfo({ name, address, phone })
        await newOrg.save()
        res.status(200).json(newOrg)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const deleteOrganizationInfo = async (req, res, next) => {
    const { orgId } = req.params
    try {
        const orgInfo = await OrganizationInfo.findOne({ _id: orgId })
        if (!orgInfo) {
            const error = new Error(
                `organization with id ${orgId} was not found.`
            )
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        await OrganizationInfo.deleteOne({ _id: orgId })

        res.status(204).send()
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}

export const updateOrganizationInfo = async (req, res, next) => {
    const { orgId } = req.params
    const { name, address, phone } = req.body
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

        // check if organization exists
        const orgInfo = await OrganizationInfo.findOne({ _id: orgId })
        if (!orgInfo) {
            const error = new Error(
                `organization with id ${orgId} was not found.`
            )
            error.statusCode = 404
            throw error
        }

        // check if current user is authorized to access this info here

        orgInfo.name = name
        orgInfo.address = address
        orgInfo.phone = phone

        await orgInfo.save()

        res.status(200).json(orgInfo)
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err) // pass to error handling express middleware
    }
}
