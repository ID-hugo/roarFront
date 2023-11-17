import React, {useEffect, useState} from 'react';
import { ApiRoar } from '../api/ApiRoar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import ProfileScreen from '../screens/Alumno/ProfileScreen';
import RolScreen from '../screens/RolScreen';



const AuthControllerLogin = () => {

    const[errorMessage, setErrorMessage] = useState('');

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value });
    }

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    // Si hay un token almacenado, navega directamente a RolScreen
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'RolScreen' }],
                    });
                }
            } catch (error) {
                console.log('Error al verificar el token: ' + error);
            }
        };

        checkToken();
    }, []);

    const login = async () => {

        if(isValidForm()){

            try {

                const response = await ApiRoar.post('/users/login', values);
                console.log('RESPONSE ' + JSON.stringify(response));
                setErrorMessage('Iniciaste Sesion Correctamente');
                if (response.data.token) {
                    // Almacena el token en AsyncStorage
                    await AsyncStorage.setItem('token', response.data.token);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'RolScreen' }],
                    });
                    //si el user es Coach

                    //si el user es admin
                    
                    // 


                }
                

            }catch(error){

                console.log('ERROR ' + error);
                setErrorMessage('Email o Contraseñas erroneas');



            }
            
        }

    }

    const isValidForm = (): boolean => {

        if(values.email === ''){
            setErrorMessage('Ingresa el correo electronico');
            return false;

        }

        if(values.password === ''){
            setErrorMessage('Ingresa contraseña valida');
            return false;

        }



        return true;
    }


    return{
        ...values,
        onChange,
        login,
        errorMessage
    }
}

export default AuthControllerLogin;