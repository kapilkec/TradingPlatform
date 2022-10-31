
import {  moreDetails } from "./fetchprice.js"

var nifty50=['ONGC', 'NTPC', 'TATASTEEL', 'UPL','M%26M', 'POWERGRID', 'ICICIBANK', 'SBILIFE', 'BPCL', 'EICHERMOT', 'RELIANCE', 'GRASIM', 'COALINDIA', 'SBIN', 'HINDALCO', 'JSWSTEEL', 'ASIANPAINT', 'BRITANNIA', 'ITC', 'HDFCLIFE', 'BAJAJFINSV', 'AXISBANK', 'BAJAJ-AUTO', 'BHARTIARTL', 'HDFC', 'TATAMOTORS', 'TITAN', 'DRREDDY', 'HDFCBANK', 'INDUSINDBK', 'SHREECEM', 'BAJFINANCE', 'ULTRACEMCO', 'ADANIPORTS', 'WIPRO', 'TCS', 'KOTAKBANK', 'HCLTECH', 'NESTLEIND', 'SUNPHARMA', 'HINDUNILVR', 'LT', 'TECHM', 'HEROMOTOCO', 'CIPLA', 'TATACONSUM', 'MARUTI', 'INFY', 'APOLLOHOSP', 'DIVISLAB']
 
var topGainers=[];
var topLoser=[];

async function requireAlldata(){
    for(var data of nifty50){

    
        var stockDetails= await moreDetails(data) 
         var Ltp=stockDetails["c"][stockDetails["c"].length-1]
         var Ytp=stockDetails["c"][stockDetails["c"].length-2]
         var Volume=stockDetails["v"][stockDetails["v"].length-1]
         var percentChange=( ((Ltp-Ytp)/Ytp)*100).toFixed(2)
         if(data=="M%26M"){
            data="M&M"
         }
        var obj={
            stockname:data,
            ltp:Ltp,
            change:percentChange,
            volume:Volume
        }
        
        topGainers.push(obj)
        topLoser.push(obj)
    } 

    //sorting out top losers
    
   topLoser.sort((a, b) => {
        return a.change - b.change;
    });

     
    topGainers.sort((a, b) => {
        return b.change - a.change;
    });
     
    printTopMovers()
    
}
requireAlldata()



function printTopMovers(){
    document.getElementById("loading-img").style.display="none"
    var tableTop=`<h4 class="animate-charcter" id="animate-gain5">TOP 5 GAINERS</h4>
      <table class="table">
            <thead>
              <!-- top5 head :: start -->
              <tr>
                <th scope="col">SYMBOL</th>
                <th scope="col">LTP</th>
                <th scope="col">%CHNG</th>
                <th scope="col">VOLUME</th>
              </tr>
            </thead>
            <!-- top5 head :: end -->
            <tbody>`;

     
        for(let i=0;i<5;i++){
            var symbol=topGainers[i]["stockname"]
            
            var ltp=topGainers[i]["ltp"]
            var change=topGainers[i]["change"]
            var volume=topGainers[i]["volume"]
            tableTop+=`<tr>
                <th scope="row" id=${symbol}>${symbol}</th>
                <td>${ltp}</td>
                <td>${change}</td>
                <td>${volume}</td>
              </tr>`
        }
        tableTop+=`</tbody>
          </table>`;
    var tableLoser=`<h4 class="animate-charcter" id="animate-loss5">TOP 5 LOSERS</h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">SYMBOL</th>
                <th scope="col">LTP</th>
                <th scope="col">%CHNG</th>
                <th scope="col">VOLUME</th>
              </tr>
            </thead>
            <tbody>`;


        for(let i=0;i<5;i++){
           
            var symbol=topLoser[i]["stockname"]
            var ltp=topLoser[i]["ltp"]
            var change=topLoser[i]["change"]
            var volume=topLoser[i]["volume"]
            tableLoser+=`<tr>
                <th scope="row" id=${symbol}>${symbol}</th>
                <td>${ltp}</td>
                <td>${change}</td>
                <td>${volume}</td>
              </tr>`
        }

        tableLoser+=`</tbody>
          </table>`;

document.getElementsByClassName("top5")[0].innerHTML=tableTop;
document.getElementsByClassName("least5")[0].innerHTML=tableLoser;

}
