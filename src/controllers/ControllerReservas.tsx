import React, { useState, useEffect } from 'react';
import { ApiRoar } from '../api/ApiRoar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import useControllerUserRoll from './ControllerUserRol';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { ToastAndroid } from 'react-native';

type ReservaType = {
    id:string;
    user_rol_alumno_id:string;
    id_clase:string;
  };
  type ClaseType = {
    id:string;
    fecha: string;
    hora_inicio: string;
    hora_termino: string;
    limite_asistentes: number;
    reservas: number;
    tipo: string;
  };

const ControllerReservas = () => {

    const [reservasAlumno, setReservasAlumno] = useState<ClaseType[]>([]);
    const [reservasAlumno2, setReservasAlumno2] = useState<ReservaType[]>([]);
    

    const fetchReservasAlumno = async () => {

        try {
          const token = await AsyncStorage.getItem('token');
    
          if (token) {
            const response = await ApiRoar.get('/reservas/alumno/getreservas',{
              headers: {
                Authorization: token,

              },
            });
            if (response.data.success) {
                setReservasAlumno(response.data.data);

                
            }
          }
        } catch (error) {
          console.error('Error en conseguir las reservas del alumno classes:', error);
        }
      };

      const fetchReservasAlumno2 = async () => {

        try {
          const token = await AsyncStorage.getItem('token');
    
          if (token) {
            const response = await ApiRoar.get('/reservas/reservasAlumno',{
              headers: {
                Authorization: token,

              },
            });
            if (response.data.success) {
                setReservasAlumno2(response.data.data);

                
            }
          }
        } catch (error) {
          console.error('ERROR EN COSEGUIR RESERVAS DE ALUMNOS FETCH RESERVAALUMNO2 classes:', error);
        }
      };

      const fetchEliminarReserva = async (idClase:string) => {

        try {
          const token = await AsyncStorage.getItem('token');
    
          if (token) {
            const response = await ApiRoar.delete('/reservas/deletereserva',{
              headers: {
                Authorization: token,
                'Id-Clase': idClase,

              },
            });
            if (response.data.success) {
              console.log(response.data.success);  
            }
          }
        } catch (error) {
          console.error('Error en conseguir las reservas del alumno classes:', error);
        }

      };

      useEffect(() => {
        fetchReservasAlumno();
        fetchReservasAlumno2();
      }, []);


    return {
      reservasAlumno,
      reservasAlumno2, 
      fetchEliminarReserva
    }
}

export default ControllerReservas;