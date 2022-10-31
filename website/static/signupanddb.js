// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";

// showing profile
import { showProfile,showLogin } from "./loginandsignup.js";
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
const auth = getAuth(app);


//user deatils

var email="";
var pass="";
var name=localStorage["Name"];
var uid= localStorage["uid"];
 
// console.log(name);
if(name!=null){
  showProfile(name);
}

//-----------------------sign up---------------------------
import { signOut,getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword ,sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

function signup()
{

  email=document.getElementById("user_email").value;
  pass=document.getElementById("user_pass").value;
  name=document.getElementById("user_name").value;
  
   
  createUserWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {

    // Signed in successfully...

    const user = userCredential.user;
    uid=user.uid;
    setUserDetails(name)
    // storing in localstorage...
    localStorage.setItem("uid",uid); 
    localStorage.setItem("Name",name); 

    window. alert("user created succesfully"+user.uid);
    showProfile(name);
  })
  .catch((error) => {
     // const errorCode = error.code;
        const errorMessage = error.message;
      
        // ...
        // uid=user.uid;
        console.log("error in signup "+errorMessage);
        swal({
          text: "INVALID CREDENTIALS..!\n "+errorMessage,
          icon: "error"} 
          )
        // ..
        });
                    }



async function signin()
{
  email=document.getElementById("user_email2").value;
         pass=document.getElementById("user_pass2").value;
        
   signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      
        // Signed in 
    const user = userCredential.user;
        // ...
        window. alert("logged in succensfully"+user.uid);
        
        
    var user2 = auth.currentUser;
    

    if (user2) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
 
    uid=user2.uid;
    console.log("watchlist called")
    // addToWatchlist()
    localStorage.setItem("uid",uid)
    getUserDetails(uid)
    showProfile(name);
    
    
    }

    else {
    // No user is signed in.
    window.alert("user not exist")

    }  
    
    location.reload()
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
         console.log("login error"+error)
        swal({
          text: "INVALID CREDENTIALS..!\n Enter correct details",
          icon: "error"} 
          )
    });  


}

//---------------------log out------------------------
function logout()
{
        signOut(auth).then(() => {
    // Sign-out successful.
    window.alert("signed out succesfully")
    localStorage.removeItem("uid");
    localStorage.removeItem("Name");

    showLogin();
    }).catch((error) => {
    // An error happened.
    window.alert("error signout"+error)
    });
}








//ddddddddddaaaaaaaaaaaaaaaaatttttttttttttttaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbaaaaaaaaaaaaasssssssssssssssseeeeeeeeeeeeeeeeeeeeeeee
















//---------------creating data base------------------------------------------------------------------------------------------------------------
import {getDatabase,ref,get ,set,child,update,remove}  
from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js"
const db=getDatabase(); 

//---inserting a data--------

function insertdata()
{
   


set(ref(db,"traders/"+uid),
{
         
        kkk:678
        
        
})
.then(()=>{  window.alert("data stored succuesfully");  })
.catch((error)=>{window.alert(error)})

}





//---------------update stocks bought-----------
 
