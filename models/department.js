import { Schema, model } from 'mongoose'

const DepartmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
        },
    },
    { timestamps: true }
)

export default model('Department', DepartmentSchema)
