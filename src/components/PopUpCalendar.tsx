import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

type CalendarioPopupProps = {
  visible: boolean;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
};

const CalendarioPopup: React.FC<CalendarioPopupProps> = ({
  visible,
  currentDate,
  onDateChange,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modal}>
      <View style={styles.modalContent}>




        <Calendar
          current={currentDate.toISOString().split('T')[0]}
          onDayPress={(day) => onDateChange(new Date(day.dateString + 'T00:00:00'))}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        
        </View>
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
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default CalendarioPopup;