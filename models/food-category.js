import { Schema, model } from 'mongoose'

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
)

export default model('Category', CategorySchema)
