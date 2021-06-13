import AsyncStorageService from './AsyncStorageService';
import { StorageKeys } from '../constants';

const UserPinService = {

    CheckIfUserPinExists: async () => {
        const userPin = await AsyncStorageService.getItem(StorageKeys.userPin);
        return userPin;
    },

    CheckIfUserPinMatches: async (enteredUserPin) => {
        const savedUserPin = await AsyncStorageService.getItem(StorageKeys.userPin);
        return savedUserPin === enteredUserPin;
    },

    SetUserPin: (enteredUserPin) => {
        AsyncStorageService.setItem(StorageKeys.userPin, enteredUserPin);
    }
}

export default UserPinService;