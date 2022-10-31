import { prnt, updat  } from "./signupanddb.js";
import {dataForLinechart, getprice} from "./fetchprice.js"
import {  lineChart, piechart } from "./piechart.js";
// import { showchart } from "./piechart.js";

//---------------------inserting neccesary data--------------

var data={ } 
async function a()
{
  var uid2=localStorage["uid"]
  console.log("uid2="+uid2)
  var data2=await prnt(uid2)
  data=JSON.parse(data2)
  console.log("data"+typeof data+""+data)
    
  var content=`<div class="back_colour-Portfolio col-auto col-lg-7 ">`;
  var piechartArray=[]
  var totalInvested=0;
  var totalCurrent=0;
  var totalpl=0;
  var dateArrayForLinechart=[]
  if(data==0){ 
    swal({
      text: "PORTFOLIO IS EMPTY\n ",
      icon: "warning",
      buttons: false,  
      } )
    return
  }
  console.log(getPortfolioStocks());
   for(var i in data)
  {
    var buyprice= data[i]["price"]
    var buyqty=data[i]["quantity"]
    var buydate=data[i]["date"]
    dateArrayForLinechart.push(buydate)   
    var invested=(buyprice *buyqty).toFixed(2)
    totalInvested+=parseInt( invested);
    var averge=(invested/data[i]["quantity"]).toFixed(2)
    var currprice=await getprice(i)
    totalCurrent+=parseInt(buyqty* currprice)
    var gain=((currprice*buyqty)-invested).toFixed(2)
    totalpl+=parseInt(gain);
    var gainpercent=( ((currprice-buyprice)/buyprice)*100).toFixed(2)     
    piechartArray.push({x:i,value:invested})
    var momentID= "moment"+i
    content=content+`
      <div id="stocks-Brought" class="row">
        <div class="row col-xl-6 col-md-6">
          <div class="stock-Left col-7 ">
            <div>
              <span><span>${buyqty}</span><span class="grey"> Qty || </span></span>
              <span><span class="grey">Avg</span><span> ${averge}</span></span>
            </div>
            <div style="font-weight:650;" class = "portfolioStock">${i}</div>
              <div>
                <span class="grey">Invested</span>
                <span>${invested}</span>
              </div>
            </div>
            <div class="stock-Right col">
              <div>
                <span class="grey">Gain(%) :</span>
                <span class="gain-Percent">${gainpercent}%</span>
              </div>
              <div>
                <span class="grey">Gain(₹) :</span>
                <span class="gain-Rupee">${gain}</span>
              </div>
              <div>
                <span class="grey">LTP :</span>
                <span>${currprice}</span>
              </div>
            </div>
          </div>
        <div class="row col-xl-6 col-md-6">
        <div id="${momentID}" class="moment col-lg-9 col-9">
        </div>
        <div class="buttons col-lg-2 col-2">
          <div class="addMore">
            <button type="button" id=${i}   class="btn btn-success buy_button"  >ADD</button><br><br>
            <button type="button" id=${i} class="btn btn-danger sell_button">SELL</button>
          </div>
        </diV>
      </div>
    </div>`;        
  }
    
  var totalGainPercent=( ((totalCurrent-totalInvested)/totalInvested)*100).toFixed(2)
  content=content+`</div>
  <div class="portLeft-Fixed col-lg-3 col-auto">
  <div class="sideBar">
    <div class="d-flex borderBottom">
      <div>
        <div><b>Invested</b></div>
        <div>${totalInvested}</div>
      </div>
      <div>
        <div><b>Current</b></div>
        <div>${totalCurrent}</div>
      </div>
    </div>
    <div class="PL">
      <span ><b>P&L</b><span>              
      <span class="leftPL"><b> RS. ${totalpl}</b></span>
      <span class="leftPL"> (${totalGainPercent}%)</span>
    </div>
  </div>
  <div id="pie-chart">
  </div>
  </div> `;
   document.getElementById('loading-img').style.display="none"
  document.getElementById('stock_display').innerHTML=content;
  piechart(piechartArray);
  var j=0
  for (var i in data)
  { 
    var Datafrombuy= await  dataForLinechart(i,dateArrayForLinechart[j])
    lineChart("moment"+i,Datafrombuy)
    j+=1
  }

  $(".buy_button").click(async function(){
    var stockid=this.id;
    var myModal = new bootstrap.Modal(document.getElementById('prompt_quantity'));
    myModal.show();
    document.getElementById("prompt_buy").addEventListener("click",async function()
    { 
      console.log("we")
      var qty=document.getElementById("items_buy").value;
      if(qty=='0'||qty=="")
      {
        swal({
          title: "share should be greater than zero\n ",
          icon: "warning"} 
        )
      }
      else
      {
        var currprice= await  getprice(stockid)
        console.group("nowprice"+currprice)
        await  updat(stockid,qty,currprice);
        location.reload()
      }
    })
  });

  $(".sell_button").click(async function(){
    var stockid=this.id;
    var myModal = new bootstrap.Modal(document.getElementById('prompt_quantity2'));
    myModal.show();
    document.getElementById("prompt_sell").addEventListener("click",async function(){
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
      var currprice= await  getprice(stockid)
      console.group("nowprice"+currprice)
      await  updat(stockid,qty,currprice);
      location.reload()
    }
   
    })
  });

  // changing pl color
  if( totalpl>0){
    document.getElementsByClassName("leftPL")[0].style.color="#4BB543";
    document.getElementsByClassName("leftPL")[1].style.color="#4BB543";
  }    
  else{
    document.getElementsByClassName("leftPL")[0].style.color="#E73C35";
    document.getElementsByClassName("leftPL")[1].style.color="#E73C35";
  }
}
async function portDisplay()
{
    await a();
    const percentClass=document.getElementsByClassName("gain-Percent");
    for(let i=0;i<percentClass.length;i++)
    {
      var temp=percentClass[i];
      var cont=temp.textContent;
      var l=cont.length;
      cont=cont.slice(0,l-1)
      if(cont>0){
        
          temp.style.color="#4BB543";
      }
      else{
        temp.style.color="#E73C35";
      }
    }
    const rupeeClass=document.getElementsByClassName("gain-Rupee");
    for(let i=0;i<rupeeClass.length;i++)
    {
      var temp=rupeeClass[i];
      if(temp.textContent>0){
        
          temp.style.color="#4BB543";
      }
      else{
        temp.style.color="#E73C35";
      }
    }

}
portDisplay();

export function getPortfolioStocks(){

    console.log(Object.keys(data));

}