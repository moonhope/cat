// import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import 'firebase/firestore';

/*
 * @概要　EXPOから機器番号を取得し、firebaseに保存する関数
 * @引数　なし
 *
*/
async function getExpoToken() {

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
    console.log(token.data);
    alert(token.data);

    saveDeviceToken(token.data);

  } catch(error){
      console.log("ERR" + error);
  }

}

/*
 * @概要　EXPOの機器番号をfirebaseに保存する関数
 * @引数　token：EXPOから取得した端末番号
 *
*/

const saveDeviceToken = async (token) => {

  if (!token) return;

  const db = firebase.app().firestore();

  const user = await firebase.auth().currentUser;
  const uid = user.uid;

  const docRef = db.collection('users').doc(uid);
  await docRef.set({ token: token });
  
};

export default getExpoToken;