export async function updat(id,qty,curprice)
{
  console.log("qqq"+qty+"id"+id+"------")
  var d2=await prnt(uid)
  

  
 var  data=JSON.parse(d2)
var qt=null;
var crprice=curprice

if(qty<0)
{
  console.log("its sell call")
  qty= data[id]["quantity"]+qty

  console.log("final quantity:"+qty)
  crprice=data[id]["price"]
  if(qty<=0)
  {
    deldatabase(id);
    console.log("qty==0: deldatabase called")
    return 0;

  }


}

else{
  try {

    qty=parseInt(qty)
     qt=parseInt( data[id]["quantity"])
    //  console.log("symbol"+)
     console.log("aa"+qt+id)
     var price=data[id]["price"]
     var avg=price*qt
     var x=qt+qty
     crprice=((avg+(curprice*qty))/x).toFixed(2)

    
  }
  catch(err) {
    qt=0
    // console.log("new qty"+id+"pr"+crprice+"Ws"+qt+"wed"+qty)
  }
  qty=parseInt(qty)+qt
 

}

   
var today = new Date();
var buydate =(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
 

update(ref(db,"traders/"+uid+"/stockdetails/"+id),
    {
         
         
        quantity :qty,
        price:crprice,
        date:buydate         


    })
    .then(()=>{  
                  
                    swal({
                      text: "Order executed successfuly",
                      icon: "success"} 
                      ).then((willDelete) => {
                         if(willDelete){
                          location.reload()
                         }
                        })
                  
                           
                 
              })
    .catch((error)=>{window.alert("update error"+error)})


}

//delete a data
function deldatabase(stockname)
{


remove(ref(db,"traders/"+uid+"/stockdetails/"+stockname))
 
.then(()=>{
              swal({
                     text: "Order executed successfuly",
                      icon: "success"
                   }).then((willDelete) => {
                         if(willDelete){
                          location.reload()
                         }
                        }) 
})
.catch((error)=>{window.alert(error)})


}


//--------------select a data
 
const dbRef = ref(getDatabase());
// export var result={}
export async function prnt(uid){
    return new Promise((resolve,reject)=>{
  var res=""
  
 get(child(dbRef, "traders/"+uid+"/stockdetails")).then((snapshot) => {
  if (snapshot.exists()) {
     res=JSON.stringify(snapshot.val())
  //  result=res;
    // console.log( res);
    resolve(res)
     
     
  } else {
    console.log("No data available");
    resolve(0)
  }
}).catch((error) => {
  console.error("some error"+error);
});
})

}


//update name in the db for new user
  function setUserDetails (nme)
{

  update(ref(db,"traders/"+uid+"/userdetails"),
      {
          
          name:nme
      })
      .then(()=>{  window.alert("data updated succuesfully") ;})
      .catch((error)=>{window.alert("update error"+error)})
}

async function getUserDetails(){

  return new Promise((resolve,reject)=>{

  get(child(dbRef, "traders/"+uid+"/userdetails")).then((snapshot) => {
    if (snapshot.exists()) {
       var res=JSON.stringify(snapshot.val())
       res=JSON.parse(res)
      console.log("res getuserdetails"+typeof res)
      localStorage.setItem("Name",res["name"]); 
      showProfile(res["name"])
      
    } else {
      console.log("No data available");
      resolve(0)
    }
  }).catch((error) => {
    console.error("some error"+error);
  });
  
}
  )}



//-------------------watchlist add-------------------------------------  
export async function addToWatchlist(stockid){
  
  var d= await getWatchlistData();
   
  var watchStocks=[]
  if (d!=null){
    d=  JSON.parse(d)
  watchStocks= d["stocksInWatchlist"] 
  if(watchStocks.includes(stockid))
  {
    swal({
       
      text: "Stock already in watchList",
      icon: "error"})
    return 0;
  }
  
  }
     watchStocks.push(stockid)
  

 
  update(ref(db,"traders/"+uid+"/watchlist"),
  {       
      stocksInWatchlist:watchStocks

  })
  .then(()=>{  swal({
    // title: "Good job!",
    text: "Stock added to watchList",
    icon: "success",
  });;
                
            })
  .catch((error)=>{console.log("update error"+error)})



}

//-------get
export async function getWatchlistData(){
   
    return new Promise((resolve,reject)=>{
  var res=""
  
 get(child(dbRef, "traders/"+uid+"/watchlist")).then((snapshot) => {
  if (snapshot.exists()) {
     res=JSON.stringify(snapshot.val())
  //  result=res;
 
    resolve(res)
     
     
  } else {
    console.log("No data available in wathclist");
    resolve(null)
  }
  }).catch((error) => {
    console.error("some error"+error);
  });
  })

}


//------------remove stock from watch list-------------
export async function removeFromWatchlist(stockid){
  
  var listAfterRemove= await getWatchlistData();
   
  listAfterRemove= JSON.parse(listAfterRemove)["stocksInWatchlist"]
  
  //remove stockid:
  var temp=listAfterRemove.indexOf( stockid)
  if(temp!=-1){
    listAfterRemove.splice(temp,1)
  }
  
  
 
  update(ref(db,"traders/"+uid+"/watchlist"),
  {       
      stocksInWatchlist:listAfterRemove

  })
  .then(()=>{  console.log("data updated watchlist") ;
  location.reload();
            })
  .catch((error)=>{console.log("update error"+error)})



}

// removeFromWatchlist("DOLLAR")




 
document.getElementById("signup-btn").addEventListener("click",signup)
document.getElementById("login-btn").addEventListener("click",signin)
document.getElementById("logOut").addEventListener("click",logout);
