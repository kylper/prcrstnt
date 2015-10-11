/*var currentSites = [];
function listTabs(tabs){
  var tabNumber = 0;
  for (let tab in tabs){
    tabNumber++;
    currentSites += {
      "id" : tabNumber,
      "url" : tab.url
    };
  }
} */

// self.port.on("siteEval", function(site) {
  //$("body").html("<p>This website is blocked.</p>");
  /*listTabs(tabs);
  $("body").html("<p>" + currentSites + "</p>");
  console.log(currentSites);
  console.log(tabs.url); */
//});


self.port.on('alert', function(message){
  $("body").html('<html><head><title>Site Blocked | PRCRSTNT</title><link rel="stylesheet" type="text/css" href="resource://prcrstnt/data/interface/style.css"></link></head><body><div class="topBar"><img id="topIcon" src="resource://prcrstnt/data/interface/logo.svg" /><h1>PRCRSTNT</h1></div><h1 style="padding-top: 50px; text-align: center;">Sorry!</h1><p style="text-align: center;">This site is blocked until you finish your task!</p></body></html>');
});
