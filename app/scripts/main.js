/* global Aplus */
'use strict';
var add = function(cb, val){
    setTimeout(function(){
        cb(outPut, val + 1);
    }, 5000);
};

var multiply = function(cb, val){
    setTimeout(function(){
        cb(val * 5);
    }, 5000);
};

var outPut = function(val){
    console.log(val);
};

// var onError = outPut;

var onError = function(msg){
  console.error(msg);
};

add(multiply, 2);

var promiseAdd = function(val){
    var promise = new Aplus();
    setTimeout(function(){
        promise.fulfill(val + 1);
    }, 5000);
    return promise;
};

var promiseMultiply = function(val){
    var promise = new Aplus();
    setTimeout(function(){
        promise.fulfill(val * 5);
    }, 5000);
    return promise;
};

var promiseDivide = function(val){
    var promise = new Aplus();
    if(val === 0){
        promise.reject('Error');
    }
    setTimeout(function(){
        promise.fulfill(val / 2);
    }, 5000);
    return promise;
};

promiseAdd(2)
  .then(promiseMultiply)
  .then(promiseDivide)
  .then(outPut)
  .then(undefined, onError);

var add = function(cb, val){
    setTimeout(function(){
        cb(outPut, val + 1);
    }, 5000);
};

$.when(function(){
    console.log('Hello Promise');
})
.then(function(){
    console.log('Success1');
}, function(){
    console.log('Error1');
})
.then(function(){
    console.log('Success2');
}, function(){
    console.log('Error2');
});


