import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';
import NewsDetail from '../Screens/NewsDetail';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
