import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiRoar } from '../../api/ApiRoar';
import { Topbar } from '../../components/TopBar';
import PopUpClases from '../../components/PopUpRerservaClase';
import CalendarioPopup from '../../components/PopUpCalendar';
import ControllerClases from '../../controllers/ControllerClases';
import ControllerReservas from '../../controllers/ControllerReservas';

// Define un tipo para la clase
type ClaseType = {
  id:string;
  fecha: string;
  hora_inicio: string;
  hora_termino: string;
  limite_asistentes: number;
  reservas: number;
  tipo: string;
};

type ClaseTypeCopia = {
  id:string;
  dias: string;
  hora_inicio: string;
  hora_termino: string;
  limite_asistentes: number;
  tipo: string;
};

type ReservaType = {
  id:string;
  user_rol_alumno_id:string;
  id_clase:string;
};

const ClasesScreen = () => {
  // Configuración de navegación
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Estado para almacenar las clases disponibles

  const [isModalVisible, setModalVisible] = useState(false);
  
  const { reservarClase,clases} = ControllerClases();

  const [selectedClase, setSelectedClase] = useState<ClaseType | null>(null);
  const [showCalendar, setShowCalendar] = useState(false); // Agrega el estado para mostrar el calendario
  const [currentDate, setCurrentDate] = useState(new Date());

  const [showCrossTraining, setShowCrossTraining] = useState(true);
  const [showStrength, setShowStrength] = useState(true);
  const [showAthlete, setShowAthlete] = useState(true);

  const {reservasAlumno2} = ControllerReservas();

  



    // Abre el calendario
    const openCalendar = () => {
      setShowCalendar(true);
    };


  const openModal = (clase: ClaseType) => {
    setSelectedClase(clase);
    setModalVisible(true);
  };

  const handleReservarClase = (clase: ClaseType) => {

  };

  const closeModal = () => {
    setSelectedClase(null);
    setModalVisible(false);
  };

      // Maneja el cambio de fecha en el calendario
  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
    setShowCalendar(false);
  };

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    setCurrentDate(newDate);    
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    setCurrentDate(newDate);

  };


  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, '0'); // Asegura que siempre tenga 2 dígitos
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Se suma 1 ya que los meses comienzan desde 0
    const anio = date.getFullYear();
  
    return `${dia}/${mes}/${anio}`;
  };

  const formatFechaPersonalizada = (date: Date): string => {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const nombreDia = diasSemana[date.getDay()];
    const anio = date.getFullYear();
  
    return `${nombreDia} ${dia}/${mes}/${anio}`;
  };

  const formatHoraMinutos = (hora: string): string => {
    const [horaCompleta, minutos] = hora.split(':');
    return `${horaCompleta}:${minutos}`;
  };

  const dateToString = (date: Date): string => {
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();

    return `${dia}/${mes}/${anio}`;
};

const formatFechaADia = (date: Date): string => {
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const dia = date.getDate().toString().padStart(2, '0');
  const mes = (date.getMonth() + 1).toString().padStart(2, '0');
  const nombreDia = diasSemana[date.getDay()];
  const anio = date.getFullYear();

  return `${nombreDia} `;
};

