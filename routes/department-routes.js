import { Router } from 'express'
import { body } from 'express-validator'
import isValidObjectId from '../utils/validObjectId.js'

import * as departControllers from '../controllers/department-controllers.js'

const router = Router()

router.post(
    '/',
    [
        body('name')
            .isLength({ min: 5 })
            .withMessage('name should be at least 5 characters in length'),
        body('organizationId').custom((value) => {
            if (!isValidObjectId(value)) {
                throw new Error('invalid organization id provided')
            }
            return true
        }),
    ],
    departControllers.saveDepartment
)

router.get('/:departId', departControllers.getDepartment)

router.get('/', departControllers.getAllDepartments)

router.delete('/:departId', departControllers.deleteDepartment)

router.put(
    '/:departId',
    [
        body('name')
            .isLength({ min: 5 })
            .withMessage('name should be at least 5 characters in length'),
        body('organizationId').custom((value) => {
            if (!isValidObjectId(value)) {
                throw new Error('invalid organization id provided')
            }
            return true
        }),
    ],
    departControllers.updateDepartment
)

export default router
