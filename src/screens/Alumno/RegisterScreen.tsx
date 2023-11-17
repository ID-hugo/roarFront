import React, {useState} from 'react';
import {useEffect} from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet, Image,ScrollView,KeyboardAvoidingView } from 'react-native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import AuthControllerRegister from '../../controllers/AuthControllerRegister';

const RegisterScreen = () => {

  const{name, lastname, email, phone, password, confirmPassword, errorMessage, onChange, register} = AuthControllerRegister();

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
        source={require('../../../assets/149071.png')}
        style={styles.logoImage}
      />

      <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>

    </View>
    


    <View style ={styles.form}>

      <ScrollView>

        <Text style = {styles.formText}>REGISTRARSE</Text>

          <CustomTextInput 
            placeholder='Nombre'
            keyboardType='default'
            image = {require('../../../assets/user.png')}
            property='name'
            onChangeText={onChange}
            value = {name}
          />

          <CustomTextInput 
            placeholder='Apellidos'
            keyboardType='default'
            image = {require('../../../assets/1077114.png')}
            property='lastname'
            onChangeText={onChange}
            value = {lastname}
          />

          <CustomTextInput 
            placeholder='Correo electrónico'
            keyboardType='email-address'
            image = {require('../../../assets/3494693.png')}
            property='email'
            onChangeText={onChange}
            value = {email.toLowerCase()}
          />

          <CustomTextInput 
            placeholder='+56 9'
            keyboardType='default'
            image = {require('../../../assets/cellphone_79786.png')}
            property='phone'
            onChangeText={onChange}
            value = {phone}
          />

          <CustomTextInput 
            placeholder='Contraseña'
            keyboardType='default'
            image = {require('../../../assets/pass.png')}
            property='password'
            onChangeText={onChange}
            value = {password.toLowerCase()}
            secureTextEntry={true}
          />

          <CustomTextInput 
            placeholder='Confirmar Contraseña'
            keyboardType='default'
            image = {require('../../../assets/pass.png')}
            property='confirmPassword'
            onChangeText={onChange}
            value = {confirmPassword.toLowerCase()}
            secureTextEntry={true}
          />        


        <View style = {{marginTop : 30}}>
          <RoundedButton text='REGISTRARSE' onPress = { () => register()}/>

        </View>
      </ScrollView>


    </View>


  </View>
  );
};

export default RegisterScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
    bottom: '20%'
  },
  logoContainer:{
    position: 'absolute',
    alignSelf: 'center',
    top: '5%',
    alignItems: 'center'
  },
  logoImage: {
    width: 120,
    height: 120,
    
  }, 
  logoText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop:10,
    fontWeight: 'bold'
  },

  form: {
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    flex: 1
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
    marginTop: 30
  },
  formRegisterText:{
    fontStyle: 'italic',
    color: 'red',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    fontWeight: 'bold',
    marginLeft: 10
  }


});
