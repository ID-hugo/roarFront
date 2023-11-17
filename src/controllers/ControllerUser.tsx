import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ApiRoar } from "../api/ApiRoar";

const useUserController = () => {
    type UserType = {
      id: string;
      email: string;
      name: string;
      lastname: string;
    };
  
    type AlumnoType = {
      id: string;
      user_id: string;
      rol_id: string;
      estado: string;
      tipo: string;
    };
  
    const [users, setUsers] = useState<UserType[]>([]);
    const [alumnos, setAlumnos] = useState<AlumnoType[]>([]);
    const [usersAlumnos, setUsersAlumnos] = useState<CombinedUserAlumnoType[]>([]);
  
    type CombinedUserAlumnoType = {
      id: string;
      user_id: string;
      email: string;
      name: string;
      lastname: string;
      rol_id: string;
      estado: string;
      tipo: string;
    };
  
    const combineUsersAndAlumnos = (users: UserType[], alumnos: AlumnoType[]): CombinedUserAlumnoType[] => {
      const combinedData: CombinedUserAlumnoType[] = [];
  
      for (const alumno of alumnos) {
        const user = users.find((u) => u.id === alumno.user_id);
  
        if (user) {
          const user_alumno: CombinedUserAlumnoType = {
            id: alumno.id,
            user_id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            rol_id: alumno.rol_id,
            estado: alumno.estado,
            tipo: alumno.tipo,
          };
  
          combinedData.push(user_alumno);
        }
      }
  
      return combinedData;
    };
  
    const fetchUsersAndAlumnos = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
  
        if (token) {
          const usersResponse = await ApiRoar.get('/users/allusers', {
            headers: {
              Authorization: token,
            },
          });
  
          if (usersResponse.data.success) {
            setUsers(usersResponse.data.data as UserType[]);
          }
  
          const alumnosResponse = await ApiRoar.get('/users/allAlumnos', {
            headers: {
              Authorization: token,
            },
          });
  
          if (alumnosResponse.data.success) {
            setAlumnos(alumnosResponse.data.data as AlumnoType[]);
          }
        }
      } catch (error) {
        console.error('Error fetching users and alumnos:', error);
      }
    };
  
    useEffect(() => {
      fetchUsersAndAlumnos();
    }, []);
  
    // Cuando cambian los usuarios o los alumnos, combina los datos
    useEffect(() => {
      if (users.length > 0 && alumnos.length > 0) {
        const combinedData = combineUsersAndAlumnos(users, alumnos);
        setUsersAlumnos(combinedData);
      }
    }, [users, alumnos]);
  
    return {
      users,
      alumnos,
      usersAlumnos,
    };
  };
  
  export default useUserController;