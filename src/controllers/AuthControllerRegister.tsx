import React, {useState} from 'react';
import {ApiRoar} from '../api/ApiRoar'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';


const ControllerRegister = () => {
    const[errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value });
    }

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const register = async () => {

        if(isValidForm()){

            try {

                const response = await ApiRoar.post('/users/create', values);
                console.log('RESPONSE ' + JSON.stringify(response));
                navigation.navigate('LoginScreen');

            }catch(error){

                console.log('ERROR ' + error);

            }
            
        }

    }

    const isValidForm = (): boolean => {

        if(values.name === ''){
            setErrorMessage('Ingresa tu nombre')
            return false;
        }

        if(values.lastname === ''){
            setErrorMessage('Ingresa tu apellido')
            return false;
        }

        if(values.email === ''){
            setErrorMessage('Ingresa tu correo electronico')
            return false;
        }

        if(values.phone === ''){
            setErrorMessage('Ingresa tu celular')
            return false;
        }

        if(values.password === ''){
            setErrorMessage('Ingresa tu contraseña')
           return false;
        }

        if(values.confirmPassword === ''){
            setErrorMessage('Ingresa tu confirma')
            return false;
        }

        if(values.password !== values.confirmPassword){
            setErrorMessage('las contraseñas no coinciden')
            return false;
        }

        return true;

    }

    return {
        ...values,
        onChange,
        register,
        errorMessage
    }
}


export default ControllerRegister;