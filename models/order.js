import { Schema, model } from 'mongoose'

const OrderSchema = new Schema(
    {
        organizationId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        orderItems: [
            {
                orderItem: Schema.Types.ObjectId,
                orderItemName: String,
                orderItemUnitPrice: Number,
                orderItemQuantity: Number,
                modifier: String,
                orderSubTotal: Number,
            },
        ],
        table: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        orderTotal: {
            type: Number,
            default: 0,
        },
        isInvoiceGenerated: {
            type: Boolean,
            default: false,
        },
        isOrderSettled: {
            type: Boolean,
            default: false,
        },
        isOrderPrepared: {
            type: Boolean,
            default: false,
        },
        isTakeout: {
            type: Boolean,
            default: false,
        },
        discountPercentage: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

export default model('Order', OrderSchema)
