import {  moreDetails } from "./fetchprice.js";
import { chartdisplay } from "./quotesForStocks.js";
import { getWatchlistData, removeFromWatchlist } from "./signupanddb.js";
import { stockid, stockname } from "./stockdetails.js";
 

var uid=localStorage.getItem("uid");
 
  var watchListArray;
  export async function printWatchlist(typesort,column)
  {
    document.getElementsByClassName("sectionScrollRight")[0].style.display="none";
    console.log("enterd watchlist")
    watchListStocks=await getWatchlistData();
    watchListStocks= JSON.parse(watchListStocks)
      if(watchListStocks==null )
      {
        
        
          swal({
            text: "WATCHLIST IS EMPTY\n ",
            icon: "warning",
            buttons: false,
            
          } )
        
        document.getElementsByClassName("loadingImage")[0].style.display="none";
        return
      }
      
    var watchListStocks=watchListStocks["stocksInWatchlist"]
      watchListArray=[]
    for(let i of watchListStocks){
      var stockDetails=await moreDetails(i)
      var idOfStock=await stockid()
      var nameOfStock=await stockname()
      try{
        var StockName= (nameOfStock[ idOfStock.indexOf("  "+i+" ")]).toString()
        var Ltp=stockDetails["c"][stockDetails["c"].length-1]
        var Open=stockDetails["o"][stockDetails["o"].length-1]
        var High=stockDetails["h"][stockDetails["h"].length-1]
        var Low=stockDetails["l"][stockDetails["l"].length-1]
        var Ytp=stockDetails["c"][stockDetails["c"].length-2]
        var Volume=stockDetails["v"][stockDetails["v"].length-1]
        var Change=(Ltp-Ytp).toFixed(2)
        var PercentChange=( ((Ltp-Ytp)/Ytp)*100).toFixed(2)
        var temp={
          symbol:i,
          stockname:StockName,
          price:Ltp,
          change:Change,
          percentchange:PercentChange,
          open:Open,
          high:High,
          low:Low,
          volume:Volume
          
              
    
        }

        watchListArray.push(temp)
      }
      catch(e){};
      
    }

      
      document.getElementById("loading-img").style.display="none";
      
        document.getElementsByClassName("sectionScrollRight")[0].style.display="";
      
      document.getElementsByClassName("watchListShow")[0].innerHTML=watchListContentHead;
      
      printTable(watchListArray)
      // function call for sorting watchlist
      $('th').click(function(){
        var column=$(this).data('column');
        console.log(column)
        var order=this.className;
        $(this).toggleClass("asc");
          var temp = getOrderedlist(watchListArray,column)
          console.log("or cur : "+order)
          if(order==""){
            console.log("desc")
            temp.reverse()
          }
          printTable(temp)
      })


  }

  function printTable(listOfStocks)
  {
      var watchListContent=`<tbody id="table-body">`;
      for(let i of listOfStocks){
        
          watchListContent+=`<tr id=${i["symbol"]}>
            <td scope="row">${i["symbol"]}</td>
            <td>${i["stockname"]}</td>
            <td>${i["price"]}</td>
            <td>${i["change"]}</td>
            <td>${i["percentchange"]}</td>
            <td>${i["open"]}</td>
            <td>${i["high"]}</td>
            <td>${i["low"]}</td>
            <td>${i["volume"]}</td>
            <td>
              <a class="vieweChart" href="#"  data-tooltip title="view chart"> <i class="fa fa-line-chart"></i></a>
            </td>
            <td>
              <a class="RemoveWatchList" tabindex="0" role="button" href="#" data-toggle="popover-click"><i class="fa-solid fa-trash-can"></i></a>
              <div id="popover_content_wrapper${i["symbol"]}" style="display: none">
                <p style="font-size:large;">
                  Remove this item from watchlist?
                </p>
                <div class="row" id=${i["symbol"]} style="font-size:large;">
                  <button class="col-4 btn btn-success mx-3"  id="confirm">Yes</button>
                  <button class="col-4 btn btn-danger"  id="deny">cancel</button>
                </div>
              </div>
              </td>
          </tr>`

        
      }

      watchListContent+= `</tbody>
      </table>`;

      var watch=document.getElementsByClassName("watchListShow")[0];
      watch.querySelector("tbody").innerHTML=watchListContent;

      // to add background color
      for(let i of listOfStocks){

        if(i["percentchange"]>0)
        {
          document.getElementById(i["symbol"]).style.backgroundColor='#CAEEC2';
        }
        else
        {
          document.getElementById(i["symbol"]).style.backgroundColor='#ffc1b6';
        }
      }

      // to view chart for selected  watchlist
      $(".vieweChart").click( async function(){
        var stockid=this.parentElement.parentElement.id;
        console.log("view chart clicked")
        await  chartdisplay(stockid)
        document.getElementById("watchlist-table").style.display="none";
        document.getElementsByClassName("chartWatchlist")[0].style.display="";

      })

      
      $('[data-toggle="popover-click"]').popover({
        html: true,
        trigger: 'click',
        placement: 'bottom',
        content: function () {
          var stockid=this.parentElement.parentElement.id;
          console.log();(stockid)
          return $('#popover_content_wrapper'+stockid).html(); }
      });

      $(document).on('click', '#confirm', function() {
        var stock=this.parentElement.id
        console.log(stock);
        $('[data-toggle="popover-click"]').popover("hide");
        removeFromWatchlist(stock)
      });

      $(document).on('click', '#deny', function() {
        $('[data-toggle="popover-click"]').popover("hide");
      });
        

      
      // tooltip
      $(function(){
        $('[data-tooltip]').tooltip();
      })

    
     $(function() {
    $('#watchlist-table').scroll( function() {
        var $width = $('#watchlist-table').outerWidth()
        var $scrollWidth = $('#watchlist-table')[0].scrollWidth; 
        var $scrollLeft = $('#watchlist-table').scrollLeft();
        
        if ((Math.floor($width) + $scrollLeft === $scrollWidth) || (Math.round($width) + $scrollLeft === $scrollWidth)){
            document.getElementsByClassName("sectionScrollRight")[0].style.display="none";
            
        }
        else{
            document.getElementsByClassName("sectionScrollRight")[0].style.display="";
            
        }
        });
    });
    
  }

  //sort the card
    function getOrderedlist(list,type){
    
      list.sort(GetSortOrder(type))
    
    return list;
  }

  function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
  }


  var watchListContentHead=`<table class="table  ">
      <thead >
        <tr>
          <th scope="col-2" data-column="symbol" class="asc">SYMBOL <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg></th>
          <th scope="col-3" data-column="stockname" class="asc">NAME <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg> </th>
          <th scope="col-2" data-column="price" class="asc">PRICE <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg> </th>
          <th scope="col-1" data-column="change" class="asc">CHANGE <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg> </th>
          <th scope="col-1" data-column="percentchange" class="asc"> %CHANGE<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg></th>
          <th scope="col-1" data-column="open" class="asc">OPEN<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg> </th>
          <th scope="col-1" data-column="high" class="asc">HIGH<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg> </th>
          <th scope="col-1" data-column="low" class="asc">LOW<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg> </th>
          <th scope="col-1" data-column="volume" class="asc">VOLUME<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg> </th>
          <th scope="col-1"></th>
          <th scope="col-1"></th>
        </tr>
      </thead>
      <tbody>
      </tbody>
      `;                             

  printWatchlist();


  document.getElementsByClassName("closeMobileView")[0].addEventListener("click",function(){
    document.getElementById("watchlist-table").style.display="";
    document.getElementsByClassName("chartWatchlist")[0].style.display="none";
    
   
  })