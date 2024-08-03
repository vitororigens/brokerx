import messaging from '@react-native-firebase/messaging';
import { database } from '.';
import notifee from '@notifee/react-native';

// Solicitar permissão para receber notificações
export const handleRequestUserPermission = async (uid: string) => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const tokenFcm = await messaging().getToken();
      await database.collection('Register').doc(uid).update({ tokenFcm });
      console.log('Token gerado:', tokenFcm);
    } else {
      console.log('Permissão não concedida');
    }
  } catch (error) {
    console.error('Erro ao solicitar permissão:', error);
  }
};


// Recebendo mensagens em primeiro plano
messaging().onMessage(async remoteMessage => {
  console.log('Mensagem recebida no foreground!', remoteMessage);
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'Nova mensagem',
    body: remoteMessage.notification?.body || 'Você tem uma nova mensagem.',
  });
});

// Recebendo mensagens em segundo plano
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Mensagem recebida no background!', remoteMessage);
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'Nova mensagem',
    body: remoteMessage.notification?.body || 'Você tem uma nova mensagem.',
  });
});

