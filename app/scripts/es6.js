// Module "Calc" {
  class Calc {
    constructor(){
      console.log('Calc constructor');
    }
    add(a, b){
      return a + b;
    }
  }

//   export default Calc
// }

// import {Calc} from "Calc";
var c = new Calc();
console.log(c.add(4,5));
