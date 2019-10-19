// Name         LK-SLT-Usage
// Version      10.0
// Author       DT
// Description  Sri Lanka Telecom - Data Usage
// Source       https://github.com/dimuththarindu/LK-SLT-Usage
// SupportURL   https://github.com/dimuththarindu/LK-SLT-Usage/issues
// License      GNU Lesser General Public License v3.0
// history      9.5.0 Add Remaining vol to Doughnut Charts
// history      9.0.0 Updated the script
// history      8.0.0 Updated the script according to SLT new web page
// history      7.0.0 Fix minor errors in JS 
// history      6.0.0 Update the warning sign color
// history      5.8.0 Change the image and update URL paths


// Total Volume
var totalMonthlylimit = 0;
var totalRemaining = 0;
var totalUsed = 0;

// Peak Volume
var peakMonthlylimit = 0;
var peakUsed = 0;
var peakRemaining = 0;

// Off-Peak Volume
var offPeakMonthlylimit = 0;
var offPeakUsed = 0;
var offPeakRemaining = 0;

// Dates
var daysInThisMonth = 0;
var dayOfTheMonth = 0;
var noOfComingDays = 0;

// Given data // Total Data / days
var peakDataPerDay = 0;
var offPeakDataPerDay = 0;

// Available data
var peakDataAvailablePerDay = 0;
var offPeakDataAvailablePerDay = 0;

// Average Data
var avgUsage = 0;
var avgPeakUsage = 0;
var avgOffPeakUsage = 0;

// Data exceed details
var dataExceeded = 0;
var peakDataExceeded = 0;
var offPeakDataExceeded = 0;

// Data exceed details warning
var dataExceededWarning = "";
var peakDataExceededWarning = "";
var offPeakDataExceededWarning = "";

// Percentages Values
var percentagePeakRem = 0;
var percentagePeakUsed = 0;
var percentageOffPeakRem = 0;
var percentageOffPeakUsed = 0;

// Only clean, secure codes are allowed
"use strict";

console.log('LK-SLT-Usage: Process has been started');

// Code by Tarun Dugar
// Source link: https://medium.com/better-programming/chrome-extension-intercepting-and-reading-the-body-of-http-requests-dd9ebdf2348b
// Chrome Extension: Reading the BODY of an HTTP response object: START
function funInterceptData() {
	// Check For DOM
    if (document.body && document.head) 
	{
        var xhrOverrideScript = document.createElement('script');
		xhrOverrideScript.type = 'text/javascript';
		xhrOverrideScript.innerHTML = `
		(function() {
		var XHR = XMLHttpRequest.prototype;
		var send = XHR.send;
		var open = XHR.open;
		XHR.open = function(method, url) {
			this.url = url; // the request url
			return open.apply(this, arguments);
		}
		XHR.send = function() {
			this.addEventListener('load', function() {
				if ((this.url.includes('https://omniscapp.slt.lk/mobitelint/slt/sltvasservices/dashboard/mypackage')) || (this.url.includes('https://omniscapp.slt.lk/mobitelint/slt/sltvasservices/dashboard/summary'))) {
					console.log('LK-SLT-Usage: Intercept completed');
					window.postMessage({
						type: "FROM_LK_SLT_USAGE_EXTENSION",
						text: "Hello from the webpage!"
					}, "*");
				}
			});
			return send.apply(this, arguments);
		};
		})();`;
		document.head.prepend(xhrOverrideScript);
    } 
	else 
	{
        requestIdleCallback(funInterceptData);
    }
}

requestIdleCallback(funInterceptData);
// Chrome Extension: Reading the BODY of an HTTP response object: END

// Communication with the embedding page
// Source: https://developer.chrome.com/extensions/content_scripts#host-page-communication
// Communication with the embedding page: START
var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
	{
		return;
	}

    if (event.data.type && (event.data.type == "FROM_LK_SLT_USAGE_EXTENSION")) {
        console.log("LK-SLT-Usage: Content script received: " + event.data.text);
        funMain();
    }
}, false);
// Communication with the embedding page: END

function funMain() {
	if(window.location.pathname == "/dashboard")
	{
		// This function has to execute before other functions
		funCalculation();

		funInsertRemaining2DoughnutChart();
		
		funInsertOffPeakDoughnutChart();
		funInsertExtraDoughnutChart();
		funInsertData2Page();	
		
		funChangeName();
		//funDebug(); // For debugging pursues
	}
}

function funCalculation() {
	// Get data from the page
	
	// Total: Volume // 90.0GB 
	totalMonthlylimit = funCircumference('/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div/div/div/div[2]/div/div/div[3]/h6/text()', 10);
	// Total: Used Volume // 16.7GB
	totalUsed = funCircumference('/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div/div/div/div[2]/div/div/div[3]/h6/text()', 0);
    // Total: Remaining Volume // 73.3GB
	totalRemaining = (totalMonthlylimit - totalUsed).toFixed(2);
	
	// Peak: Volume // 36.0GB
	peakMonthlylimit = funCircumference('/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div/div/div/div[1]/div/div/div[3]/h6/text()', 10);
    // Peak: Used Volume // 09.4GB
	peakUsed = funCircumference('/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div/div/div/div[1]/div/div/div[3]/h6/text()', 0);
    // Peak: Remaining Volume // 26.6GB
	peakRemaining = (peakMonthlylimit - peakUsed).toFixed(2);


    // Off-Peak details
    offPeakMonthlylimit = Number((totalMonthlylimit - peakMonthlylimit).toFixed(2)) || 0;
    // 90-36 = 54GB
    offPeakUsed = Number((totalUsed - peakUsed).toFixed(2)) || 0;
    // 16.7-09.4 = 07.3GB
    offPeakRemaining = Number((offPeakMonthlylimit - offPeakUsed).toFixed(2)) || 0;
    // 54-07.3 = 46.7GB

    // Date details
    daysInThisMonth = new Date(new Date().getFullYear(),new Date().getMonth() + 1,0).getDate();
    // 31
    dayOfTheMonth = new Date().getDate();
    // 11
    noOfComingDays = daysInThisMonth - dayOfTheMonth;
    // 31-11 = 20

    // Per day details // Given data
    peakDataPerDay = Number((peakMonthlylimit / daysInThisMonth).toFixed(2)) || 0;
    offPeakDataPerDay = Number((totalMonthlylimit / daysInThisMonth).toFixed(2)) || 0;

    // Per day availability details
    peakDataAvailablePerDay = Number((peakRemaining / (daysInThisMonth - dayOfTheMonth)).toFixed(2)) || 0;
    offPeakDataAvailablePerDay = Number((offPeakRemaining / noOfComingDays).toFixed(2)) || 0;

    // Calculate average
    avgUsage = Number((totalUsed / dayOfTheMonth).toFixed(2)) || 0;
    avgPeakUsage = Number((peakUsed / dayOfTheMonth).toFixed(2)) || 0;
    avgOffPeakUsage = Number((offPeakUsed / dayOfTheMonth).toFixed(2)) || 0;

    // Data exceed details + warning
    let dataExceededFun;
    dataExceededFun = funVolExceed(totalRemaining, avgUsage);
    dataExceeded = dataExceededFun.val;
    dataExceededWarning = dataExceededFun.warning;

    dataExceededFun = funVolExceed(peakRemaining, avgPeakUsage);
    peakDataExceeded = dataExceededFun.val;
    peakDataExceededWarning = dataExceededFun.warning;

    dataExceededFun = funVolExceed(offPeakRemaining, avgOffPeakUsage);
    offPeakDataExceeded = dataExceededFun.val;
    offPeakDataExceededWarning = dataExceededFun.warning;

    // Calculate Percentages
    percentagePeakRem = ((peakRemaining / peakMonthlylimit) * 100).toFixed(0);
    // Peak Remaining
    percentagePeakUsed = ((peakUsed / peakMonthlylimit) * 100).toFixed(0);
    // Peak Used
    percentageOffPeakRem = ((offPeakRemaining / offPeakMonthlylimit) * 100).toFixed(0);
    // Off-Peak Remaining
    percentageOffPeakUsed = ((offPeakUsed / offPeakMonthlylimit) * 100).toFixed(0);
    // Off-Peak Used
}

