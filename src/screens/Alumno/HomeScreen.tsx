import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import useProfileController from '../../controllers/ControllerProfile';
import { Topbar } from '../../components/TopBar';
import ControllerReservas from '../../controllers/ControllerReservas';


type ReservaType = {
  id: string;
  user_rol_alumno_id: string;
  id_clase: string;
};

type ClaseType = {
  id: string;
  fecha: string;
  hora_inicio: string;
  hora_termino: string;
  limite_asistentes: number;
  reservas: number;
  tipo: string;
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [authenticated, setAuthenticated] = useState(false);

  const { user, alumno } = useProfileController();
  const { reservasAlumno,fetchEliminarReserva } = ControllerReservas();

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setAuthenticated(true); // El usuario está autenticado
    } else {
      setAuthenticated(false);
    }
  };

  const handleVerClases = () => {
    if (alumno.estado === 'activo') {
      navigation.navigate('ClasesScreen');
    } else {
      Alert.alert(
        'Cuenta Desactivada',
        'Tu cuenta está desactivada. Por favor, contáctate con el administrador para activar tu cuenta.',
      );
    }
  };

  const handleEliminarReserva = (reserva: ClaseType) => {
    fetchEliminarReserva(reserva.id);


  };

  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();

    return `${dia}/${mes}/${anio}`;
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleReservarClase = (clase: ClaseType) => {
    // Lógica para reservar clase
  };

  const formatHoraMinutos = (hora: string): string => {
    const [horaCompleta, minutos] = hora.split(':');
    return `${horaCompleta}:${minutos}`;
  };

    const clasesDeHoy = reservasAlumno.filter((reserva: ClaseType) => {
    const hoy = new Date();
    const fechaClase = new Date(reserva.fecha);
    return (
      fechaClase.getDate() === hoy.getDate() &&
      fechaClase.getMonth() === hoy.getMonth() &&
      fechaClase.getFullYear() === hoy.getFullYear()
    );
  });

  return (
    <View style={styles.container2}>
      

      <ScrollView style={styles.container}>
        {/* Sección 1 - Perfil */}
        <View style={styles.fixedSection}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil</Text>
            <View style={styles.profileInfo}>
              <Image source={require('../../../assets/149071.png')} style={styles.profileImage} />
              <View style={styles.userInfo}>
                <Text>Nombre: {user.name} {user.lastname}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Teléfono: {user.phone}</Text>
                <Text>Estado: {alumno.estado}</Text>
                <Text>Plan : {alumno.tipo}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.redButton]}
              onPress={() => {
                navigation.navigate('ProfileScreen');
              }}
            >
              <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sección 2 - Tus Clases */}
        <View style={styles.expandedSection}>
          <Text style={styles.sectionTitle}>Tus Clases</Text>
          {clasesDeHoy.map((reserva: ClaseType) => (
            <View key={reserva.id} style={styles.claseContainer}>
              <View style={styles.claseContent}>
                <Text style={styles.text}> {reserva.tipo}</Text>
                <Text style={styles.text}>{formatFecha(reserva.fecha)}</Text>
                <Text style={styles.text}>
                  {formatHoraMinutos(reserva.hora_inicio)} - {formatHoraMinutos(reserva.hora_termino)}
                </Text>
                <Text style={styles.text}>Límite de asistentes: {reserva.limite_asistentes}</Text>
                <Text style={styles.text}>Reservas: {reserva.reservas}</Text>
              </View>

              <View style={styles.claseButtons}>
                

                <TouchableOpacity
                  style={[styles.button, styles.redButton]}
                  onPress={() => handleEliminarReserva(reserva)}
                >
                  <Text style={styles.buttonText}>Eliminar Reserva</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={[
              styles.button,
              styles.redButton,
              alumno.estado === 'activo' ? {} : styles.disabledButton,
            ]}
            onPress={handleVerClases}
            disabled={alumno.estado !== 'activo'}
          >
            <Text style={styles.buttonText}>Ver Clases Disponibles</Text>
          </TouchableOpacity>
        </View>

        {/* Sección 3 - Ver Planes */}
        <View style={styles.fixedSection}>
          <Text style={styles.sectionTitle}>Ver Planes</Text>
          <TouchableOpacity
            style={[styles.button, styles.redButton]}
            onPress={() => {
              navigation.navigate('MembresiaScreen');
            }}
          >
            <Text style={styles.buttonText}>Ver Planes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666666',
  },
  container2: {
    flex: 1,
    backgroundColor: '#666666',
  },
  fixedSection: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  expandedSection: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 50, // Aumenta el margen inferior
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  section: {
    width: '95%',
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  redButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  reservasInfo: {
    marginVertical: 10,
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  claseContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,  // Añade un borde de 1 píxel
    borderColor: 'lightgray',  // Color del borde
  },
  claseContent: {
    flex: 1,
  },
  claseButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonMargin: {
    marginLeft: 10,
  },
});

export default HomeScreen;