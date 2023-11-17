import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { RootStackParamList } from '../../../App';



const AdminGestionHorarioScreen = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

   

  const handleCrearClase = () => {
    
    navigation.navigate('AdminCrearClasesScreen');

  };

  

  
  return (
    <View style={styles.container}>

        <View style={styles.section}>

            <TouchableOpacity
                style={[styles.createButton, styles.button]}
                onPress={handleCrearClase}
            >
                <Text style={styles.buttonText}>Crear Clase Base</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.section}>

        
            <Text>Aqui mostrare el horario semanal</Text>

        </View>
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
});

export default AdminGestionHorarioScreen;