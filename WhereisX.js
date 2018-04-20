//https://maps.googleapis.com/maps/api/geocode/json?address=Arta,%20Greece&key=AIzaSyBX9t97s78v5FrCMpnuwZZWYT2vcpf6POU

(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.longitudeOf = function(location,callback){
        $.ajax({
         url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyBX9t97s78v5FrCMpnuwZZWYT2vcpf6POU',
         dataType: 'json',
         success: function( geoData ) {
         // Got the data - parse it and return the temperature
         var lng = geoData['results'][0]['geometry']['location']['lng'];
         callback(lng);
         }
         });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'longitudeOf %s', 'longitudeOf', 'New York, NY']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Where is?', "A simple extension that reports latitude and longitude of an address.", descriptor, ext);
})({});
