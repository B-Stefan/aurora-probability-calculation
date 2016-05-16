"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _geomagnaticToKpIndexConverter = require("geomagnatic-to-kp-index-converter");

var _nodeSvm = require("node-svm");

var _nodeSvm2 = _interopRequireDefault(_nodeSvm);

var _stringifyObject = require("stringify-object");

var _stringifyObject2 = _interopRequireDefault(_stringifyObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KpPredictionClass = function () {
    function KpPredictionClass() {
        _classCallCheck(this, KpPredictionClass);

        var options = {
            gamma: [0.125, 0.5, 1],
            c: [8, 16, 32],
            epsilon: [0.001, 0.125, 0.5],
            normalize: true, // (default)
            reduce: true, // (default)
            retainedVariance: 0.995,
            kFold: 5
        };

        this.svm = new _nodeSvm2.default.EpsilonSVR(options);
    }

    _createClass(KpPredictionClass, [{
        key: "train",
        value: function train(referenceData) {
            var trainData = this.transformReferencData(referenceData);

            if (typeof this.trainPromise == "undefined") {
                this.trainPromise = this.svm.train(trainData).progress(function (progress) {
                    //console.log('training progress: %d%', Math.round(progress*100));
                }).spread(function (model, report) {
                    //console.log('SVM trained. \nReport :\n%s', so(report));
                });
            }
            return this.trainPromise;
        }
    }, {
        key: "transformReferencData",
        value: function transformReferencData(referenceData) {
            /**
            * Output => [
              [gLat, kpIndex], probability],
              [gLat, kpIndex], probability],...
            ]
            *
            */
            var transformed = referenceData.map(function (town) {
                return town.values.map(function (townValues) {
                    return [[town.geoMagLat, townValues.kp], townValues.probability];
                });
            });
            //flattern
            return [].concat.apply([], transformed);
        }
    }, {
        key: "calculateRequiredKpIndex",
        value: function calculateRequiredKpIndex(gLat) {
            return (0, _geomagnaticToKpIndexConverter.GeomagneticLatToKPIndex)(gLat);
        }

        /**
        * @public
        */

    }, {
        key: "predict",
        value: function predict(gLat, kpIndex) {

            return this.svm.predictSync([gLat, kpIndex]);
        }
    }]);

    return KpPredictionClass;
}();

exports.default = KpPredictionClass;