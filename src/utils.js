let ignoredShelfType = ['move', 'none'];

export const fetchKeyArrayfromDict = dict => {
    let key_arr = []
    for (let status in dict){
      key_arr.push(status);
    }
    return key_arr;
  }

export const isShelfTypeIgnored = shelfType => ignoredShelfType.includes(shelfType)