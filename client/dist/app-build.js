"bundle";!function(){var a=System.get("@@amd-helpers").createDefine();define("version.html!github:systemjs/plugin-text@0.0.3",[],function(){return"<template>\n	${versionNumber}\n</template>"}),a()}(),System.register("version",[],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var c;return{setters:[],execute:function(){c=function d(){b(this,d),this.versionNumber="v1.2.2"},a("Version",c)}}}),System.register("time-from-now",["npm:moment@2.11.1"],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var c,d,e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();return{setters:[function(a){c=a["default"]}],execute:function(){d=function(){function a(){b(this,a)}return e(a,[{key:"toView",value:function(a){return c(a).fromNow()}}]),a}(),a("TimeFromNowValueConverter",d)}}}),System.register("take",[],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var c,d=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();return{setters:[],execute:function(){c=function(){function a(){b(this,a)}return d(a,[{key:"toView",value:function(a,b){return a.slice(0,b)}}]),a}(),a("TakeValueConverter",c)}}}),System.register("sort",[],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var c,d=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();return{setters:[],execute:function(){c=function(){function a(){b(this,a)}return d(a,[{key:"toView",value:function(a,b,c){var d="ascending"===c?1:-1;return a.slice(0).sort(function(a,c){return(a[b]-c[b])*d})}}]),a}(),a("SortValueConverter",c)}}}),function(){var a=System.get("@@amd-helpers").createDefine();define("settings.html!github:systemjs/plugin-text@0.0.3",[],function(){return'<template>\n  <style>\n    td input { width: 50px; }\n  </style>\n\n  <section>\n    <form class="pure-form">\n        <fieldset>\n\n            <label for="operators">Operators</label>\n            <textarea value.bind="roasterSettings.operators" style="width: 300px;height:150px;"></textarea>\n\n            <label for="roasterId">Roaster ID</label>\n            <input id="roasterId" type="text" style="width: 100px; max-width: 100%" placeholder="enter roaster id" value.bind="roasterSettings.roasterId">\n\n            <label>\n              <input type="checkbox" id="showDetails" checked.bind="roasterSettings.showDetails" />\n              show data details during roast\n            </label>\n\n\n            <br/>\n            <br/>\n            <label>Graph Settings</label>\n            <table class="pure-table">\n              <thead>\n              <tr>\n                <th></th>\n                <th>min</th>\n                <th>max</th>\n              </tr>\n              </thead>\n              <tbody>\n              <tr>\n                <th>Temperature</th>\n                <td><input type="text" value.bind="roasterSettings.tempLow" /></td>\n                <td><input type="text" value.bind="roasterSettings.tempHigh" /></td>\n              </tr>\n              <tr>\n                <th>Water Columns</th>\n                <td><input type="text" value.bind="roasterSettings.wcLow" /></td>\n                <td><input type="text" value.bind="roasterSettings.wcHigh" /></td>\n              </tr>\n              </tbody>\n            </table>\n\n\n            <a class="button" style="margin-top:35px" click.trigger="save()"><i class="fa fa-save"></i> Save</a>\n            <span id="message" style="color:#30570F;display:none;"><i class="fa fa-check"></i> Saved</span>\n        </fieldset>\n    </form>\n\n  </section>\n</template>'}),a()}(),System.register("settings",[],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var c,d=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();return{setters:[],execute:function(){c=function(){function a(){b(this,a)}return d(a,[{key:"activate",value:function(){this.roasterSettings=window.localStorage.roasterSettings?JSON.parse(window.localStorage.roasterSettings):{}}},{key:"save",value:function(){window.localStorage.roasterSettings=JSON.stringify(this.roasterSettings),$("#message").fadeIn().delay(3e3).fadeOut()}}]),a}(),a("Settings",c)}}}),function(){var a=System.get("@@amd-helpers").createDefine();define("roast.html!github:systemjs/plugin-text@0.0.3",[],function(){return'<template>\n  <style>\n    .key-metric {\n      font-size: 36px;\n      color: #222;\n      min-width: 200px;\n    }\n  </style>\n\n  <require from="date-format"></require>\n  <require from="number-format"></require>\n  <require from="print"></require>\n\n  <section class="au-animate" style="margin-top:15px;">\n    <form class="pure-form pure-form-stacked" if.bind="!isReady" submit.delegate="ready()">\n        <fieldset>\n\n            <label for="operator">Operator</label>\n            <select value.bind="roast.operator" id="operator">\n              <option value="">-- select operator --</option>\n              <option repeat.for="operator of operators">${operator}</option>\n            </select>\n\n            <label for="coffee">Batch Number</label>\n            <input id="coffee" type="text" style="width: 500px; max-width: 100%" placeholder="batch number" value.bind="roast.id" required>\n\n            <label for="coffee">Coffee</label>\n            <input id="coffee" type="text" style="width: 500px; max-width: 100%" placeholder="enter coffee description" value.bind="roast.coffee" required>\n\n            <label for="weightIn">Weight In</label>\n            <input id="weightIn" type="number" step=".01" style="width: 500px; max-width: 100%" placeholder="weight in" value.bind="roast.weightIn" required>\n\n            <div>\n              <button type="submit" style="margin-top:35px"><i class="fa fa-check"></i> Ready</button>\n            </div>\n        </fieldset>\n    </form>\n\n    <div class="toolbar pure-g" if.bind="isReady">\n      <div class="pure-u-10-24 toolbar-buttons">\n        <a if.bind="!jobRunning" click.trigger="startJob()"><i class="fa fa-play"></i> start roast</a>\n        <a if.bind="jobRunning" click.trigger="stopJob()"><i class="fa fa-stop"></i> end roast</a>\n        <!--<a if.bind="jobRunning" click.trigger="stopJob()"><i class="fa fa-ellipsis-h"></i>\n          <span if.bind="!showDetails" click.trigger="toggleDetails()">show details</span>\n          <span if.bind="showDetails" click.trigger="toggleDetails()">hide details</span>\n        </a>-->\n        <a if.bind="canSave" click.trigger="saveJob()"><i class="fa fa-save"></i> save</a>\n        <print if.bind="canPrint" roast.bind="roast" />\n        <a if.bind="!jobRunning" click.trigger="editJob()"><i class="fa fa-info"></i> info</a>\n      </div>\n      <div class="pure-u-14-24">\n        <table>\n          <tr>\n            <td>Time:</td>\n            <td>Bean Temp (&#8457;):</td>\n            <td>Roaster Temp (&#8457;):</td>\n            <td>Pressure (w.c.):</td>\n          </tr>\n          <tr>\n            <td class="key-metric elapsed">${elapsed | dateFormat:\'mm:ss\'}</td>\n            <td class="key-metric currentTemp">${currentBeanTemp | numberFormat:\'0,0.0\'}</td>\n            <td class="key-metric currentTemp">${currentDrumTemp | numberFormat:\'0,0.0\'}</td>\n            <td class="key-metric currentWc">${currentWc | numberFormat:\'0,0.0\'}</td>\n          </tr>\n        </table>\n      </div>\n    </div>\n\n    <div if.bind="errorMessage" class="bg-danger" style="padding: 10px 20px">\n      ${errorMessage}\n    </div>\n\n      <!--<div class="toolbar-buttons" style="display:inline-block;vertical-align:top;margin-top:15px;">\n      </div>-->\n\n\n    <div id="chart" style="width:100%;height:500px"></div>\n\n  </section>\n\n  <!--info below the graph -->\n  <section>\n    <div class="pure-g" if.bind="isReady">\n\n      <div class="pure-u-10-24">\n        <form class="pure-form pure-form-stacked" if.bind="canSave" submit.delegate="ready()">\n            <fieldset>\n              <label for="weightOut">Weight Out</label>\n              <input id="weightOut" type="number" step=".01" style="width: 500px; max-width: 100%" placeholder="weight out" value.bind="roast.weightOut" required>\n            </fieldset>\n        </form>\n      </div>\n\n      <div class="pure-u-14-24">\n        <table>\n          <tr>\n            <td>First Crack:</td>\n            <td>Target end (low):</td>\n            <td>Target end (high):</td>\n          </tr>\n          <tr>\n            <td class="key-metric currentWc">${roast.firstCrackTime | dateFormat:\'mm:ss\'}</td>\n            <td class="key-metric currentWc">${roast.firstCrackTime / 0.8 | dateFormat:\'mm:ss\'}</td>\n            <td class="key-metric currentWc">${roast.firstCrackTime / 0.75 | dateFormat:\'mm:ss\'}</td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </section>\n\n  <section if.bind="canSave">\n  </section>\n\n  <section>\n    <table class="pure-table" id="dataStream" if.bind="showDetails">\n      <thead>\n        <tr>\n          <th>time</th>\n          <th>room</th>\n          <th>drum</th>\n          <th>beans</th>\n          <th>wc</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr repeat.for="row of dataStream">\n          <td>${row.sensor_time | dateFormat:\'h:mm:ss a\'}</td>\n          <td>${row.roomTemp}</td>\n          <td>${row.drumTemp}</td>\n          <td>${row.beanTemp}</td>\n          <td>${row.waterColumns}</td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n\n</template>\n'}),a()}(),System.register("roast",["npm:aurelia-framework@1.0.0-beta.1.1.1","npm:aurelia-router@1.0.0-beta.1.1.0","npm:moment@2.11.1","npm:socket.io-client@1.4.5"],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var c,d,e,f,g,h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();return{setters:[function(a){c=a.inject},function(a){d=a.Redirect},function(a){e=a["default"]},function(a){f=a["default"]}],execute:function(){g=function(){function a(){b(this,a),this.roast={},this.jobRunning=!1,this.hasData=!1,this.dataStream=[],this.elapsed=0,this.firstCrackSet=!1,this.isSaved=!1,this.errorMessage=""}return h(a,[{key:"activate",value:function(){this.roasterSettings=window.localStorage.roasterSettings?JSON.parse(window.localStorage.roasterSettings):{},this.operators=this.roasterSettings.operators?this.roasterSettings.operators.split("\n"):[],this.roast={coffee:null,operator:window.localStorage.lastOperator,roaster:this.roasterSettings.roasterId}}},{key:"ready",value:function(){this.isReady=!0}},{key:"editJob",value:function(){this.isReady=!1}},{key:"startJob",value:function(){var a=this;this.roast.roastDate=(new Date).toUTCString(),this.roast.startWc=this.currentWc,this.jobRunning=!0,window.localStorage.lastOperator=this.roast.operator,this.socket=f("http://localhost:8080");var b=document.getElementById("chart"),c=(this.dataStream,new Date);console.log(e());var d=[],g=[],h=[],i=[],j=function(){a.graph=Flotr.draw(b,[{data:d,label:"room"},{data:g,label:"drum"},{data:i,label:"beans"},{data:h,label:"wc",lines:{fill:!0},yaxis:2}],{title:a.roast.id,xaxis:{mode:"time",showMinorLabels:!0,ticks:[0,60,120,180,240,300,360,420,480,540,600,660,720,780,840,900],tickFormatter:function(a){return e("2000-01-01 00:00:00").add(e.duration(1e3*a)).format("mm:ss")},min:0,max:900,labelsAngle:45,title:"Time"},yaxis:{color:"#E74B00",max:parseInt(a.roasterSettings.tempHigh),title:"Temperature"},y2axis:{color:"#2566B7",max:parseInt(a.roasterSettings.wcHigh),title:"Water Columns"},grid:{verticalLines:!0,backgroundColor:"white"},HtmlText:!1,legend:{position:"se"}})};this.socket.on("dataStream",function(b){a.dataStream.push(b),a.elapsed=new Date-c,a.currentBeanTemp=b.beanTemp,a.currentRoomTemp=b.roomTemp,a.currentDrumTemp=b.drumTemp,a.currentPsi=b.psi,a.currentWc=b.waterColumns;var e=a.elapsed/1e3;d.push([e,b.roomTemp]),g.push([e,b.drumTemp]),i.push([e,b.beanTemp]),h.push([e,b.waterColumns]),a.lastUpdated=new Date,a.hasData=!0,!a.firstCrackSet&&a.elapsed>0&&a.currentBeanTemp>=395&&(console.log("firstCrack:",a.elapsed),a.roast.firstCrackTime=a.elapsed,a.firstCrackSet=!0),a.roast.startBeanTemp||(a.roast.startBeanTemp=a.currentBeanTemp,a.roast.startRoomTemp=a.currentRoomTemp,a.roast.startDrumTemp=a.currentDrumTemp),j()})}},{key:"stopJob",value:function(){this.roast.endBeanTemp=this.currentBeanTemp,this.roast.endRoomTemp=this.currentRoomTemp,this.roast.endDrumTemp=this.currentDrumTemp,this.roast.endWc=this.currentWc,this.roast.endDate=(new Date).toUTCString(),this.roast.elapsed=this.roast.roastDate-this.roast.startDate,this.jobRunning=!1,this.socket.disconnect()}},{key:"saveJob",value:function(){return this.errorMessage="",this.roast.weightOut?(this.roast.weightLoss=(this.roast.weightIn-this.roast.weightOut)/this.roast.weightIn,this.roast.graph=this.graph.download.getImageBase64("png"),localStorage.lastRoast=JSON.stringify(this.roast),void(this.isSaved=!0)):void(this.errorMessage="Please enter a weight out below the graph.")}},{key:"user",get:function(){return JSON.parse(window.localStorage.currentUser)}},{key:"canSave",get:function(){return!this.jobRunning&&this.hasData}},{key:"canPrint",get:function(){return this.isSaved}}]),a}(),a("Roast",g)}}}),function(){var a=System.get("@@amd-helpers").createDefine();define("print.html!github:systemjs/plugin-text@0.0.3",[],function(){return'<template>\n  <a click.trigger="printPdf()"><i class="fa fa-print"></i> print</a>\n</template>'}),a()}(),System.register("print",["npm:aurelia-framework@1.0.0-beta.1.1.1","npm:moment@2.11.1","npm:numeral@1.5.3"],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function c(a,b,c){var d=c[b];if(d){var e={};for(var f in d)e[f]=d[f];e.value=e.initializer?e.initializer.call(a):void 0,Object.defineProperty(a,b,e)}}var d,e,f,g,h,i=function(){function a(a,b,c){for(var d=0;d<b.length;d++){var e=b[d],f=e.decorators,g=e.key;if(delete e.key,delete e.decorators,e.enumerable=e.enumerable||!1,e.configurable=!0,("value"in e||e.initializer)&&(e.writable=!0),f){for(var h=0;h<f.length;h++){var i=f[h];if("function"!=typeof i)throw new TypeError("The decorator for method "+e.key+" is of the invalid type "+typeof i);e=i(a,g,e)||e}if(void 0!==e.initializer){c[g]=e;continue}}Object.defineProperty(a,g,e)}}return function(b,c,d,e,f){return c&&a(b.prototype,c,e),d&&a(b,d,f),b}}();return{setters:[function(a){d=a.customElement,e=a.bindable},function(a){f=a["default"]},function(a){g=a["default"]}],execute:function(){h=function(){function a(){b(this,j),c(this,"roast",h)}var h={};i(a,[{key:"printPdf",value:function(){var a=function(a){return{text:a,style:"label"}},b=function(a){return a?g(a).format("0,0.0"):""},c=f(this.roast.roastDate).format("dd M/D/YYYY h:mm:s a"),d=f(this.roast.endDate).format("dd M/D/YYYY h:mm:s a"),e=f(f(this.roast.endDate)._d-f(this.roast.roastDate)._d).format("mm:ss"),h=f(this.firstCrackTime).format("mm:ss"),i={pageSize:"B8",pageOrientation:"portrait",pageMargins:[5,0,0,0],content:[{style:"data",table:{body:[[a("Batch #"),this.roast.id],[a("Coffee"),this.roast.coffee],[a("Roaster"),this.roast.operator],[a("Equipment"),this.roast.roaster],[a("Roast start"),c],[a("Roast end"),d],[a("Duration"),e],[a("Bean (F)"),b(this.roast.startBeanTemp)+" | "+b(this.roast.endBeanTemp)],[a("Drum (F)"),b(this.roast.startDrumTemp)+" | "+b(this.roast.endDrumTemp)],[a("Room (F)"),b(this.roast.startRoomTemp)+" | "+b(this.roast.endRoomTemp)],[a("First crack"),h],[a("Weight in"),g(this.roast.weightIn).format("0.00")],[a("Weight out"),g(this.roast.weightOut).format("0.00")],[a("Weight loss"),g((this.roast.weightIn-this.roast.weightOut)/this.roast.weightIn).format("0.00%")]]},layout:"noBorders"},{image:this.roast.graph,width:160,height:50}],styles:{data:{fontSize:8,bold:!0,color:"black",margin:[0,0,0,0]},label:{fontSize:8,bold:!1,color:"#777777",margin:[0,0,0,0]}},defaultStyle:{font:"Lato"}};pdfMake.fonts={Lato:{normal:"Lato-Regular.ttf",bold:"Lato-Bold.ttf"}},pdfMake.createPdf(i).download("roast.pdf")}},{key:"roast",decorators:[e],initializer:null,enumerable:!0}],null,h);var j=a;return a=d("print")(a)||a}(),a("Print",h)}}}),System.register("number-format",["npm:numeral@1.5.3"],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var c,d,e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();return{setters:[function(a){c=a["default"]}],execute:function(){d=function(){function a(){b(this,a)}return e(a,[{key:"toView",value:function(a,b){return c(a).format(b)}}]),a}(),a("NumberFormatValueConverter",d)}}}),function(){var a=System.get("@@amd-helpers").createDefine();define("nav-bar.html!github:systemjs/plugin-text@0.0.3",[],function(){return'<template bindable="router">\n  <require from="./version"></require>\n  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\n        <span class="sr-only">Toggle Navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a class="navbar-brand" href="#">\n        <span>\n          <img src="./favicon.ico" style="width:40px;" />\n          ${router.title}\n          <version />\n        </span>\n      </a>\n    </div>\n\n    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n      <ul class="nav navbar-nav">\n        <li repeat.for="row of router.navigation" class="${row.isActive ? \'active\' : \'\'}">\n          <a data-toggle="collapse" data-target="#bs-example-navbar-collapse-1.in" href.bind="row.href" innerHTML.bind="row.settings.html"></a>\n        </li>\n      </ul>\n\n      <ul class="nav navbar-nav navbar-right">\n        <li class="loader" if.bind="router.isNavigating">\n          <i class="fa fa-spinner fa-spin fa-2x"></i>\n        </li>\n        <!--<li id="login-name">\n          <a href="javascript:delete window.localStorage.currentUser;location.href=\'/\';">${user.first_name} ${user.last_name}</a>\n        </li>-->\n      </ul>\n    </div>\n    <div></div>\n  </nav>\n</template>\n'}),a()}(),System.register("main",["github:twbs/bootstrap@3.3.6"],function(a){"use strict";function b(a){a.use.standardConfiguration().developmentLogging().plugin("aurelia-configuration").plugin("aurelia-validation"),a.start().then(function(a){return a.setRoot()})}return a("configure",b),{setters:[function(a){}],execute:function(){}}}),function(){var a=System.get("@@amd-helpers").createDefine();define("home.html!github:systemjs/plugin-text@0.0.3",[],function(){return'<template>\n  <style>\n    #toolbar a {\n      cursor:pointer;\n      font-size:15px;\n      margin-left:20px;\n      color: #333;\n    }\n  </style>\n  <require from="./date-format"></require>\n\n  <section class="au-animate">\n    <h2>\n      <i class="fa fa-home"></i>\n      Home\n    </h2>\n\n    <div class="toolbar">\n      <a route-href="route: jobNew;">\n        <i class="fa fa-fire"></i>\n        New Roast Job\n      </a>\n    </div>\n\n  </section>\n\n\n</template>\n'}),a()}(),System.register("home",["npm:aurelia-framework@1.0.0-beta.1.1.1"],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var c,d;return{setters:[function(a){c=a.inject}],execute:function(){d=function c(){b(this,c)},a("Home",d)}}}),System.register("date-format",["npm:moment@2.11.1"],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var c,d,e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();return{setters:[function(a){c=a["default"]}],execute:function(){d=function(){function a(){b(this,a)}return e(a,[{key:"toView",value:function(a,b){return a?c(a).format(b):""}}]),a}(),a("DateFormatValueConverter",d)}}}),function(){var a=System.get("@@amd-helpers").createDefine();define("app.html!github:systemjs/plugin-text@0.0.3",[],function(){return'<template>\n  <require from="nav-bar.html"></require>\n  <require from="font-awesome/css/font-awesome.min.css"></require>\n  <require from="bootstrap/css/bootstrap.css"></require>\n\n  <nav-bar router.bind="router" user.bind="user"></nav-bar>\n\n  <div class="page-host">\n    <router-view></router-view>\n  </div>\n</template>\n'}),a()}(),System.register("app",["npm:aurelia-router@1.0.0-beta.1.1.0","npm:moment@2.11.1"],function(a){"use strict";function b(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var c,d,e,f,g=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();return{setters:[function(a){c=a.Redirect},function(a){d=a["default"]}],execute:function(){e=function(){function a(){b(this,a)}return g(a,[{key:"configureRouter",value:function(a,b){a.title="Ipsento",a.map([{route:"/",redirect:"roast"},{route:"/roast",name:"roast",moduleId:"roast",nav:!0,title:"Roast",settings:{html:'<i class="fa fa-fire"></i> Roast'},auth:!1},{route:"/settings",name:"settings",moduleId:"settings",nav:!0,title:"Settings",settings:{html:'<i class="fa fa-gear"></i> Settings'},auth:!1},{route:"/print",name:"print",moduleId:"print",nav:!1,auth:!0}]),this.router=b}},{key:"user",get:function(){return window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):{first_name:"Guest",last_name:"User"}}}]),a}(),a("App",e),f=function(){function a(){b(this,a)}return g(a,[{key:"run",value:function(a,b){if(a.getAllInstructions().some(function(a){return a.config.auth})){var d=window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):{token:""},e=""!=d.token;if(!e)return b.cancel(new c("login"))}return b()}}]),a}()}}});