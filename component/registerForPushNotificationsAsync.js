// import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import 'firebase/firestore';

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
    console.log(token);
    const matchResults = token.data.match(/ExponentPushToken\[(.*)\]/);
    const actualToken = matchResults[1];
    console.log(token.data);
    saveDeviceToken(actualToken);

  } catch(error){
    console.log("ERR" + error);
  }

}

const saveDeviceToken = async (token) => {

  const db = firebase.app().firestore();
  
  if (!actualToken) return;

  const docRef = await db.collection("tokens").add({ token })

};




export default registerForPushNotificationsAsync;



