import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParams } from '@/navigation/app.navigator.types';
import { TasksScreen } from '@/screens/app/tasks';
import { TaskDetailsScreen } from '@/screens/app/task-details';

const { Navigator, Screen } = createNativeStackNavigator<AppStackParams>();

const screenOptions: NativeStackNavigationOptions = { headerShown: false };

const AppNavigator: React.FC = () => (
  <Navigator screenOptions={screenOptions}>
    <Screen component={TasksScreen} name="TasksScreen" />
    <Screen component={TaskDetailsScreen} name="TaskDetailsScreen" />
  </Navigator>
);

export { AppNavigator };
