import React, { useState, useEffect } from 'react';
import { ApiRoar } from '../api/ApiRoar';
import AsyncStorage from '@react-native-async-storage/async-storage';


type MembresiaType = {
    numeroClases: '',
    costo: ''
}


const MembresiasController = () => {

    const [membresia, setMembresia] = useState<MembresiaType>();

    const handleModificarMembresias = async () => {

        try {
            const token = await AsyncStorage.getItem('token');
          
            const response = await ApiRoar.get('/membresias/update-membresias',{
                headers: {
                    Authorization: token,
                },
            });
      
          if (response) {
            console.log('Membresías actualizadas con éxito');
          } else {
            console.error('Error al actualizar membresías');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      }
}

export default MembresiasController;