import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./StackNavigation";
import { BottomTabsNavigation } from "./BottomTabsNavigation";
import { StackPrivateNavigation } from "./StackPrivateNavigation";

export function Routes() {
    return (
        <NavigationContainer>
            <StackPrivateNavigation />
        </NavigationContainer>
    )
}