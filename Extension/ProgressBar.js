
var totalMonthlylimit = 0;
var totalRemaining = 0;
var totalUsed = 0;
var peakMonthlylimit = 0;
var peakRemaining = 0;

var offPeakMonthlylimit = 0; 
var offPeakUsed = 0; 
var offPeakRemaining = 0; 

var daysInThisMonth = 0; 
var dayOfTheMonth = 0; 
var noOfComingDays = 0; 

var peakDataPerDay = 0;
var peakDataAvailablePerDay = 0;

var offPeakDataPerDay = 0;
var offPeakDataAvailablePerDay = 0;

var avgUsage = 0;
var avgPeakUsage = 0;
var avgOffPeakUsage = 0;

var dataExceeded = 0;
var peakDataExceeded = 0;
var offPeakDataExceeded = 0;

var dataExceededWarning = "";
var peakDataExceededWarning = "";
var offPeakDataExceededWarning = "";

var percentagePeakRem = 0;
var percentageOffPeakRem = 0;

totalMonthlylimit = funCircumference('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[1]/div/div[2]/div[1]/h5/strong/text()'); // 90.0GB 
totalRemaining = funCircumference('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[1]/div/div[2]/div[2]/h5/strong/text()'); // 73.3GB
totalUsed = funCircumference('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[1]/div/div[2]/div[3]/h5/strong/text()'); // 16.7GB
peakMonthlylimit = funCircumference('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div[2]/div[1]/h5/strong/text()'); // 36.0GB
peakRemaining = funCircumference('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div[2]/div[2]/h5/strong/text()'); // 26.6GB
peakUsed = funCircumference('//*[@id="myUsagePanel"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div[2]/div[3]/h5/strong/text()'); // 09.4GB

offPeakMonthlylimit = Number((totalMonthlylimit - peakMonthlylimit).toFixed(2)) || 0; // 90-36 = 54GB
offPeakUsed = Number((totalUsed - peakUsed).toFixed(2)) || 0; // 16.7-09.4 = 07.3GB
offPeakRemaining = Number((offPeakMonthlylimit - offPeakUsed).toFixed(2)) || 0; // 54-07.3 = 46.7GB

daysInThisMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(); // 31
dayOfTheMonth = new Date().getDate(); // 11
noOfComingDays = daysInThisMonth - dayOfTheMonth; // 31-11 = 20

peakDataPerDay = Number((peakMonthlylimit / daysInThisMonth).toFixed(2)) || 0;
peakDataAvailablePerDay = Number((peakRemaining / (daysInThisMonth - dayOfTheMonth)).toFixed(2)) || 0;

offPeakDataPerDay = Number((totalMonthlylimit / daysInThisMonth).toFixed(2)) || 0;
offPeakDataAvailablePerDay = Number((offPeakRemaining / noOfComingDays).toFixed(2)) || 0;

avgUsage = Number((totalUsed / dayOfTheMonth).toFixed(2)) || 0;
avgPeakUsage = Number((peakUsed / dayOfTheMonth).toFixed(2)) || 0;
avgOffPeakUsage = Number((offPeakUsed / dayOfTheMonth).toFixed(2)) || 0;

dataExceededFun = funVolExceed(totalRemaining, avgUsage);
dataExceeded = dataExceededFun.val;
dataExceededWarning = dataExceededFun.warning;

dataExceededFun = funVolExceed(peakRemaining, avgPeakUsage);
peakDataExceeded = dataExceededFun.val;
peakDataExceededWarning = dataExceededFun.warning;

dataExceededFun = funVolExceed(offPeakRemaining, avgOffPeakUsage);
offPeakDataExceeded = dataExceededFun.val;
offPeakDataExceededWarning = dataExceededFun.warning;

percentagePeakRem = ((peakRemaining/peakMonthlylimit) * 100).toFixed(0);
percentageOffPeakRem = ((offPeakRemaining/offPeakMonthlylimit) * 100).toFixed(0);

funDebug(); // For debugging pursues

funChangeName();
funInsertProgressBar();

funCustomStyle01();
funCustomStyle02();
funCustomStyle03();
funCustomStyle04();
funCustomStyle05();


