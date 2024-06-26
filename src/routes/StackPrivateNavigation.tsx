import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import { NewContact } from '../screen/NewContact';
import { BottomTabsNavigation } from './BottomTabsNavigation';
import { NewNotes } from '../screen/NewNotes';
import { CardContact } from '../screen/CardContact';

export function StackPrivateNavigation() {
    const { Navigator, Screen } = createNativeStackNavigator()

    return (
        <Navigator screenOptions={{ headerShown: false}}>
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
      
        </Navigator>
    )
}