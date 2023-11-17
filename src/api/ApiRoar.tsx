import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiRoar = axios.create({
  baseURL: 'http://192.168.1.5:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ...
const setAuthHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    ApiRoar.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Llama a la función para configurar el encabezado de autorización al comienzo de tu aplicación
setAuthHeader();



export { ApiRoar };
