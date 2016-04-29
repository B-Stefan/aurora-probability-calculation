import {GeomagneticLatToKPIndex} from "geomagnatic-to-kp-index-converter"
import {Architect, Trainer} from "synaptic"
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

    this.net = new Architect.LSTM(2,6,8,4,1);
    this.trainer  = new Trainer(this.net);

  }

  train(referenceData){
      const trainData = this.transformReferencData(referenceData)

      const defaults = {
        iterations: 50000,
        log: true,
        shuffle: true,
        cost: Trainer.cost.BINARY
      }

      if(typeof this.trainPromise == "undefined"){
        this.trainPromise = new Promise((resolve,reject)=>{
          const result = this.trainer.train(trainData,defaults)
          so(result)
          resolve()
        })
      }
      return this.trainPromise



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
              return {input:[town.geoMagLat, townValues.kp] , output:[townValues.probability] }
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

    return this.net.activate([gLat,kpIndex]);
  }
}
