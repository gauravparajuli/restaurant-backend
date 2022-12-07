import { Schema, model } from 'mongoose'

const FoodMenuSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        foodUnit: {
            type: String,
            required: true,
        },
        unitPrice: {
            type: Number,
            required: true,
        },
        foodCategoryId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
)

export default model('FoodMenu', FoodMenuSchema)