function funDebug() {
    // Logs
    console.log("");
    console.log("%cLK SLT Usage (Unofficial): Logs", "font-weight: bold; font-size: 1.2em;");

    // Total Volume
    console.log("");
    console.log("%cTotal Volume", "font-weight: bold;");
    console.log("totalMonthlylimit: " + totalMonthlylimit);
    console.log("totalRemaining: " + totalRemaining);
    console.log("totalUsed: " + totalUsed);

    // Peak Volume
    console.log("");
    console.log("%cPeak Volume", "font-weight: bold;");
    console.log("peakMonthlylimit: " + peakMonthlylimit);
    console.log("peakUsed: " + peakUsed);
    console.log("peakRemaining: " + peakRemaining);

    // Off-Peak Volume
    console.log("");
    console.log("%cOff-Peak Volume", "font-weight: bold;");
    console.log("offPeakMonthlylimit: " + offPeakMonthlylimit);
    console.log("offPeakUsed: " + offPeakUsed);
    console.log("offPeakRemaining: " + offPeakRemaining);

    // Dates
    console.log("");
    console.log("%cDates", "font-weight: bold;");
    console.log("daysInThisMonth: " + daysInThisMonth);
    console.log("dayOfTheMonth: " + dayOfTheMonth);
    console.log("noOfComingDays: " + noOfComingDays);

    // Given data 
    console.log("");
    console.log("%cGiven data", "font-weight: bold;");
    console.log("peakDataPerDay: " + peakDataPerDay);
    console.log("offPeakDataPerDay: " + offPeakDataPerDay);

    // Available data
    console.log("");
    console.log("%cAvailable data", "font-weight: bold;");
    console.log("peakDataAvailablePerDay: " + peakDataAvailablePerDay);
    console.log("offPeakDataAvailablePerDay: " + offPeakDataAvailablePerDay);

    // Average Data
    console.log("");
    console.log("%cAverage Data", "font-weight: bold;");
    console.log("avgUsage: " + avgUsage);
    console.log("avgPeakUsage: " + avgPeakUsage);
    console.log("avgOffPeakUsage: " + avgOffPeakUsage);

    // Data exceed details
    console.log("");
    console.log("%cData exceed details", "font-weight: bold;");
    console.log("dataExceeded: " + dataExceeded);
    console.log("peakDataExceeded: " + peakDataExceeded);
    console.log("offPeakDataExceeded: " + offPeakDataExceeded);

    // Data exceed details warning
    console.log("");
    console.log("%cData exceed details warning", "font-weight: bold;");
    console.log("dataExceededWarning: " + dataExceededWarning);
    console.log("peakDataExceededWarning: " + peakDataExceededWarning);
    console.log("offPeakDataExceededWarning: " + offPeakDataExceededWarning);

    // Percentages Values
    console.log("");
    console.log("%cPercentages Values", "font-weight: bold;");
    console.log("percentagePeakRem: " + percentagePeakRem);
    console.log("percentagePeakUsed: " + percentagePeakUsed);
    console.log("percentageOffPeakRem: " + percentageOffPeakRem);
    console.log("percentageOffPeakUsed: " + percentageOffPeakUsed);
}

function funCircumference(xPathValue, sStrValue) {
    let x = 0;
    try {
		// Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate 
		// Documentation: https://developer.mozilla.org/en-US/docs/Web/API/XPathResult
		
        //x = parseFloat((document.evaluate(xPathValue, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).data.toString().replace(/[^\d.]/g, '')) || 0;
		x = parseFloat(document.evaluate(xPathValue, document, null, XPathResult.STRING_TYPE, null).stringValue.substring(sStrValue).replace(/[^\d.]/g, '')).toFixed(2) || 0;
    } catch (err) {
        x = 0;
        console.log("Error: " + err);
    } //finally {}
    return x;
}

function funVolExceed(inputVal, inputAvg) {
    let inputWarning = "";
    try {
        inputVal = Number((inputVal / inputAvg).toFixed(0)) || 0;
        if (inputVal >= noOfComingDays) {
            inputVal = noOfComingDays;
        } else {
            inputWarning = "⚠";
        }
    } catch (err) {
        inputVal = 0;
        console.log("Error: " + err);
    } //finally {}
    return {
        val: inputVal,
        warning: inputWarning,
    };
}

