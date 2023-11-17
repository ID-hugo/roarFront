import ClasesScreen from "../screens/Alumno/ClasesScreen";
import HomeScreen from "../screens/Alumno/HomeScreen";
import { Image } from "react-native";
import MembresiaScreen from "../screens/Alumno/MembresiaScreen";
import ProfileScreen from "../screens/Alumno/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const UserTabsNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions ={{
            tabBarStyle: {
              height: 80, // Ajusta la altura de la barra de navegación
            },
          }}
        >

            <Tab.Screen 
                name='HomeScreen' 
                component={HomeScreen}
                options={{
                    title: 'HOME',
                    tabBarLabel: 'HOME',
                    tabBarLabelStyle: {
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14
                    },
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={ require('../../assets/home.png') }
                            style={{ width: 25, height: 25}}
                        />
                    )
                }}
                />

            <Tab.Screen 
                name='ClasesScreen' 
                component={ClasesScreen}
                options={{
                    title: 'CLASES',
                    tabBarLabel: 'CLASES',
                    tabBarLabelStyle: {
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14
                    },
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={ require('../../assets/calendar-icon.jpg') }
                            style={{ width: 25, height: 25}}
                        />
                    )
                }}
                />

           
            <Tab.Screen 
                name='MembresiaScreen' 
                component={MembresiaScreen}
                options={{
                    title: 'TIENDA',
                    tabBarLabel: 'TIENDA',
                    tabBarLabelStyle: {
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14
                    },
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={ require('../../assets/shopping.png') }
                            style={{ width: 25, height: 25}}
                        />
                    )  
                      
                }}
                />
            
            <Tab.Screen 
                name='ProfileScreen' 
                component={ProfileScreen}
                options={{
                    title: 'PERFIL',
                    tabBarLabel: 'PERFIL',
                    tabBarLabelStyle: {
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14
                    },
                    headerShown: false,
                    tabBarIcon: ({ color }) => (            
                        <Image
                            source={ require('../../assets/userIcon.png') }
                            style={{ width: 25, height: 25}}
                        />
                    ) 
                    
                }}
                />
            

        </Tab.Navigator>
    )
}