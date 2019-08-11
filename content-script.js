var totalMonthlylimit = parseFloat((document.evaluate('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[1]/div/div[2]/div[1]/h5/strong/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).data.toString().replace(/[^\d.]/g, '')); // 90.0GB 
var totalRemaining = parseFloat((document.evaluate('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[1]/div/div[2]/div[2]/h5/strong/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).data.toString().replace(/[^\d.]/g, '')); // 73.3GB
var totalUsed = parseFloat((document.evaluate('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[1]/div/div[2]/div[3]/h5/strong/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).data.toString().replace(/[^\d.]/g, '')); // 16.7GB

var peakMonthlylimit = parseFloat((document.evaluate('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div[2]/div[1]/h5/strong/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).data.toString().replace(/[^\d.]/g, '')); // 36.0GB
var peakRemaining = parseFloat((document.evaluate('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div[2]/div[2]/h5/strong/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).data.toString().replace(/[^\d.]/g, '')); // 26.6GB
var peakUsed = parseFloat((document.evaluate('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div[2]/div[3]/h5/strong/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).data.toString().replace(/[^\d.]/g, '')); // 09.4GB

var offPeakMonthlylimit = Number((totalMonthlylimit - peakMonthlylimit).toFixed(2)); // 90-36 = 54GB
var offPeakUsed = Number((totalUsed - peakUsed).toFixed(2)); // 16.7-09.4 = 07.3GB
var offPeakRemaining = Number((offPeakMonthlylimit - offPeakUsed).toFixed(2)); // 54-07.3 = 46.7GB


var daysInThisMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(); // 31
var dayOfTheMonth = new Date().getDate(); // 11
var noOfComingDays = daysInThisMonth - dayOfTheMonth; // 31-11 = 20


var peakDataPerDay = Number((peakMonthlylimit / daysInThisMonth).toFixed(2));
var peakDataAvailablePerDay = Number((peakRemaining / (daysInThisMonth - dayOfTheMonth)).toFixed(2));

var offPeakDataPerDay = Number((totalMonthlylimit / daysInThisMonth).toFixed(2));
var offPeakDataAvailablePerDay = Number((offPeakRemaining / noOfComingDays).toFixed(2));

var avgPeakUsage = Number((peakUsed / dayOfTheMonth).toFixed(2));
var avgOffPeakUsage = Number((offPeakUsed / dayOfTheMonth).toFixed(2));

//console.log(totalMonthlylimit);
//console.log(totalRemaining);
//console.log(totalUsed);

//console.log(peakMonthlylimit);
//console.log(peakRemaining);
//console.log(peakUsed);

//console.log(offPeakMonthlylimit);
//console.log(offPeakRemaining);
//console.log(offPeakUsed);

//console.log(peakDataPerDay);
//console.log(peakDataAvailablePerDay);
//console.log(avgPeakUsage);

//console.log(offPeakDataPerDay);
//console.log(offPeakDataAvailablePerDay);
//console.log(avgOffPeakUsage);

var strHTML = "";
strHTML += "<hr>";
strHTML += "<h4 style='padding: 10px 10px 5px 10px;'>Monthly Data Usage Statistics</h4>";

strHTML += "<table>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Total Monthly Limit</td> <td>" + totalMonthlylimit + " GB</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Total Remaining</td> <td>" + totalRemaining + " GB</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Total Used</td> <td>" + totalUsed + " GB</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td> <td>&nbsp;</td> <td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
//strHTML += "</table>";
//strHTML += "<br>";

//strHTML += "<table>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Total Peak Data Monthly Limit</td> <td>" + peakMonthlylimit + " GB</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Total Peak Data Remaining</td> <td>" + peakRemaining + " GB</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Total Peak Data Used</td> <td>" + peakUsed + " GB</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td> <td>&nbsp;</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
//strHTML += "</table>";
//strHTML += "<br>";

//strHTML += "<table>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Total Off Peak Monthly Limit</td> <td>" + offPeakMonthlylimit + " GB</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Total Off Peak Remaining</td> <td>" + offPeakRemaining + " GB</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Total Off Peak Used</td> <td>" + offPeakUsed + " GB</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td> <td>&nbsp;</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
//strHTML += "</table>";
//strHTML += "<br>";

//strHTML += "<table>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Allocated Peak Data Per Day</td> <td>" + peakDataPerDay + " GB</td><td style='padding: 0px 10px 0px 10px;'><span class='text-muted'>&nbsp;&nbsp;&nbsp;(Total Peak Data/"+daysInThisMonth+")</span></td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Available Peak Data Per Day</td> <td>" + peakDataAvailablePerDay + " GB</td><td style='padding: 0px 10px 0px 10px;'><span class='text-muted'>&nbsp;&nbsp;&nbsp;(Available Peak Data/"+(daysInThisMonth - dayOfTheMonth)+")</span></td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Average Peak Data Usage</td> <td>" + avgPeakUsage + " GB</td><td style='padding: 0px 10px 0px 10px;'><span class='text-muted'>&nbsp;&nbsp;&nbsp;(Total Peak Used Data/"+dayOfTheMonth+")</span></td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td> <td>&nbsp;</td><td style='padding: 0px 10px 0px 10px;'>&nbsp;</td></tr>";
//strHTML += "</table>";
//strHTML += "<br>";

//strHTML += "<table>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Allocated Off Peak Data Per Day</td> <td>" + offPeakDataPerDay + " GB</td><td style='padding: 0px 10px 0px 10px;'><span class='text-muted'>&nbsp;&nbsp;&nbsp;(Total Off Peak Used Data/"+daysInThisMonth+")</span></td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Available Off Peak Data Per Day</td> <td>" + offPeakDataAvailablePerDay + " GB</td><td style='padding: 0px 10px 0px 10px;'><span class='text-muted'>&nbsp;&nbsp;&nbsp;(Available Off Peak Data/"+(daysInThisMonth - dayOfTheMonth)+")</span></td></tr>";
strHTML += "<tr><td style='padding: 0px 10px 0px 10px;'>Average Off Peak Data Usage</td> <td>" + avgOffPeakUsage + " GB</td><td style='padding: 0px 10px 0px 10px;'><span class='text-muted'>&nbsp;&nbsp;&nbsp;(Total Off Peak Used Data/"+dayOfTheMonth+")</span></td></tr>";
strHTML += "</table>";
strHTML += "<hr>";

injectID(strHTML);
customStyle01();
customStyle02();
customStyle03();
customStyle04();
customStyle05();

function injectID(strHTML) {

	var path = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div/div[1]/div[4]';
	var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	element.id = 'injectIDName';

	var para = document.createElement("div");
	para.className = "col-md-12";
	para.innerHTML = strHTML;
	document.getElementById("injectIDName").appendChild(para);
}


function customStyle01() {
	
	var path = '/html/body/div[3]/div/div[2]/div/div';
	var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	element.id = 'div-style-01';
	
	var element = document.getElementById("div-style-01");
	element.removeAttribute("style")
    //element.classList.remove("mystyle");
} 

function customStyle02() {
	
	var path = '/html/body/div[3]/div/div[2]';
	var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	element.id = 'div-style-02';
	
	var element = document.getElementById("div-style-02");
	//element.removeAttribute("style")
    element.classList.remove("col-md-8");
	element.classList.add("container");
} 

function customStyle03() {
	
	var path = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div';
	var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	element.id = 'div-style-03';
	
	var element = document.getElementById("div-style-03");
	element.style.padding = "40px"; 
} 

function customStyle04() {
	
	var path = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div/div[1]/div[5]/div/div/div/h4';
	var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	element.id = 'div-style-04';
	
	var element = document.getElementById("div-style-04");
	element.style.padding = "1px 10px 5px 10px"; 
}

function customStyle05() {
	
	var path = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div/div[1]/div[6]';
	var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	element.id = 'div-style-05';
	
	var element = document.getElementById("div-style-05");
	element.style.padding = "3px"; 
}


// create a new div element 
//var newDiv = document.createElement("div"); 
// and give it some content 
//var newContent = document.createTextNode("Hi there and greetings!"); 
// add the text node to the newly created div
//newDiv.appendChild(newContent);  

// add the newly created element and its content into the DOM 
//var currentDiv = document.getElementById("myUsagePanel"); 
//document.body.insertBefore(newDiv, currentDiv); 

//document.body.textContent = "";
//var header = document.createElement('h1');
//header.textContent = "This page has been eaten" + peakDataPerDay;
//document.body.appendChild(header);