import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

export default function App() {
  const handleSendNotification = async () => {
    // APENAS PARA IOS
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'send-notification',
      name: 'Send Notification',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title:
        '<strong> [Passo a Passo] Firebase - Como usar React Native com Firebase? </strong>',
      body: 'Lançamento do vídeo do Icode Mobile',
      data: {
        videoURL: 'https://youtu.be/Fv8xNcXSqVI',
      },
      android: {
        channelId,
        largeIcon: 'https://github.com/Icode-Mobile.png',
        circularLargeIcon: true,
        pressAction: {
          id: 'send-notification',
        },
        actions: [
          {
            title: 'Assistir',
            pressAction: {
              id: 'assistir',
            },
          },
        ],
      },
    });
  };

  notifee.onBackgroundEvent(async (event) => {
    if (event.detail.pressAction?.id) {
      Linking.openURL(`${event.detail.notification?.data?.videoURL}`);
    }
  });

  notifee.onForegroundEvent((event) => {
    if (event.detail.pressAction?.id) {
      Linking.openURL(`${event.detail.notification?.data?.videoURL}`);
    }
  });

  const handleTriggerNotification = async () => {
    const date = new Date(Date.now());
    date.setHours(12);
    date.setMinutes(16);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    const channelId = await notifee.createChannel({
      id: 'trigger-notification',
      name: 'Trigger Notification',
      importance: AndroidImportance.HIGH,
      badge: true,
    });

    await notifee.createTriggerNotification(
      {
        title:
          '<strong> 🔴Ao vivo - #IPR: Criando projeto react native expo bare workflow | Android/IOS </strong>',
        body: 'Icode Mobile está ao vivo',
        android: {
          channelId,
        },
      },
      trigger
    );
  };

  const handleListNotifications = async () => {
    const notifications = await notifee.getTriggerNotificationIds();
    console.log(notifications);
  };

  const handleCancelNotification = async () => {
    await notifee.cancelTriggerNotification('UoHLMpCdfEVHdvkh61L2');
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text> Notificação com Notifee </Text>
      <Button title='Enviar notificação' onPress={handleSendNotification} />
      <Button
        title='Enviar notificação agendada'
        onPress={handleTriggerNotification}
      />
      <Button
        title='Listar notificacoes agendadas'
        onPress={handleListNotifications}
      />
      <Button title='Cancelar notificacao' onPress={handleCancelNotification} />
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
