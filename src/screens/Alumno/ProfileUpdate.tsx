import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import useProfileController from '../../controllers/ControllerProfile';
import { RoundedButton } from '../../components/RoundedButton';
import { CustomTextInput } from '../../components/CustomTextInput';

const ProfileUpdate = () => {
  const { user, updateProfile } = useProfileController();
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleInputChange = (key: string, value: string) => {
    setUpdatedUser({ ...updatedUser, [key]: value });
  };

  const onFocus = (property: keyof typeof user) => {
    // Solo borra el campo si no se ha ingresado nada
    if (updatedUser[property] === user[property]) {
      setUpdatedUser({ ...updatedUser, [property]: '' });
    }
  };


  const onChange = (property: string, value: any) =>{
    setUpdatedUser({ ...updatedUser, [property]: value });

}

const onBlur = (property: keyof typeof user) => {
  // Si el campo está vacío, restaura el valor original
  if (updatedUser[property] === '') {
    setUpdatedUser({ ...updatedUser, [property]: user[property] });
  }
};

const onChangeInfoUpdate = (name: string, lastname: string, phone: string) =>{
    setUpdatedUser({ ...updatedUser, name: name, lastname: lastname, phone: phone });
  };

  useEffect(() => {
    onChangeInfoUpdate(user?.name!, user?.lastname!, user?.phone!);
  }, [user])

  const handleSaveChanges = () => {
    // Llama a la función de actualización de perfil con los datos actualizados
    updateProfile(updatedUser);
    console.log
    (updatedUser);
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={styles.container}>

      <Image 
        source={require('../../../assets/main-crossfit.jpg')}
        style={styles.imageBackground}
      />

      <View style={styles.form}>

        <ScrollView>

          <Text style={styles.formText}>Actualizar Información</Text>

          <CustomTextInput
            placeholder='Nombre'
            keyboardType='default'
            image={require ('../../../assets/user.png')}
            property= 'name'
            onChangeText={(property, value) => onChange(property, value)}
            onFocus={() => onFocus('name')}
            onBlur={() => onBlur('name')}
            value = {updatedUser.name}
          />
          <CustomTextInput
            placeholder='Apellidos'
            keyboardType='default'
            image={require ('../../../assets/user.png')}
            property = 'lastname'
            onChangeText={(property, value) => onChange(property, value)}
            onFocus={() => onFocus('lastname')}
            onBlur={() => onBlur('lastname')}
            value = {updatedUser.lastname}
          />
          <CustomTextInput
            placeholder='Teléfono'
            keyboardType='numeric'
            image={require('../../../assets/cellphone_79786.png')}
            property='phone'
            onChangeText={(property, value) => onChange(property, value)}
            onFocus={() => onFocus('phone')}
            onBlur={() => onBlur('phone')}
            value = {updatedUser.phone}
          />

          <View style={{marginTop: 30}}>

            <RoundedButton text='CONFIRMAR' onPress={handleSaveChanges} />
          
          </View>     

        </ScrollView>

      </View>
    </View>
  );

};
export default ProfileUpdate;;


// ... (código anterior)

// ... (código anterior)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    bottom: 200,
    position: 'absolute',
  },
  form: {
    flex: 1,
    width: '100%',
   
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingBottom: 30,

    
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '5%',
    alignItems: 'center'
  },
  logoImage: {
    width: 100,
    height: 100,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 100
  },
  logoText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 28,
    fontWeight: 'bold'
  },
  formText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18
  }
});

// ...




/*
const ProfileUpdate = () => {
  return (
    <View >
      <AuthControllerUpdate />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


*/