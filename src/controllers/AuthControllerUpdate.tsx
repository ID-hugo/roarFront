import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import useProfileController from './ControllerProfile';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { RoundedButton } from '../components/RoundedButton';
import { CustomTextInput } from '../components/CustomTextInput';

const AuthControllerUpdate = () => {
  const { user, updateProfile } = useProfileController();
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleInputChange = (key: string, value: string) => {
    setUpdatedUser({ ...updatedUser, [key]: value });
  };

  const handleSaveChanges = () => {
    // Llama a la función de actualización de perfil con los datos actualizados
    updateProfile(updatedUser);
    console.log
    (updatedUser);
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Editar Perfil</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text>Nombre:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={updatedUser.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Apellido:</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={updatedUser.lastname}
            onChangeText={(text) => handleInputChange('lastname', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Teléfono:</Text>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={updatedUser.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
          />
        </View>
      </View>

        <View style = {{marginTop : 30}}>
          
            <RoundedButton text='GUARDAR' onPress={handleSaveChanges}/>

        </View>
    </View>
  );
};
export default AuthControllerUpdate;


// ... (código anterior)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  formContainer: {
    flex: 1, // Utilizar el 100% del espacio disponible
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 15,
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 20,
    fontSize: 16,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
    bottom: '20%',
    position: 'absolute',
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '5%',
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  formText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginBottom: 20, // Añadido un margen inferior
  },
});

// ...



/*
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%', // Modificación para ocupar el 80% de la pantalla
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginLeft: 'auto', // Centrar en la pantalla
    marginRight: 'auto', // Centrar en la pantalla
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
});*/

/*

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    
    resizeMode: 'cover', // Añade esta línea
  },
  form: {
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    position: 'relative',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  logoContainer: {
    position: 'relative',
    alignSelf: 'center',
    top: '5%',
    alignItems: 'center'
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  logoText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  formText: {
    fontWeight: 'bold',
  },
  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginLeft: 15
  },
  formInput:{
    flexDirection: 'row',
    marginTop: 30,
  },
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5
  },
  formRegister: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  formRegisterText: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
 */
