document.getElementById("goBack").addEventListener("click", function(event) {
  event.preventDefault();
  window.history.back();
});

$(document).ready(function() {
  $.get("/api/favorites").then(function(data) {
    console.log(data);
    for(i in data){
      
    }
  });
});

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}

// function printResultCard(location,cardImage,cardLineOne,cardLineTwo,cardLineThree,cardLineFour,cardLineFive,cardLineSix,externalLink,externalLinkName){
//   var divContainerFluid = $("<div>")
//   divContainerFluid.attr("class","container-fluid")
//   var divContainerRow = $("<div>")
//   divContainerRow.attr("class","row")
//   var divContainerCol = $("<div>")
//   divContainerCol.attr("class","col-12 mt-3")
//   var divContainerCard = $("<div>")
//   divContainerCard.attr("class","card shadow-lg")
//   var divContainerCardRow = $("<div>")
//   divContainerCardRow.attr("class","row m-0")
//   var divContainerCardRowImgCol = $("<div>")
//   divContainerCardRowImgCol.attr("class","col-6 col-md-4 m-auto")
//   var divContainerCardRowActualImg = $("<img>")
//   divContainerCardRowActualImg.attr("class","img-responsive m-auto")
//   divContainerCardRowActualImg.attr("src",cardImage)
//   var divContainerCardRowBodyCol = $("<div>")
//   divContainerCardRowBodyCol.attr("class","col-6 col-md-8")
//   var divContainerCardRowActualBody = $("<div>")
//   divContainerCardRowActualBody.attr("class","card-body")
//   var divContainerCardFooter = $("<div>")
//   divContainerCardFooter.attr("class","card-footer")
//   var divContainerCardFooterSpanOne = $("<span>")
//   var divContainerCardFooterSpanTwo = $("<span>")
//   divContainerCardFooterSpanTwo.attr("class","float-right")
//   var divContainerCardFooterHeart = $("<i>")
//   divContainerCardFooterHeart.attr("class","fas fa-heart")
//   if(cardLineOne){
//       var cardBodyLineOne = $("<p>")
//       cardBodyLineOne.attr("class","card-text card-line")
//       var cardBodyLineOneStrong = $("<strong>")
//       cardBodyLineOneStrong.text(cardLineOne)
//       cardBodyLineOne.append(cardBodyLineOneStrong)
//       divContainerCardRowActualBody.append(cardBodyLineOne)
//   }
//   if(cardLineTwo){
//       var cardBodyLineTwo = $("<p>")
//       cardBodyLineTwo.attr("class","card-text card-line")
//       var cardBodyLineTwoSmall = $("<small>")
//       cardBodyLineTwoSmall.text(cardLineTwo)
//       cardBodyLineTwo.append(cardBodyLineTwoSmall)
//       divContainerCardRowActualBody.append(cardBodyLineTwo)
//   }
//   if(cardLineThree){
//       var cardBodyLineThree = $("<p>")
//       cardBodyLineThree.attr("class","card-text card-line")
//       cardBodyLineThree.text(cardLineThree)
//       divContainerCardRowActualBody.append(cardBodyLineThree)
//   }
//   if(cardLineFour){
//       var cardBodyLineFour = $("<p>")
//       cardBodyLineFour.attr("class","card-text card-line")
//       cardBodyLineFour.text(cardLineFour)
//       divContainerCardRowActualBody.append(cardBodyLineFour)
//   }
//   if(cardLineFive){
//       var cardBodyLineFive = $("<p>")
//       cardBodyLineFive.attr("class","card-text card-line")
//       cardBodyLineFive.text(cardLineFive)
//       divContainerCardRowActualBody.append(cardBodyLineFive)
//   }
//   if(cardLineSix){
//       var cardBodyLineSix = $("<p>")
//       cardBodyLineSix.attr("class","card-text card-line")
//       cardBodyLineSix.text(cardLineSix)
//       divContainerCardRowActualBody.append(cardBodyLineSix)
//   }
//   if(externalLink){
//       var cardBodyExtURL = $("<a>")
//       cardBodyExtURL.attr("class","card-text card-line")
//       cardBodyExtURL.attr("href",externalLink)
//       cardBodyExtURL.attr("target","_blank")
//       cardBodyExtURL.text(externalLinkName)
//       divContainerCardFooterSpanOne.append(cardBodyExtURL)
      
//   }
//   divContainerCardFooterSpanTwo.append(divContainerCardFooterHeart)
//   divContainerCardRowBodyCol.append(divContainerCardRowActualBody)
//   divContainerCardRowImgCol.append(divContainerCardRowActualImg)
//   divContainerCardRow.append(divContainerCardRowImgCol)
//   divContainerCardRow.append(divContainerCardRowBodyCol)
//   divContainerCard.append(divContainerCardRow)
//   divContainerCardFooter.append(divContainerCardFooterSpanOne)
//   divContainerCardFooter.append(divContainerCardFooterSpanTwo)
//   divContainerCard.append(divContainerCardFooter)
//   divContainerCol.append(divContainerCard)
//   divContainerRow.append(divContainerCol)
//   divContainerFluid.append(divContainerRow)
//   $("."+location).append(divContainerFluid);
// };