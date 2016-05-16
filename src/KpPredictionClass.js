import {GeomagneticLatToKPIndex} from "geomagnatic-to-kp-index-converter"
import smr from "smr"
import so from "stringify-object"
export default class KpPredictionClass {


  constructor(){

    const options = {
        numX:2,
        numY:1
      }

    this.smr =new smr.Regression(options)

  }

  train(referenceData){
      const trainData = this.transformReferencData(referenceData);

      if(typeof this.trainPromise == "undefined"){
        this.trainPromise = new Promise((resolve, reject)=>{

            trainData.forEach((item)=>{
              console.log(item)
                this.smr.push(item)
            });

            console.log(this.smr.calculateCoefficients());
            resolve()
        });
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
              return {x: [town.geoMagLat, townValues.kp], y: [townValues.probability]}
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

    return this.smr.hypothesize({x: [gLat,kpIndex]})[0];
  }
}
