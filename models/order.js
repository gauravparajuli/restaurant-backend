import { Schema, model } from 'mongoose'

const OrderSchema = new Schema(
    {
        organizationId: {
            type: Schema.Types.ObjectId,
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
        },
        orderTotal: {
            type: Number,
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
        },
    },
    { timestamps: true }
)

export default model('Order', OrderSchema)
