import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiRoar } from '../api/ApiRoar';
import useControllerUserRoll from '../controllers/ControllerUserRol';

type UserType = {
  id: string;
  user_id: string;
  email: string;
  name: string;
  lastname: string;
  rol_id: string;
  estado: string;
  tipo: string;
};

type PopUpAdministrarUserProps = {
  visible: boolean;
  user:any;
  closeModal: () => void;
};

const PopUpAdministrarUser: React.FC<PopUpAdministrarUserProps> = ({ visible, user, closeModal }) => {
const [selectedTipo, setSelectedTipo] = useState<string>(user?.tipo || '');
const [isActivo, setIsActivo] = useState<boolean>(user?.estado === 'activo');

const{UpdateUserAlumno} = useControllerUserRoll();
  
  useEffect(() => {
    // Actualiza el estado del Switch al abrir el pop-up
    setIsActivo(user?.estado === 'activo');
    setSelectedTipo(user?.tipo);
  }, [visible, user?.estado]);


  const handleConfirmar = () => {

    user.tipo = selectedTipo;

    if(isActivo){
      user.estado = 'activo';
    }else{
      user.estado = 'desactivado';
    }


    UpdateUserAlumno(user);


    closeModal();
  };



  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButtonX} onPress={closeModal}>
            <Text style={styles.closeButtonTextX}>x</Text>
          </TouchableOpacity>

          <View style={styles.leftContainer}>
            <Text style={styles.modalTitle}>Detalles del Perfil</Text>
            <Text>ID: {user?.user_id}</Text>
            <Text>Nombre : {`${user?.name} ${user?.lastname}`}</Text>
            <Text>Email: {user?.email}</Text>



              <Text>Tipo:</Text>

              <RNPickerSelect
                value={selectedTipo}
                onValueChange={(value) => setSelectedTipo(value)}
                items={[
                  { label: 'CrossTraining', value: 'crosstraining' },
                  { label: 'Athlete', value: 'athlete' },
                  { label: 'Strength', value: 'strength' },
                ]}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroid: {
                    color: 'black',
                    paddingHorizontal: 10,
                    paddingVertical: 12,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 8,
                    
                  },
                  iconContainer: {
                    top: 12,
                    right: 10,
                  },
                }}
                onOpen={() => {
                  // Establece el valor inicial como user.tipo
                  setSelectedTipo(user.tipo || null);
                }}
              />
           
            <View style = {styles.horizontalContainer}>

            <Text>Estado:</Text>
            <Switch
              value={isActivo}
              onValueChange={(value) => setIsActivo(value)}
            />

            </View>


            <TouchableOpacity style={styles.closeButton} onPress={handleConfirmar}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>

          {/* Aquí puedes agregar la sección para detalles de membresía en el lado derecho si es necesario */}

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
    flexDirection: 'row', // Muestra los contenidos en fila (izquierda y derecha)
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  leftContainer: {
    flex: 1, // Ocupa el 50% del espacio
  },
  rightContainer: {
    flex: 1, // Ocupa el 50% del espacio
  },
  closeButtonX: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    padding: 10,
    zIndex: 1,
  },
  closeButtonTextX: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Puedes ajustar el espacio entre los elementos según sea necesario
  },
});

export default PopUpAdministrarUser;