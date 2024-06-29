import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "screens/HomeScreen";
import SearchScreen from "screens/SearchScreen";
import { DrawerRouteParamList } from "types/drawerRoute";

const Drawer = createDrawerNavigator<DrawerRouteParamList>();

const DrawerRoute = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: "",
        headerTransparent: true,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
