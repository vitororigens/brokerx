import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import { NewContact } from '../screen/NewContact';
import { BottomTabsNavigation } from './BottomTabsNavigation';
import { NewNotes } from '../screen/NewNotes';
import { CardContact } from '../screen/CardContact';
import { CardImmobile } from '../screen/CardImmobile';
import { Perfil } from '../screen/Perfil';
import { Favorite } from '../screen/Favorite';

export function StackPrivateNavigation() {
    const { Navigator, Screen } = createNativeStackNavigator()

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name='privatesroutes'
                component={BottomTabsNavigation}
            />
            <Screen
                name='newcontact'
                component={NewContact}
            />
            <Screen
                name='newnotes'
                component={NewNotes}
            />
            <Screen
                name='cardcontact'
                component={CardContact}
            />
            <Screen
                name='cardimmobile'
                component={CardImmobile}
            />
            <Screen
                name='perfil'
                component={Perfil}
            />
            <Screen
                name='favorite'
                component={Favorite}
            />

        </Navigator>
    )
}