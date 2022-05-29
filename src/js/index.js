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

    //let bikearray = [];
    allBikes.forEach(function(bike) {
      $('.showDescription').append(`This bikes description is ${bike.description}, `);
      $('.showLocation').append(`The bike was last seen at ${bike.stolen_location}, `);
      $('.showManufacturer').append(`The bike is manufactured by ${bike.manufacturer_name}, `);
      $('.showErrors').append("");
    });   
  } else {
      $('.showErrors').text(`There was an error: ${response.message}`);
  }
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