import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PopUpAdministrarUser from "../../components/PopUpAdministrarUser";
import useUserController from "../../controllers/ControllerUser";
import { Topbar } from "../../components/TopBar";

type UserType = {
    id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
};



const CoachHomeScreen = () => {

const [isModalVisible, setModalVisible] = useState(false);
const { users, alumnos, usersAlumnos } = useUserController();
const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

const openModal = (user:any) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

return (
    <View>
    <ScrollView>
    <View>
        <Topbar></Topbar>
            <Text style={styles.text}>Lista de alumnos</Text>
      <View style={styles.tableRow}>
        <Text style={styles.columnDateName}>Nombre</Text>
        <Text style={styles.columnDateEmail}>Email</Text>
        <Text style={styles.columnDateEstado}>Estado</Text>
        <Text style={styles.columnDateTipo}>Tipo</Text>
       
      </View>

      <FlatList
      data={usersAlumnos}
      keyExtractor={(item) => item.email}
      renderItem={({ item }) => (
     <View style={styles.tableRow}>
        <View style={[styles.columnDataContainer, styles.nameColumn]}>
        <Text style={styles.columnData}>{`${item.name} ${item.lastname}`}</Text>
      </View>
      <View style={[styles.columnDataContainer, styles.emailColumn]}>
        <Text style={styles.columnData}>{item.email}</Text>
      </View>
      <View style={[styles.columnDataContainer, styles.statusColumn]}>
        <View style={styles.statusIndicatorContainer}>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: item.estado === 'activo' ? 'green' : 'red' },
            ]}
          />

          <PopUpAdministrarUser
            visible={isModalVisible}
            user={selectedUser}
            closeModal={closeModal}
          />

        </View>
      </View>

        <View style={[styles.columnDataContainer, styles.typeColumn]}>
            <Text style={styles.columnData}>{item.tipo}</Text>
        </View>
  
        </View>
        )}
    />
    </View>
    </ScrollView>
    </View>
  );
};

export default CoachHomeScreen;

const styles = StyleSheet.create({    
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        paddingHorizontal: 0,
        paddingVertical: 10,
        marginLeft: 20,
        marginTop: 10
    },
    columnData: {
        flex: 1,
        fontSize: 13,
    },
    columnDataContainer: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    
    columnDateName: {
        width: 80,
        fontWeight: 'bold',
        paddingHorizontal: 0,
    },
    columnDateEmail: {
        width: 80,
        fontWeight: 'bold',
    },
    columnDateEstado: {
        width: 60,
        fontWeight: 'bold',
    },
    columnDateTipo: {
        width: 100,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    nameColumn: {
        width: 80,
        paddingHorizontal: 0, // Ajusta este valor según tus necesidades
    },
    emailColumn: {
        width: 80,
        paddingHorizontal: 0, // Ajusta este valor según tus necesidades
    },
    statusColumn: {
        width: 50, // Ajusta este valor según tus necesidades
        justifyContent: 'center',
        alignItems: 'center',
    },
    typeColumn: {
        width: 100, // Ajusta este valor según tus necesidades
        fontSize: 1,
    },
    statusIndicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10
    }
})