import KpPredictionClass from "./../src/KpPredictionClass"
import referenceData from "./../src/referenceData.json"
import testData from "./testData.json"

import {expect} from "chai"


function calculateRange(probability){
  return {
    "min": probability - 0.1,
    "max": probability + 0.1
  }
}

function roundResult (result){
  return Math.round(result*100)/100;
}

describe("KpPredictionClass", function() {
  describe("Constructor", function() {

  });

describe("Prediction excat probability", function() {

      const instance = new KpPredictionClass();



      before(function(){
        return instance.train(referenceData);
      })

      describe("Test with referenceData ", function() {
        referenceData.forEach((testTown)=>{

          describe("Test the values for " + testTown.label, function() {
            testTown.values.forEach((testEntry)=>{
              it("should return the probability: " + testEntry.probability + " for the kpIndex:" + testEntry.kp, ()=>{

                  const result = instance.predict(testTown.geoMagLat,testEntry.kp);
                  const range = calculateRange(testEntry.probability)
                  expect(roundResult(result)).to.be.within(range.min, range.max);
              })
            })
          })
        })
      })

      describe("Test with seperate testData ", function() {
        testData.forEach((testTown)=>{

          describe("Test the values for " + testTown.label, function() {
            testTown.values.forEach((testEntry)=>{
              it("should return the probability: " + testEntry.probability + " for the kpIndex:" + testEntry.kp, ()=>{

                  const result = instance.predict(testTown.geoMagLat,testEntry.kp);
                  const range = calculateRange(testEntry.probability)
                  expect(roundResult(result)).to.be.within(range.min, range.max);
              })
            })
          })
        })
      })




    })
})
