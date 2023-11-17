import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';

const AdminGestionMembresiasScreen = () => {
  const [membresias, setMembresias] = useState([
    { tipo: 'Crosstraining', clases: 8, precio: 30000 },
    { tipo: 'Crosstraining', clases: 12, precio: 40000 },
    { tipo: 'ROAR PROGRAM', clases: 16, precio: 50000 },
    { tipo: 'Crosstraining', clases: 6, precio: 24000 },
    { tipo: 'Crosstraining', clases: 4, precio: 20000 },
    { tipo: 'Crosstraining', clases: 4, precio: 20000 },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [clases, setClases] = useState('');
  const [precio, setPrecio] = useState('');

  const handleModificarMembresias = () => {
    // Aquí puedes realizar acciones con los datos ingresados, como enviarlos a un servidor o almacenarlos localmente.
    // Luego, puedes cerrar el modal y realizar cualquier otra acción necesaria.
    setModalVisible(false);
  };

  return (
    <View style={styles.modificarContainer}>
          <Text style={styles.modificarTitle}>Modificar Membresías</Text>
          {membresias.map((membresia, index) => (
            <View style={styles.modificarInputContainer} key={index}>
              <Text style={styles.modificarLabel}>{`${membresia.tipo}:`}</Text>
              <TextInput
                style={styles.modificarInput}
                placeholder="Precio"
                keyboardType="numeric"
                value={membresia.precio.toString()}
                onChangeText={(text) => {
                  const newMembresias = [...membresias];
                  newMembresias[index].precio = parseInt(text) || 0;
                  setMembresias(newMembresias);
                }}
              />
              <TextInput
                style={styles.modificarInput}
                placeholder="Clases"
                keyboardType="numeric"
                value={membresia.clases.toString()}
                onChangeText={(text) => {
                  const newMembresias = [...membresias];
                  newMembresias[index].clases = parseInt(text) || 0;
                  setMembresias(newMembresias);
                }}
              />
            </View>
          ))}
          <View style={styles.modificarButtonContainer}>
            <TouchableOpacity
              style={[styles.createButton, styles.button]}
              onPress={handleModificarMembresias}
            >
              <Text style={styles.buttonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
  button: {
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  modificarContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  modificarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modificarInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modificarLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  modificarInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  modificarButtonContainer: {
    alignItems: 'flex-end',
  },
});

export default AdminGestionMembresiasScreen;
