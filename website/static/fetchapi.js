// document.body.style.zoom = "90%";
var id_stock=["COALINDIA","CIPLA","TATASTEEL","AXISBANK","HDFCBANK","TECHM","WIPRO","ICICIBANK","ASIANPAINT","BAJFINANCE"];       
var name_stock=["Coal India Ltd","Cipla Ltd","Tata steel Ltd","Axis Bank Ltd","HDFC Bank Ltd","Tech Mahindra Ltd","Wipro Ltd","ICICI Bank Ltd","Asian Paints Ltd","Bajaj Finance Ltd"];


import { stockname,stockid } from "./stockdetails.js";
import { addToWatchlist, updat } from "./signupanddb.js";
import {getprice} from './fetchprice.js'
import { chartdisplay } from "./quotesForStocks.js";

var s="";
var uid=localStorage.getItem("uid");
console.log(uid);
console.log(typeof(uid))

async function getStockDetails()
{
  id_stock=await stockid()
  name_stock=await stockname()
  printCards(1,0)
   

} 
// getstockid();

export function printCards(from,searchId){
  var content='';
  
  var limit = (50*(from-1))+1+searchId
   
   var idForChart=id_stock[limit]
   idForChart=  idForChart. substring(2,idForChart.length-1)
   chartdisplay(idForChart )
  for(let i=limit ;i<(50+limit);i++)
  {
     var iid=id_stock[i];
     var sellid=id_stock[i];
     var chartid=id_stock[i];
     var menuid=id_stock[i];
     content=content+`<div class="com row">
     <span class="col-4 stocksName " id=${chartid}>${name_stock[i]}</span>
     <span class="col-2" id="${id_stock[i]}">0</span>
     <span class="col-2"><button type="button" id=${iid}   class="btn btn-success buy_button">BUY</button></span>
     <span class="col-2"><button type="button" id=${sellid} class="btn btn-danger sell_button">SELL</button></span>
     <span class="col-1">
         <a id=${menuid}  href="#" data-tooltip title="Add to watchlist">
            <i class="fa-solid fa-circle-plus watchList"></i>
         </a>
     </span>
     </div>`;

         
      // tooltip
      $(function(){
         $('[data-tooltip]').tooltip();
      })
  }

  document.getElementById("companies").innerHTML=content;

  
  // var s=setInterval(fun,1000);
  fun()
  // import {getprice} from './fetchprice.js'           
  
  async function fun()
  {
     for(let i=limit ;i<(50+limit);i++)
     {
        var t=id_stock[i].trim()
        var price= await getprice(t);
        
        document.getElementById(id_stock[i]).innerHTML=price ;
     }
  }



  $(".buy_button").click(async function(){
      uid=localStorage.getItem("uid")
      if(uid==null){
         $('#login').modal('show')
      }
      else{
         var stockid=this.id;
         var myModal = new bootstrap.Modal(document.getElementById('prompt_quantity'));
         myModal.show();
         document.getElementById("prompt_buy").addEventListener("click",function(){
            var qty=document.getElementById("items_buy").value;
            console.log(typeof(qty) )
            if(qty=='0'||qty=="")
            {
               swal({
                  title: "share should be greater than zero\n ",
                  icon: "warning"} 
               )
            }
            else
            {
               console.log("currid"+stockid)
               
               var currprice=localStorage[stockid]
               console.group("nowprice"+currprice)
               
             updat(stockid,qty,currprice);
              
            }
           
         });
      }
    

  });



  $(".sell_button").click(function(){
   uid=localStorage.getItem("uid")
   if(uid==null){
      $('#login').modal('show');
   }
   else{
     var stockid=this.id;
     var myModal = new bootstrap.Modal(document.getElementById('prompt_quantity2'));
     myModal.show();
     document.getElementById("prompt_sell").addEventListener("click",function(){
        var qty=-(document.getElementById("items_sell").value); 
        if(qty=='0'||qty=="")
        {
            swal({
               title: "share should be greater than zero\n ",
               icon: "warning"} 
            )
        }
         else
         {
            console.log("currid"+stockid)
            console.log(localStorage)
            var currprice=localStorage[stockid]
            console.group("nowprice"+currprice)
            updat(stockid,qty,currprice);
         }
     })
   }

  });

  document.getElementsByClassName("com")[0].classList.add("highLight");
  $(".stocksName").click(function(){
     var stockid=this.id;
     try{
      document.getElementsByClassName("highLight")[0].classList.remove("highLight");
      this.parentNode.classList.add("highLight");
     }
     catch(e){
      
     }
     document.getElementsByClassName("chartButtonsWrapper")[0].style.display="inline";
     chartdisplay(stockid); 
  });

//   close button for charts for mobile view
  document.getElementsByClassName("closeMobileView")[0].addEventListener("click",function(){
         document.getElementsByClassName("chartButtonsWrapper")[0].style.display="none";

  })
  
  $(".watchList").click(function(){
   if(uid==null){
      $('#login').modal('show')
   }
   else{
     var parentId=this.parentElement.id;
     console.log("watchlist click"+parentId)
     addToWatchlist(parentId)
   }
  });


//   maximise and minimise functions   

  document.getElementsByClassName("fa-maximize")[0].addEventListener("click",function(){
      document.getElementsByClassName("back_colour-Market")[0].style.display="none";
      document.getElementsByClassName("fa-minimize")[0].style.display="inline";
      document.getElementsByClassName("fa-maximize")[0].style.display="none";
      document.getElementsByClassName("chartButtonsWrapper")[0].classList.add("fullScreenChart");
  })

  
  document.getElementsByClassName("fa-minimize")[0].addEventListener("click",function(){
   document.getElementsByClassName("back_colour-Market")[0].style.display="inline";
   document.getElementsByClassName("fa-minimize")[0].style.display="none";
   document.getElementsByClassName("fa-maximize")[0].style.display="inline";
   document.getElementsByClassName("chartButtonsWrapper")[0].classList.remove("fullScreenChart");
})

}
getStockDetails()

// search bar click action
document.getElementById("search-button").addEventListener("click",searchClicked)

export function searchClicked()
{
   var id=document.getElementById("searchClass").value
   var card =(name_stock .indexOf(id));
   var cardNumber= Math.ceil ((card /50) )
   console.log("ss"+card+"no"+cardNumber)
   printCards(cardNumber,((card-1)%50))
   document.getElementById("search-form").reset()

}

// during screen resize
try{

   window.addEventListener('resize', function(){
      var newWidth = window.innerWidth;
      // console.log(newWidth)
      if(newWidth<=950){
         this.document.getElementsByClassName("chartButtonsWrapper")[0].style.display="none";
         this.document.getElementsByClassName("back_colour-Market")[0].style.display="inline";
         this.document.getElementsByClassName("highLight")[0].classList.remove("highLight");
      }
      else{
         this.document.getElementsByClassName("chartButtonsWrapper")[0].style.display="inline";
         this.document.getElementsByClassName("com")[0].classList.add("highLight"); 
      }
   })
   
   
   // during window loads
   
   window.addEventListener('load',function(){
      var newWidth = window.innerWidth;
      // console.log(newWidth)
      if(newWidth<=950){
         this.document.getElementsByClassName("chartButtonsWrapper")[0].style.display="none";
         this.document.getElementsByClassName("back_colour-Market")[0].style.display="inline";
         document.getElementsByClassName("highLight")[0].classList.remove("highLight");
      }
      else{
         this.document.getElementsByClassName("chartButtonsWrapper")[0].style.display="inline";
         this.document.getElementsByClassName("com")[0].classList.add("highlight");
      }
   })
}
catch(e){
   // console.log(e);   
}
