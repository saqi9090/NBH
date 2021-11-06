/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { NotificationManagerAndroid } from './NotificationManager';
import { notificationManager } from './NotificationManagerIOS';
import AnimationTest from './src/AnimationTest';
import messaging from '@react-native-firebase/messaging';

import Test1 from './src/Test1';
import SendBox from './src/components/SendBox/SendBox';
NotificationManagerAndroid.createChannel();
NotificationManagerAndroid.configure();

// PushNotificationIOS.addEventListener('notification', onRemoteNotification);
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    JSON.stringify(remoteMessage.data);
    const { messageId } = remoteMessage;
    const data = remoteMessage.data
    if (Platform.OS === 'android') {
        NotificationManagerAndroid.showNotification(data.title, data.notificationText, data.subText, messageId, data,);
    } else {
        notificationManager.showNotification(2, data.subText, data.notificationText, data, {})
    }
});
AppRegistry.registerComponent(appName, () => App);
