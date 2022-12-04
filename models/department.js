import { Schema, model } from 'mongoose'

const DepartmentSchema = new Schema(
    {
        label: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default model('Department', DepartmentSchema)
