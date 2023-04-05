import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text> Notificação com Notifee </Text>
      <Button title='Enviar notificação' onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
