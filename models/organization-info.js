import { Schema, model } from 'mongoose'

const InfoSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default model('Info', InfoSchema)
