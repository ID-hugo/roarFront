import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export const Topbar = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleLogout = async () => {
        // Aquí puedes agregar la lógica para cerrar sesión y eliminar el token del almacenamiento.
        // Luego, navega de regreso a la pantalla de inicio de sesión.
        await AsyncStorage.removeItem('token');
        setAuthenticated(false); // El usuario ya no está autenticado
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      };

  return (
      <View style={styles.header}>
              
              <TouchableOpacity
              style={[styles.button, styles.redButton]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({

    button: {
      backgroundColor: 'lightblue',
      padding: 5,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    redButton: {
      backgroundColor: 'red',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      backgroundColor: 'white',
      borderBottomWidth: 1, // Grosor del contorno inferior
      borderBottomColor: 'lightgray', // Color del contorno inferior // Color de fondo de la barra superior
    },
    logo: {
      width: '50%',
      height: '100%', // Ajusta el tamaño según tus necesidades
      resizeMode: 'contain',
    },
    
  });