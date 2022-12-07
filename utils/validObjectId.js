import mongoose from 'mongoose'
const objectId = mongoose.Types.ObjectId

const isValidObjectId = (id) => {
    if (objectId.isValid(id)) {
        if (objectId(id).toString() == id) return true
    }
    return false
}

export default isValidObjectId
