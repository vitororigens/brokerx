import { Text, View } from 'react-native';

export function Home() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems:'baseline'
    }}>
      <Text style={{
        textAlign: 'center'
      }}>Home</Text>
    </View>
  );
}

