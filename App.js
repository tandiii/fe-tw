import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login';
import MainDashboard from './pages/MainDashboard';
import Register from './pages/Register';
import Profile from './pages/Profile';
import InputText from './pages/InputText';
import UnggahGambar from './pages/UnggahGambar';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
   
<NavigationContainer >
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainDashboard" component={MainDashboard} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="InputText" component={InputText} />
        <Stack.Screen name="UnggahGambar" component={UnggahGambar} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


