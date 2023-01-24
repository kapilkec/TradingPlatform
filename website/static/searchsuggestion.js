import {   stockname } from "./stockdetails.js";
import { searchClicked} from "./fetchapi.js";
async function searchSuggestions(){

  document.addEventListener("click",()=>{document.getElementsByClassName("suggestionBox")[0].style.display="none";})
  var stocksname=await stockname();
  // const inputbox = document.querySelector(".searchClass")
  // const suggbox = document.querySelector(".suggbox")

  const searchwrapper=document.querySelector("#search-input")
  const inputbox=searchwrapper.querySelector("input")
  const suggbox=document.querySelector(".suggestionBox")


  inputbox.onkeyup=(e)=>{
    
    var userData = e.target.value
    var emptyarray=[]
    if(userData){
      emptyarray=stocksname.filter((data)=>{
          var temp=data.slice(2,data.length-1)
          return temp.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());         
      })
      // console.log("result"+emptyarray)
      emptyarray=emptyarray.map((data)=>{
          return data = '<li class="suggestionList">' + data+'</li>';
      })
      
      var searchSuggest=''
      for (var i=0;i<emptyarray.length;i++){
          searchSuggest+=emptyarray[i];
      }
      suggbox.innerHTML=searchSuggest
      document.getElementsByClassName("suggestionBox")[0].style.display="inline";

      $(".suggestionList").click(function(){
        var listContent=this.innerHTML;
        listContent = listContent.replace("&amp;","&")
        document.getElementById("searchClass").value=listContent;
        searchClicked()
      });
    }
    else{
      document.getElementsByClassName("suggestionBox")[0].style.display="none";
    }
  }

  }
  searchSuggestions();