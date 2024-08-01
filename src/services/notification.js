
import notifee from '@notifee/react-native';
import { message } from '.';

// Solicitar permissão para receber notificações
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === message.AuthorizationStatus.AUTHORIZED ||
    authStatus === message.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Autorizado a receber notificações');
  }
}

// Inicializar o Firebase e solicitar permissão
requestUserPermission();

messaging().onMessage(async remoteMessage => {
    console.log('Mensagem recebida no foreground!', remoteMessage);
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
    });
  });
  
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Mensagem recebida no background!', remoteMessage);
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
    });
  });
  
