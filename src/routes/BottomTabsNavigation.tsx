import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import { FontAwesome, FontAwesome6, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Home } from "../screen/Home";
import { Schedule } from "../screen/Schedule";
import { Immobile } from "../screen/Immobile";
import { List } from "../screen/List";
import { Notes } from "../screen/Notes";
import { NewContact } from "../screen/NewContact";

const { Navigator, Screen } = createBottomTabNavigator();
const tabBarHeight = Platform.OS === 'ios' ? 80 : 60;

export function BottomTabsNavigation() {
    const { COLORS} = useTheme();

    return (
        <Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: COLORS.WHITE,
                    height: tabBarHeight,
                    borderTopWidth: 0,
                   paddingLeft: 10,
                   paddingRight: 10
                },
                tabBarLabelStyle: {
                    display: 'none'
                },
                tabBarActiveTintColor: COLORS.RED_700,
                tabBarInactiveTintColor: COLORS.BLUE_800,
                
            }}
        >

            <Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={32} color={color}/>
                    )
                }}
                name="home"
                component={Home}
            />
             <Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="contact-book" size={32} color={color}/>
                    )
                }}
                name="schedule"
                component={Schedule}
            />
              <Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="add-home-work" size={32} color={color}/>
                    )
                }}
                name="immobile"
                component={Immobile}
            />
              <Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="clipboard-list" size={32} color={color}/>
                    )
                }}
                name="list"
                component={List}
            />
            <Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="notes-medical" size={32} color={color}/>
                    )
                }}
                name="notes"
                component={Notes}
            />
        
        </Navigator>
    )
}
