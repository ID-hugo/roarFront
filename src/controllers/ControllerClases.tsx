import React, { useState, useEffect } from 'react';
import { ApiRoar } from '../api/ApiRoar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import useControllerUserRoll from './ControllerUserRol';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { ToastAndroid } from 'react-native';

interface DecodedToken {
  id: string;
  email: string;
  // Agrega otros campos del token si es necesario
}

type ClaseType = {
  id:string;
  fecha: string;
  hora_inicio: string;
  hora_termino: string;
  limite_asistentes: number;
  reservas: number;
  tipo: string;
};

type ReservaType = {

  id:string;
  user_rol_alumno_id:string;
  id_clase:string;

};

const ControllerClases = () => {

  const[errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [clases, setClases] = useState<ClaseType[]>([]);


  const [reservasAlumno, setReservasAlumno] = useState<ReservaType[]>([]);

  const [clasesReservasAlumno, setClasesReservasAlumno] = useState<ClaseType[]>([]);


  const reservarClase = async (idClase: any, onSuccess: () => void) => {
    try {
        const token = await AsyncStorage.getItem('token');

      if (token) {
          const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);

          const response = await ApiRoar.post('/reservas/create', {idClase},{
            headers: {
              Authorization: token,          // Agrega el userId al encabezado
 
            },
          });


          if (response.data.success) {  
            ToastAndroid.show('Clase reservada con éxito', ToastAndroid.SHORT);
            // Cierra el modal
            onSuccess();


          }
      }


    } catch (error) {
        console.error('Error con la reserva :', error);
        setErrorMessage('Error al reservar la clase');
      }
    };

    const fetchClases = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
  
        if (token) {
          const response = await ApiRoar.get('/clases',{
            headers: {
              Authorization: token,
            },
          });
          if (response.data.success) {
            setClases(response.data.data as ClaseType[]);
          }
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };


    const crearClase = async (claseCopia:ClaseType) => {

      try {
        const token = await AsyncStorage.getItem('token');
  
        if (token) {
          const response = await ApiRoar.post('/clases/create',claseCopia,{
            headers: {
              Authorization: token,
            },
          });
          if (response.data.success) {
            console.log(response.data.success);
          }
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    }

    const getclasesUser = async () => {

      try {
        const token = await AsyncStorage.getItem('token');
  
        if (token) {
          const response = await ApiRoar.get('/reservas/reservasAlumno',{
            headers: {
              Authorization: token,
            },
          });
          if (response.data.success) {
            console.log(response.data.success);
            setReservasAlumno(response.data.data);
          }
        }
      } catch (error) {
        console.error('Error obtener classes del usuario:', error);
      }
    }
    
    const getClasesUserReservas = async (reservas: ReservaType[]) => {



      reservas.map((reserva: ReservaType) => console.log({ reserva }));
      const idClasesArray = reservas.map((reserva) => reserva.id_clase);
      const idClasesString = idClasesArray.join(',');
    
      console.log(idClasesString + 'Holaaaaaaaaaaaaaaaaa');


    

      try {
        const token = await AsyncStorage.getItem('token');
  
        if (token) {
          const response = await ApiRoar.get('/clases/reservasAlumno',{
            headers: {
              Authorization: token,
              'Id-Clases': idClasesString,
            },
          });
          if (response.data.success) {
            console.log(response.data.success);
            setClasesReservasAlumno(response.data.data);
            return response.data.data
          }
        }
      } catch (error) {
        console.error('Error obtener classes reservadas del usuario:', error);
      }

    };
    


    
    useEffect(() => {
      fetchClases();
    }, []);

  return { 
    reservarClase,
    clases,
    errorMessage,
    crearClase,
    fetchClases,
    reservasAlumno,
    getClasesUserReservas,
    clasesReservasAlumno,
    
  };
}  


export default ControllerClases;