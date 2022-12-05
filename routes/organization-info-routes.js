import { Router } from 'express'
import { body } from 'express-validator'

import * as orgInfoControllers from '../controllers/organization-info-controllers.js'

const router = Router()

router.post(
    '/',
    [
        body('name')
            .isLength({ min: 5 })
            .withMessage('name should be at least 5 characters in length'),
        body('address')
            .isLength({ min: 5 })
            .withMessage('address should be at least 5 characters in length'),
        body('phone')
            .isLength({ min: 5 })
            .withMessage('phone should be at least 5 characters in length'),
    ],
    orgInfoControllers.saveOrganizationInfo
)

router.get('/:orgId', orgInfoControllers.getOrganizationInfo)

router.delete('/:orgId', orgInfoControllers.deleteOrganizationInfo)

router.put(
    '/:orgId',
    [
        body('name')
            .isLength({ min: 5 })
            .withMessage('name should be at least 5 characters in length'),
        body('address')
            .isLength({ min: 5 })
            .withMessage('address should be at least 5 characters in length'),
        body('phone')
            .isLength({ min: 5 })
            .withMessage('phone should be at least 5 characters in length'),
    ],
    orgInfoControllers.updateOrganizationInfo
)

export default router
