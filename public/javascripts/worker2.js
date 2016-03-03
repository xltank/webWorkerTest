/**
 * Created by Administrator on 2016/3/3.
 */

console.log('worker2.js', this); // this : DedicatedWorkerGlobalScope

onmessage = function(e){
    "use strict";
    console.log('Got msg from worker ', e.data);

    var startTime = new Date();
    console.log(startTime);
    var sum=0 ;
    for(var i=0; i<999999999; i++){  // !!! blocker codes
        sum += Math.sqrt(i)*Math.sqrt(i)*Math.sqrt(i)*Math.sqrt(i)*Math.sqrt(i);
    }
    console.log(sum, new Date()-startTime);  // timecost  3966

    postMessage(e.data.toString());
}