import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import useProfileController from '../../controllers/ControllerProfile';
import { Topbar } from '../../components/TopBar';
import useUserController from '../../controllers/ControllerUser';
import PopUpAdministrarUser from '../../components/PopUpAdministrarUser';
import ControllerClases from '../../controllers/ControllerClases';
import { format, addDays, subDays, startOfWeek, endOfWeek, isWithinInterval, parse } from 'date-fns';
import MembresiaScreen from '../Alumno/MembresiaScreen';


type UserType = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  // Agrega más campos según sea necesario
};

type ClaseType = {
  id:string;
  fecha: string;
  hora_inicio: string;
  hora_termino: string;
  limite_asistentes: number;
  reservas: number;
  tipo: string;
};

const AdminHomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { user } = useProfileController();
  const { users, alumnos, usersAlumnos } = useUserController();
  const [activeTab, setActiveTab] = useState('GestionUsuarios');

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const {clases} = ControllerClases();
  const [selectedClase, setSelectedClase] = useState<ClaseType | null>(null);

  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, '0'); // Asegura que siempre tenga 2 dígitos
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Se suma 1 ya que los meses comienzan desde 0
    const anio = date.getFullYear();
  
    return `${dia}/${mes}/${anio}`;
  };

  const convertirStringADate = (fechaString:string) => {
    const [dia, mes, anio] = fechaString.split('/').map(Number);
    const fecha = new Date(`${anio}-${mes}-${dia}`);
    return fecha;
  };

  const filterClasesByWeek = (clases: ClaseType[], currentWeekStart: Date): ClaseType[] => {
   
    const inicioSemana = format(currentWeekStart, 'dd/MM/yyyy');
    const finSemana = format(endOfWeek(currentWeekStart), 'dd/MM/yyyy');

    const inicio = convertirStringADate(inicioSemana);
    const fin = convertirStringADate(finSemana);


    return clases.filter((clase) => {

      const formateoFecha = formatFecha(clase.fecha);
      const fechaClase = convertirStringADate(formateoFecha);

      return isWithinInterval(fechaClase, { start: inicio, end: fin });
      
    });
  };

  const organizeClasesByDay = (clases: ClaseType[]) => {
    // Crear una matriz de 6 columnas (una por cada día de la semana)
    const clasesPorDia: ClaseType[][] = [[], [], [], [], [], []];

    // Filtrar las clases para la semana actual
    const clasesSemana = filterClasesByWeek(clases, currentWeekStart);

    // Organizar las clases por día
    clasesSemana.forEach((clase) => {
      const formateoFecha = formatFecha(clase.fecha);
      const fechaClase = convertirStringADate(formateoFecha);
      
      // Obtener el índice del día de la semana (0 para domingo, 1 para lunes, etc.)
      const diaSemana = fechaClase.getDay();
      if (!clasesPorDia[diaSemana]) {
        clasesPorDia[diaSemana] = [];
      }
      // Agregar la clase al arreglo correspondiente al día de la semana
      clasesPorDia[diaSemana].push(clase);
    });

    return clasesPorDia;
  }; 
  
  const formatHoraMinutos = (hora: string): string => {
    const [horaCompleta, minutos] = hora.split(':');
    return `${horaCompleta}:${minutos}`;
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(subDays(currentWeekStart, 7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const openModal = (user:any) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  const openModalCrearClase = (user:any) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModalCrearClase = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  const renderContent = () => {
    if (activeTab === 'GestionUsuarios') {
      return (
        <View>
          <View style={styles.createButtonContainer}>
            <TouchableOpacity
              style={[styles.createButton, styles.button]}
              onPress={() => {
                // Agrega la funcionalidad para crear usuario aquí
              }}
            >
              <Text style={styles.buttonText}>Crear Usuario</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.columnDateName}>Nombre</Text>
            <Text style={styles.columnDateEmail}>Email</Text>
            <Text style={styles.columnDateEstado}>Estado</Text>
            <Text style={styles.columnDateTipo}>Tipo</Text>
            <Text style={styles.columnDateEstado}>Más</Text>
          </View>

          <FlatList
          data={usersAlumnos}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
         <View style={styles.tableRow}>
            <View style={[styles.columnDataContainer, styles.nameColumn]}>
            <Text style={styles.columnData}>{`${item.name} ${item.lastname}`}</Text>
          </View>
          <View style={[styles.columnDataContainer, styles.emailColumn]}>
            <Text style={styles.columnData}>{item.email}</Text>
          </View>
          <View style={[styles.columnDataContainer, styles.statusColumn]}>
            <View style={styles.statusIndicatorContainer}>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: item.estado === 'activo' ? 'green' : 'red' },
                ]}
              />

              <PopUpAdministrarUser
                visible={isModalVisible}
                user={selectedUser}
                closeModal={closeModal}
              />

            </View>
          </View>
      <View style={[styles.columnDataContainer, styles.typeColumn]}>
        <Text style={styles.columnData}>{item.tipo}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>openModal(item)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )}
