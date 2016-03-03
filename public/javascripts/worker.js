/**
 * Created by Administrator on 2016/3/3.
 */

console.log('worker.js', self == this, self); // this : DedicatedWorkerGlobalScope
// console.log(globalVar) // globalVar is not defined.

// Note: Scripts may be downloaded in any order, but will be executed in the order in which you pass the filenames into importScripts() .
// This is done synchronously;
// importScripts() does not return until all the scripts have been loaded and executed.
//console.log(varInScript1, varInScript2);
importScripts('script1.js', 'script2.js');
console.log(varInScript1, varInScript2);

//!!! in Chrome, nested Worker cause error, Uncaughted ReferenceError: Worker is not defined.
var grandWorker = new Worker('worker2.js');

onmessage = function(e){
    "use strict";
    console.log('Got msg from main ', e.data);

    var startTime = new Date();
    console.log(startTime);
    var sum=0 ;
    for(var i=0; i<999999999; i++){  // !!! blocker codes
        sum += Math.sqrt(i)*Math.sqrt(i)*Math.sqrt(i)*Math.sqrt(i)*Math.sqrt(i);
    }
    console.log(sum, new Date()-startTime);  // timecost  3960

    postMessage(e.data.toString());


    grandWorker.onmessage = function(e){
        console.log('result from grandworker', e.data);
    }
    grandWorker.postMessage(['a', 'b', 'c']);

    close();
}