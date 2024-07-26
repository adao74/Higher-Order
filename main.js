// 1. Build the map function

const map = (arr, func) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = func(arr[i], i, arr)
    }
    
    return arr
}

const mappedArr = map([1,2,3], x => x + 1)
console.log(mappedArr) // [2,3,4]

// 2. Build the reduce function


const reduce = (arr, func, init) => {

    // MDN docs: reduce method should throw a typeError if initialValue is not provided & array is empty
    if ( (arr.length === 0) && (init === undefined) ) {
        throw new TypeError("Array contains no elements and init is not provided.")
    }

    // Reduce method has an optional init parameter that gets assigned a value of 0 if the user doesn't provide it
    // Don't make init have a default value 0 when you call reduce b/c you want to know when the user didn't pass an init value (for the typeError above)
    if (init === undefined) {
        init = 0
    }

    let accum = init;

    for (let i = 0; i < arr.length; i++) {

        // MDN docs: reduce takes 4 arguments: the accumulator, element, index, and array
        accum = func(accum, arr[i], i, arr)
    }

    return accum
}

const reduced = reduce([1, 2, 3], (accumulator, element, index, arr) => accumulator + element + 2 * index + arr.length, 2)
console.log(reduced) 
// 0th index: Apply callback function => return value = (2+1+0+3) => becomes accumulator for next index (i.e. next iteration)
// 1st index: Apply callback function => return value = (2+1+0+3) + (2+2+3)
// 2nd index: Apply callback function => return value = (2+1+0+3) + (2+2+3) + (3+4+3)
// Final return value (i.e. return value of last index): 23

const getMax = (a, b) => Math.max(a, b); // Callback function applies on the accumulator & element (only 2 parameters)

// callback is invoked for each element in the array starting at index 0
console.log(reduce([1, 100], getMax, 50)); // 100
// 0th index: Apply callback function (on accumulator & 0th element) => returns 50 (max of 50 and 1) => 50 is the accum for next iteration
// 1st index: Apply callback function (on accumulator & 1st element) => returns 100 (max of 50 and 100)
// Final return value (i.e return value of last iteration): 100 

console.log(reduce([1, 100], getMax)); // 100, reduce has an OPTIONAL init value

console.log(reduce([50], getMax, 10)); // 50
// 0th index: Apply callback function (on accumlator & 0th element) => returns 50 (max of 10 and 50)
// Final return value (i.e return value of last iteration): 50

// Callback function never invoked b/c never enter the for loop. 
console.log(reduce([],getMax, 1)); // 1

// Should throw a TypeError!! 
// console.log(reduce([], getMax));

// 3. Build the filter function

const filter = (arr, func) => {
    let newArr = []

    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i], i, arr)) { // callback function can use element, index, and the array
            newArr.push(arr[i])
        }
    }

    return newArr
}


const filtered = filter([1, 2, 11, 4, 7], (x) => x % 2 === 0)  // Callback function doesn't need to have all the arguments you called 
console.log(filtered) // [2, 4]

const filtered2 = filter([1, 2, 11, 4, 7], (x, y, z) => (x + y + z.length) % 3 === 0)
console.log(filtered2) // [1, 11, 4]

const fruits = ["apple", "banana", "grapes", "mango", "orange"];

function filterItems(arr, query) {
  return filter(arr, (el) => el.toLowerCase().includes(query.toLowerCase()));
}

console.log(filterItems(fruits, "ap")); // ['apple', 'grapes']
console.log(filterItems(fruits, "an")); // ['banana', 'mango', 'orange']
