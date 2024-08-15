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
        console.log('El contenido de usersFollowed ha sido borrado.');
    } catch (e) {
        console.error("Error al borrar el contenido de usersFollowed:", e);
    }
};



