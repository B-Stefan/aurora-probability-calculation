"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.predict = predict;

var _KpPredictionClass = require("./KpPredictionClass");

var _KpPredictionClass2 = _interopRequireDefault(_KpPredictionClass);

var _referenceData = require("./referenceData.json");

var _referenceData2 = _interopRequireDefault(_referenceData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultNetwork = new _KpPredictionClass2.default();

function predict(gLAt, kpIndex) {

    return defaultNetwork.train(_referenceData2.default).then(function () {
        return defaultNetwork.predict(gLAt, kpIndex);
    });
}