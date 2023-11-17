import React from 'react'
import { View, Image, TextInput, KeyboardType, StyleSheet } from 'react-native'

interface Props {
    image?: any,
    placeholder: string,
    value: string,
    keyboardType: KeyboardType,
    secureTextEntry?: boolean,
    property: string,
    onChangeText: (property: string, value: any) => void,
    onFocus?: () => void;
  onBlur?: () => void;
}

export const CustomTextInput = ({
    image,
    placeholder,
    value,
    keyboardType,
    secureTextEntry = false,
    property,
    onChangeText,
    onFocus,
    onBlur,

}: Props) => {

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };



  return (

     <View style = {styles.formInput}>
            <Image 
              style = {styles.formIcon}
              source = {image}
            />

            <TextInput
              style = {styles.formTextInput }
              placeholder={placeholder}
              keyboardType= {keyboardType}
              value = { value }
              onChangeText = { text => onChangeText(property, text) }
              secureTextEntry = {secureTextEntry}
              onFocus={onFocus}
              onBlur={onBlur}
            />

          </View>

  )
}

const styles = StyleSheet.create({
    formTextInput:{
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEB',
        marginLeft: 15,
      },
      formInput:{
        flexDirection: 'row',
        marginTop: 30,
      },
      formIcon:{
        width: 25,
        height:25,
        marginTop: 5
      }
})
