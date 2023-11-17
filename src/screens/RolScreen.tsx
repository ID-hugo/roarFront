import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiRoar } from '../api/ApiRoar';

// Define un tipo para el usuario
type UserType = {
  id: number;
  rol_id: number;
};

const RolScreen = () => {
  // Configuración de navegación
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Estado para almacenar los datos de los usuarios
  const [user, setUser] = useState<UserType[]>([]);

  // Función para obtener los datos de los usuarios desde la API
  const fetchUserRol = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const response = await ApiRoar.get('/users/usersRoles', {
          headers: {
            Authorization: token,
          },
        });
        if (response.data.success) {
          setUser(response.data.data as UserType[]);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Llamar a la función de obtención de datos al cargar el componente
  useEffect(() => {
    fetchUserRol();
  }, []);

  useEffect(() => {
    if (user.length === 1) {
      const singleUserRole = user[0].rol_id;
      if (singleUserRole === 2) {
        navigation.navigate('UserTabsNavigator'); // Redirige directamente a la pantalla de Alumno
      } else if (singleUserRole === 1) {
        //navigation.navigate('AdminScreen'); // Redirige directamente a la pantalla de Admin
      } else if (singleUserRole === 3) {
        //navigation.navigate('CoachScreen'); // Redirige directamente a la pantalla de Coach
      }
    }
  }, [user, navigation]);

  const handleLogout = async () => {
    // Aquí puedes agregar la lógica para cerrar sesión y eliminar el token del almacenamiento.
    // Luego, navega de regreso a la pantalla de inicio de sesión.
    await AsyncStorage.removeItem('token');
    navigation.navigate('LoginScreen');
  };
  return (

    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu rol:</Text>
      {user.some((userData) => userData.rol_id === 2) && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Lógica para activar el botón Alumno
            navigation.navigate('UserTabsNavigator');
          }}
        >
          <Text style={styles.buttonText}>Alumno</Text>
        </TouchableOpacity>
      )}
      {user.some((userData) => userData.rol_id === 1) && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('AdminHomeScreen');
          }}
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      )}
      {user.some((userData) => userData.rol_id === 3) && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('CoachHomeScreen');
          }}
        >
          <Text style={styles.buttonText}>Coach</Text>
        </TouchableOpacity>
      )}
            <TouchableOpacity
                style={styles.logout}
                onPress={handleLogout}
      >
                <Image
                source={require('../../assets/logout.png')}
                style={styles.logoutImage}
                />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  logout: {
    position: 'absolute',
      alignContent: 'center',
      top: 30,
      right: 15,
      zIndex: 1
  },
  logoutImage: {
    
    width: 40,
    height: 40,
},
});

export default RolScreen;
