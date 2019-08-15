
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

// Calculate Percentages
percentagePeakRem = ((peakRemaining/peakMonthlylimit) * 100).toFixed(0);
percentageOffPeakRem = ((offPeakRemaining/offPeakMonthlylimit) * 100).toFixed(0);

funDebug(); // For debugging pursues

funChangeName();
funInsertData2Page();
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
	
	// Percentages Values
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


function funInsertData2Page() {

    var path = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div/div[1]/div[4]';
    var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    element.id = 'foreignDOMContainer';

    // INNER HTML
    var docFragment = document.createDocumentFragment(); // contains all gathered nodes

    let maindiv = document.createElement("div");
    maindiv.className = "col-md-12";
    docFragment.appendChild(maindiv);
    docFragment.append("\n");

    let hr1 = document.createElement("hr");
    maindiv.appendChild(hr1);
    maindiv.append("\n");

    let h4 = document.createElement("h4");
    h4.style.padding = "10px 10px 5px 10px";
    maindiv.appendChild(h4);
    h4.append("Monthly Data Usage Statistics");
    maindiv.append("\n");

    let table = document.createElement("table");
    table.className = "table-hover";
    maindiv.appendChild(table);
    table.append("\n");
	
	let tbody = document.createElement("tbody");
	table.appendChild(tbody);

    // TR Head 01
    let trhead1 = document.createElement("tr");
	trhead1.className = "info";
    tbody.appendChild(trhead1);
    // ------------------------------------------------------
    let trhead1_td1 = document.createElement("td");
    trhead1_td1.style.padding = "2px 60px 2px 10px";
    trhead1.appendChild(trhead1_td1);
    let trhead1_td1_strong = document.createElement("strong");
    trhead1_td1.appendChild(trhead1_td1_strong);
    trhead1_td1_strong.append("Total Volume");

    // ------------------------------------------------------
    let trhead1_td2 = document.createElement("td");
    trhead1.appendChild(trhead1_td2);
    trhead1_td2.append("   ");
    // ------------------------------------------------------
    let trhead1_td3 = document.createElement("td");
    trhead1_td3.style.padding = "2px 60px 2px 10px";
    trhead1.appendChild(trhead1_td3);
    trhead1_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 01
    let tr1 = document.createElement("tr");
    tbody.appendChild(tr1);
    // ------------------------------------------------------
    let tr1_td1 = document.createElement("td");
    tr1_td1.style.padding = "2px 60px 2px 10px";
    tr1.appendChild(tr1_td1);
    tr1_td1.append("Monthly Bandwidth Limit");
    // ------------------------------------------------------
    let tr1_td2 = document.createElement("td");
    tr1.appendChild(tr1_td2);
    tr1_td2.append(totalMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr1_td3 = document.createElement("td");
    tr1_td3.style.padding = "2px 60px 2px 10px";
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
    tr2_td1.style.padding = "2px 60px 2px 10px";
    tr2.appendChild(tr2_td1);
    tr2_td1.append("Total Remaining");
    // ------------------------------------------------------
    let tr2_td2 = document.createElement("td");
    tr2.appendChild(tr2_td2);
    tr2_td2.append(totalRemaining + " GB");
    // ------------------------------------------------------
    let tr2_td3 = document.createElement("td");
    tr2_td3.style.padding = "2px 60px 2px 10px";
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
    tr3_td1.style.padding = "2px 60px 2px 10px";
    tr3.appendChild(tr3_td1);
    tr3_td1.append("Total Used");
    // ------------------------------------------------------
    let tr3_td2 = document.createElement("td");
    tr3.appendChild(tr3_td2);
    tr3_td2.append(totalUsed + " GB");
    // ------------------------------------------------------
    let tr3_td3 = document.createElement("td");
    tr3_td3.style.padding = "2px 60px 2px 10px";
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
    tr3e01_td1.style.padding = "2px 60px 2px 10px";
    tr3e01.appendChild(tr3e01_td1);
    tr3e01_td1.append("Data will be exceeded in ");
    // ------------------------------------------------------
    let tr3e01_td2 = document.createElement("td");
    tr3e01.appendChild(tr3e01_td2);
    tr3e01_td2.append(dataExceeded + " days");
    // ------------------------------------------------------
    let tr3e01_td3 = document.createElement("td");
    tr3e01_td3.style.padding = "2px 60px 2px 10px";
    tr3e01.appendChild(tr3e01_td3);
    tr3e01_td3.append("");

    let tr3e01_td3_span = document.createElement("span");
    tr3e01_td3_span.className = "text-muted";
    tr3e01_td3.appendChild(tr3e01_td3_span);
    tr3e01_td3_span.append(dataExceededWarning);
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 03 End 02
    let tr3e02 = document.createElement("tr");
    tbody.appendChild(tr3e02);
    // ------------------------------------------------------
    let tr3e02_td1 = document.createElement("td");
    tr3e02_td1.style.padding = "2px 60px 2px 10px";
    tr3e02.appendChild(tr3e02_td1);
    tr3e02_td1.append("Data cap will be reset in ");
    // ------------------------------------------------------
    let tr3e02_td2 = document.createElement("td");
    tr3e02.appendChild(tr3e02_td2);
    tr3e02_td2.append(noOfComingDays + " days");
    // ------------------------------------------------------
    let tr3e02_td3 = document.createElement("td");
    tr3e02_td3.style.padding = "2px 60px 2px 10px";
    tr3e02.appendChild(tr3e02_td3);
    tr3e02_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR BR 01
    let trbr01 = document.createElement("tr");
    tbody.appendChild(trbr01);
    // ------------------------------------------------------
    let trbr01_td1 = document.createElement("td");
    trbr01_td1.style.padding = "2px 60px 2px 10px";
    trbr01.appendChild(trbr01_td1);
    trbr01_td1.append("   ");
    // ------------------------------------------------------
    let trbr01_td2 = document.createElement("td");
    trbr01.appendChild(trbr01_td2);
    trbr01_td2.append("   ");
    // ------------------------------------------------------
    let trbr01_td3 = document.createElement("td");
    trbr01_td3.style.padding = "2px 60px 2px 10px";
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
    trhead2_td1.style.padding = "2px 60px 2px 10px";
    trhead2.appendChild(trhead2_td1);
    let trhead2_td1_strong = document.createElement("strong");
    trhead2_td1.appendChild(trhead2_td1_strong);
    trhead2_td1_strong.append("Total Peak Volume");

    // ------------------------------------------------------
    let trhead2_td2 = document.createElement("td");
    trhead2.appendChild(trhead2_td2);
    trhead2_td2.append("   ");
    // ------------------------------------------------------
    let trhead2_td3 = document.createElement("td");
    trhead2_td3.style.padding = "2px 60px 2px 10px";
    trhead2.appendChild(trhead2_td3);
    trhead2_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 04
    let tr4 = document.createElement("tr");
    tbody.appendChild(tr4);
    // ------------------------------------------------------
    let tr4_td1 = document.createElement("td");
    tr4_td1.style.padding = "2px 60px 2px 10px";
    tr4.appendChild(tr4_td1);
    tr4_td1.append("Total Peak Data Monthly Limit");
    // ------------------------------------------------------
    let tr4_td2 = document.createElement("td");
    tr4.appendChild(tr4_td2);
    tr4_td2.append(peakMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr4_td3 = document.createElement("td");
    tr4_td3.style.padding = "2px 60px 2px 10px";
    tr4.appendChild(tr4_td3);
    tr4_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 05
    let tr5 = document.createElement("tr");
    tbody.appendChild(tr5);
    // ------------------------------------------------------
    let tr5_td1 = document.createElement("td");
    tr5_td1.style.padding = "2px 60px 2px 10px";
    tr5.appendChild(tr5_td1);
    tr5_td1.append("Total Peak Data Remaining");
    // ------------------------------------------------------
    let tr5_td2 = document.createElement("td");
    tr5.appendChild(tr5_td2);
    tr5_td2.append(peakRemaining + " GB");
    // ------------------------------------------------------
    let tr5_td3 = document.createElement("td");
    tr5_td3.style.padding = "2px 60px 2px 10px";
    tr5.appendChild(tr5_td3);
    tr5_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 06
    let tr6 = document.createElement("tr");
    tbody.appendChild(tr6);
    // ------------------------------------------------------
    let tr6_td1 = document.createElement("td");
    tr6_td1.style.padding = "2px 60px 2px 10px";
    tr6.appendChild(tr6_td1);
    tr6_td1.append("Total Peak Data Used");
    // ------------------------------------------------------
    let tr6_td2 = document.createElement("td");
    tr6.appendChild(tr6_td2);
    tr6_td2.append(peakUsed + " GB");
    // ------------------------------------------------------
    let tr6_td3 = document.createElement("td");
    tr6_td3.style.padding = "2px 60px 2px 10px";
    tr6.appendChild(tr6_td3);
    tr6_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 06 01
    let tr601 = document.createElement("tr");
    tbody.appendChild(tr601);
    // ------------------------------------------------------
    let tr601_td1 = document.createElement("td");
    tr601_td1.style.padding = "2px 60px 2px 10px";
    tr601.appendChild(tr601_td1);
    tr601_td1.append("Peak data will be exceeded in ");
    // ------------------------------------------------------
    let tr601_td2 = document.createElement("td");
    tr601.appendChild(tr601_td2);
    tr601_td2.append(peakDataExceeded + " days");
    // ------------------------------------------------------
    let tr601_td3 = document.createElement("td");
    tr601_td3.style.padding = "2px 60px 2px 10px";
    tr601.appendChild(tr601_td3);
    tr601_td3.append("");

    let tr601_td3_span = document.createElement("span");
    tr601_td3_span.className = "text-muted";
    tr601_td3.appendChild(tr601_td3_span);
    tr601_td3_span.append(peakDataExceededWarning);
    // ------------------------------------------------------
    tbody.append("\n");


    // TR BR 02
    let trbr02 = document.createElement("tr");
    tbody.appendChild(trbr02);
    // ------------------------------------------------------
    let trbr02_td1 = document.createElement("td");
    trbr02_td1.style.padding = "2px 60px 2px 10px";
    trbr02.appendChild(trbr02_td1);
    trbr02_td1.append("   ");
    // ------------------------------------------------------
    let trbr02_td2 = document.createElement("td");
    trbr02.appendChild(trbr02_td2);
    trbr02_td2.append("   ");
    // ------------------------------------------------------
    let trbr02_td3 = document.createElement("td");
    trbr02_td3.style.padding = "2px 60px 2px 10px";
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
    trhead3_td1.style.padding = "2px 60px 2px 10px";
    trhead3.appendChild(trhead3_td1);
    let trhead3_td1_strong = document.createElement("strong");
    trhead3_td1.appendChild(trhead3_td1_strong);
    trhead3_td1_strong.append("Total Off Peak Volume");

    // ------------------------------------------------------
    let trhead3_td2 = document.createElement("td");
    trhead3.appendChild(trhead3_td2);
    trhead3_td2.append("   ");
    // ------------------------------------------------------
    let trhead3_td3 = document.createElement("td");
    trhead3_td3.style.padding = "2px 60px 2px 10px";
    trhead3.appendChild(trhead3_td3);
    trhead3_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 07
    let tr7 = document.createElement("tr");
    tbody.appendChild(tr7);
    // ------------------------------------------------------
    let tr7_td1 = document.createElement("td");
    tr7_td1.style.padding = "2px 60px 2px 10px";
    tr7.appendChild(tr7_td1);
    tr7_td1.append("Total Off Peak Monthly Limit");
    // ------------------------------------------------------
    let tr7_td2 = document.createElement("td");
    tr7.appendChild(tr7_td2);
    tr7_td2.append(offPeakMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr7_td3 = document.createElement("td");
    tr7_td3.style.padding = "2px 60px 2px 10px";
    tr7.appendChild(tr7_td3);
    tr7_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 08
    let tr8 = document.createElement("tr");
    tbody.appendChild(tr8);
    // ------------------------------------------------------
    let tr8_td1 = document.createElement("td");
    tr8_td1.style.padding = "2px 60px 2px 10px";
    tr8.appendChild(tr8_td1);
    tr8_td1.append("Total Off Peak Remaining");
    // ------------------------------------------------------
    let tr8_td2 = document.createElement("td");
    tr8.appendChild(tr8_td2);
    tr8_td2.append(offPeakRemaining + " GB");
    // ------------------------------------------------------
    let tr8_td3 = document.createElement("td");
    tr8_td3.style.padding = "2px 60px 2px 10px";
    tr8.appendChild(tr8_td3);
    tr8_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 09
    let tr9 = document.createElement("tr");
    tbody.appendChild(tr9);
    // ------------------------------------------------------
    let tr9_td1 = document.createElement("td");
    tr9_td1.style.padding = "2px 60px 2px 10px";
    tr9.appendChild(tr9_td1);
    tr9_td1.append("Total Off Peak Used");
    // ------------------------------------------------------
    let tr9_td2 = document.createElement("td");
    tr9.appendChild(tr9_td2);
    tr9_td2.append(offPeakUsed + " GB");
    // ------------------------------------------------------
    let tr9_td3 = document.createElement("td");
    tr9_td3.style.padding = "2px 60px 2px 10px";
    tr9.appendChild(tr9_td3);
    tr9_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 09 01
    let tr901 = document.createElement("tr");
    tbody.appendChild(tr901);
    // ------------------------------------------------------
    let tr901_td1 = document.createElement("td");
    tr901_td1.style.padding = "2px 60px 2px 10px";
    tr901.appendChild(tr901_td1);
    tr901_td1.append("Off Peak data will be exceeded in ");
    // ------------------------------------------------------
    let tr901_td2 = document.createElement("td");
    tr901.appendChild(tr901_td2);
    tr901_td2.append(offPeakDataExceeded + " days");
    // ------------------------------------------------------
    let tr901_td3 = document.createElement("td");
    tr901_td3.style.padding = "2px 60px 2px 10px";
    tr901.appendChild(tr901_td3);
    tr901_td3.append("");

    let tr901_td3_span = document.createElement("span");
    tr901_td3_span.className = "text-muted";
    tr901_td3.appendChild(tr901_td3_span);
    tr901_td3_span.append(offPeakDataExceededWarning);
    // ------------------------------------------------------
    tbody.append("\n");


    // TR BR 03
    let trbr03 = document.createElement("tr");
    tbody.appendChild(trbr03);
    // ------------------------------------------------------
    let trbr03_td1 = document.createElement("td");
    trbr03_td1.style.padding = "2px 60px 2px 10px";
    trbr03.appendChild(trbr03_td1);
    trbr03_td1.append("   ");
    // ------------------------------------------------------
    let trbr03_td2 = document.createElement("td");
    trbr03.appendChild(trbr03_td2);
    trbr03_td2.append("   ");
    // ------------------------------------------------------
    let trbr03_td3 = document.createElement("td");
    trbr03_td3.style.padding = "2px 60px 2px 10px";
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
    trhead4_td1.style.padding = "2px 60px 2px 10px";
    trhead4.appendChild(trhead4_td1);
    let trhead4_td1_strong = document.createElement("strong");
    trhead4_td1.appendChild(trhead4_td1_strong);
    trhead4_td1_strong.append("Total Peak Volume: Per day");

    // ------------------------------------------------------
    let trhead4_td2 = document.createElement("td");
    trhead4.appendChild(trhead4_td2);
    trhead4_td2.append("   ");
    // ------------------------------------------------------
    let trhead4_td3 = document.createElement("td");
    trhead4_td3.style.padding = "2px 60px 2px 10px";
    trhead4.appendChild(trhead4_td3);
    trhead4_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 10
    let tr10 = document.createElement("tr");
    tbody.appendChild(tr10);
    // ------------------------------------------------------
    let tr10_td1 = document.createElement("td");
    tr10_td1.style.padding = "2px 60px 2px 10px";
    tr10.appendChild(tr10_td1);
    tr10_td1.append("Allocated Peak Data Per Day");
    // ------------------------------------------------------
    let tr10_td2 = document.createElement("td");
    tr10.appendChild(tr10_td2);
    tr10_td2.append(peakDataPerDay + " GB");
    // ------------------------------------------------------
    let tr10_td3 = document.createElement("td");
    tr10_td3.style.padding = "2px 60px 2px 10px";
    tr10.appendChild(tr10_td3);

    let tr10_td3_span = document.createElement("span");
    tr10_td3_span.className = "text-muted";
    tr10_td3.appendChild(tr10_td3_span);
    tr10_td3_span.append("(Total Peak Data/" + daysInThisMonth + ")");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 11
    let tr11 = document.createElement("tr");
    tbody.appendChild(tr11);
    // ------------------------------------------------------
    let tr11_td1 = document.createElement("td");
    tr11_td1.style.padding = "2px 60px 2px 10px";
    tr11.appendChild(tr11_td1);
    tr11_td1.append("Available Peak Data Per Day");
    // ------------------------------------------------------
    let tr11_td2 = document.createElement("td");
    tr11.appendChild(tr11_td2);
    tr11_td2.append(peakDataAvailablePerDay + " GB");
    // ------------------------------------------------------
    let tr11_td3 = document.createElement("td");
    tr11_td3.style.padding = "2px 60px 2px 10px";
    tr11.appendChild(tr11_td3);

    let tr11_td3_span = document.createElement("span");
    tr11_td3_span.className = "text-muted";
    tr11_td3.appendChild(tr11_td3_span);
    tr11_td3_span.append("(Available Peak Data/" + (daysInThisMonth - dayOfTheMonth) + ")");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 12
    let tr12 = document.createElement("tr");
    tbody.appendChild(tr12);
    // ------------------------------------------------------
    let tr12_td1 = document.createElement("td");
    tr12_td1.style.padding = "2px 60px 2px 10px";
    tr12.appendChild(tr12_td1);
    tr12_td1.append("Average Peak Data Usage");
    // ------------------------------------------------------
    let tr12_td2 = document.createElement("td");
    tr12.appendChild(tr12_td2);
    tr12_td2.append(avgPeakUsage + " GB");
    // ------------------------------------------------------
    let tr12_td3 = document.createElement("td");
    tr12_td3.style.padding = "2px 60px 2px 10px";
    tr12.appendChild(tr12_td3);

    let tr12_td3_span = document.createElement("span");
    tr12_td3_span.className = "text-muted";
    tr12_td3.appendChild(tr12_td3_span);
    tr12_td3_span.append("(Total Peak Used Data/" + dayOfTheMonth + ")");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR BR 04
    let trbr04 = document.createElement("tr");
    tbody.appendChild(trbr04);
    // ------------------------------------------------------
    let trbr04_td1 = document.createElement("td");
    trbr04_td1.style.padding = "2px 60px 2px 10px";
    trbr04.appendChild(trbr04_td1);
    trbr04_td1.append("   ");
    // ------------------------------------------------------
    let trbr04_td2 = document.createElement("td");
    trbr04.appendChild(trbr04_td2);
    trbr04_td2.append("   ");
    // ------------------------------------------------------
    let trbr04_td3 = document.createElement("td");
    trbr04_td3.style.padding = "2px 60px 2px 10px";
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
    trhead5_td1.style.padding = "2px 60px 2px 10px";
    trhead5.appendChild(trhead5_td1);
    let trhead5_td1_strong = document.createElement("strong");
    trhead5_td1.appendChild(trhead5_td1_strong);
    trhead5_td1_strong.append("Total Off Peak Volume: Per day");

    // ------------------------------------------------------
    let trhead5_td2 = document.createElement("td");
    trhead5.appendChild(trhead5_td2);
    trhead5_td2.append("   ");
    // ------------------------------------------------------
    let trhead5_td3 = document.createElement("td");
    trhead5_td3.style.padding = "2px 60px 2px 10px";
    trhead5.appendChild(trhead5_td3);
    trhead5_td3.append("   ");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 13
    let tr13 = document.createElement("tr");
    tbody.appendChild(tr13);
    // ------------------------------------------------------
    let tr13_td1 = document.createElement("td");
    tr13_td1.style.padding = "2px 60px 2px 10px";
    tr13.appendChild(tr13_td1);
    tr13_td1.append("Allocated Off Peak Data Per Day");
    // ------------------------------------------------------
    let tr13_td2 = document.createElement("td");
    tr13.appendChild(tr13_td2);
    tr13_td2.append(offPeakDataPerDay + " GB");
    // ------------------------------------------------------
    let tr13_td3 = document.createElement("td");
    tr13_td3.style.padding = "2px 60px 2px 10px";
    tr13.appendChild(tr13_td3);

    let tr13_td3_span = document.createElement("span");
    tr13_td3_span.className = "text-muted";
    tr13_td3.appendChild(tr13_td3_span);
    tr13_td3_span.append("(Total Off Peak Used Data/" + daysInThisMonth + ")");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 14
    let tr14 = document.createElement("tr");
    tbody.appendChild(tr14);
    // ------------------------------------------------------
    let tr14_td1 = document.createElement("td");
    tr14_td1.style.padding = "2px 60px 2px 10px";
    tr14.appendChild(tr14_td1);
    tr14_td1.append("Available Off Peak Data Per Day");
    // ------------------------------------------------------
    let tr14_td2 = document.createElement("td");
    tr14.appendChild(tr14_td2);
    tr14_td2.append(offPeakDataAvailablePerDay + " GB");
    // ------------------------------------------------------
    let tr14_td3 = document.createElement("td");
    tr14_td3.style.padding = "2px 60px 2px 10px";
    tr14.appendChild(tr14_td3);

    let tr14_td3_span = document.createElement("span");
    tr14_td3_span.className = "text-muted";
    tr14_td3.appendChild(tr14_td3_span);
    tr14_td3_span.append("(Available Off Peak Data/" + (daysInThisMonth - dayOfTheMonth) + ")");
    // ------------------------------------------------------
    tbody.append("\n");


    // TR 15
    let tr15 = document.createElement("tr");
    tbody.appendChild(tr15);
    // ------------------------------------------------------
    let tr15_td1 = document.createElement("td");
    tr15_td1.style.padding = "2px 60px 2px 10px";
    tr15.appendChild(tr15_td1);
    tr15_td1.append("Average Off Peak Data Usage");
    // ------------------------------------------------------
    let tr15_td2 = document.createElement("td");
    tr15.appendChild(tr15_td2);
    tr15_td2.append(avgOffPeakUsage + " GB");
    // ------------------------------------------------------
    let tr15_td3 = document.createElement("td");
    tr15_td3.style.padding = "2px 60px 2px 10px";
    tr15.appendChild(tr15_td3);

    let tr15_td3_span = document.createElement("span");
    tr15_td3_span.className = "text-muted";
    tr15_td3.appendChild(tr15_td3_span);
    tr15_td3_span.append("(Total Off Peak Used Data/" + dayOfTheMonth + ")");
    // ------------------------------------------------------
    table.append("\n");

    let hr2 = document.createElement("hr");
    maindiv.appendChild(hr2);
    maindiv.append("\n");

    // Insert into original webpage
    document.getElementById("foreignDOMContainer").appendChild(docFragment);
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