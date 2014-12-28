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
var refreshStream = Rx.Observable.fromEvent(refreshBtn, 'click');

var requestonRefreshStream = refreshStream
  .map(function(){
    var offset = Math.floor(Math.random()*500)
    return 'https://api.github.com/users?since='+offset
  });

var startupStream = Rx.Observable.just('https://api.github.com/users');
var reqStream = Rx.Observable.merge(requestonRefreshStream, startupStream);

var resStream = reqStream
  .flatMap(function(url) {
    return Rx.Observable.fromPromise($.getJSON(url));
  })

resStream.subscribe(function(response) {
  users = response.splice(0,3)
  var usersHolder = $('.gh-users')
  usersHolder.empty();
  $(users).each(function(index, user) {
    usersHolder.append($('<li/>').html(user['login']));
  });
});


