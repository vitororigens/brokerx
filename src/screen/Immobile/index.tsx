import { Text, View } from 'react-native';

export function Immobile() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems:'baseline'
    }}>
      <Text style={{
        textAlign: 'center'
      }}>Adicionar Imoveis</Text>
    </View>
  );
}

