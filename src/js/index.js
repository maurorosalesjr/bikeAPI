import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/styles.css';
import {StolenBike} from './bike.js';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('.showDescription').text("");
}

function getElements(response) { 
  if(response.bikes) {
    const allBikes = response.bikes;
    let bikeArray = ["Desc", "Local", "Manu", "thumb"];
    $('.showDescription').html(bikesorter(bikeArray, allBikes)); 
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
    bikeFacts += ("<p>This bikes description is</p>" + bikeArray[0] + " \n" + "<p>The bike was stolen at</p> " + bikeArray[1] + " \n" + "<p>The bike is manufactured by</p> " + bikeArray[2] + "\n" + `<img src="${bikeArray[3]}" alt="picture of a stolen bike"/>` + " \n\n" );

  }
  return bikeFacts;
}  
  
$(document).ready(function() {
  $('#city').click(function(event){ 
    event.preventDefault();
    let city = $('#location').val();
    clearFields();
    StolenBike.getBike(city)
    .then(function(response){
      getElements(response);
    });
  });
});

