"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = 1337;
// tslint:disable-next-line:no-console
app_1.default.listen(port, () => console.log(`App is listening on port ${port}`));
//# sourceMappingURL=index.js.map