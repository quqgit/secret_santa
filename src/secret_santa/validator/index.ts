import { body, param } from 'express-validator';

class PlayerValidator {
    validateRegisterPlayer () {
        return [
            body('name')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isAlpha()
                .withMessage("Name should contain only letters"),
            body('lastName')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isAlpha()
                .withMessage("Lastname should contain only letters"),
            body('wishes')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isArray({
                    min: 1,
                    max: 10
                })
                .withMessage("Should be array of strings within length from 1 to 10")
        ]
    }

    validateIdParam () {
        return [
            param('id')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isUUID(4)
                .withMessage('The value should be UUID v4'),
        ]
    }
}

export default new PlayerValidator()
