var self = require('sdk/self');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
var buttons = require('sdk/ui/button/action');

/* Firefox Interface/Buttons */
buttons.ActionButton({
  id: "list-tabs",
  label: "List Tabs",
  icon: "./interface.png",
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

function blockPage(){
  pageMod.PageMod({
      include: "*",
      contentScriptFile: [self.data.url("jquery.min.js"), self.data.url("siteEvalMod.js")],
      onAttach: function(worker) {
          console.log(site);
          worker.port.emit("siteEval", site);
      }
  });
}

function initialize(){
  openInterface();
  startServer();
}

/* Start Script */
initialize();

/* When a new site is loaded, put the special script on the page! */
tabs.on('ready', function(tab){
  console.log("VARS: " + vars.acceptedSiteList);

  //acceptedSiteList.includes()


  for (var i=0; i < 3; i++){
    if (tab.url != vars.acceptedSiteList[i]){
      vars.comparedSitesNum++;
      console.log("Added 1, now:" + vars.comparedSitesNum);
    }
  }
  console.log(vars.comparedSitesNum);
  if (vars.comparedSitesNum == 3){
    worker = tab.attach({
      contentScriptFile: [self.data.url("jquery.min.js"), self.data.url("siteEvalMod.js")]
    });
    worker.port.emit("alert", "Blocked");
    vars.comparedSitesNum = 0;
    console.log("Blocked: " + vars.comparedSitesNum);
  } else {
    vars.comparedSitesNum = 0;
    console.log("Not Blocked: " + vars.comparedSitesNum);
  }
});
