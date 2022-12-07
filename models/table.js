import { Schema, model } from 'mongoose'

const TableSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        departmentId: {
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

export default model('Table', TableSchema)
