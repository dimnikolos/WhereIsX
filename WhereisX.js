//https://maps.googleapis.com/maps/api/geocode/json?address=Arta,%20Greece&key=AIzaSyBX9t97s78v5FrCMpnuwZZWYT2vcpf6POU
(function(ext) {
      var cacheDuration = 1800000; //ms, 30 minutes
      var cachedWhere = {};    
      class whereData{
          constructor(lng,lat,form){
              this.lng = lng;
              this.lat = lat;
              this.form = form;
              this.time = Date.now();
          };
      };
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };


    ext.longitudeOf = function(location,callback){
        //if in cache
        console.log(cachedWhere);
        if (location in cachedWhere &&
            Date.now() - cachedWhere[location].time < cacheDuration) {
          //Weather data is cached
          callback(cachedWhere[location].lng);
          return;
        }
      $.ajax({
         url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyBX9t97s78v5FrCMpnuwZZWYT2vcpf6POU',
         dataType: 'json',
         success: function( geoData ) {
         // Got the data - parse it and return the temperature
         var lng = geoData['results'][0]['geometry']['location']['lng'];
         var lat = geoData['results'][0]['geometry']['location']['lat'];
         var form = geoData['results'][0]['formatted_address'];
         cachedWhere[location] = new whereData(lng,lat,form);
         callback(lng);
         }
         });
    };


    ext.latitudeOf = function(location,callback){
        if (location in cachedWhere &&
            Date.now() - cachedWhere[location].time < cacheDuration) {
          //Weather data is cached
          callback(cachedWhere[location].lat);
          return;
        }
      $.ajax({
         url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyBX9t97s78v5FrCMpnuwZZWYT2vcpf6POU',
         dataType: 'json',
         success: function( geoData ) {
         // Got the data - parse it and return the temperature
         var lng = geoData['results'][0]['geometry']['location']['lng'];
         var lat = geoData['results'][0]['geometry']['location']['lat'];
         var form = geoData['results'][0]['formatted_address'];
         cachedWhere[location] = new whereData(lng,lat,form);
         callback(lat);
         }
         });
    };

    ext.formattedAdress = function(location,callback){
        if (location in cachedWhere &&
            Date.now() - cachedWhere[location].time < cacheDuration) {
          //Weather data is cached
          callback(cachedWhere[location].lat);
          return;
        }        
      $.ajax({
         url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyBX9t97s78v5FrCMpnuwZZWYT2vcpf6POU',
         dataType: 'json',
         success: function( geoData ) {
         // Got the data - parse it and return the temperature
         var lng = geoData['results'][0]['geometry']['location']['lng'];
         var lat = geoData['results'][0]['geometry']['location']['lat'];
         var form = geoData['results'][0]['formatted_address'];
         cachedWhere[location] = new whereData(lng,lat,form);
         callback(form);
         }
         });
      };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'longitude of %s', 'longitudeOf', 'Athens, Greece'],
            ['R', 'latitude of %s', 'latitudeOf', 'Athens, Greece'],
            ['R', 'Formatted address of %s', 'formattedAdress', 'Athens'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Where is X', descriptor, ext);
})({});
