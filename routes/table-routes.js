import { Router } from 'express'
import { body } from 'express-validator'
import isValidObjectId from '../utils/validObjectId.js'

import * as tableControllers from '../controllers/table-controllers.js'

const router = Router()

router.post(
    '/',
    [
        body('name')
            .isLength({ min: 5 })
            .withMessage('name should be at least 5 characters in length'),
        body('departmentId').custom((value) => {
            if (!isValidObjectId(value)) {
                throw new Error('invalid department id provided')
            }
            return true
        }),
        body('organizationId').custom((value) => {
            if (!isValidObjectId(value)) {
                throw new Error('invalid organization id provided')
            }
            return true
        }),
    ],
    tableControllers.saveTable
)

router.get('/:tableId', tableControllers.getTable)

router.get('/', tableControllers.getAllTables)

router.delete('/:tableId', tableControllers.deleteTable)

router.put(
    '/:tableId',
    [
        body('name')
            .isLength({ min: 5 })
            .withMessage('name should be at least 5 characters in length'),
        body('departmentId').custom((value) => {
            if (!isValidObjectId(value)) {
                throw new Error('invalid department id provided')
            }
            return true
        }),
        body('organizationId').custom((value) => {
            if (!isValidObjectId(value)) {
                throw new Error('invalid organization id provided')
            }
            return true
        }),
    ],
    tableControllers.updateTable
)

export default router
