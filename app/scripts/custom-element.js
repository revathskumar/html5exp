'use strict';
var proto = Object.create(HTMLElement.prototype);
proto.foo = function(){
  console.log('Foo');
};

proto.bar = 5;

proto.createdCallback = function () {
  console.log('Created');
  this.addEventListener('click', function() {
    console.log('click');
    console.log(this);
    this.foo();
    console.log(this.bar);
  });
};

proto.attachedCallback = function () {
  console.log('Attached');
  this.innerHTML = document.querySelector('#jumbo').innerHTML;
};

proto.detachedCallback = function (){
  console.log('detached');
};

var jumbo = document.registerElement('jumbo-tron', {
  prototype: proto
});


// Using Custom Elements
var j = new jumbo();

document.querySelector('.container').appendChild(j);

setTimeout(function(){
  j.remove();
}, 5000);
