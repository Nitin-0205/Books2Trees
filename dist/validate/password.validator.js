"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPasswordValid = void 0;
const class_validator_1 = require("class-validator");
function IsPasswordValid(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value) {
                    if (!value) {
                        this.error = 'Empty password';
                        return false;
                    }
                    const result = value;
                    if (result.score === 0) {
                        this.error = 'Password is too weak';
                        return false;
                    }
                    return true;
                },
                defaultMessage() {
                    return this.error || 'Something went wrong';
                }
            },
        });
    };
}
exports.IsPasswordValid = IsPasswordValid;
//# sourceMappingURL=password.validator.js.map