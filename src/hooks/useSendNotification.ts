import { useState } from 'react';
import messaging from '@react-native-firebase/messaging';

interface UseSendNotification {
  sendNotification: (title: string, body: string, date: string, time: string) => Promise<any>;
  loading: boolean;
  error: string | null;
}

const useSendNotification = (): UseSendNotification => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendNotification = async (title: string, body: string, date: string, time: string): Promise<any> => {
    const serverKey = '030596e8e77db6d4d0c6f11ef6c2657a4ef214c8';

    setLoading(true);
    setError(null);

    try {
      const deviceToken = await messaging().getToken();

      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${serverKey}`,
        },
        body: JSON.stringify({
          to: deviceToken,
          data: {
            title,
            body,
            date,
            time,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na resposta do FCM:', errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log('Resposta do FCM:', data);

      return data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error('Erro ao enviar notificação:', err.message);
      } else {
        setError('Erro desconhecido');
        console.error('Erro desconhecido:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendNotification, loading, error };
};

export default useSendNotification;
