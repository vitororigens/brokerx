import { Text, View } from 'react-native';

export function Notes() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems:'baseline'
    }}>
      <Text style={{
        textAlign: 'center'
      }}>Notas</Text>
    </View>
  );
}

