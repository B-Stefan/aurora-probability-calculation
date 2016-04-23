require("babel-core/register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: function(filename) {

    if(filename.indexOf("geomagnatic-to-kp-index-converter")>-1){
      return false;
    }
    return false
  }
});
