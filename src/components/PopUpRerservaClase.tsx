import React, { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import useState from 'react';
import ControllerClases from '../controllers/ControllerClases';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

// Define un tipo para los detalles de la clase
type ClaseType = {
  id:string;
  fecha: string;
  hora_inicio: string;
  hora_termino: string;
  limite_asistentes: number;
  reservas: number;
  tipo: string;
};

type PopUpClasesProps = {
  visible: boolean;
  clase: ClaseType | null;
  closeModal: () => void;
};


const PopUpClases: React.FC<PopUpClasesProps> = ({ visible, clase, closeModal }) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const{reservarClase} = ControllerClases();

  if (!clase) {
    return null; // Si no hay detalles de la clase, no mostramos el modal
  }

  const handleReservarClase = () => {
    reservarClase(clase.id, () => {
    navigation.navigate('HomeScreen');
      closeModal();
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>

        <TouchableOpacity style={styles.closeButtonX} onPress={closeModal}>
            <Text style={styles.closeButtonTextX}>x</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Detalles de la Clase</Text>
          <Text>id: {clase.id}</Text>
          <Text>Fecha: {clase.fecha}</Text>
          <Text>Hora de inicio: {clase.hora_inicio}</Text>
          <Text>Hora de término: {clase.hora_termino}</Text>
          <Text>Límite de asistentes: {clase.limite_asistentes}</Text>


          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleReservarClase }           

          >
            <Text style={styles.buttonText}>Reservar Clase</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  closeButtonX: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    padding: 10,
    zIndex: 1,
     // Para que el botón esté sobre el contenido
  },
  closeButtonTextX: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default PopUpClases;