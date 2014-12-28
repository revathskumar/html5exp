// This is a file copied by your subgenerator

var button = document.querySelector('.btn-success')
var clickStream = Rx.Observable.fromEvent(button, 'click')

singleClickStream = clickStream
  .buffer(function(){ return clickStream.throttle(250)})
  .map(function(list){ return list.length })
  .filter(function(x){ return x === 1 })

doubleClickStream = clickStream
  .buffer(function(){ return clickStream.throttle(250)})
  .map(function(list){ return list.length })
  .filter(function(x){ return x == 2 })

singleClickStream.subscribe(function(){
  holder = document.querySelector('.single-count');
  holder.innerHTML = parseInt(holder.innerHTML) + 1;
  return false;
});

doubleClickStream.subscribe(function(){
  holder = document.querySelector('.double-count');
  holder.innerHTML = parseInt(holder.innerHTML) + 1;
  return false;
});


// var throttle = (function () {
//   'use strict';

//   var timeWindow = 500; // time in ms
//   var lastExecution = new Date((new Date()).getTime() - timeWindow);
//   var count = 1;

//   var throttle = function (co) {
//     console.log('Hellooooo: ', co );
//   };

//   return function () {
//     if ((lastExecution.getTime() + timeWindow) <= (new Date()).getTime()) {
//       lastExecution = new Date();
//       var co = count;
//       count = 1;
//       return throttle.apply(this, [co]);
//     }else{
//       count += 1;
//       console.log('count increment to ', count);
//     }
//   };
// }());


// var button = document.querySelector('.btn-success')
// button.addEventListener('click', function(e){
//   console.log('clicked');
//   throttle();
//   e.preventDefault();
//   e.stopPropagation();
// });


var refreshBtn = document.querySelector('.refresh');
var close1Btn = document.querySelector('.close1');
var close2Btn = document.querySelector('.close2');
var close3Btn = document.querySelector('.close3');

var refreshStream = Rx.Observable.fromEvent(refreshBtn, 'click');

var close1Stream = Rx.Observable.fromEvent(close1Btn, 'click');
var close2Stream = Rx.Observable.fromEvent(close2Btn, 'click');
var close3Stream = Rx.Observable.fromEvent(close3Btn, 'click');

var reqStream = refreshStream.startWith('startup click')
  .map(function(e){
    if(typeof e == 'object'){
      e.preventDefault();
    }
    console.log(typeof e);
    var offset = Math.floor(Math.random()*500)
    return 'https://api.github.com/users'
  })

var resStream = reqStream
  .flatMap(function(url) {
    return Rx.Observable.fromPromise($.getJSON(url));
  })

var createCloseStream = function(cs){
  return cs.startWith('startup click')
  .combineLatest(resStream, function(e, users){
    if(typeof e == 'object'){
      e.preventDefault();
    }
    return users[Math.floor(Math.random()*users.length)];
  })
  .merge(
    refreshStream.map(function() { return null;})
  )
  .startWith(null);
};

var sug1Stream = createCloseStream(close1Stream)
var sug2Stream = createCloseStream(close2Stream)
var sug3Stream = createCloseStream(close3Stream)

var appendLi = function(suggestion, ele) {
  if(suggestion == null) {
    ele.addClass('force-hide');
    ele.find('.login').empty()
  }else{
    ele.removeClass('force-hide');
    ele.find('.login').html(suggestion['login']);
  }
}

sug1Stream.subscribe(function(suggestion) {
  // console.log(suggestion);
  appendLi(suggestion, $('.gh-users .user1' ))
});

sug2Stream.subscribe(function(suggestion) {
  appendLi(suggestion, $('.gh-users .user2' ))
});

sug3Stream.subscribe(function(suggestion) {
  appendLi(suggestion, $('.gh-users .user3' ))
});

