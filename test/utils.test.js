import isValidObjectId from '../utils/validObjectId'

describe('test all of the utility functions', () => {
    test('isValidObjectId', () => {
        expect(isValidObjectId(123)).toEqual(false)
        expect(isValidObjectId('gaurav')).toEqual(false)
        expect(isValidObjectId('gauravgaurav')).toEqual(false)
        expect(isValidObjectId('638dd4271f96291623cdb7b0')).toEqual(true)
    })
})
