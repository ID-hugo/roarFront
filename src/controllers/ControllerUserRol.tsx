import React, { useState, useEffect } from 'react';
import { ApiRoar } from '../api/ApiRoar';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserType = {
  id: string;
  user_id: string;
  email: string;
  name: string;
  lastname: string;
  rol_id: string;
  estado: string;
  tipo: string;
};

const useControllerUserRoll = () => {

  const [user, setUser] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
  });

  const[alumno, setAlumno] = useState({
    id:'',
    user_id: '',
    estado : '',
    tipo : '',
  });



  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
  
        if (token) {
          const response = await ApiRoar.get('/users/usersRoles', {
            headers: {
              Authorization: token,
            },
          });
          if (response.data.success) {
            
            const { data } = response.data.data;
            setUser(data);
            console.log(data);
          }
        }

    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserRolInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
  
      if(token) {
        const response = await ApiRoar.get('/users/alumno', {
          headers: {
            Authorization: token,
          },
        });

        
          if (response.data.success) {
            
            const { data } = response.data.data;
            setAlumno(data);
            console.log(data);
          }
        }

    } catch (error) {
      console.error('Error en el fetchUserRolinfor, no saco la info de la tabla users_rol:', error);
    }
  };

  const UpdateUserAlumno = async (user:UserType) => {
    try {
      const token = await AsyncStorage.getItem('token');
  
        if (token) {
          const response = await ApiRoar.put('/users/update/useralumno', user,{
            headers: {
              Authorization: token,
              
            },
          });
          if (response.data.success) {
            
            console.log("Respuesta de updateUserAlumno" + response.data.success);
          }
        }

    } catch (error) {
      console.error('Error updateUserAlumno:', error);
    }
  }

  useEffect(() => {
    fetchUserProfile();
    fetchUserRolInfo();
  }, []);

  return { 
    user,
    alumno,
    UpdateUserAlumno,
 };
};

export default useControllerUserRoll;