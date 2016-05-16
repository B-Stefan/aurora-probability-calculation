# aurora-probability-calculation
A library to predict the probability of an aurora boreales event in the future.


#Example


```javascript


import {predict} from "aurora-probability-calculation"

const gLat = 55.60; // Geomagnatic latitude Malmö, Schweden , see https://en.wikipedia.org/wiki/Geomagnetic_lat
const kpIndex = 6; // Kp Index see  http://www.swpc.noaa.gov/products/planetary-k-index

predict(gLat,kpIndex).then((result)=>{
  console.log("Probability for the gLat " + gLat + " and kpIndex of: " + kpIndex + " is ===> ", result)
}).catch((e)=>{
  console.error(e)
});

//Output: Probability for the gLat 55.6 and kpIndex of: 6 is ===>  0.8988385082835078


```

#Licence

* MIT
