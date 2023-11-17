// Nuevo componente UserInfoField.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UserInfoFieldProps {
    label: string;
    value: string;
  }

  const UserInfoField: React.FC<UserInfoFieldProps> = ({ label, value }) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.valueContainer}>
        {value.split('\n').map((line, index) => (
          <Text key={index} style={styles.value}>
            {line}
          </Text>
        ))}
      </Text>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 100
  },
  value: {
    fontSize: 20,
  },
  valueContainer: {
    flexDirection: 'column',
    marginLeft: 10, // Ajusta según el espacio deseado entre label y value
  },
});

export default UserInfoField;
