import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import { ForgetPassword } from '../screen/ForgetPassword';
import { Start } from '../screen/Start';
import { SingIn } from '../screen/SingIn';
import { SignUp } from '../screen/SingUp';

export function StackNavigation() {
    const { Navigator, Screen } = createNativeStackNavigator()

    return (
        <Navigator screenOptions={{ headerShown: false}}>
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
                component={SignUp}
            />
            <Screen
                name='forgetpassword'
                component={ForgetPassword}
            />
        </Navigator>
    )
}