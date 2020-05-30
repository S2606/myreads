let ignoredShelfType = ['move', 'none'];

/**
* Fetching an Array of Keys from an Dict of key-value pairs
* @param {object} dict
*/
export const fetchKeyArrayfromDict = dict => {
    let key_arr = []
    for (let status in dict){
      key_arr.push(status);
    }
    return key_arr;
};

/**
* Checking if this shelf type comes under the ignored range
* @param {shelfType} shelfType
*/
export const isShelfTypeIgnored = shelfType => ignoredShelfType.includes(shelfType);

/**
    * Debouncing function calls for better performance
    * @param {func} func Function to be delayed
    * @param {number} delay time to be delayed for
  */
export const debounce = (func, delay) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
};
