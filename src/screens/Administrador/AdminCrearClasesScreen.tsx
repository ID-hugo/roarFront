import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import ControllerClases from '../../controllers/ControllerClases';
import { useNavigation } from '@react-navigation/native';
import CalendarioPopup from '../../components/PopUpCalendar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { Topbar } from '../../components/TopBar';


type ClaseType = {
    id:string;
    fecha: string;
    hora_inicio: string;
    hora_termino: string;
    limite_asistentes: number;
    reservas: number;
    tipo: string;
  };

  interface TiposClase {
    crosstraining: boolean;
    strength: boolean;
    athlete: boolean;
    [key: string]: boolean; // Firma de índice explícita
  };

const AdminCrearClaseScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {crearClase} = ControllerClases();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // Agrega el estado para mostrar el calendario

  const dateToString = (date: Date): string => {
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();

    return `${dia}/${mes}/${anio}`;
  }


  const [tiposClase, setTiposClase] = useState<TiposClase>({
    crosstraining: false,
    strength: false,
    athlete: false,
  });
  const [limiteAsistentes, setLimiteAsistentes] = useState('');

  

  const handleTipoClaseChange = (tipo: keyof TiposClase) => {
    setTiposClase((prevTipos) => ({
      ...prevTipos,
      [tipo]: !prevTipos[tipo],
    }));
  };

  const handleCrearClase = () => {

    

    const tiposSeleccionadosArray = Object.keys(tiposClase).filter(
      (tipo) => tiposClase[tipo]
    );

    
    const tiposParaBaseDeDatos = tiposSeleccionadosArray.join(',');

      const datosClase: ClaseType = {
      id: '0',
      fecha: dateToString(selectedDate),
      hora_inicio: HoraInicio,
      hora_termino: HoraTermino,
      limite_asistentes: parseInt(limiteAsistentes),
      reservas: 0,
      tipo: tiposParaBaseDeDatos,
    };


    crearClase(datosClase);
    navigation.navigate('AdminHomeScreen');

  };

  const [horaInicio, setHoraInicio] = useState('');
  const [minutosInicio, setMinutosInicio] = useState('');
  const [horaTermino, setHoraTermino] = useState('');
  const [minutosTermino, setMinutosTermino] = useState('');

  const formatearHora = (hora:any, minutos:any) => {
    const horaFormateada = hora.length === 1 ? `0${hora}` : hora;
    const minutosFormateados = minutos.length === 1 ? `0${minutos}` : minutos;
    return `${horaFormateada}:${minutosFormateados}`;
  };
  const formatFechaPersonalizada = (date: Date): string => {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const nombreDia = diasSemana[date.getDay()];
    const anio = date.getFullYear();

    return `${nombreDia} ${dia}/${mes}/${anio}`;
  };

  const HoraInicio = formatearHora(horaInicio, minutosInicio);
  const HoraTermino = formatearHora(horaTermino, minutosTermino);

  
  return (
    
    <View style={styles.container}>
<Topbar></Topbar>
        <ScrollView>

        <View style = {styles.section}>

        <Text style = {styles.sectionTitle}>Selecciona la fecha en la que se impartirá la clase:</Text>
            <View style={styles.container}>
      {/* Otros componentes existentes */}
      <CalendarioPopup
        visible={showCalendar}
        currentDate={selectedDate}
        onDateChange={(date) => setSelectedDate(date)}
        onClose={() => setShowCalendar(false)}
      />
      <View style={styles.CalendarRow}>

<TouchableOpacity onPress={() => setShowCalendar(true)}>
  <Image
    source={require('../../../assets/calendar.png')}
    style={styles.buttonCalendar}
  />
</TouchableOpacity>


  <Text style={styles.text}>
    {formatFechaPersonalizada(selectedDate)}
  </Text>
</View>
    </View>

        </View>

        <View style={styles.section}>
      <Text style={styles.sectionTitle}>Selecciona las horas de inicio y término de la clase:</Text>

      <View style={styles.inputContainer}>
        <Text>Hora de Inicio:</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="HH"
            onChangeText={(text) => setHoraInicio(text)}
            value={horaInicio}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={styles.inputSeparator}>:</Text>
          <TextInput
            style={styles.input}
            placeholder="MM"
            onChangeText={(text) => setMinutosInicio(text)}
            value={minutosInicio}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text>Hora de Término:</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="HH"
            onChangeText={(text) => setHoraTermino(text)}
            value={horaTermino}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={styles.inputSeparator}>:</Text>
          <TextInput
            style={styles.input}
            placeholder="MM"
            onChangeText={(text) => setMinutosTermino(text)}
            value={minutosTermino}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
      </View>
    </View>
                    

      

    <View style={styles.section}>  
    <Text style={styles.sectionTitle}>Selecciona los tipos de clase que se impartirán:</Text>                     
      <View style={styles.tiposContainer}>
      {Object.keys(tiposClase).map((tipo) => (
        <CheckBox
          key={tipo}
          style = {styles.tipoCheckbox}
          title={tipo}
          checked={tiposClase[tipo as keyof TiposClase]}
          onPress={() => handleTipoClaseChange(tipo as keyof TiposClase)}

        />
      ))}
    </View>
    </View>


      
    <View style={styles.section}>
      <View style={styles.inputContainer}>
        <Text>Límite de Asistentes:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 15"
          onChangeText={setLimiteAsistentes}
          keyboardType="numeric"
        />
      </View>
    </View> 

    <View style={styles.section}>

      <TouchableOpacity
        style={[styles.createButton, styles.button]}
        onPress={handleCrearClase}
      >
        <Text style={styles.buttonText}>Crear Clase</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },

  createButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  section: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
  },

  checkboxContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    paddingVertical: 5,
    alignItems: 'center',

  },
  diasContainer: {
    justifyContent: 'space-evenly',
  },
  checkbox: {
    width: 40, // Ancho fijo deseado
    height:40,
    marginHorizontal: 5, // Espaciado horizontal entre CheckBox
  },
  tiposContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  tipoCheckbox: {
    width: 80, // Ancho fijo deseado
    marginHorizontal: 5, // Espaciado horizontal entre CheckBox
    height: 40, // Ajusta según sea necesario
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  inputSeparator: {
    marginHorizontal: 5,
    fontSize: 18,
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  CalendarRow: {
      flexDirection: 'row', // Alinea los elementos horizontalmente
      alignItems: 'center', // Centra verticalmente los elementos
      justifyContent: 'space-around', // Espacio entre los elementos
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

export default AdminCrearClaseScreen;


