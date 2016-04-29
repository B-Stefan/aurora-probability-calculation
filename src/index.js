import KpPredictionClass from "./KpPredictionClass"
import referenceData from "./referenceData.json"
const defaultNetwork = new KpPredictionClass();

export function predict(gLAt, kpIndex){

    return defaultNetwork.train(referenceData).then(()=>{
        return defaultNetwork.predict(gLAt, kpIndex)
    })

}
