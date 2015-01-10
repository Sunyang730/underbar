(function() {
  'use strict';

  describe('Part I', function() {

    describe('identity', function() {
      var uniqueObject = {};

      _.identity = function(value) {
        return value; //return whatever that is given.
      };

      it('should return whatever value is passed into it', function() {
        
        

        expect(_.identity(1)).to.equal(1);
        expect(_.identity('string')).to.equal('string');
        expect(_.identity(false)).to.be.false;
        expect(_.identity(uniqueObject)).to.equal(uniqueObject);
      });
    });

    describe('first', function() {
      _.first = function (array, n) {
        //var empty = [];  //for the empty array case
        if(n  == null) {  //main purpose of the first function is the get the first element. So this should be the first statement to check.
          return array[0];
        }else if(n > 0){ //We don't expect user to request for a empty array, therefore, anything greater than 0 should be the next statement. 
          return array.slice(0,n); 
        }else{ //if the user does request for 0 index, then we will give it. 
          return []; //will return any empty array. 
        } 
      };

      it('should be able to pull out the first element of an array', function() {
        expect(_.first([1,2,3])).to.equal(1);
      });

      it('should accept an index argument', function() {
        expect(_.first([1,2,3], 2)).to.eql([1, 2]);
      });

      it('should return empty array if zero is passed in as the index', function() {
        expect(_.first([1,2,3], 0)).to.eql([]);
      });

      it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
        expect(_.first([1,2,3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('last', function() {
      _.last = function (array, n){ //n is the number of elements that the user want to get from the array.
        //var empty = []; //for the empty array case
        if(n == null){  //check to see if n is given. Since the main purpose of the last function is to get the last element of the array. This check will go first
          return array[array.length-1];
        }else if(n >0){ //In case the user want to number of elements starting from the last. 
          return array.slice(Math.max(array.length - n, 0)); //slice 0 will give all the elements in the array if the user provide a index that is greater than the length of the array. Else length-n will provide the number of elements we want to slice off.
        }else{ //If the user want an empty array. 
          return []; 
        }
      };

      it('should pull the last element from an array', function() {
        expect(_.last([1,2,3])).to.equal(3);
      });

      it('should accept an index argument', function() {
        expect(_.last([1,2,3], 2)).to.eql([2, 3]);
      });

      it('should return empty array if zero is passed in as the index', function() {
        expect(_.last([1,2,3], 0)).to.eql([]);
      });

      it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
        expect(_.last([1,2,3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('each', function() {
      _.each = function (value, iterator) {
        if(Array.isArray(value)){  //Check to see if the value is an Array. 
          for(var i = 0; i<value.length; i++){
            iterator(value[i], i, value); //the func argument require 3 arguments. element, index, and object/array itself. 
          }
        }else if(typeof value === "object") {  //if not an array then check if it is an object. 
          for(var prop in value){
            iterator(value[prop], prop, value);
          }
        }  //Do nothing if it is neither a array or object. 

      };

      it('should iterate over arrays, providing access to the element, index, and array itself', function() {
        var animals = ['ant', 'bat', 'cat'];
        var iterationInputs = [];

        _.each(animals, function(animal, index, list) {
          iterationInputs.push([animal, index, list]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 0, animals],
          ['bat', 1, animals],
          ['cat', 2, animals]
        ]);
      });

      it('should only iterate over the array elements, not properties of the array', function() {
        var animals = ['ant', 'bat', 'cat'];
        var iterationInputs = [];

        animals.shouldBeIgnored = 'Ignore me!';

        _.each(animals, function(animal, index, list) {
          iterationInputs.push([animal, index, list]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 0, animals],
          ['bat', 1, animals],
          ['cat', 2, animals]
        ]);
      });

      it('should iterate over objects, providing access to the element, index, and object itself', function() {
        var animals = { a: 'ant', b: 'bat', c: 'cat' };
        var iterationInputs = [];

        _.each(animals, function(animal, key, object) {
          iterationInputs.push([animal, key, object]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 'a', animals],
          ['bat', 'b', animals],
          ['cat', 'c', animals]
        ]);
      });
    });

    describe('indexOf', function() {
      it('should find 40 in the list', function() {
        var numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 40)).to.equal(3);
      });

      it('should be able to compute indexOf even when the native function is undefined', function() {
        var numbers = [10, 20, 30];

        expect(_.indexOf(numbers, 20)).to.equal(1);
      });

      it('returns -1 when the target cannot be found not in the list', function() {
        var numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 35)).to.equal(-1);
      });

      it('returns the first index that the target can be found at when there are multiple matches', function() {
        var numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];

        expect(_.indexOf(numbers, 40)).to.equal(1);
      });
    });

    describe('filter', function() {
      _.filter = function(array, iterator){
        var result = [];  //The function require a empty array to store the result.
        _.each(array, function(num, index, list){ //using each function to look through the array to deal with each individual array. 
          if(iterator(num)){
            result.push(num); //push the element to the array if it pass the test. 
          }
        });
        return result; //return the array that match the requirement. 

      };
      it('should return all even numbers in an array', function() {
        var isEven = function(num) { return num % 2 === 0; };
        var evens = _.filter([1, 2, 3, 4, 5, 6], isEven);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('should return all odd numbers in an array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var numbers = [1, 2, 3, 4, 5, 6];
        var evens = _.filter(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('reject', function() {
      _.reject = function (array, iterator){  //similar to filter.
        var result = [];
        _.each(array, function(num, index, list){
          if(!iterator(num)){ //reject will push the false result to the array since we want to reject.
            result.push(num);
          }
        });
        return result;
      };
      it('should reject all even numbers', function() {
        var isEven = function(num) { return num % 2 === 0; };
        var odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('should reject all odd numbers', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var numbers = [1, 2, 3, 4, 5, 6];
        var evens = _.reject(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('uniq', function() {
      _.uniq = function (array, isSorted, iterator){
        var result = [];   
        _.each(array, function(value, index, list){ //using each function to loop through each element and check to see if it already contains index in the result array. 
          if(_.indexOf(result, value) <0){  //If -1 means that it is not available in the new array and we will push it in.
            result.push(value);
          }
        });
        return result;

      };

      it('should return all unique values contained in an unsorted array', function() {
        var numbers = [1, 2, 1, 3, 1, 4];

        expect(_.uniq(numbers)).to.eql([1, 2, 3, 4]);
      });

      it('should handle iterators that work with a sorted array', function() {
        var iterator = function(value) { return value + 1; };
        var numbers = [1, 2, 2, 3, 4, 4];

        expect(_.uniq(numbers, true, iterator)).to.eql([1, 2, 3, 4]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var numbers = [1, 2, 1, 3, 1, 4];
        var uniqueNumbers = _.uniq(numbers);

        expect(uniqueNumbers).to.not.equal(numbers);
      });
    });

    describe('map', function() {
      _.map = function (value, iterator){  
        var result = [];  
        _.each(value, function(num, index, list){
          result.push(iterator(num)); //loop through each element and do whatever the function want on each element.
        });
        return result;
      };

      it('should apply a function to every value in an array', function() {
        var doubledNumbers = _.map([1, 2, 3], function(num) {
          return num * 2;
        });

        expect(doubledNumbers).to.eql([2, 4, 6]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var numbers = [1, 2, 3];
        var mappedNumbers = _.map(numbers, function(num) {
          return num;
        });

        expect(mappedNumbers).to.not.equal(numbers);
      });
    });

    describe('pluck', function() {
      it('should return values contained at a user-defined property', function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
      });

      it('should not modify the original array', function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        _.pluck(people, 'name');

        expect(people).to.eql([{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }]);
      });
    });

    describe('reduce', function() {
      _.reduce = function (value, iterator, accumulator){
        var result = 0;   // set up result = to 0 so that it does not contain random stuff. 
        if(accumulator == null){ //check to see is given or not. 
          result = value[0]; //if not given the first vaule that we dealt with will be the first value in array. 
          for(var i = 1; i < value.length; i++){  //can't use _.each, since we are skipping the first element. 
            result = iterator(result, value[i]); //pass the result with the iterator calculation. 
          }
        }else{
          result = accumulator;   //if we are given accumulator
          _.each(value, function(num, index, list){ //we will use the _.each function since the we are running through all the elements
            result = iterator(result, num); //pass the result with the iterator calculation
          });
        }
        return result; //return the result. 
      };
      it('should be able to sum up an array', function() {
        var add = function(tally, item) {return tally + item; };
        var total = _.reduce([1, 2, 3], add, 0);

        expect(total).to.equal(6);
      });

      it('should use the first element as an accumulator when none is given', function() {
        var add = function(tally, item) {return tally + item; };
        var total = _.reduce([1, 2, 3], add);

        expect(total).to.equal(6);
      });

      it('should invoke the iterator on the first element when given an accumulator', function() {
        var sumSquares = function(tally, item) {return tally + item * item; };
        var total = _.reduce([2, 3], sumSquares, 0);

        expect(total).to.equal(13);
      });

      it('should not invoke the iterator on the first element when using it as an accumulator', function() {
        var sumSquares = function(tally, item) {return tally + item * item; };
        var total = _.reduce([2, 3], sumSquares);

        expect(total).to.equal(11);
      });

    });
  });

}());
