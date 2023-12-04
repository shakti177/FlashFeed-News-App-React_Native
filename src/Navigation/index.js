import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';
import NewsDetail from '../Screens/NewsDetail';
import {CardStyleInterpolators} from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
