import { Schema, model } from 'mongoose'

const OrganizationInfoSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
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

export default model('OrganizationInfo', OrganizationInfoSchema)
