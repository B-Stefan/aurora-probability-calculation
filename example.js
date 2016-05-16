import {predict} from "./src/index"

const gLat = 55.60; // Geomagnatic latitude Malmö, Schweden , see https://en.wikipedia.org/wiki/Geomagnetic_lat
const kpIndex = 6; // Kp Index see  http://www.swpc.noaa.gov/products/planetary-k-index

predict(gLat,kpIndex).then((result)=>{
  console.log("Probability for the gLat " + gLat + " and kpIndex of: " + kpIndex + " is ===> ", result)
}).catch((e)=>{
  console.error(e)
});
