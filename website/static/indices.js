// document.body.style.zoom = "90%"
function indicesData(Index,IndexName)
{
 var url="https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3B"+Index;

   
var promise= fetch(url,{
   method:"GET"
   });
   
   promise.then(function(res){
   return res.json();})
   .then(function(data){
     
    
     var pricechange=data["data"]["pricechange"]
    var change=data["data"]["pricepercentchange"]
      var content= `
      <!-- Nifty :: start -->
      <div class="nifty">
        <!-- nifty head :: start -->
        <div class="niftyHead">
          <!-- nifty and price -->
          <div>
            <h1 class="inlineDisplay">${IndexName}  </h1>
            <h4 class="inlineDisplay">${data["data"]["pricecurrent"]}</h4>
          </div>
          <!-- nifty price change and percent change -->
          <div id="${IndexName}ChangeColor">
            <i class="fa-solid fa-caret-up" id="${IndexName}arrowUp"></i>
            <i class="fa-solid fa-caret-down" id="${IndexName}arrowDown"></i>
            <h5 class="inlineDisplay">${parseInt(data["data"]["pricechange"]).toFixed(2)}</h5>
            <h5 class="inlineDisplay">(${parseFloat(change).toFixed(2)}%)</h5>
          </div>
        </div>
        <!-- nifty head :: end -->
        <!-- nifty body :: start -->
        <div class="niftyBody  row">
          <table class="table col-sm">
            <tbody>
              <tr>
                <th scope="row">open</th>
                <td>${data["data"]["OPEN"]}</td>
               
              </tr>
              <tr>
                <th scope="row">Previous Close</th>
                <td>${data["data"]["priceprevclose"]}</td>
               
              </tr>
              <tr>
                <th scope="row">Day High</th>
                <td>${data["data"]["HIGH"]}</td>
               
              </tr>
            </tbody>
          </table>
          <table class="table col-sm">
            <tbody>
              <tr>
                <th scope="row">Day Low</th>
                <td>${data["data"]["LOW"]}</td>
               
              </tr>
              <tr>
                <th scope="row">52 Week High</th>
                <td>${data["data"]["52wkhi"]}</td>
               
              </tr>
              <tr>
                <th scope="row">52 Week Low</th>
                <td>${data["data"]["52wklow"]}</td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Nifty :: end -->`

      document.getElementsByClassName("niftyBnifty")[0].innerHTML=document.getElementsByClassName("niftyBnifty")[0].innerHTML+content;
     
      if(pricechange>0){
         document.getElementById(IndexName+"ChangeColor").style.color="green";
         document.getElementById(IndexName+"arrowDown").style.display="none";
         document.getElementById(IndexName+"arrowUp").style.display="inline";
         
      }
      else{
         document.getElementById(IndexName+"ChangeColor").style.color="red";
         document.getElementById(IndexName+"arrowUp").style.display="none";
         document.getElementById(IndexName+"arrowDown").style.display="inline";


      }
     
 });  
}
indicesData("NSX","Nifty");
indicesData("nbx","Bnifty");
//top gainers https://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json
//top losers https://www1.nseindia.com/live_market/dynaContent/live_analysis/losers/niftyLosers1.json

//git hub link  https://github.com/maanavshah/stock-market-india/blob/master/nse/constant.js
// import axios from '/axios.js';

// async function topMovers(mover){
//     var url="https://www1.nseindia.com/live_market/dynaContent/live_analysis/"+mover.toLowerCase() +"/nifty"+mover+"1.json"
//     url="https://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json"
//    console.log(axios.get(url))
     
   
   
// }

// topMovers("Gainers")
 
