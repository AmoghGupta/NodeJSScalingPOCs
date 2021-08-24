"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoDataException = void 0;
const common_1 = require("@nestjs/common");
class NoDataException extends common_1.HttpException {
    constructor() {
        super('No data found.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.NoDataException = NoDataException;
//# sourceMappingURL=norecord.exception.js.map