function funChangeName() {

    // Standard Volume // Peak Volume
    let pathPV = '/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[1]/div/div/h6';
    let elePV = document.evaluate(pathPV, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    elePV.id = 'foreignDOMPV';

    //  Total (Standard+Free) Volume // Total Volume
    let pathTV = '/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[2]/div/div/h6';
    let eleTV = document.evaluate(pathTV, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    eleTV.id = 'foreignDOMTV';

    document.getElementById("foreignDOMPV").innerHTML = "Peak Volume";
    document.getElementById("foreignDOMTV").innerHTML = "Total Volume";
}

function funInsertRemaining2DoughnutChart() {
	funRemDoughnutChart_Standard();
	funRemDoughnutChart_Total();
}

function funRemDoughnutChart_Standard() {
	let path = '/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[1]/div/div/div[2]';
	var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	element.id = 'DoughnutChart_Standard';

	var docFragment = document.createDocumentFragment();

	let remaining = document.createElement("span");
	remaining.style.position = "relative";
	remaining.style.top = "-110px";
	remaining.style.display = "flex";
	remaining.style.justifyContent = "center";
	remaining.style.alignItems = "center";
	remaining.style.color = "rgb(37, 151, 216)";
	remaining.style.fontWeight = "700";
	remaining.style.fontSize = "14px";
	remaining.style.fontFamily = "Open Sans";
	remaining.append(peakRemaining + " GB");
	docFragment.appendChild(remaining);
	docFragment.append("\n");

	let referenceNode = document.querySelector('#DoughnutChart_Standard');
	referenceNode.after(docFragment);
}

function funRemDoughnutChart_Total() {
	let path = '/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[2]/div/div/div[2]';
	var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	element.id = 'DoughnutChart_Total';

	var docFragment = document.createDocumentFragment();

	let remaining = document.createElement("span");
	remaining.style.position = "relative";
	remaining.style.top = "-110px";
	remaining.style.display = "flex";
	remaining.style.justifyContent = "center";
	remaining.style.alignItems = "center";
	remaining.style.color = "rgb(37, 151, 216)";
	remaining.style.fontWeight = "700";
	remaining.style.fontSize = "14px";
	remaining.style.fontFamily = "Open Sans";
	remaining.append(totalRemaining + " GB");
	docFragment.appendChild(remaining);
	docFragment.append("\n");

	let referenceNode = document.querySelector('#DoughnutChart_Total');
	referenceNode.after(docFragment);
}

function funInsertOffPeakDoughnutChart() {
	let path = '/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div';
	var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	element.id = 'foreignDOMPogressContainer';

	var docFragment = document.createDocumentFragment();
	// contains all gathered nodes

	let maindiv = document.createElement("div");
	maindiv.className = "col-lg-6 col-md-12";
	docFragment.appendChild(maindiv);

	let subdiv = document.createElement("div");
	subdiv.className = "sc-TOsTZ juUyeK";
	maindiv.appendChild(subdiv);

	let ssubdiv = document.createElement("div");
	ssubdiv.style.textAlign = "center";
	ssubdiv.style.marginBottom = "0px";
	ssubdiv.style.marginTop = "30px";
	subdiv.appendChild(ssubdiv);

	let h6 = document.createElement("h6");
	h6.className = "sc-dnqmqq hZAKPK";
	ssubdiv.appendChild(h6);
	h6.append("Off-Peak Volume");
	ssubdiv.append("\n");

	let ssubdivA = document.createElement("div");
	ssubdivA.style.marginTop = "10px";
	ssubdiv.appendChild(ssubdivA);

	let ssubdivB = document.createElement("div");
	ssubdivB.style.position = "relative";
	ssubdiv.appendChild(ssubdivB);

	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "180"); //svg.setAttribute("width", "180");
	svg.setAttribute("height", "180"); //svg.setAttribute("height", "180");
	svg.setAttribute("viewBox", "-25 -25 400 400");
	ssubdivB.appendChild(svg);

	let circleA = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	circleA.setAttribute("stroke", "rgba(20,128,225,0.2)");
	circleA.setAttribute("cx", "175");
	circleA.setAttribute("cy", "175");
	circleA.setAttribute("r", "175");
	circleA.setAttribute("stroke-width", "40");
	circleA.setAttribute("fill", "none");
	svg.appendChild(circleA);

	let circleB = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	circleB.setAttribute("stroke", "#1480FF");
	circleB.setAttribute("transform", "rotate(-90 175 175)");
	circleB.setAttribute("cx", "175");
	circleB.setAttribute("cy", "175");
	circleB.setAttribute("r", "175");
	circleB.setAttribute("stroke-dasharray", "1100");
	circleB.setAttribute("stroke-width", "40");
	circleB.setAttribute("stroke-dashoffset", "1100");
	circleB.setAttribute("stroke-linecap", "butt");
	circleB.setAttribute("fill", "none");
	circleB.style.strokeDashoffset  = (1100/100 * (100 - percentageOffPeakRem)) + "px";
	circleB.style.transition  = "stroke-dashoffset 1s ease-out 0s";
	svg.appendChild(circleB);

	//let text = document.createElement("text");
	let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	text.style.font = "700 3.5rem Open Sans";
	text.setAttribute("fill", "#1480FF");
	text.setAttribute("x", "50%");
	text.setAttribute("y", "46%");
	text.setAttribute("dx", "-25");
	text.setAttribute("text-anchor", "middle");
	svg.appendChild(text);
	text.append(percentageOffPeakRem);

	//let tspan = document.createElement("tspan");
	let tspan = document.createElementNS("http://www.w3.org/2000/svg","tspan");
	tspan.setAttribute("dx", "10");
	text.appendChild(tspan);
	tspan.append("%");

	let ssubdivB_p = document.createElement("p");
	ssubdivB_p.style.position = "relative";
	ssubdivB_p.style.top = "-100px";
	ssubdivB_p.style.display = "flex";
	ssubdivB_p.style.justifyContent  = "center";
	ssubdivB_p.style.alignItems = "center";
	ssubdivB_p.style.color = "rgb(20, 128, 255)";
	ssubdivB_p.style.fontWeight = "700";
	ssubdivB_p.style.fontSize = "14px";
	ssubdivB_p.style.fontFamily = "Open Sans";
	ssubdivB.appendChild(ssubdivB_p);
	ssubdivB_p.append("Remaining");

	let ssubdiv_span = document.createElement("span");
	ssubdiv_span.style.position = "relative";
	ssubdiv_span.style.top = "-100px";
	ssubdiv_span.style.display = "flex";
	ssubdiv_span.style.justifyContent  = "center";
	ssubdiv_span.style.alignItems = "center";
	ssubdiv_span.style.color = "rgb(20, 128, 255)";
	ssubdiv_span.style.fontWeight = "700";
	ssubdiv_span.style.fontSize = "14px";
	ssubdiv_span.style.fontFamily = "Open Sans";
	ssubdiv.appendChild(ssubdiv_span);
	ssubdiv_span.append(offPeakRemaining + " GB");

	let ssubdivC = document.createElement("div");
	ssubdivC.style.marginTop  = "-40px";
	ssubdiv.appendChild(ssubdivC);

	let ssubdivC_h6 = document.createElement("h6");
	ssubdivC_h6.className = "sc-dnqmqq jZsdgY";
	ssubdivC.appendChild(ssubdivC_h6);
	ssubdivC_h6.append(offPeakUsed + "GB Used of " + offPeakMonthlylimit + "GB");

	// Final code
	let referenceNode = document.querySelector('#foreignDOMPogressContainer');
	referenceNode.appendChild(docFragment);
	//document.getElementById("foreignDOMPogressContainer_Before").appendChild(docFragment);
}

function funInsertExtraDoughnutChart() {
	var extraUsed = funCircumference('//*[@id="root"]/div/div/div[3]/div/div/div/div[3]/div[1]/div/div/div[5]/div/h2[2]/text()', 0);
	var extraMonthlylimit = funCircumference('//*[@id="root"]/div/div/div[3]/div/div/div/div[3]/div[1]/div/div/div[5]/div/h2[2]/text()', 10);

	extraUsed = isNaN(extraUsed) ? 0 : extraUsed;
	extraMonthlylimit = isNaN(extraMonthlylimit) ? 0 : extraMonthlylimit;

	var extraRemaining = (extraMonthlylimit - extraUsed) < 0 ? 0 : (extraMonthlylimit - extraUsed);
	var percentageExtraUsed = (((extraUsed / extraMonthlylimit) * 100).toFixed(0)) > 100 ? 100 : (((extraUsed / extraMonthlylimit) * 100).toFixed(0));

	var docFragment = document.createDocumentFragment();
	// contains all gathered nodes

	let maindiv = document.createElement("div");
	maindiv.className = "col-lg-6 col-md-12";
	docFragment.appendChild(maindiv);

	let subdiv = document.createElement("div");
	subdiv.className = "sc-TOsTZ juUyeK";
	maindiv.appendChild(subdiv);

	let ssubdiv = document.createElement("div");
	ssubdiv.style.textAlign = "center";
	ssubdiv.style.marginBottom = "0px";
	ssubdiv.style.marginTop = "30px";
	subdiv.appendChild(ssubdiv);

	let h6 = document.createElement("h6");
	h6.className = "sc-dnqmqq hZAKPK";
	ssubdiv.appendChild(h6);
	h6.append("Extra GB Volume");
	ssubdiv.append("\n");

	let ssubdivA = document.createElement("div");
	ssubdivA.style.marginTop = "10px";
	ssubdiv.appendChild(ssubdivA);

	let ssubdivB = document.createElement("div");
	ssubdivB.style.position = "relative";
	ssubdiv.appendChild(ssubdivB);

	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "180"); //svg.setAttribute("width", "180");
	svg.setAttribute("height", "180"); //svg.setAttribute("height", "180");
	svg.setAttribute("viewBox", "-25 -25 400 400");
	ssubdivB.appendChild(svg);

	let circleA = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	circleA.setAttribute("stroke", "rgba(20,128,225,0.2)");
	circleA.setAttribute("cx", "175");
	circleA.setAttribute("cy", "175");
	circleA.setAttribute("r", "175");
	circleA.setAttribute("stroke-width", "40");
	circleA.setAttribute("fill", "none");
	svg.appendChild(circleA);

	let circleB = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	circleB.setAttribute("stroke", "#1480FF");
	circleB.setAttribute("transform", "rotate(-90 175 175)");
	circleB.setAttribute("cx", "175");
	circleB.setAttribute("cy", "175");
	circleB.setAttribute("r", "175");
	circleB.setAttribute("stroke-dasharray", "1100");
	circleB.setAttribute("stroke-width", "40");
	circleB.setAttribute("stroke-dashoffset", "1100");
	circleB.setAttribute("stroke-linecap", "butt");
	circleB.setAttribute("fill", "none");
	circleB.style.strokeDashoffset  = (1100/100 * (percentageExtraUsed)) + "px";
	circleB.style.transition  = "stroke-dashoffset 1s ease-out 0s";
	svg.appendChild(circleB);

	//let text = document.createElement("text");
	let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	text.style.font = "700 3.5rem Open Sans";
	text.setAttribute("fill", "#1480FF");
	text.setAttribute("x", "50%");
	text.setAttribute("y", "46%");
	text.setAttribute("dx", "-25");
	text.setAttribute("text-anchor", "middle");
	svg.appendChild(text);
	text.append(percentageExtraUsed);

	//let tspan = document.createElement("tspan");
	let tspan = document.createElementNS("http://www.w3.org/2000/svg","tspan");
	tspan.setAttribute("dx", "10");
	text.appendChild(tspan);
	tspan.append("%");

	let ssubdivB_p = document.createElement("p");
	ssubdivB_p.style.position = "relative";
	ssubdivB_p.style.top = "-100px";
	ssubdivB_p.style.display = "flex";
	ssubdivB_p.style.justifyContent  = "center";
	ssubdivB_p.style.alignItems = "center";
	ssubdivB_p.style.color = "rgb(20, 128, 255)";
	ssubdivB_p.style.fontWeight = "700";
	ssubdivB_p.style.fontSize = "14px";
	ssubdivB_p.style.fontFamily = "Open Sans";
	ssubdivB.appendChild(ssubdivB_p);
	ssubdivB_p.append("Remaining");

	let ssubdiv_span = document.createElement("span");
	ssubdiv_span.style.position = "relative";
	ssubdiv_span.style.top = "-100px";
	ssubdiv_span.style.display = "flex";
	ssubdiv_span.style.justifyContent  = "center";
	ssubdiv_span.style.alignItems = "center";
	ssubdiv_span.style.color = "rgb(20, 128, 255)";
	ssubdiv_span.style.fontWeight = "700";
	ssubdiv_span.style.fontSize = "14px";
	ssubdiv_span.style.fontFamily = "Open Sans";
	ssubdiv.appendChild(ssubdiv_span);
	ssubdiv_span.append(extraRemaining + " GB");

	let ssubdivC = document.createElement("div");
	ssubdivC.style.marginTop  = "-40px";
	ssubdiv.appendChild(ssubdivC);

	let ssubdivC_h6 = document.createElement("h6");
	ssubdivC_h6.className = "sc-dnqmqq jZsdgY";
	ssubdivC.appendChild(ssubdivC_h6);
	ssubdivC_h6.append(extraUsed + "GB Used of " + extraMonthlylimit + "GB");

	// Final code
	let referenceNode = document.querySelector('#foreignDOMPogressContainer');
	referenceNode.appendChild(docFragment);
	//document.getElementById("foreignDOMPogressContainer_Before").appendChild(docFragment);
}

