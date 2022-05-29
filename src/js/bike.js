export default class StolenBike {  
  static getBike(city) {
    console.log(city)
    return fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${city}&distance=10&stolenness=proximity&access_token=${process.env.API_KEY}`)
      .then(function(response) {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error){
        return error;
        
      });
  }
}