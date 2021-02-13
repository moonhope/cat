// import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

async function registerForPushNotificationsAsync() {

  try{

  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  // ユーザーによる通知の許可or許可しないが決定していないときのみ
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  // ユーザーが通知許可しなかった場合は処理を抜ける
  if (finalStatus !== 'granted') return;
  // デバイストークンを取得する
  let token = await Notifications.getExpoPushTokenAsync();
    alert(token);
  } catch(error){
    console.log("ERR" + error);
  }

}

export default registerForPushNotificationsAsync;



