import AsyncStorage from '@react-native-async-storage/async-storage';

export const userExists = async (userId) => {
    try {

        const usersFollowed = JSON.parse(await AsyncStorage.getItem('usersFollowed') || '[]');


        return usersFollowed.some(user => user.id === userId);
    } catch (e) {
        console.error("Error al verificar si el usuario existe:", e);
        return false;
    }
};


export const addUser = async (user) => {
    try {

        const usersFollowed = JSON.parse(await AsyncStorage.getItem('usersFollowed') || '[]');
        const userExists = usersFollowed.some(existingUser => existingUser.id === user.id);

        if (!userExists) {

            usersFollowed.push(user);


            await AsyncStorage.setItem('usersFollowed', JSON.stringify(usersFollowed));
            console.log(`Usuario ${user.id} agregado.`);
        } else {
            console.log(`Usuario ${user.id} ya existe en la lista.`);
        }
    } catch (e) {
        console.error("Error al guardar usuario seguido:", e);
    }
};


export const removeUser = async (userId) => {
    try {

        const usersFollowed = JSON.parse(await AsyncStorage.getItem('usersFollowed') || '[]');
        const updatedUsersFollowed = usersFollowed.filter(user => user.id !== userId);


        await AsyncStorage.setItem('usersFollowed', JSON.stringify(updatedUsersFollowed));
    } catch (e) {
        console.error("Error al eliminar usuario seguido:", e);
    }
};





export const getUsersFollowed = async () => {
    try {
        const usersFollowed = JSON.parse(await AsyncStorage.getItem('usersFollowed') || '[]');
        return usersFollowed;
    } catch (e) {
        console.error("Error al obtener usuarios seguidos:", e);
        return [];
    }
};

export const clearUsersFollowed = async () => {
    try {

        await AsyncStorage.setItem('usersFollowed', JSON.stringify([]));
        
    } catch (e) {
        console.error("Error al borrar el contenido de usersFollowed:", e);
    }
};



export const getSettings = async () => {
    try {
        const settings = JSON.parse(await AsyncStorage.getItem('settings'));
        return settings;
    } catch (e) {
        console.error(e);
        return [];
    }
};


const setSettingsFile = async () => {

    try {

        await AsyncStorage.setItem('settings', JSON.stringify(["es", "#00ff00", "480", "index"]));

    } catch (e) {
        console.error(e);
    }

}

export const setSetting = async (key, newValue) => {

    try {

        const settings = JSON.parse(await AsyncStorage.getItem('settings'))
        settings[key] = newValue
        await AsyncStorage.setItem('settings', JSON.stringify(settings));

    } catch (e) {
        console.error(e);
    }

}

const main = async () => {

    // await AsyncStorage.setItem('settings',null)

    const settings = await getSettings()
    if (!settings || settings.length === 0)
        setSettingsFile()


}

main()