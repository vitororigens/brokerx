import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
    },
    popInitialNotification: true,
    requestPermissions: true,
});

export const scheduleNotification = (title, message, date) => {
    PushNotification.localNotificationSchedule({
        message: message,
        date: date,
        allowWhileIdle: true,
        repeatType: 'time',
        repeatTime: 1,
    });
};
