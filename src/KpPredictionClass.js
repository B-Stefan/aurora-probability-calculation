import {GeomagneticLatToKPIndex} from "geomagnatic-to-kp-index-converter"
import convnetjs from "convnetjs"
import so from "stringify-object"
export default class KpPredictionClass {


  constructor(){


    let layer_defs = [];
    layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:2});
    layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
    layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
    layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
    layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
    layer_defs.push({type:'fc', num_neurons:10, activation:'sigmoid'});
    layer_defs.push({type:'regression', num_neurons:1});

    this.net = new convnetjs.Net();
    this.net.makeLayers(layer_defs);

    this.trainer = new convnetjs.Trainer(this.net, {method: 'adagrad', l2_decay: 0.001,batch_size: 10});


  }

  train(referenceData){
      console.log(referenceData)
      const trainData = this.transformReferencData(referenceData)

      if(typeof this.trainPromise == "undefined"){
        this.trainPromise = new Promise((resolve,reject)=>{

          let avgCosts = 0;
          for(var i = 0 ; i<20000; i++){
            trainData.forEach((trainDataEntry)=>{
                let vol =  new convnetjs.Vol(trainDataEntry.input);
                let costs= this.trainer.train(vol,[trainDataEntry.output])
                avgCosts +=costs.cost_loss
            })
          }

          avgCosts = avgCosts / (trainData.length * 500)
          console.log(avgCosts)
          resolve();
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
              return {input:[town.geoMagLat, townValues.kp],output: townValues.probability*100}
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

    var vol = new convnetjs.Vol([gLat, kpIndex]);

    return this.net.forward(vol).w[0]/100;
  }
}
