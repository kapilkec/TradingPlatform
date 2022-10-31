
async function getquotes(symbol)
{

return new Promise((resolve,reject)=>{
//var from='6/12/22 15:30';
// var to='06/10/22 15:30';
var today = new Date();
var date =(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes();
console.log("to date"+date)
var to= (Date.parse(date))/1000;  

today=new Date(today.setDate(today.getDate()-10000));
date =(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes();
var from= (Date.parse(date))/1000; 
 //to decode  & to %26
 symbol= symbol.replace("&","%26")
var url="https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol="+symbol+"&resolution=1D&from="+from+"&to="+to;

var promise= fetch(url,{
   method:"GET"
   });
 
   promise.then(function(res){
   return res.json();})
   .then(function(data){

     
   resolve(data)
     
 });    

  
})
}

export function chartdisplay(symbol)
{
document.getElementById("container").innerHTML=null;
var plot;
anychart.onDocumentReady( 

 async function () {
   // create data table on loaded data
   // anychart.theme('monochrome');
   
   var dataTable = anychart.data.table();
   var stockdata= await getquotes(symbol)
   // console.log(stockdata)
      
     stockdata.t.map((ts)=>{ 

          
             var x=ts
             var theDate = new Date(x *1000);

             var date=theDate.getFullYear()+"-"+(theDate.getMonth()+1)+"-"+theDate.getDate() 
             var index=stockdata.t.indexOf(x)
             stockdata.t[index]=date


     })
      
      var array=[
       stockdata.t,
       stockdata.o,
       stockdata.h,
       stockdata.l,
       stockdata.c,
         
      ]


    var  output = array[0].map((_, colIndex) => array.map(row => row[colIndex]));
        
     
       // console.log(output)
   dataTable.addData( output);

   // map loaded data for the candlestick series
   var mapping = dataTable.mapAs({
     open: 1,
     high: 2,
     low: 3,
     close: 4,
     
   });

   // create stock chart
   var chart = anychart.stock();

   //updating color
   

   // create first plot on the chart
    plot = chart.plot(0);
   
   // set grid settings
  //  plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

   var series = plot.candlestick(mapping)
     .name(symbol);
   series.legendItem().iconType('rising-falling');

   // create scroller series with mapped data
   chart.scroller().candlestick(mapping);

   // set chart selected date/time range
   var today = new Date();
   var to =(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
   var from=(today.getMonth()-4)+'/'+today.getDate()+'/'+today.getFullYear()
   chart.selectRange(from,to);       

   // create range picker
   var rangePicker = anychart.ui.rangePicker();
   
   // init range picker
   rangePicker.render(chart);

   // create range selector
   var rangeSelector = anychart.ui.rangeSelector();
   
   // init range selector
   rangeSelector.render(chart);
   
   // sets the title of the chart
   chart.title(symbol);
   
   // set container id for the chart
   chart.container('container');

   //background color
  //  chart.background().stroke(" black");
    
  
   // var series = chart.plot(0).candlestick(mapping);
   series.fallingFill("red");
   series.fallingStroke("red");
   series.risingFill("green");
   series.risingStroke("green");
   // initiate chart drawing
   chart.draw();

   chart.listen("annotationDrawingFinish", function(){
    document.getElementById("typeSelect").value = "default";
  });
   
   
  
  
   
 }
);

 
document.getElementById("typeSelect").addEventListener("click",()=>{
  
  // create annotations
 
  var select = document.getElementById("typeSelect");
  console.log(select.value)
  plot.annotations().startDrawing(select.value);


})


document.getElementById("remove-all").addEventListener("click",()=>{
  plot.annotations().removeAllAnnotations();
})


document.getElementById("remove-last").addEventListener("click",()=>{
  // get the number of annotations
  var annotationsCount = plot.annotations().getAnnotationsCount();
  // remove the last annotation
  plot.annotations().removeAnnotationAt(annotationsCount - 1);
})


document.getElementById("remove-selected").addEventListener("click",()=>{
  // get the selected annotation
  var selectedAnnotation = plot.annotations().getSelectedAnnotation(); 
  // remove the selected annotation
  plot.annotations().removeAnnotation(selectedAnnotation);


})

}