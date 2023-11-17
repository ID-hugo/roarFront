import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { RoundedButton } from '../../components/RoundedButton';
import  useProfileController  from '../../controllers/ControllerProfile';

type ChangePasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { checkCurrentPassword, changePassword } = useProfileController(); // Importa la función desde tu controlador

  const handleChangePassword = async () => {
    try {
      // Verificar la contraseña actual antes de intentar cambiarla
      const isCurrentPasswordValid = await checkCurrentPassword(currentPassword);

      if (isCurrentPasswordValid) {
        // Llamamos a la función changePassword para cambiar la contraseña
        await changePassword(currentPassword, newPassword);
        Alert.alert('Contraseña cambiada con éxito');
        navigation.goBack(); // Vuelve a la pantalla anterior después de cambiar la contraseña
      } else {
        Alert.alert('La contraseña actual no es correcta');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cambiar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña actual"
        secureTextEntry
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <RoundedButton text="Cambiar Contraseña" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ChangePasswordScreen;
