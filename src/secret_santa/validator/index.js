"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class PlayerValidator {
    validateRegisterPlayer() {
        return [
            express_validator_1.body('name')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isAlpha()
                .withMessage("Name should contain only letters"),
            express_validator_1.body('lastName')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isAlpha()
                .withMessage("Lastname should contain only letters"),
            express_validator_1.body('wishes')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isArray({
                min: 1,
                max: 10
            })
                .withMessage("Should be array of strings within length from 1 to 10")
        ];
    }
    validateIdParam() {
        return [
            express_validator_1.param('id')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isUUID(4)
                .withMessage('The value should be UUID v4'),
        ];
    }
}
exports.default = new PlayerValidator();
//# sourceMappingURL=index.js.map