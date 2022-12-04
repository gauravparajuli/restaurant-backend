import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        userType: {
            type: String,
            enum: ['Manager', 'Waiter', 'Chef'],
        },
        password: {
            type: String,
            required: true,
        },
        isAdminUser: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        resetToken: {
            type: String,
        },
        resetTokenValidTill: {
            type: Date,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
        },
    },
    { timestamps: true }
)

export default model('User', UserSchema)
