import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Topbar } from '../../components/TopBar';

const MembresiaScreen = () => {
  const [membresias, setMembresias] = useState([
    { tipo: 'Crosstraining', clases: 8, precio: 30000 },
    { tipo: 'Crosstraining', clases: 12, precio: 40000 },
    { tipo: 'ROAR PROGRAM', clases: 16, precio: 50000 },
    { tipo: 'Crosstraining', clases: 6, precio: 24000 },
    { tipo: 'Crosstraining', clases: 4, precio: 20000 },
    { tipo: 'Crosstraining', clases: 4, precio: 20000 },
  ]);

  const handleModificarMembresias = () => {
    // Implementa la lógica para modificar membresías utilizando el estado local
  };

  return (
    <View>
      <Topbar></Topbar>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.title}>MEMBRESÍAS</Text>
        </View>

        {membresias.map((membresia, index) => (
          <View style={styles.container} key={index}>
            <View style={styles.leftContainer}>
              <Text style={styles.plan}>Plan Mensual</Text>
              <Text style={styles.crosstraining}>{`${membresia.tipo} (${membresia.clases} clases mensuales)`}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.precio}>{`$${membresia.precio}`}</Text>
            </View>
          </View>
        ))}

        {/* Agrega la sección para modificar membresías */}
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // Estilos para el ScrollView
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    marginLeft: 10,
  },
  plan: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  crosstraining: {
    fontSize: 14,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  
});

export default MembresiaScreen;
