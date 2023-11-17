import React, { useState } from 'react';
import { Modal, Text, View, Button } from 'react-native';

interface PopupMembresiasProps {
  isVisible: boolean;
  onClose: () => void;
  membresias: string[]; // Lista de membresías
  onSelect: (membresia: string) => void; 
}

const PopupMembresias: React.FC<PopupMembresiasProps> = ({ isVisible, onClose, membresias }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
          <Text>Selecciona una membresía:</Text>
          {membresias.map((membresia, index) => (
            <Button key={index} title={membresia} onPress={onClose} />
          ))}
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default PopupMembresias;
