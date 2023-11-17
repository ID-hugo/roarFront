import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,ScrollView,KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AuthControllerLogin from '../../controllers/AuthControllerLogin';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';

const LoginScreen = () => {

    const { email, password, errorMessage,onChange, login } = AuthControllerLogin();

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
      if (errorMessage !== '') {
          // Puedes mostrar el mensaje de error aquí si lo deseas
          console.log(errorMessage);
      }
  }, [errorMessage]);

    useEffect(() => {

      if(errorMessage != ''){
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      }
  
    },[errorMessage])

  return (

    <View style={styles.container}>
      <Image
                source = {require('../../../assets/main-crossfit.jpg')}
                style ={styles.imageBackground } 
      />
      <View style ={styles.logoContainer}>
                <Image
                    source={require('../../../assets/logoHangar2.png')}
                    style={styles.logoImage}
                />

      </View>

      <View style ={styles.form}> 

        <ScrollView>

          <Text style = {styles.formText}>INGRESAR</Text>

          <CustomTextInput 
              image={ require('../../../assets/user.png')}
              placeholder='Correo electrónico'
              keyboardType='email-address'
              property='email'
              onChangeText={onChange}
              value={email.toLowerCase()}
                    
                    
           />

           <CustomTextInput 
              image={ require('../../../assets/pass.png')}
              placeholder='Contraseña'
              keyboardType='default'
              property='password'
              onChangeText={onChange}
              value={password.toLowerCase()}
              secureTextEntry = {true}
                        
          />
            <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>

                <Text style={styles.texto}>¿Olvidaste tu contraseña?</Text>
                
            </TouchableOpacity>
                    

            <View style = {{marginTop : 30}}>

                <RoundedButton text='INICIAR SESIÓN' onPress = { () => login()}/>


            </View>

            <View style = {styles.formRegister}>

                  <Text>No tienes cuenta?</Text>

                  <TouchableOpacity onPress = {() => navigation.navigate('RegisterScreen') }>
                  <Text style = {styles.formRegisterText}>Registrate</Text>
                  </TouchableOpacity>


            </View>

         </ScrollView>

      </View>

    </View>

    
  );

}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    imageBackground: {
      width: '100%',
      height: '100%',
      opacity: 0.7,
      bottom: '20%'
    },
  /*  container: {
      flex: 1,
      backgroundColor: 'white',
      
    },
    imageBackground: {
      width: '100%',
      height: '100%',
      bottom: 50
    },*/
    logoContainer:{
      position: 'absolute',
      alignSelf: 'center',
      top: '30%'
  
    },
    logoImage: {
      width: 150,
      height: 100,
      
    },  
    form: {
      width: '100%',
      height: '40%',
      flex: 1,
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      padding: 20,
    },
    formText:{
      fontWeight: 'bold',
      fontSize: 16
  
  
    },
    formTextInput:{
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#EBEBEB',
      marginLeft: 15,
    },
    formInput:{
      flexDirection: 'row',
      marginTop: 30,
    },
    formIcon:{
      width: 25,
      height:25,
      marginTop: 5
    },
    formRegister:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10
    },
    formRegisterText:{
      fontStyle: 'italic',
      color: 'red',
      borderBottomWidth: 1,
      borderBottomColor: 'red',
      fontWeight: 'bold',
      marginLeft: 10
    },
    texto: {
      alignSelf: 'flex-end',
      marginRight: 20
    }
  });