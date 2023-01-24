import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAXn5S5V3CcuE5OfwLmkkuVXjKlbaIr_MU",
authDomain: "vtrade-1333d.firebaseapp.com",
databaseURL: "https://vtrade-1333d-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "vtrade-1333d",
storageBucket: "vtrade-1333d.appspot.com",
messagingSenderId: "521642175604",
appId: "1:521642175604:web:d91d8fc65bdd3d2894f521",
measurementId: "G-ECF3K3JZ5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
import {getDatabase,ref,get ,set,child,update,remove}  
from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js"
const db=getDatabase(); 


const dbRef = ref(getDatabase());
// export var result={}
export async function stockid(){
   
    return new Promise((resolve,reject)=>{
  
 get(child(dbRef, "stockid")).then((snapshot) => {
  if (snapshot.exists()) {
     var res=JSON.stringify(snapshot.val())
  //  result=res;
    // console.log( res);
    // console.log( res)
    const split_string = res.split(",");
 
  // console.log(split_string[1818])
  resolve(split_string)
     
     
  } else {
    console.log("No data available");
     
  }
}).catch((error) => {
  console.error("some error"+error);
});
})
}

export async function stockname(){
   
  return new Promise((resolve,reject)=>{

get(child(dbRef, "stockname")).then((snapshot) => {
if (snapshot.exists()) {
   var res=JSON.stringify(snapshot.val())
//  result=res;
  // console.log( res);
  // console.log( res)
  const split_string = res.split(",");

// console.log(split_string[1818])
resolve(split_string)
   
   
} else {
  console.log("No data available");
   
}
}).catch((error) => {
console.error("some error"+error);
});
})
}
