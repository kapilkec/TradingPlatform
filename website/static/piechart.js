export function piechart(data){


  //  export function showchart(){
  
    anychart.onDocumentReady( 
     
      async function () {
        // create data table on loaded data
        // anychart.theme('monochrome');
        
     
  
  
    // var data = [
    //   {x: "aaaaaaaaA", value: 637166 },
    //   {x: "aaaaaaaaB", value: 721630},
    //   {x: "Ccccccccc", value: 148662},
    //   {x: "ddddddddD", value: 78662},
    //   {x: "eeeesseeeeeE", value: 90000},
    //   {x: "aaaaaddaaaA", value: 637166 },
    //   {x: "aaaadaaaaB", value: 721630},
    //   {x: "Cccfcccccc", value: 148662},
    //   {x: "ddeddddddD", value: 78662},
    //   {x: "eefeeeeeeeE", value: 90000}
    // ];
    
    // dataTable.addData( data);
    // create a chart and set the data
    var chart = anychart.pie(data);
  
    // chart = anychart.pie(data);
     
    // set the container id
     
    chart.container("pie-chart");
    // chart.fill("aquastyle");
    chart.sort("asc");
    var legend = chart.legend();
      legend.enabled(true);
  
      // Set maximum width and height.
      legend.maxWidth("50%");
      legend.maxHeight("50%");
      
      // legend mode and position
      legend.itemsLayout("horizontalExpandable");
      // legend.position("right");
  
      // paginator position
      legend.paginator().orientation("bottom");  
  
       
       
      // set align
      // legend.align("top");
      // set padding
      // legend.padding(0);
      chart.legend().fontColor("black");
      chart.legend().fontSize(16);
      chart.legend().fontWeight(500);
      // chart.background().stroke("5 red");
      // chart.background().fill({
      //   keys: [ "rgba(169, 180, 177, 0.971)"],
         
      //   // animation: "gradient 3s ease infinite"
      // });
    
    // initiate drawing the chart
    chart.draw();})
  
   }
  
   
  
  
  
   export async function lineChart(momentID,dat){
  
  
    var data = []
     
    for(let i in dat){
      // data[parseInt( i)+1]=dat[i]
       data.push([parseInt( i)+1,dat[i]])
    }  
    
        
    // create a chart
    var chart = anychart.line();
    
    // create a line series and set the data
    var series = chart.line(data);
    
    // set the container id
    chart.container(momentID);
  
     
  
    
    // initiate drawing the chart
    chart.draw();
   }
   
  

