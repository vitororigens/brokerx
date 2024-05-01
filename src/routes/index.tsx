import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./StackNavigation";

export function Routes() {
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    )
}