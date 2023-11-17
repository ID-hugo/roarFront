import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Alumno/LoginScreen';
import RegisterScreen from './src/screens/Alumno/RegisterScreen';
import ProfileScreen from './src/screens/Alumno/ProfileScreen';
import HomeScreen from './src/screens/Alumno/HomeScreen';
import RolScreen from './src/screens/RolScreen';
import ClasesScreen from './src/screens/Alumno/ClasesScreen';
import { ApiRoar } from './src/api/ApiRoar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserTabsNavigator } from './src/navigator/UserTabsNavigator';
import ProfileUpdate from './src/screens/Alumno/ProfileUpdate';
import AdminHomeScreen from './src/screens/Administrador/AdminHomeScreen';
import ChangePasswordScreen from './src/screens/Alumno/ChangePasswordScreen';
import AdminGestionHorarioScreen from './src/screens/Administrador/AdminGestionHorarioScreen';
import CoachHomeScreen from './src/screens/Coach/CoachHomeScreen';
import AdminCrearClasesScreen from './src/screens/Administrador/AdminCrearClasesScreen';



export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  MembresiaScreen: undefined;
  RolScreen:undefined;
  ClasesScreen:undefined;
  UserTabsNavigator: undefined;
  ProfileScreen: undefined;
  ProfileUpdate: undefined;
  AdminHomeScreen: undefined;
  ChangePasswordScreen: undefined;
  AdminGestionHorarioScreen:undefined;
  AdminCrearClasesScreen: undefined;
  CoachHomeScreen: undefined;
}

const Stack = createStackNavigator();

const App = () => {


  useEffect(() => {
    // Define la función para configurar el encabezado de autorización
    const setAuthHeader = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        ApiRoar.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };

    // Llama a la función para configurar el encabezado de autorización
    setAuthHeader();
  }, []);



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Iniciar Sesión',
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: true,
            title: 'Nuevo Usuario',
          }}
        />
        <Stack.Screen
          name="RolScreen"
          component={RolScreen}
          options={{
            title: 'Rol',
          }}
        />
        <Stack.Screen
          name="ProfileUpdate"
          component={ProfileUpdate}
          options={{
            title: 'Editar Perfil',
          }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{
            title: 'Cambiar contraseña',
          }}
        />
        <Stack.Screen
          name="UserTabsNavigator"
          component={UserTabsNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminHomeScreen"
          component={AdminHomeScreen}
          options={{
            title: 'Administrador',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminCrearClasesScreen"
          component={AdminCrearClasesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CoachHomeScreen"
          component={CoachHomeScreen}
          options={{
            title: 'Coach',
            headerShown: false,
          }}
        />
        <Stack.Screen name="AdminGestionHorarioScreen" component={AdminGestionHorarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
