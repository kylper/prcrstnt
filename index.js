var self = require('sdk/self');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
var buttons = require('sdk/ui/button/action');

/* Firefox Interface/Buttons */
buttons.ActionButton({
  id: "list-tabs",
  label: "List Tabs",
  icon: "./logo.png",
  onClick: openInterface
});

/* Variables */
var vars = {
  newSite: "www.something.com",
  acceptedSiteList: ["resource://prcrstnt/data/interface/index.html", "https://developer.mozilla.org/en-US/", "https://developer.apple.com/"],
  comparedSitesNum: null
};
/* ISSUE WITH VARS: STRING COMPARISON NEEDS TO BE WITH THE BASE SITE ONLY, OTHERWISE THE EXACT URL AT THE END OF ALL REDIRECTS IS NEEDED */

/* Functions */
function openInterface(){
    tabs.open({ url: "./interface/index.html" });
}

function startServer(){

}

function blockSite(tab){
  worker = tab.attach({
    contentScriptFile: [self.data.url("jquery.min.js"), self.data.url("siteEvalMod.js")]
  });
  worker.port.emit("alert", "Blocked");
}

function initialize(){
  openInterface();
  startServer();
}

/* Start Script */
initialize();

/* When a new site is loaded, put the special script on the page! */
tabs.on('ready', function(tab){
  var siteList = vars.acceptedSiteList;

  if(siteList.indexOf(tab.url.valueOf()) == -1){
    blockSite(tab);
  }

});
