export async function getprice(symbol)
   {
  

  return new Promise((resolve,reject)=>{
   //var from='6/12/22 15:30';
   // var to='06/10/22 15:30';
   var today = new Date();
   var date =(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes();
   var to= (Date.parse(date))/1000;  

   today=new Date(today.setDate(today.getDate()-10));
   date =(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes();
   var from= (Date.parse(date))/1000; 
    //to decode  & to %26
    symbol= symbol.replace("&","%26")
   var url="https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol="+symbol+"&resolution=1&from="+from+"&to="+to;
   var promise= fetch(url,{
      method:"GET"
      });
      
      promise.then(function(res){
      return res.json();})
      .then(function(data){

         
        var close;
        if(   (data['s']!='no_data') && (data["s"]  !='error'))
        {
            close=data.c[data.c.length-1]
             
          
        }
          
        else{
          console.log("wrong symbol"+symbol)

          close=1000
        }
       
      
       localStorage.setItem(symbol,close)
      //  console.log(localStorage)
      //  console.log("sym"+localStorage.getItem(symbol))
      resolve(close)
         // console.log(close);
    });    
   
     
  })
}

export async function dataForLinechart(symbol,fromdat){
  return new Promise((resolve,reject)=>{
    //var from='6/12/22 15:30';
    // var to='06/10/22 15:30';
    var fromdate=((Date.parse(fromdat))/1000)
    var today = new Date();
    var date =(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes();
    var to= (Date.parse(date))/1000;  
  
 
    // console.log("from"+fromdate+"to"+to)
    var url="https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol="+symbol+"&resolution=1D&from="+fromdate+"&to="+to;
    
    var promise= fetch(url,{
       method:"GET"
       });
       
       promise.then(function(res){
       return res.json();})
       .then(function(data){
 
       
         var close;
         if(   (data['s']!='no_data') && (data["s"]  !='error'))
         {
             close=data.c
           
         }
         // else if((data["s"]  !='error')  )
         // {
         //   close=data.c[data.c.length-1]
         // }
         else{
           console.log("wrong symbol")
           close=1000
         }
        
       
        localStorage.setItem(symbol,close)
       //  console.log(localStorage)
       //  console.log("sym"+localStorage.getItem(symbol))
       resolve(close)
          // console.log(close);
     });    
    
      
   })
   
}

export async function moreDetails(symbol){
  return new Promise((resolve,reject)=>{
   
   var today = new Date();
   var date =(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes();
   var to= (Date.parse(date))/1000;  

   today=new Date(today.setDate(today.getDate()-10));
   date =(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes();
   var from= (Date.parse(date))/1000; 
  
    var url="https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol="+symbol+"&resolution=1D&from="+from+"&to="+to;
    
    
    var promise= fetch(url,{
       method:"GET"
       });
       
       promise.then(function(res){
       return res.json();})
       .then(function(data){
 
          
         var close;
         if(   (data['s']!='no_data') && (data["s"]  !='error'))
         {
             close=data

             resolve(close)
           
         }
        
         else{
           console.log("wrong symbol"+symbol)
           close=1000
         }    
         resolve(close)
        
     });    
    
      
   })
   
}