function funInsertData2Page() {

    let path = '/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div';
    var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    element.id = 'foreignDOMContainer';

    // INNER HTML
    var docFragment = document.createDocumentFragment();
    // contains all gathered nodes
	
	let maindiv = document.createElement("div");
    //maindiv.className = "col-md-12";
    docFragment.appendChild(maindiv);
    docFragment.append("\n");

    let submaindiv = document.createElement("div");
	//submaindiv.className = "sc-dxgOiQ iBKWVO";
    maindiv.appendChild(submaindiv);
    maindiv.append("\n");

    let h3 = document.createElement("h3");
    h3.style.padding = "0px 0px 10px 0px";
    submaindiv.appendChild(h3);
	h3.className = "sc-dnqmqq iOmaMf";
    h3.append("Monthly Data Usage Statistics");
    submaindiv.append("\n");

    let table = document.createElement("table");
    table.className = "table-hover";
    submaindiv.appendChild(table);
    table.append("\n");

    let tbody = document.createElement("tbody");
    table.appendChild(tbody);

    // TR Head 01
    let trhead1 = document.createElement("tr");
    trhead1.className = "info";
    tbody.appendChild(trhead1);
    // ------------------------------------------------------
    let trhead1_td1 = document.createElement("td");
    trhead1_td1.style.padding = "0px 10px 0px 0px";
	trhead1_td1.colSpan = 3;
    trhead1.appendChild(trhead1_td1);
    let trhead1_td1_strong = document.createElement("strong");
    trhead1_td1.appendChild(trhead1_td1_strong);
    trhead1_td1_strong.append("Total Volume");

    // ------------------------------------------------------
    //let trhead1_td2 = document.createElement("td");
	//trhead1_td2.style.padding = "0px 10px 0px 0px";
    //trhead1.appendChild(trhead1_td2);
    //trhead1_td2.append("   ");
    // ------------------------------------------------------
    //let trhead1_td3 = document.createElement("td");
    //trhead1_td3.style.padding = "0px 10px 0px 0px";
    //trhead1.appendChild(trhead1_td3);
    //trhead1_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 01
    let tr1 = document.createElement("tr");
    tbody.appendChild(tr1);
    // ------------------------------------------------------
    let tr1_td1 = document.createElement("td");
    tr1_td1.style.padding = "0px 10px 0px 0px";
    tr1.appendChild(tr1_td1);
    tr1_td1.append("Monthly Bandwidth Limit");
    // ------------------------------------------------------
    let tr1_td2 = document.createElement("td");
	tr1_td2.style.padding = "0px 10px 0px 0px";
    tr1.appendChild(tr1_td2);
    tr1_td2.append(totalMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr1_td3 = document.createElement("td");
    tr1_td3.style.padding = "0px 10px 0px 0px";
    tr1.appendChild(tr1_td3);
    tr1_td3.append("");

    let tr1_td3_span = document.createElement("span");
    tr1_td3_span.className = "text-muted";
    tr1_td3.appendChild(tr1_td3_span);
    tr1_td3_span.append("(Data cap)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 02
    let tr2 = document.createElement("tr");
    tbody.appendChild(tr2);
    // ------------------------------------------------------
    let tr2_td1 = document.createElement("td");
    tr2_td1.style.padding = "0px 10px 0px 0px";
    tr2.appendChild(tr2_td1);
    tr2_td1.append("Total Remaining");
    // ------------------------------------------------------
    let tr2_td2 = document.createElement("td");
	tr2_td2.style.padding = "0px 10px 0px 0px";
    tr2.appendChild(tr2_td2);
    tr2_td2.append(totalRemaining + " GB");
    // ------------------------------------------------------
    let tr2_td3 = document.createElement("td");
    tr2_td3.style.padding = "0px 10px 0px 0px";
    tr2.appendChild(tr2_td3);
    tr2_td3.append("");

    let tr2_td3_span = document.createElement("span");
    tr2_td3_span.className = "text-muted";
    tr2_td3.appendChild(tr2_td3_span);
    tr2_td3_span.append("(For the upcoming " + noOfComingDays + " days)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 03
    let tr3 = document.createElement("tr");
    tbody.appendChild(tr3);
    // ------------------------------------------------------
    let tr3_td1 = document.createElement("td");
    tr3_td1.style.padding = "0px 10px 0px 0px";
    tr3.appendChild(tr3_td1);
    tr3_td1.append("Total Used");
    // ------------------------------------------------------
    let tr3_td2 = document.createElement("td");
	tr3_td2.style.padding = "0px 10px 0px 0px";
    tr3.appendChild(tr3_td2);
    tr3_td2.append(totalUsed + " GB");
    // ------------------------------------------------------
    let tr3_td3 = document.createElement("td");
    tr3_td3.style.padding = "0px 10px 0px 0px";
    tr3.appendChild(tr3_td3);
    tr3_td3.append("");

    let tr3_td3_span = document.createElement("span");
    tr3_td3_span.className = "text-muted";
    tr3_td3.appendChild(tr3_td3_span);
    tr3_td3_span.append("(Used in " + dayOfTheMonth + " days)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 03 End 01
    let tr3e01 = document.createElement("tr");
    tbody.appendChild(tr3e01);
    // ------------------------------------------------------
    let tr3e01_td1 = document.createElement("td");
    tr3e01_td1.style.padding = "0px 10px 0px 0px";
    tr3e01.appendChild(tr3e01_td1);
    tr3e01_td1.append("Data will be exceeded in ");
    // ------------------------------------------------------
    let tr3e01_td2 = document.createElement("td");
	tr3e01_td2.style.padding = "0px 10px 0px 0px";
    tr3e01.appendChild(tr3e01_td2);
    tr3e01_td2.append(dataExceeded + " days");
    // ------------------------------------------------------
    let tr3e01_td3 = document.createElement("td");
    tr3e01_td3.style.padding = "0px 10px 0px 0px";
    tr3e01.appendChild(tr3e01_td3);
    tr3e01_td3.append("");

    let tr3e01_td3_span = document.createElement("span");
    tr3e01_td3_span.className = "text-danger";
    tr3e01_td3.appendChild(tr3e01_td3_span);
    tr3e01_td3_span.append(dataExceededWarning);
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 03 End 02
    let tr3e02 = document.createElement("tr");
    tbody.appendChild(tr3e02);
    // ------------------------------------------------------
    let tr3e02_td1 = document.createElement("td");
    tr3e02_td1.style.padding = "0px 10px 0px 0px";
    tr3e02.appendChild(tr3e02_td1);
    tr3e02_td1.append("Data cap will be reset in ");
    // ------------------------------------------------------
    let tr3e02_td2 = document.createElement("td");
	tr3e02_td2.style.padding = "0px 10px 0px 0px";
    tr3e02.appendChild(tr3e02_td2);
    tr3e02_td2.append(noOfComingDays + " days");
    // ------------------------------------------------------
    let tr3e02_td3 = document.createElement("td");
    tr3e02_td3.style.padding = "0px 10px 0px 0px";
    tr3e02.appendChild(tr3e02_td3);
    tr3e02_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR BR 01
    let trbr01 = document.createElement("tr");
    tbody.appendChild(trbr01);
    // ------------------------------------------------------
    let trbr01_td1 = document.createElement("td");
    trbr01_td1.style.padding = "0px 10px 0px 0px";
    trbr01.appendChild(trbr01_td1);
    trbr01_td1.append("   ");
    // ------------------------------------------------------
    let trbr01_td2 = document.createElement("td");
	trbr01_td2.style.padding = "0px 10px 0px 0px";
    trbr01.appendChild(trbr01_td2);
    trbr01_td2.append("   ");
    // ------------------------------------------------------
    let trbr01_td3 = document.createElement("td");
    trbr01_td3.style.padding = "0px 10px 0px 0px";
    trbr01.appendChild(trbr01_td3);
    trbr01_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR Head 02
    let trhead2 = document.createElement("tr");
    trhead2.className = "info";
    tbody.appendChild(trhead2);
    // ------------------------------------------------------
    let trhead2_td1 = document.createElement("td");
    trhead2_td1.style.padding = "0px 10px 0px 0px";
	trhead2_td1.colSpan = 3;
    trhead2.appendChild(trhead2_td1);
    let trhead2_td1_strong = document.createElement("strong");
    trhead2_td1.appendChild(trhead2_td1_strong);
    trhead2_td1_strong.append("Total Peak Volume");

    // ------------------------------------------------------
    //let trhead2_td2 = document.createElement("td");
	//trhead2_td2.style.padding = "0px 10px 0px 0px";
    //trhead2.appendChild(trhead2_td2);
    //trhead2_td2.append("   ");
    // ------------------------------------------------------
    //let trhead2_td3 = document.createElement("td");
    //trhead2_td3.style.padding = "0px 10px 0px 0px";
    //trhead2.appendChild(trhead2_td3);
    //trhead2_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 04
    let tr4 = document.createElement("tr");
    tbody.appendChild(tr4);
    // ------------------------------------------------------
    let tr4_td1 = document.createElement("td");
    tr4_td1.style.padding = "0px 10px 0px 0px";
    tr4.appendChild(tr4_td1);
    tr4_td1.append("Total Peak Data Monthly Limit");
    // ------------------------------------------------------
    let tr4_td2 = document.createElement("td");
	tr4_td2.style.padding = "0px 10px 0px 0px";
    tr4.appendChild(tr4_td2);
    tr4_td2.append(peakMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr4_td3 = document.createElement("td");
    tr4_td3.style.padding = "0px 10px 0px 0px";
    tr4.appendChild(tr4_td3);
    tr4_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 05
    let tr5 = document.createElement("tr");
    tbody.appendChild(tr5);
    // ------------------------------------------------------
    let tr5_td1 = document.createElement("td");
    tr5_td1.style.padding = "0px 10px 0px 0px";
    tr5.appendChild(tr5_td1);
    tr5_td1.append("Total Peak Data Remaining");
    // ------------------------------------------------------
    let tr5_td2 = document.createElement("td");
	tr5_td2.style.padding = "0px 10px 0px 0px";
    tr5.appendChild(tr5_td2);
    tr5_td2.append(peakRemaining + " GB");
    // ------------------------------------------------------
    let tr5_td3 = document.createElement("td");
    tr5_td3.style.padding = "0px 10px 0px 0px";
    tr5.appendChild(tr5_td3);
    //tr5_td3.append("");

    let tr5_td3_span = document.createElement("span");
    tr5_td3_span.className = "text-muted";
    tr5_td3.appendChild(tr5_td3_span);
    tr5_td3_span.append("(" + percentagePeakRem + "%)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 06
    let tr6 = document.createElement("tr");
    tbody.appendChild(tr6);
    // ------------------------------------------------------
    let tr6_td1 = document.createElement("td");
    tr6_td1.style.padding = "0px 10px 0px 0px";
    tr6.appendChild(tr6_td1);
    tr6_td1.append("Total Peak Data Used");
    // ------------------------------------------------------
    let tr6_td2 = document.createElement("td");
	tr6_td2.style.padding = "0px 10px 0px 0px";
    tr6.appendChild(tr6_td2);
    tr6_td2.append(peakUsed + " GB");
    // ------------------------------------------------------
    let tr6_td3 = document.createElement("td");
    tr6_td3.style.padding = "0px 10px 0px 0px";
    tr6.appendChild(tr6_td3);
    //tr6_td3.append("");

    let tr6_td3_span = document.createElement("span");
    tr6_td3_span.className = "text-muted";
    tr6_td3.appendChild(tr6_td3_span);
    tr6_td3_span.append("(" + percentagePeakUsed + "%)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 06 01
    let tr601 = document.createElement("tr");
    tbody.appendChild(tr601);
    // ------------------------------------------------------
    let tr601_td1 = document.createElement("td");
    tr601_td1.style.padding = "0px 10px 0px 0px";
    tr601.appendChild(tr601_td1);
    tr601_td1.append("Peak data will be exceeded in ");
    // ------------------------------------------------------
    let tr601_td2 = document.createElement("td");
	tr601_td2.style.padding = "0px 10px 0px 0px";
    tr601.appendChild(tr601_td2);
    tr601_td2.append(peakDataExceeded + " days");
    // ------------------------------------------------------
    let tr601_td3 = document.createElement("td");
    tr601_td3.style.padding = "0px 10px 0px 0px";
    tr601.appendChild(tr601_td3);
    tr601_td3.append("");

    let tr601_td3_span = document.createElement("span");
    tr601_td3_span.className = "text-danger";
    tr601_td3.appendChild(tr601_td3_span);
    tr601_td3_span.append(peakDataExceededWarning);
    // ------------------------------------------------------
    tbody.append("\n");

    // TR BR 02
    let trbr02 = document.createElement("tr");
    tbody.appendChild(trbr02);
    // ------------------------------------------------------
    let trbr02_td1 = document.createElement("td");
    trbr02_td1.style.padding = "0px 10px 0px 0px";
    trbr02.appendChild(trbr02_td1);
    trbr02_td1.append("   ");
    // ------------------------------------------------------
    let trbr02_td2 = document.createElement("td");
	trbr02_td2.style.padding = "0px 10px 0px 0px";
    trbr02.appendChild(trbr02_td2);
    trbr02_td2.append("   ");
    // ------------------------------------------------------
    let trbr02_td3 = document.createElement("td");
    trbr02_td3.style.padding = "0px 10px 0px 0px";
    trbr02.appendChild(trbr02_td3);
    trbr02_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR Head 01
    let trhead3 = document.createElement("tr");
    trhead3.className = "info";
    tbody.appendChild(trhead3);
    // ------------------------------------------------------
    let trhead3_td1 = document.createElement("td");
    trhead3_td1.style.padding = "0px 10px 0px 0px";
	trhead3_td1.colSpan = 3;
    trhead3.appendChild(trhead3_td1);
    let trhead3_td1_strong = document.createElement("strong");
    trhead3_td1.appendChild(trhead3_td1_strong);
    trhead3_td1_strong.append("Total Off-Peak Volume");

    // ------------------------------------------------------
    //let trhead3_td2 = document.createElement("td");
	//trhead3_td2.style.padding = "0px 10px 0px 0px";
    //trhead3.appendChild(trhead3_td2);
    //trhead3_td2.append("   ");
    // ------------------------------------------------------
    //let trhead3_td3 = document.createElement("td");
    //trhead3_td3.style.padding = "0px 10px 0px 0px";
    //trhead3.appendChild(trhead3_td3);
    //trhead3_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 07
    let tr7 = document.createElement("tr");
    tbody.appendChild(tr7);
    // ------------------------------------------------------
    let tr7_td1 = document.createElement("td");
    tr7_td1.style.padding = "0px 10px 0px 0px";
    tr7.appendChild(tr7_td1);
    tr7_td1.append("Total Off-Peak Monthly Limit");
    // ------------------------------------------------------
    let tr7_td2 = document.createElement("td");
	tr7_td2.style.padding = "0px 10px 0px 0px";
    tr7.appendChild(tr7_td2);
    tr7_td2.append(offPeakMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr7_td3 = document.createElement("td");
    tr7_td3.style.padding = "0px 10px 0px 0px";
    tr7.appendChild(tr7_td3);
    tr7_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 08
    let tr8 = document.createElement("tr");
    tbody.appendChild(tr8);
    // ------------------------------------------------------
    let tr8_td1 = document.createElement("td");
    tr8_td1.style.padding = "0px 10px 0px 0px";
    tr8.appendChild(tr8_td1);
    tr8_td1.append("Total Off-Peak Remaining");
    // ------------------------------------------------------
    let tr8_td2 = document.createElement("td");
	tr8_td2.style.padding = "0px 10px 0px 0px";
    tr8.appendChild(tr8_td2);
    tr8_td2.append(offPeakRemaining + " GB");
    // ------------------------------------------------------
    let tr8_td3 = document.createElement("td");
    tr8_td3.style.padding = "0px 10px 0px 0px";
    tr8.appendChild(tr8_td3);
    //tr8_td3.append("");

    let tr8_td3_span = document.createElement("span");
    tr8_td3_span.className = "text-muted";
    tr8_td3.appendChild(tr8_td3_span);
    tr8_td3_span.append("(" + percentageOffPeakRem + "%)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 09
    let tr9 = document.createElement("tr");
    tbody.appendChild(tr9);
    // ------------------------------------------------------
    let tr9_td1 = document.createElement("td");
    tr9_td1.style.padding = "0px 10px 0px 0px";
    tr9.appendChild(tr9_td1);
    tr9_td1.append("Total Off-Peak Used");
    // ------------------------------------------------------
    let tr9_td2 = document.createElement("td");
	tr9_td2.style.padding = "0px 10px 0px 0px";
    tr9.appendChild(tr9_td2);
    tr9_td2.append(offPeakUsed + " GB");
    // ------------------------------------------------------
    let tr9_td3 = document.createElement("td");
    tr9_td3.style.padding = "0px 10px 0px 0px";
    tr9.appendChild(tr9_td3);
    //tr9_td3.append("");

    let tr9_td3_span = document.createElement("span");
    tr9_td3_span.className = "text-muted";
    tr9_td3.appendChild(tr9_td3_span);
    tr9_td3_span.append("(" + percentageOffPeakUsed + "%)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 09 01
    let tr901 = document.createElement("tr");
    tbody.appendChild(tr901);
    // ------------------------------------------------------
    let tr901_td1 = document.createElement("td");
    tr901_td1.style.padding = "0px 10px 0px 0px";
    tr901.appendChild(tr901_td1);
    tr901_td1.append("Off Peak data will be exceeded in ");
    // ------------------------------------------------------
    let tr901_td2 = document.createElement("td");
	tr901_td2.style.padding = "0px 10px 0px 0px";
    tr901.appendChild(tr901_td2);
    tr901_td2.append(offPeakDataExceeded + " days");
    // ------------------------------------------------------
    let tr901_td3 = document.createElement("td");
    tr901_td3.style.padding = "0px 10px 0px 0px";
    tr901.appendChild(tr901_td3);
    tr901_td3.append("");

    let tr901_td3_span = document.createElement("span");
    tr901_td3_span.className = "text-danger";
    tr901_td3.appendChild(tr901_td3_span);
    tr901_td3_span.append(offPeakDataExceededWarning);
    // ------------------------------------------------------
    tbody.append("\n");

    // TR BR 03
    let trbr03 = document.createElement("tr");
    tbody.appendChild(trbr03);
    // ------------------------------------------------------
    let trbr03_td1 = document.createElement("td");
    trbr03_td1.style.padding = "0px 10px 0px 0px";
    trbr03.appendChild(trbr03_td1);
    trbr03_td1.append("   ");
    // ------------------------------------------------------
    let trbr03_td2 = document.createElement("td");
	trbr03_td2.style.padding = "0px 10px 0px 0px";
    trbr03.appendChild(trbr03_td2);
    trbr03_td2.append("   ");
    // ------------------------------------------------------
    let trbr03_td3 = document.createElement("td");
    trbr03_td3.style.padding = "0px 10px 0px 0px";
    trbr03.appendChild(trbr03_td3);
    trbr03_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR Head 04
    let trhead4 = document.createElement("tr");
    trhead4.className = "info";
    tbody.appendChild(trhead4);
    // ------------------------------------------------------
    let trhead4_td1 = document.createElement("td");
    trhead4_td1.style.padding = "0px 10px 0px 0px";
	trhead4_td1.colSpan = 3;
    trhead4.appendChild(trhead4_td1);
    let trhead4_td1_strong = document.createElement("strong");
    trhead4_td1.appendChild(trhead4_td1_strong);
    trhead4_td1_strong.append("Total Peak Volume: Per day");

    // ------------------------------------------------------
    //let trhead4_td2 = document.createElement("td");
	//trhead4_td2.style.padding = "0px 10px 0px 0px";
    //trhead4.appendChild(trhead4_td2);
    //trhead4_td2.append("   ");
    // ------------------------------------------------------
    //let trhead4_td3 = document.createElement("td");
    //trhead4_td3.style.padding = "0px 10px 0px 0px";
    //trhead4.appendChild(trhead4_td3);
    //trhead4_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 10
    let tr10 = document.createElement("tr");
    tbody.appendChild(tr10);
    // ------------------------------------------------------
    let tr10_td1 = document.createElement("td");
    tr10_td1.style.padding = "0px 10px 0px 0px";
    tr10.appendChild(tr10_td1);
    tr10_td1.append("Allocated Peak Data Per Day");
    // ------------------------------------------------------
    let tr10_td2 = document.createElement("td");
	tr10_td2.style.padding = "0px 10px 0px 0px";
    tr10.appendChild(tr10_td2);
    tr10_td2.append(peakDataPerDay + " GB");
    // ------------------------------------------------------
    let tr10_td3 = document.createElement("td");
    tr10_td3.style.padding = "0px 10px 0px 0px";
    tr10.appendChild(tr10_td3);

    //let tr10_td3_span = document.createElement("span");
    //tr10_td3_span.className = "text-muted";
    //tr10_td3.appendChild(tr10_td3_span);
    //tr10_td3_span.append("(Total Peak Data/" + daysInThisMonth + ")");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 11
    let tr11 = document.createElement("tr");
    tbody.appendChild(tr11);
    // ------------------------------------------------------
    let tr11_td1 = document.createElement("td");
    tr11_td1.style.padding = "0px 10px 0px 0px";
    tr11.appendChild(tr11_td1);
    tr11_td1.append("Available Peak Data Per Day");
    // ------------------------------------------------------
    let tr11_td2 = document.createElement("td");
	tr11_td2.style.padding = "0px 10px 0px 0px";
    tr11.appendChild(tr11_td2);
    tr11_td2.append(peakDataAvailablePerDay + " GB");
    // ------------------------------------------------------
    let tr11_td3 = document.createElement("td");
    tr11_td3.style.padding = "0px 10px 0px 0px";
    tr11.appendChild(tr11_td3);

    //let tr11_td3_span = document.createElement("span");
    //tr11_td3_span.className = "text-muted";
    //tr11_td3.appendChild(tr11_td3_span);
    //tr11_td3_span.append("(Available Peak Data/" + (daysInThisMonth - dayOfTheMonth) + ")");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 12
    let tr12 = document.createElement("tr");
    tbody.appendChild(tr12);
    // ------------------------------------------------------
    let tr12_td1 = document.createElement("td");
    tr12_td1.style.padding = "0px 10px 0px 0px";
    tr12.appendChild(tr12_td1);
    tr12_td1.append("Average Peak Data Usage");
    // ------------------------------------------------------
    let tr12_td2 = document.createElement("td");
	tr12_td2.style.padding = "0px 10px 0px 0px";
    tr12.appendChild(tr12_td2);
    tr12_td2.append(avgPeakUsage + " GB");
    // ------------------------------------------------------
    let tr12_td3 = document.createElement("td");
    tr12_td3.style.padding = "0px 10px 0px 0px";
    tr12.appendChild(tr12_td3);

    //let tr12_td3_span = document.createElement("span");
    //tr12_td3_span.className = "text-muted";
    //tr12_td3.appendChild(tr12_td3_span);
    //tr12_td3_span.append("(Total Peak Used Data/" + dayOfTheMonth + ")");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR BR 04
    let trbr04 = document.createElement("tr");
    tbody.appendChild(trbr04);
    // ------------------------------------------------------
    let trbr04_td1 = document.createElement("td");
    trbr04_td1.style.padding = "0px 10px 0px 0px";
    trbr04.appendChild(trbr04_td1);
    trbr04_td1.append("   ");
    // ------------------------------------------------------
    let trbr04_td2 = document.createElement("td");
	trbr04_td2.style.padding = "0px 10px 0px 0px";
    trbr04.appendChild(trbr04_td2);
    trbr04_td2.append("   ");
    // ------------------------------------------------------
    let trbr04_td3 = document.createElement("td");
    trbr04_td3.style.padding = "0px 10px 0px 0px";
    trbr04.appendChild(trbr04_td3);
    trbr04_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR Head 03
    let trhead5 = document.createElement("tr");
    trhead5.className = "info";
    tbody.appendChild(trhead5);
    // ------------------------------------------------------
    let trhead5_td1 = document.createElement("td");
    trhead5_td1.style.padding = "0px 10px 0px 0px";
	trhead5_td1.colSpan = 3;
    trhead5.appendChild(trhead5_td1);	
    let trhead5_td1_strong = document.createElement("strong");
    trhead5_td1.appendChild(trhead5_td1_strong);
    trhead5_td1_strong.append("Total Off-Peak Volume: Per day");

    // ------------------------------------------------------
    //let trhead5_td2 = document.createElement("td");
	//trhead5_td2.style.padding = "0px 10px 0px 0px";
    //trhead5.appendChild(trhead5_td2);
    //trhead5_td2.append("   ");
    // ------------------------------------------------------
    //let trhead5_td3 = document.createElement("td");
    //trhead5_td3.style.padding = "0px 10px 0px 0px";
    //trhead5.appendChild(trhead5_td3);
    //trhead5_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 13
    let tr13 = document.createElement("tr");
    tbody.appendChild(tr13);
    // ------------------------------------------------------
    let tr13_td1 = document.createElement("td");
    tr13_td1.style.padding = "0px 10px 0px 0px";
    tr13.appendChild(tr13_td1);
    tr13_td1.append("Allocated Off Peak Data Per Day");
    // ------------------------------------------------------
    let tr13_td2 = document.createElement("td");
	tr13_td2.style.padding = "0px 10px 0px 0px";
    tr13.appendChild(tr13_td2);
    tr13_td2.append(offPeakDataPerDay + " GB");
    // ------------------------------------------------------
    let tr13_td3 = document.createElement("td");
    tr13_td3.style.padding = "0px 10px 0px 0px";
    tr13.appendChild(tr13_td3);

    //let tr13_td3_span = document.createElement("span");
    //tr13_td3_span.className = "text-muted";
    //tr13_td3.appendChild(tr13_td3_span);
    //tr13_td3_span.append("(Total Off-Peak Used Data/" + daysInThisMonth + ")");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 14
    let tr14 = document.createElement("tr");
    tbody.appendChild(tr14);
    // ------------------------------------------------------
    let tr14_td1 = document.createElement("td");
    tr14_td1.style.padding = "0px 10px 0px 0px";
    tr14.appendChild(tr14_td1);
    tr14_td1.append("Available Off Peak Data Per Day");
    // ------------------------------------------------------
    let tr14_td2 = document.createElement("td");
	tr14_td2.style.padding = "0px 10px 0px 0px";
    tr14.appendChild(tr14_td2);
    tr14_td2.append(offPeakDataAvailablePerDay + " GB");
    // ------------------------------------------------------
    let tr14_td3 = document.createElement("td");
    tr14_td3.style.padding = "0px 10px 0px 0px";
    tr14.appendChild(tr14_td3);

    //let tr14_td3_span = document.createElement("span");
    //tr14_td3_span.className = "text-muted";
    //tr14_td3.appendChild(tr14_td3_span);
    //tr14_td3_span.append("(Available Off Peak Data/" + (daysInThisMonth - dayOfTheMonth) + ")");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 15
    let tr15 = document.createElement("tr");
    tbody.appendChild(tr15);
    // ------------------------------------------------------
    let tr15_td1 = document.createElement("td");
    tr15_td1.style.padding = "0px 10px 0px 0px";
    tr15.appendChild(tr15_td1);
    tr15_td1.append("Average Off Peak Data Usage");
    // ------------------------------------------------------
    let tr15_td2 = document.createElement("td");
	tr15_td2.style.padding = "0px 10px 0px 0px";
    tr15.appendChild(tr15_td2);
    tr15_td2.append(avgOffPeakUsage + " GB");
    // ------------------------------------------------------
    let tr15_td3 = document.createElement("td");
    tr15_td3.style.padding = "0px 10px 0px 0px";
    tr15.appendChild(tr15_td3);

    //let tr15_td3_span = document.createElement("span");
    //tr15_td3_span.className = "text-muted";
    //tr15_td3.appendChild(tr15_td3_span);
    //tr15_td3_span.append("(Total Off-Peak Used Data/" + dayOfTheMonth + ")");
    // ------------------------------------------------------
    table.append("\n");

    //let hr2 = document.createElement("hr");
    //submaindiv.appendChild(hr2);
    //submaindiv.append("\n");

    // Insert into original webpage
    document.getElementById("foreignDOMContainer").appendChild(docFragment);
}