/>
        </View>
      );
    } else if (activeTab === 'GestionClases') {

      
      const clasesPorDia = organizeClasesByDay(clases);

      return (
        <View>
          <View style={styles.navClasesRow}>
            {/* Botones de navegación de semanas */}
            <View style={styles.createButtonContainer}>
              <TouchableOpacity
                style={[styles.createButton, styles.button]}
                onPress={() => {
                  navigation.navigate('AdminCrearClasesScreen');
                }}
              >
                <Text style={styles.buttonText}>Crear Clase</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => goToPreviousWeek()}>
              <Image
                source={require('../../../assets/flechaDerecha.png')}
                style={styles.Back }
              />
            </TouchableOpacity>
            {/* Mostrar el rango de fechas de la semana */}
            <Text>{` ${format(currentWeekStart, 'dd/MM/yy')} - ${format(endOfWeek(currentWeekStart), 'dd/MM/yy')}`}</Text>
            <TouchableOpacity onPress={() => goToNextWeek()}>
              <Image
                source={require('../../../assets/flechaDerecha.png')}
                style={styles.Next}
              />
            </TouchableOpacity>
          </View>

          <ScrollView>
          <ScrollView horizontal={true}>
          
          {/* Renderizar la tabla con clases por día */}
          <View style={styles.tableRowClases}>
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((dia, index) => (
              <View key={index} style={styles.columnDataContainerClases}>
                <Text style={styles.columnDataClases}>{dia}</Text>
                {clasesPorDia[index].map((clase) => (
                  <TouchableOpacity
                    key={clase.id}
                    style={styles.claseCard}
                    onPress={() => setSelectedClase(clase)}
                  >
                    <Text style={styles.claseCardTitle}>{clase.tipo}</Text>
                    <Text>{formatFecha(clase.fecha)}</Text>
                    <Text>{formatHoraMinutos(clase.hora_inicio) +" " +formatHoraMinutos(clase.hora_termino)}</Text>
                    <Text>{`Reservas:${clase.reservas}/${clase.limite_asistentes}`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          </ScrollView>
          </ScrollView>
        </View>
      );
    } else if (activeTab === 'GestionMembresia') {
        return (
          <View>
            {/* Botón para modificar membresías */}
            <View style={styles.createButtonContainer}>
              <TouchableOpacity
                style={[styles.createButton, styles.button]}
                onPress={() => {
                  
                }}
              >
                <Text style={styles.buttonText}>Modificar Membresías</Text>
              </TouchableOpacity>
            </View>
      
            {/* Sección de membresías */}
            <MembresiaScreen />
          </View>
        );
      }
      
    };
  

  return (
    <View style={styles.container}>
      {/* Topbar fijo en la parte superior */}
      <Topbar />

      {/* Sección 1 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{`Hola ${user.name} ${user.lastname}`}</Text>
      </View>

      {/* Sección 2 - Botones de navegación */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'GestionUsuarios' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('GestionUsuarios')}
        >
          <Text style={styles.tabButtonText}>Gestion Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'GestionClases' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('GestionClases')}
        >
          <Text style={styles.tabButtonText}>Gestion Clases</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'GestionMembresia' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('GestionMembresia')}
        >
          <Text style={styles.tabButtonText}>Gestion Membresía</Text>
        </TouchableOpacity>
      </View>

      {/* Sección 3 - Contenido variable */}
      <View style={styles.section}>
        {renderContent()}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
  flex:1,

  },
  container2: {
    flex: 1,
  },
  section: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  createButtonContainer: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  createButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 0,
    paddingVertical: 10,
  },

  tableRowClases: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  columnData: {
    flex: 1,
    fontSize: 13,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    marginRight: 5,
  },
  activeTab: {
    backgroundColor: 'red',
  },
  tabButtonText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  columnDataContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  columnDateName: {
    width: 80,
    fontWeight: 'bold',
    paddingHorizontal: 0,
  },
  columnDateEmail: {
    width: 80,
    fontWeight: 'bold',
  },
  columnDateEstado: {
    width: 60,
    fontWeight: 'bold',
  },
  columnDateTipo: {
    width: 100,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  nameColumn: {
    width: 80,
    paddingHorizontal: 0, // Ajusta este valor según tus necesidades
  },
  emailColumn: {
    width: 80,
    paddingHorizontal: 0, // Ajusta este valor según tus necesidades
  },
  statusColumn: {
    width: 50, // Ajusta este valor según tus necesidades
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeColumn: {
    width: 100, // Ajusta este valor según tus necesidades
    fontSize: 1,
  },
  statusIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  addButton: {
    flex: 1, // O ajusta este valor según tus necesidades
    backgroundColor: 'red',
    borderRadius: 10,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  claseCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  claseCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
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
  navClasesRow: {
    flexDirection: 'row', // Alinea los elementos horizontalmente
    alignItems: 'center', // Centra verticalmente los elementos
    justifyContent: 'space-between', // Espacio entre los elementos
    
},
columnDataContainerClases: {
  flex: 1,
},
columnDataClases: {
  textAlign: 'center',
  alignItems: 'center',
  width: 100, // Ancho fijo deseado
  fontWeight: 'bold',
  fontSize: 16,
},
});

export default AdminHomeScreen;

