let ignoredShelfType = ['move', 'none'];

export const fetchKeyArrayfromDict = dict => {
     /**
      * Fetching an Array of Keys from an Dict of key-value pairs
      * @param dict
      */
    let key_arr = []
    for (let status in dict){
      key_arr.push(status);
    }
    return key_arr;
  }

export const isShelfTypeIgnored = shelfType => ignoredShelfType.includes(shelfType)

export const debounce = (func, delay) => {
  /**
    * Debouncing function calls for better performance
    * @param func Function to be delayed
    * @param delay time to be delayed for
  */
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}