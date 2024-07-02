import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "@/screens/HomeScreen";
import SearchScreen from "@/screens/SearchScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import { DrawerRouteParamList } from "@/types/drawerRoute";
import CustomDrawerContent from "@/components/CustomDrawerContent";

const Drawer = createDrawerNavigator<DrawerRouteParamList>();

const DrawerRoute = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTransparent: true,
        headerTintColor: "white",
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: "transparent",
        },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "" }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
