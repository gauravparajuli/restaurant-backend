import { Schema, model } from 'mongoose'

const TableSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        departmentId: {
            type: Schema.Types.ObjectId,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
        },
    },
    { timestamps: true }
)

export default model('Table', TableSchema)
