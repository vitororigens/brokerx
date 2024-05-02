import { Text, View } from 'react-native';

export function List() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems:'baseline'
    }}>
      <Text style={{
        textAlign: 'center'
      }}>Lista de Imoveis</Text>
    </View>
  );
}