function funDebug() {	
	console.log("totalMonthlylimit: " + totalMonthlylimit);
	console.log("totalRemaining: " + totalRemaining);
	console.log("totalUsed: " + totalUsed);
	console.log("peakMonthlylimit: " + peakMonthlylimit);
	console.log("peakRemaining: " + peakRemaining);

	console.log("offPeakMonthlylimit: " + offPeakMonthlylimit); 
	console.log("offPeakUsed: " + offPeakUsed); 
	console.log("offPeakRemaining: " + offPeakRemaining); 

	console.log("daysInThisMonth: " + daysInThisMonth); 
	console.log("dayOfTheMonth: " + dayOfTheMonth); 
	console.log("noOfComingDays: " + noOfComingDays); 

	console.log("peakDataPerDay: " + peakDataPerDay);
	console.log("peakDataAvailablePerDay: " + peakDataAvailablePerDay);

	console.log("offPeakDataPerDay: " + offPeakDataPerDay);
	console.log("offPeakDataAvailablePerDay: " + offPeakDataAvailablePerDay);

	console.log("avgUsage: " + avgUsage);
	console.log("avgPeakUsage: " + avgPeakUsage);
	console.log("avgOffPeakUsage: " + avgOffPeakUsage);

	console.log("dataExceeded: " + dataExceeded);
	console.log("peakDataExceeded: " + peakDataExceeded);
	console.log("offPeakDataExceeded: " + offPeakDataExceeded);

	console.log("dataExceededWarning: " + dataExceededWarning);
	console.log("peakDataExceededWarning: " + peakDataExceededWarning);
	console.log("offPeakDataExceededWarning: " + offPeakDataExceededWarning);
	
	console.log("percentagePeakRem: " + percentagePeakRem);
	console.log("percentageOffPeakRem: " + percentageOffPeakRem);
}

