import React from 'react'
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface Props {
    text: string,
    onPress: () => void
    style?: StyleProp<ViewStyle>; // Utiliza StyleProp para aceptar objetos de estilo
}

export const RoundedButton = ({text, onPress}:Props) => {
  return (
    <TouchableOpacity
        style = {styles.roundedButton}
        onPress={() => onPress() }
    >
        <Text style = {styles.textButton}>{text}</Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    roundedButton: {
        width : '100%',
        height : 50,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        opacity: 0.96
    },
    textButton : {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }

});
