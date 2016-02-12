(function(){

    window.widgetParameters = getWidgetParameters();

    if(typeof window.angular === 'undefined'){
        var angularJS = getAngularJS();
        document.getElementsByTagName("head")[0].appendChild(angularJS);

        if(angularJS.complete){
            document.write = document._write;
        }else{
            angularJS.onload = function(){
                setTimeout(function(){
                    document.write = document._write;
                }, 0);
                main();
            }
        }
    }else{
        main();
    }

    function getWidgetParameters() {
        var url = document.currentScript.src;
        var urlSplit = url.split("?");
        var parameters = urlSplit[1] ? urlSplit[1] : null;
        parameters = parameters.split("&");
        var objectListParameters = [];
        if(parameters)
        for (var i = 0; i < parameters.length; i++) {
            var splitParam = parameters[i].split("=");
            var parameter = {
                name: splitParam[0],
                value: splitParam[1]
            };
            objectListParameters.push(parameter);
        }
        return objectListParameters;
    }

    function getAngularJS() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.min.js";
        return script;
    }

    function main() {
        buildWidgetHtml(function(){
            var widgetJS = document.createElement("script");
            widgetJS.type = "text/javascript";
            widgetJS.src = "http://findeck.es/widgetGithubRepos.js"; //widgetURL
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(widgetJS);
        });
    }

    function buildWidgetHtml(callback) {
        var widgetContainer = document.getElementById("widget");
        var appDiv = document.createElement("div");
        appDiv.setAttribute("ng-controller", "MainCtrl");
        appDiv.setAttribute("id", "MainCtrl");
        widgetContainer.appendChild(appDiv);
        loadTemplate(callback);
    }

    function loadTemplate(callback) {
        var ajax = new XMLHttpRequest();
		ajax.open("GET","http://findeck.es/getWidgetTemplate.php");
		ajax.send();
		ajax.onreadystatechange=function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				var response = ajax.responseText;
				document.getElementById("MainCtrl").innerHTML = response;
                callback();
			}
		};
    }



})();
