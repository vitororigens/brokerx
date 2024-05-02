import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./StackNavigation";
import { BottomTabsNavigation } from "./BottomTabsNavigation";

export function Routes() {
    return (
        <NavigationContainer>
            <BottomTabsNavigation />
        </NavigationContainer>
    )
}