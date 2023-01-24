import { printCards } from "./fetchapi.js";


function hadleNumberClick(clickedLink ){
    clickedLink.parentElement.classList = "actived";
    var clickedLinkPageNumber=parseInt(clickedLink.innerText)
    // const url=geturl((clickedLinkPageNumber*10)-10);
    // getdata();
    
    printCards(clickedLinkPageNumber,0)
    window.scrollTo(0, 0)
     
}
 
 
//handle pagination
var pagelinks=document.querySelectorAll(".clickedPage")
var activePageNumber;
var clickedLink;
 

pagelinks.forEach((element)=>{
    element.addEventListener("click",function(){
          
          var activeLink=document.querySelector(".actived")
          activeLink.classList = "waves-effect";
          activeLink.classList.remove('actived');
        
      
          activePageNumber =  parseInt(activeLink.innerText)
          console.log("prev pg"+activePageNumber)

          console.log("clicked parent id name:"+this.parentElement.id)

          if((this.parentElement.id==='left-arrow' && activePageNumber!==1 && activePageNumber!==11 && activePageNumber!==21 )){
           
             handArrowClick(activePageNumber-1)
          }
          else if ( (this.parentElement.id==='right-arrow'&& activePageNumber!==10 && activePageNumber!==20 && activePageNumber!==30)){
            handArrowClick(activePageNumber+1)
          }
         else if((this.parentElement.id==='left-arrow' && activePageNumber===1)){
            activeLink.classList="actived"
         } 
         else if((this.parentElement.id==='right-arrow' && activePageNumber===30)){
            activeLink.classList="actived"
         } 
          
         else if((this.parentElement.id==='right-arrow' && activePageNumber===10)){
             changePage("card2","card1");
             
             handArrowClick(11)

         } 
         else if((this.parentElement.id==='left-arrow' && activePageNumber===11)){
            changePage("card1","card2");
            handArrowClick(10)

        } 
        else if((this.parentElement.id==='right-arrow' && activePageNumber===20)){
            changePage("card3","card2");
            
            handArrowClick(21)

        } 
        else if((this.parentElement.id==='left-arrow' && activePageNumber===21)){
           changePage("card2","card3");
           handArrowClick(20)

       } 
 
           else {
             
             hadleNumberClick(this )
             
             
           }
             

    })
})

function handArrowClick(pageNumber ){
    var temp="._"+pageNumber
    document.querySelector(temp).parentElement.classList = "actived";

     
    
    printCards(pageNumber,0)
    window.scrollTo(0, 0)
     
    
}
function changePage(id1,id2){
    
    document.getElementById(id2).style.display="none";
    document.getElementById(id1).style.display="";
}
