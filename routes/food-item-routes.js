import { Router } from 'express'
import { body } from 'express-validator'
import isValidObjectId from '../utils/validObjectId.js'

import * as foodItemControllers from '../controllers/food-item-controllers.js'

const router = Router()

router.post(
    '/',
    [
        body('name')
            .isLength({ min: 5 })
            .withMessage('name should be at least 5 characters in length'),
        body('foodUnit')
            .isLength({ min: 3 })
            .withMessage('unit should be at least 3 characters in length'),
        body('unitPrice').isInt().withMessage('price must be an integer'),
        body('foodCategoryId').custom((value) => {
            if (!isValidObjectId(value)) {
                throw new Error('invalid food category id provided')
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
    foodItemControllers.saveFoodItem
)

router.get('/:foodItmId', foodItemControllers.getFoodItem)

router.get('/', foodItemControllers.getAllFoodItems)

router.delete('/:foodItmId', foodItemControllers.deleteFoodItem)

router.put(
    '/:foodItmId',
    [
        body('name')
            .isLength({ min: 5 })
            .withMessage('name should be at least 5 characters in length'),
        body('foodUnit')
            .isLength({ min: 3 })
            .withMessage('unit should be at least 3 characters in length'),
        body('unitPrice').isInt().withMessage('price must be an integer'),
        body('foodCategoryId').custom((value) => {
            if (!isValidObjectId(value)) {
                throw new Error('invalid food category id provided')
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
    foodItemControllers.updateFoodItem
)

export default router
