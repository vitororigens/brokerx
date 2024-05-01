import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Start } from '../screen/Start';
import { SingIn } from '../screen/SingIn';
import { SingUp } from '../screen/SingUp';

export function StackNavigation() {
    const { Navigator, Screen } = createNativeStackNavigator()

    return (
        <Navigator>
            <Screen
                name='start'
                component={Start}
            />
            <Screen
                name='singin'
                component={SingIn}
            />
            <Screen
                name='singup'
                component={SingUp}
            />
        </Navigator>
    )
}