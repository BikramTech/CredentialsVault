import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageService = {
    
    getItem: async (key) => {
     const item = await AsyncStorage.getItem(key);
     return JSON.parse(item);
    },

    setItem: (key, value) => {
       return AsyncStorage.setItem(key, JSON.stringify(value));
    }
}

export default AsyncStorageService;
