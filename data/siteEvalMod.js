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
  $("body").html("<p>" + message + "</p>");
});
