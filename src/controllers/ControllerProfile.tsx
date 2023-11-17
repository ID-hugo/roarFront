import React, { useState, useEffect } from 'react';
import { ApiRoar } from '../api/ApiRoar';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserData ={
  name: string,
  lastname: string,
  phone: string
}

const useProfileController = () => {

  const [user, setUser] = useState({
    name: '',
    lastname: '',
    email:'',
    phone: '',
  });

  const [user2, setUser2] = useState({
    name: '',
    lastname: '',
    phone: '',
  });

  const[alumno, setAlumno] = useState({
    user_id: '',
    estado : '',
    tipo: '',
  });

  const checkCurrentPassword = async (currentPassword: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('GAY '+ currentPassword);
      
      if (token) {
        // Aquí deberías realizar la lógica para verificar la contraseña actual en el servidor.
        // Supongamos que tienes una API que realiza esta verificación:
        const response = await ApiRoar.post(
          '/users/check-current-password',
          { currentPassword },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return response.data.success;
      }
    } catch (error) {
      console.error('Error checking current password:', error);
      return false;
    }
  };
  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const response = await ApiRoar.post<{ success: boolean }>(
          '/users/change-password',
          { currentPassword, newPassword },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return response.data.success;
      }

      return false;
    } catch (error) {
      console.error('Error changing password:', error);
      return false;
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const response = await ApiRoar.get('/users/profile', {
          headers: {
            Authorization: token,
          },
        });
        if (response.data.success) {

          const { name, lastname, email, phone } = response.data.data;
          setUser({ name, lastname, email, phone });
        }
      }
  
        if (token) {
          const response = await ApiRoar.get('/users/profile/alumno', {
            headers: {
              Authorization: token,
            },
          });
          if (response.data.success) {
  
            const { user_id, estado, tipo } = response.data.data;
            setAlumno({ user_id, estado, tipo });
          }
        }

    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const updateProfile = async (updatedUserData: UserData) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        // Aquí deberías realizar la lógica para enviar los datos actualizados al servidor
        // utilizando el método HTTP adecuado (por ejemplo, PUT o PATCH).

        // Supongamos que tienes una API que acepta actualizaciones de perfil:
        const response = await ApiRoar.put('/users/update-profile', updatedUserData, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.success) {
          // Si la actualización es exitosa, también actualizamos el estado local del usuario.
          setUser2(updatedUserData);
        }
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };



  useEffect(() => {
    fetchUserProfile();
  }, []);

  return { 
    user,
    user2,
    alumno,
    updateProfile,
    checkCurrentPassword,
    changePassword
 };
};

export default useProfileController;
