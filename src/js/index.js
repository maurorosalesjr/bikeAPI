import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/styles.css';
import StolenBike from './bike.js';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('.showDescription').text("");
  $('.showLocation').text("");
  $('.showManufacturer').text("");
}

function getElements(response) {
    
  if(response.bikes) {
    const allBikes = response.bikes;

    let bikeArray = ["Desc", "Local", "Manu", "thumb"];

    $('.showDescription').text(bikesorter(bikeArray, allBikes)); 
    //console.log(bikesorter(bikearray, allBikes));
  } else {
      $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

function bikesorter (bikeArray, allBikes)
{
  let bikeFacts = " "
  for(var i = 0; i < allBikes.length; i++)
  {
    bikeArray[0] = (allBikes[i].description);
    bikeArray[1] = (allBikes[i].stolen_location);
    bikeArray[2] = (allBikes[i].manufacturer_name); 
    bikeArray[3] = (allBikes[i].thumb);
    bikeFacts += ("This bikes description is " + bikeArray[0] + " \n" + "The bike was stolen at " + bikeArray[1] + " \n" + "The bike is manufactured by " + bikeArray[2] + "\n" + `<img src='${bikeArray[3]}'>`  + " \n\n");

  }
  return bikeFacts;
}  
  

$(document).ready(function() {
  $('#bikeLocation').click(function(){
    let city = $('#location').val();
    console.log(city);
    clearFields();
    StolenBike.getBike(city)
    .then(function(response){
      getElements(response);
    });
  });
});