const filterClasesByDate = (clases: ClaseType[], currentDate: Date, reservasAlumnos: ReservaType[]): ClaseType[] => {
  const formattedCurrentDate = dateToString(currentDate);
  console.log({ reservasAlumnos });

  return clases.filter((clase) => {
    const fechaMatches = formatFecha(clase.fecha) === formattedCurrentDate;

    // Verifica si hay una reserva para la clase actual
    const hasReserva = reservasAlumnos.some((reserva) => reserva.id_clase === clase.id);

    return fechaMatches && !hasReserva; // Solo incluir clases sin reserva
  });
};



  const toggleFilter = (filter:any) => {
    switch (filter) {
      case 'CrossTraining':
        setShowCrossTraining(!showCrossTraining);
        break;
      case 'Strength':
        setShowStrength(!showStrength);
        break;
      case 'Athlete':
        setShowAthlete(!showAthlete);
        break;
      default:
        break;
    }
  };




  return (
    
    <View style={styles.container}>


        <View style={styles.CalendarRow}>

          <TouchableOpacity onPress={openCalendar}>
            <Image
            source={require('../../../assets/calendar.png')}
            style={styles.buttonCalendar}// Define este estilo para establecer el tamaño de la imagen
          />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePreviousDay()}>
          <Image
            source={require('../../../assets/flechaDerecha.png')}
            style={styles.Back }
          />
          </TouchableOpacity>


        <Text  style={styles.text}>{formatFechaPersonalizada(currentDate)}</Text>

          <TouchableOpacity onPress={() => handleNextDay()}>
          <Image
            source={require('../../../assets/flechaDerecha.png')}
            style={styles.Next}
          />
          </TouchableOpacity>
      </View>
      


      <CalendarioPopup
        visible={showCalendar}
        currentDate={currentDate}
        onDateChange={handleDateChange}
        onClose={() => setShowCalendar(false)}
    />

 <View style={styles.checkList}>
        <TouchableOpacity
          onPress={() => toggleFilter('CrossTraining')}
          style={[styles.checkListItem, showCrossTraining ? styles.activeFilter : null]}
        >
          <Text style={styles.text}>CrossTraining</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFilter('Strength')}
          style={[styles.checkListItem, showStrength ? styles.activeFilter : null]}
        >
          <Text style={styles.text}>Strength</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFilter('Athlete')}
          style={[styles.checkListItem, showAthlete ? styles.activeFilter : null]}
        >
          <Text style={styles.text}>Athlete</Text>
        </TouchableOpacity>
      </View>



      <ScrollView>
        <Text style={styles.title}>Clases Disponibles:</Text>
        {clases.some((clase) => clase !== null) ? (
             filterClasesByDate(clases,currentDate,reservasAlumno2).map((clase, index) => (
            <View key={index} style={styles.claseContainer}>
              <Text style={styles.text}> {clase.tipo}</Text>
              <Text style={styles.text}>{formatFecha(clase.fecha)}</Text>
              <Text style={styles.text}>{formatHoraMinutos(clase.hora_inicio)} - {formatHoraMinutos(clase.hora_termino)}</Text>
              <Text style={styles.text}>Límite de asistentes: {clase.limite_asistentes}</Text>
              <Text style={styles.text}>Reservas: {clase.reservas}</Text>
              

              <TouchableOpacity
              style={[styles.button, clase.limite_asistentes === clase.reservas ? styles.disabledButton : null]}
              onPress={() => clase.limite_asistentes !== clase.reservas && openModal(clase)}
              disabled={clase.limite_asistentes === clase.reservas}
            >
              <Text style={styles.buttonText}>Reservar Clase</Text>
            </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No hay clases disponibles</Text>
        )}
      </ScrollView>
      <PopUpClases visible={isModalVisible} clase={selectedClase} closeModal={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  claseContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  claseInfo: {
    marginBottom: 10,
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  CalendarRow: {
      flexDirection: 'row', // Alinea los elementos horizontalmente
      alignItems: 'center', // Centra verticalmente los elementos
      justifyContent: 'space-between', // Espacio entre los elementos
      marginHorizontal: 10,
  },
  buttonCalendar: {
    width: 40, // Personaliza el ancho de la imagen según tus necesidades
    height: 40,
    tintColor: 'red'
  },
  Next: {
    width: 40, // Personaliza el ancho de la imagen según tus necesidades
    height: 40,
  },
  Back: {
    width: 40, // Personaliza el ancho de la imagen según tus necesidades
    height: 40,
    transform: [{scaleX: -1}]
  },
    checkList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  checkListItem: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
  activeFilter: {
    backgroundColor: 'red',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
});

export default ClasesScreen;

