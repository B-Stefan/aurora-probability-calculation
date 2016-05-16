
"use strict";
const Canvas = require('canvas')
  , boot = require("./bootstrap")
  , canvas = new Canvas(800, 800)
  , canvas2 = new Canvas(800, 800)
  , ctx = canvas.getContext('2d')
  , ctx2 = canvas.getContext('2d')
  , Chart = require('nchart')
  , fs = require('fs')
  , testData  = require("./src/referenceData.json"),
  testData2 = require("./test/testData.json");

const predict = require("./src/index").predict

function randomRGB(){
  return [
        (Math.floor(Math.random() * 256)),
        (Math.floor(Math.random() * 256)),
        (Math.floor(Math.random() * 256))]
}

let dataset = testData.map((town)=>{
  let data =  town.values.map((value)=>{return value.probability*100})
  let rgb = randomRGB()
  return {
    label: town.label,
    fillColor: "rgba(" + rgb.join(",") + ",0)",
    strokeColor: "rgba(" + rgb.join(",") + ",0.5)",
    highlightFill: "rgba(" + rgb.join(",") + ".75)",
    highlightStroke: "rgba(" + rgb.join(",") + ",1)",
    data: data
  }

})
const labels = testData[0].values.map((value)=>{return value.kp})

const options = {
    scaleShowValues: true,
    scaleFontSize: 24
  }

const dataset2 = []
const labels2 = []
for(let i=0; i<90; i++){
    labels.push(i)
    predict(i,4).then((result)=>{
      dataset2.push(result*100)
    })
}

new Chart(ctx).Line({
    labels: labels,
    datasets:dataset
  }, options
);

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/pie.png', buf);
});






new Chart(ctx2).Line({
    labels: labels2,
    datasets:dataset2
  }, options
);

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/pie.png', buf);
});


canvas2.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/line.png', buf);
});