function funCircumference(xPathValue) {
    var x = 0;
    try {
        x = parseFloat((document.evaluate(xPathValue, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).data.toString().replace(/[^\d.]/g, '')) || 0;
    } catch (err) {
        x = 0;
        console.log("Error: " + err);
    } finally {
    }
    return x;
}

function funVolExceed(inputVal, inputAvg) {
	var inputWarning = "";
    try { 		
		inputVal = Number((inputVal / inputAvg).toFixed(0)) || 0;
		if (inputVal > noOfComingDays) {
			inputVal = noOfComingDays;
		} else {
			inputWarning = "⚠️";
		}
    } catch (err) {
		inputVal = 0;
        console.log("Error: " + err);
    } finally {
    }
    return {
        val: inputVal,
        warning: inputWarning,
    };
}

function funChangeName() {
	
	// Standard Volume // Peak Volume
	var pathPV = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/h4';
    var elePV = document.evaluate(pathPV, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    elePV.id = 'foreignDOMPV';
	
	//  Total (Standard+Free) Volume // Total Volume
	var pathTV = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div/div[1]/div[1]/div[2]/div[1]/div[1]/div/h4';
    var eleTV = document.evaluate(pathTV, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    eleTV.id = 'foreignDOMTV';
	
	document.getElementById("foreignDOMPV").innerHTML = "Peak Volume";
	document.getElementById("foreignDOMTV").innerHTML = "Total Volume";
}


function funInsertProgressBar() {
	
	var path = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div/div[1]/div[1]/div[2]/div[1]/div[2]/div';
    var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    element.id = 'foreignDOMPogressContainer';
	
	var docFragment = document.createDocumentFragment(); // contains all gathered nodes
	
	let lineBreak = document.createElement("p");
	docFragment.appendChild(lineBreak);
	lineBreak.append(" ");
	
	
	let maindiv = document.createElement("div");
    maindiv.className = "col-md-12";
    docFragment.appendChild(maindiv);
	
	let maindivh4 = document.createElement("h4");
    maindiv.appendChild(maindivh4);
    maindivh4.append("Off-Peak Volume");
    maindiv.append("\n");
	
	let ProgressDiv = document.createElement("div");
    ProgressDiv.className = "progress";
    maindiv.appendChild(ProgressDiv);
    maindiv.append("\n");
	
	let ProgressBarDivA = document.createElement("div");
    ProgressBarDivA.className = "progress-bar";
	ProgressBarDivA.setAttribute("role", "progressbar");
	ProgressBarDivA.setAttribute("aria-valuenow", "50");
	ProgressBarDivA.setAttribute("aria-valuemin", "0");
	ProgressBarDivA.setAttribute("aria-valuemax", "100");
	ProgressBarDivA.style.width = percentageOffPeakRem + "%";  
	ProgressBarDivA.style.backgroundColor = "#0d0548";
    ProgressDiv.appendChild(ProgressBarDivA);
	ProgressBarDivA.append(percentageOffPeakRem + "%");
    maindiv.append("\n");
	
	let ProgressBarDivB = document.createElement("div");
    ProgressBarDivB.className = "progress-bar";
	ProgressBarDivB.setAttribute("role", "progressbar");
	ProgressBarDivB.style.backgroundColor = "#87C7DE";
	ProgressBarDivB.style.width = "0%";
    ProgressDiv.appendChild(ProgressBarDivB);	
    maindiv.append("\n");
	
	let row = document.createElement("div");
	row.className = "row";
	maindiv.appendChild(row);
	maindiv.append("\n");
	
	
	// ROW DIV A
	let subrowdivA = document.createElement("div");
	subrowdivA.className = "col-md-4";
	row.appendChild(subrowdivA);

	// ROW DIV A H5
	let h5ML = document.createElement("h5");
	h5ML.className = "progress-label";
    subrowdivA.appendChild(h5ML);
	
	let h5ML_small = document.createElement("small");
	h5ML.appendChild(h5ML_small);
	h5ML_small.append("Monthly limit");
	
	let h5ML_br = document.createElement("br");
	h5ML.appendChild(h5ML_br);
	
	let h5ML_strong = document.createElement("strong");
	h5ML_strong.style.marginTop = "5px"; 
	//h5ML_strong.style.backgroundColor = "";
	h5ML.appendChild(h5ML_strong);
	h5ML_strong.append(offPeakMonthlylimit + " GB");
	
	
	// ROW DIV B
	let subrowdivB = document.createElement("div");
	subrowdivB.className = "col-md-4";
	subrowdivB.style.textAlign = "center"; 
	row.appendChild(subrowdivB);

	// ROW DIV B H5
	let h5Rem = document.createElement("h5");
	h5Rem.className = "progress-label";
    subrowdivB.appendChild(h5Rem);
	
	let h5Rem_small = document.createElement("small");
	h5Rem.appendChild(h5Rem_small);
	h5Rem_small.append("Remaining");
	
	let h5Rem_br = document.createElement("br");
	h5Rem.appendChild(h5Rem_br);
	
	let h5Rem_strong = document.createElement("strong");
	h5Rem.appendChild(h5Rem_strong);
	h5Rem_strong.append(offPeakRemaining + " GB");
	
	
	// ROW DIV C
	let subrowdivC = document.createElement("div");
	subrowdivC.className = "col-md-4";
	subrowdivC.style.textAlign = "right"; 
	row.appendChild(subrowdivC);

	// ROW DIV C H5
	let h5Used = document.createElement("h5");
	h5Used.className = "progress-label";
    subrowdivC.appendChild(h5Used);
	
	let h5Used_small = document.createElement("small");
	h5Used.appendChild(h5Used_small);
	h5Used_small.append("Used");
	
	let h5Used_br = document.createElement("br");
	h5Used.appendChild(h5Used_br);
	
	let h5Used_strong = document.createElement("strong");
	h5Used.appendChild(h5Used_strong);
	h5Used_strong.append(offPeakUsed + " GB");
	
	
	var referenceNode = document.querySelector('#foreignDOMPogressContainer');
	referenceNode.after(docFragment);
	//document.getElementById("foreignDOMPogressContainer").appendChild(docFragment);
}


function funCustomStyle01() {

    var path = '/html/body/div[3]/div/div[2]/div/div';
    var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    element.id = 'div-style-01';

    var element = document.getElementById("div-style-01");
    element.removeAttribute("style")
    //element.classList.remove("mystyle");
}

function funCustomStyle02() {

    var path = '/html/body/div[3]/div/div[2]';
    var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    element.id = 'div-style-02';

    var element = document.getElementById("div-style-02");
    //element.removeAttribute("style")
    element.classList.remove("col-md-8");
    element.classList.add("container");
}

function funCustomStyle03() {

    var path = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div';
    var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    element.id = 'div-style-03';

    var element = document.getElementById("div-style-03");
    element.style.padding = "40px";
}

function funCustomStyle04() {

    var path = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div/div[1]/div[5]/div/div/div/h4';
    var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    element.id = 'div-style-04';

    var element = document.getElementById("div-style-04");
    element.style.padding = "1px 10px 5px 10px";
}

function funCustomStyle05() {

    var path = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div/div[1]/div[6]';
    var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    element.id = 'div-style-05';

    var element = document.getElementById("div-style-05");
    element.style.padding = "3px";
}