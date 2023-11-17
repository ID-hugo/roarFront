import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import ProfileUpdate from './ProfileUpdate';
import useProfileController from '../../controllers/ControllerProfile';
import { RoundedButton } from '../../components/RoundedButton';
import UserInfoField from '../../components/UserInfoField';
import ChangePasswordScreen from './ChangePasswordScreen';


const ProfileScreen = () => {

  const {user} = useProfileController();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  

  const handleLogout = async () => {
    // Aquí puedes agregar la lógica para cerrar sesión y eliminar el token del almacenamiento.
    // Luego, navega de regreso a la pantalla de inicio de sesión.
    await AsyncStorage.removeItem('token');
    navigation.navigate('LoginScreen');
  };

  const handleEditProfile = () => {
    // Navega a la pantalla de edición de perfil
    navigation.navigate('ProfileUpdate');
  };

  const handleChangePassword = () => {
    // Navega a la pantalla de cambio de contraseña
    navigation.navigate('ChangePasswordScreen');
  };


  return (
    <View style={styles.container}>
      <Image
                source = {require('../../../assets/main-crossfit.jpg')}
                style ={styles.imageBackground } 
      />
      
      <TouchableOpacity
                style={styles.logout}
                onPress={handleLogout}
      >
                <Image
                source={require('../../../assets/logout.png')}
                style={styles.logoutImage}
                />
      </TouchableOpacity>
      
      <View style ={styles.logoContainer}>
      <Image
        source={require('../../../assets/149071.png')}
        style={styles.logoImage}
      />

      <Text style={styles.logoText}>{user.name}</Text>

    </View>

        <View style={styles.form}>

            <Text style={styles.heading}>Datos del Usuario</Text>

            <UserInfoField label="Nombre" value={user.name} />
            <UserInfoField label="Apellido(s)" value={user.lastname} />
            <UserInfoField label="Teléfono" value={user.phone} />

            <RoundedButton text = 'Cambiar contraseña' onPress = {handleChangePassword } style={styles.editButton}/>
    
                

        
        </View>

        <View style={styles.boton}>
        
          <RoundedButton text='Editar Perfil' onPress = {handleEditProfile } style={styles.editButton}/>
          
        </View>  

      
      
    </View>
    
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  imageBackground: {
    width,
    height,
    position: 'absolute',
    resizeMode: 'cover',
  },
  form: {
      flex: 1,
      width: '100%',
      height: '45%',
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 130,
      opacity: 0.85,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      padding: 20,
  }, 
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  boton: {
    bottom: -720
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  texto: {
    fontSize: 17
  },
  logoContainer:{
    position: 'absolute',
    alignSelf: 'center',
    top: '5%',
    alignItems: 'center'
  },
  logoText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop:10,
    fontWeight: 'bold'
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  logoutImage: {
    
      width: 40,
      height: 40,
  },
  logout: {
    position: 'absolute',
      alignContent: 'center',
      top: 30,
      right: 15,
      zIndex: 1
  },
  editButton: {
    color: 'black',
    opacity: 0.8,
    width: 0, // Ajusta el tamaño del botón según tus necesidades
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  }

});

export default ProfileScreen;
