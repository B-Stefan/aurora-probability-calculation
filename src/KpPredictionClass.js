import {GeomagneticLatToKPIndex} from "geomagnatic-to-kp-index-converter"
import svm from "node-svm"
import so from "stringify-object"
export default class KpPredictionClass {


  constructor(){

    const options = {
        gamma: [0.125, 0.5, 1],
        c: [8, 16, 32],
        epsilon: [0.001, 0.125, 0.5],
        normalize: true, // (default)
        reduce: true, // (default)
        retainedVariance: 0.995,
        kFold: 5
      }

    this.svm = new svm.EpsilonSVR(options);

  }

  train(referenceData){
      console.log(referenceData)
      const trainData = this.transformReferencData(referenceData)
      this.svm.train(trainData)
      .progress((progress)=>{
         console.log('training progress: %d%', Math.round(progress*100));
      }).spread(function (model, report) {
          console.log('SVM trained. \nReport :\n%s', so(report));
      });
  }
  transformReferencData(referenceData){
      /**
      * Output => [
        [gLat, kpIndex], probability],
        [gLat, kpIndex], probability],...
      ]
      *
      */
      const transformed =  referenceData.map((town)=>{
          return town.values.map((townValues)=>{
              return [[town.geoMagLat, townValues.kp],townValues.probability]
          })
      })
      //flattern
      return [].concat.apply([],transformed);
  }
  calculateRequiredKpIndex(gLat){
      return GeomagneticLatToKPIndex(gLat)
  }

  /**
  * @public
  */
  predict(gLat, kpIndex){

    return this.svm.predictSync([gLat,kpIndex]);
  }
}
