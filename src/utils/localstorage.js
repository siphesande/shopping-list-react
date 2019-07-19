


export const _storeData = async (key, value) => {
    try {
        await localStorage.setItem(key, value);
    } catch (error) {
        console.log("Error saving item to localstorage", error);
    }
};

export const _retrieveData = async (key) => {
    try {
        const value = await localStorage.getItem(key);
        console.log('@@@@@',value)
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log("Error getting item from localstorage", error);
    }
};

export const _removeData = async (key) => {
    try {
        await localStorage.removeItem(key);
    } catch (error) {
        console.log("Error deleting item from localstorage", error);
    }
};