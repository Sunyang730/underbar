(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val; //return whatever the value is.
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.slice(Math.max(array.length-n, 0));
    //slice 0 will give all the elements in the array if the user provide a index that is greater than the length of the array. Else length-n will provide the number of elements we want to slice off.
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){  //Check to see if the value is an Array. 
      for(var i = 0; i<collection.length; i++){
        iterator(collection[i], i, collection); //the func argument require 3 arguments. element, index, and object/array itself. 
      }
    }else if(typeof collection === "object") {  //if not an array then check if it is an object. 
      for(var prop in collection){
        iterator(collection[prop], prop, collection);
      }
    }  //Do nothing if it is neither a array or object. 
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];  //The function require a empty array to store the result.
    _.each(collection, function(num){ //using each function to look through the array to deal with each individual array. 
      if(test(num)){
        result.push(num); //push the element to the array if it pass the test. 
      }
    });
    return result; //return the array that match the requirement. 
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {

    var negate = function(func){  //a function to negate or change the bool test of given function
      return function(){
        return !func.apply(this, arguments);
      };
    };
    return _.filter(collection, negate(test)); //negate test. 
  
  

    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];   
    _.each(array, function(value){ //using each function to loop through each element and check to see if it already contains index in the result array. 
      if(_.indexOf(result, value) <0){  //If -1 means that it is not available in the new array and we will push it in.
          result.push(value);
      }
    });
    return result;

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var result = [];  
    _.each(collection, function(num){
      result.push(iterator(num)); //loop through each element and do whatever the function want on each element.
    });
    return result;
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var result;
    if(accumulator == null){ //check to see is given or not. 
      result = collection[0]; //if not given the first vaule that we dealt with will be the first value in array. 
      for(var i = 1; i < collection.length; i++){  //can't use _.each, since we are skipping the first element. 
        result = iterator(result, collection[i]); //pass the result with the iterator calculation. 
      }
    }else{
      result = accumulator;   //if we are given accumulator
      _.each(collection, function(num){ //we will use the _.each function since the we are running through all the elements
        result = iterator(result, num); //pass the result with the iterator calculation
      });
    }
    return result; //return the result. 
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    var result = []; //contains all the true/false test in a array. 
    _.each(collection, function(num){
      if(iterator != null){   // make sure that iterator is provided
        if(iterator(num)){  //another if statement to see if it pass the callback function test
          return result.push(true); //if passed then add true to result. 
        }else{
          return result.push(false); //else add false. 
        }
      }else{  //if no callback function, then work on the element itself. 
        if(num){  //if the element is true 
          return result.push(true); //add true to the result. 
        }else{
          return result.push(false);  //add false if not. 
        }
      }
    });
    if(_.contains(result, false)){
      return false;  //return false if one is false.
    }else{
      return true; //only return true if everything is true.
    }

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    var result = []; //contains all the true/false test in a array. 
    _.each(collection, function(num){
      if(iterator != null){   // make sure that iterator is provided
        if(iterator(num)){  //another if statement to see if it pass the callback function test
          return result.push(true); //if passed then add true to result. 
        }else{
          return result.push(false); //else add false. 
        }
      }else{  //if no callback function, then work on the element itself. 
        if(num){  //if the element is true 
          return result.push(true); //add true to the result. 
        }else{
          return result.push(false);  //add false if not. 
        }
      }
    });
    if(_.contains(result, true)){
      return true; //return true if one is true (oppsite of _.every)
    }else{
      return false; //return false only if all false. 
    }


  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var source;  //need to assign current work on argument to a variable. Since we are using the [] version of object.
    for(var i = 0; i<arguments.length; i++){ //loop through all the arguments
      source = arguments[i]; //assign each individual argument to source
      _.each(source, function(value, prop, list){ //loop through each property of the argument.
        if(source.hasOwnProperty(prop)){  //check if property exist in the argument.
          obj[prop] = source[prop];      // assign a new property with value or replace the old values of obj.
        }
      });
    }
    return obj; //we have to return the obj after joining all the arguments.          
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var source;  //need to assign current work on argument to a variable. Since we are using the [] version of object.
    for(var i = 0; i<arguments.length; i++){ //loop through all the arguments
      source = arguments[i]; //assign each individual argument to source
      _.each(source, function(value, prop, list){ //loop through each property of the argument.
        if(!obj.hasOwnProperty(prop)){  //if obj already contains the property then skip it.  If not then continue the if statement.
          obj[prop] = source[prop];  // obj with the new property will = to the argument property and value.
        }
      });
    }
    return obj; //we have to return the obj after joining all the arguments.         
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  
    var result; 
    //var counter = 0;
    var alreadyCalled = false

    return function(){   
        
        if(result != func.apply(this, arguments) || !alreadyCalled){
          result = func.apply(this, arguments);
          alreadyCalled = true;
      
          //counter++;
        }
        //alert(result);
        //alert(counter);
        return result;

        
      };
      
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    //return setTimeout(func, wait);
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
    
    //The _.delay function will return the function after a certain time. 
    //All the arguments after the first two will consider as the arguments for
    //the callback function. Since arguments is not an array, we will use the slice.call
    //method to slice off the first two arguments and assign it to args as an array. 
    //First parameter of setTimeout will take a function. We can do func.apply directly. 
    //A anonymous funciton is used to return the callback function with arguments. 


  };



  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
