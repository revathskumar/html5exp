
__hasProp = Object.prototype.hasOwnProperty;

__extends = function(child, parent) {
  console.log(child.prototype);
  console.log(parent.prototype);
  for (var key in parent) {
    console.log(key);
    if (__hasProp.call(parent, key))
      child[key] = parent[key];
  }

  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;

  child.prototype = new ctor();

  child.__super__ = parent.prototype;

  return child;
};

var Animal = (function(){
    'use strict';

    function Animal(){
        console.log('Animal');
    }

    Animal.prototype.canBreath = function() {
        console.log('Can Breath');
    }

    return Animal;

})();
var Snake;

Snake = (function(_super){
  'use strict';

  __extends(Snake, _super);

  console.log(Snake.prototype);
  console.log(Snake.__super__);

  function Snake () {
    console.log(arguments)
    return Snake.__super__.constructor.apply(this, arguments)
  }

  return Snake;

})(Animal);

var Snake = new Snake();



// __extends(Animal);

console.log(Object.create(Animal));
