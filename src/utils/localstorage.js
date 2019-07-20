


export const _storeData = (key, value) => {
    console.log('store', value)
    localStorage.setItem(key, value);
};

export const _retrieveData = (key) => {
    let value = localStorage.getItem(key);
    console.log('getdate',value);
    return value;
};

export const _removeData = (key) => {
    localStorage.removeItem(key);
};