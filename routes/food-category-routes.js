import { Router } from 'express'
import { body } from 'express-validator'
import isValidObjectId from '../utils/validObjectId.js'

import * as categoryControllers from '../controllers/food-category-controllers.js'

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
    categoryControllers.saveCategory
)

router.get('/:catId', categoryControllers.getCategory)

router.get('/', categoryControllers.getAllCategorys)

router.delete('/:catId', categoryControllers.deleteCategory)

router.put(
    '/:catId',
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
    categoryControllers.updateCategory
)

export default router
