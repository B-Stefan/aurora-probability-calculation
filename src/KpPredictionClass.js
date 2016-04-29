import {GeomagneticLatToKPIndex} from "geomagnatic-to-kp-index-converter"
import brain from "brain"
import so from "stringify-object"
export default class KpPredictionClass {


  constructor(){

    this.net = new brain.NeuralNetwork({
      hiddenLayers:[128,64]
    });

  }

  train(referenceData){

      const trainOptions = {
        errorThresh: 0.005,  // error threshold to reach
        iterations: 20000,   // maximum training iterations
        log: true,           // console.log() progress periodically
        logPeriod: 1000,       // number of iterations between logging
        learningRate: 0.6    // learning rate
      }
      const trainData = this.transformReferencData(referenceData)
      console.log(so(trainData))
      if(typeof this.trainPromise == "undefined"){
        this.trainPromise = new Promise ((resolve,reject)=>{
            let result = this.net.train(trainData,trainOptions)
            console.log(so(result))
            resolve(result)
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
              return {input:[town.geoMagLat, townValues.kp], output: [townValues.probability]}
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

    return this.net.run([gLat,kpIndex]);
  }
}
