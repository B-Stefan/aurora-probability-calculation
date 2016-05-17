# aurora-probability-calculation
A library to get the probability of an northern light event for a specific location and a given [kpIndex]( http://www.swpc.noaa.gov/products/planetary-k-index) 
#Installation 

```
  npm install aurora-probability-calculation
```

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


#Prediction method
I tried several solutions all based on some kind of learning algorithm for example you find in this repository implementations of the following libaries: 

* Brain-js - A very simple neuronal network  [Branch:feature-brain-js](https://github.com/B-Stefan/aurora-probability-calculation/tree/feature-brain-js)
* convnetjs - More complex neuronal network libary  [Branch:feature-convnetjs](https://github.com/B-Stefan/aurora-probability-calculation/tree/feature-convnetjs)
* smr - multiple regression lib   [Branch:feature-smr](https://github.com/B-Stefan/aurora-probability-calculation/tree/feature-smr)
* synaptic - good neuronal network lib  [Branch:feature-synaptic](https://github.com/B-Stefan/aurora-probability-calculation/tree/feature-synaptic)



#Licence

* MIT
