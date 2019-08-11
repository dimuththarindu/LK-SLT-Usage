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

var avgUsage = Number((totalUsed / dayOfTheMonth).toFixed(2));
var avgPeakUsage = Number((peakUsed / dayOfTheMonth).toFixed(2));
var avgOffPeakUsage = Number((offPeakUsed / dayOfTheMonth).toFixed(2));

var dataExceededWarning = "";
var dataExceeded = Number((totalRemaining / avgUsage).toFixed(0));
if (dataExceeded > noOfComingDays) {
    dataExceeded = noOfComingDays;
} else {
    dataExceededWarning = "⚠️";
}

var peakDataExceededWarning = "";
var peakDataExceeded = Number((peakRemaining / avgPeakUsage).toFixed(0));
if (peakDataExceeded > noOfComingDays) {
    peakDataExceeded = noOfComingDays;
} else {
    peakDataExceededWarning = "⚠️";
}

var offPeakDataExceededWarning = "";
var offPeakDataExceeded = Number((offPeakRemaining / avgOffPeakUsage).toFixed(0));
if (offPeakDataExceeded > noOfComingDays) {
    offPeakDataExceeded = noOfComingDays;
} else {
    offPeakDataExceededWarning = "⚠️";
}

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


injectID();
customStyle01();
customStyle02();
customStyle03();
customStyle04();
customStyle05();

function injectID() {

    var path = '/html/body/div[3]/div/div[2]/div/div/div/form/div/div[1]/div/div[1]/div[4]';
    var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    element.id = 'injectIDName';

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
    //table.className = "table table-hover";
    maindiv.appendChild(table);
    table.append("\n");

    // TR Head 01
    let trhead1 = document.createElement("tr");
    table.appendChild(trhead1);
    // ------------------------------------------------------
    let trhead1_td1 = document.createElement("td");
    trhead1_td1.style.padding = "2px 50px 2px 10px";
    trhead1.appendChild(trhead1_td1);
    let trhead1_td1_strong = document.createElement("strong");
    trhead1_td1.appendChild(trhead1_td1_strong);
    trhead1_td1_strong.append("Total Volume");

    // ------------------------------------------------------
    let trhead1_td2 = document.createElement("td");
    trhead1.appendChild(trhead1_td2);
    trhead1_td2.append("");
    // ------------------------------------------------------
    let trhead1_td3 = document.createElement("td");
    trhead1_td3.style.padding = "2px 50px 2px 10px";
    trhead1.appendChild(trhead1_td3);
    trhead1_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 01
    let tr1 = document.createElement("tr");
    table.appendChild(tr1);
    // ------------------------------------------------------
    let tr1_td1 = document.createElement("td");
    tr1_td1.style.padding = "2px 50px 2px 10px";
    tr1.appendChild(tr1_td1);
    tr1_td1.append("Total Monthly Limit");
    // ------------------------------------------------------
    let tr1_td2 = document.createElement("td");
    tr1.appendChild(tr1_td2);
    tr1_td2.append(totalMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr1_td3 = document.createElement("td");
    tr1_td3.style.padding = "2px 50px 2px 10px";
    tr1.appendChild(tr1_td3);
    tr1_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 02
    let tr2 = document.createElement("tr");
    table.appendChild(tr2);
    // ------------------------------------------------------
    let tr2_td1 = document.createElement("td");
    tr2_td1.style.padding = "2px 50px 2px 10px";
    tr2.appendChild(tr2_td1);
    tr2_td1.append("Total Remaining");
    // ------------------------------------------------------
    let tr2_td2 = document.createElement("td");
    tr2.appendChild(tr2_td2);
    tr2_td2.append(totalRemaining + " GB");
    // ------------------------------------------------------
    let tr2_td3 = document.createElement("td");
    tr2_td3.style.padding = "2px 50px 2px 10px";
    tr2.appendChild(tr2_td3);
    tr2_td3.append("");

    let tr2_td3_span = document.createElement("span");
    tr2_td3_span.className = "text-muted";
    tr2_td3.appendChild(tr2_td3_span);
    tr2_td3_span.append("(For the upcoming " + noOfComingDays + " days)");
    // ------------------------------------------------------
    table.append("\n");


    // TR 03
    let tr3 = document.createElement("tr");
    table.appendChild(tr3);
    // ------------------------------------------------------
    let tr3_td1 = document.createElement("td");
    tr3_td1.style.padding = "2px 50px 2px 10px";
    tr3.appendChild(tr3_td1);
    tr3_td1.append("Total Used");
    // ------------------------------------------------------
    let tr3_td2 = document.createElement("td");
    tr3.appendChild(tr3_td2);
    tr3_td2.append(totalUsed + " GB");
    // ------------------------------------------------------
    let tr3_td3 = document.createElement("td");
    tr3_td3.style.padding = "2px 50px 2px 10px";
    tr3.appendChild(tr3_td3);
    tr3_td3.append("");

    let tr3_td3_span = document.createElement("span");
    tr3_td3_span.className = "text-muted";
    tr3_td3.appendChild(tr3_td3_span);
    tr3_td3_span.append("(Used in " + dayOfTheMonth + " days)");
    // ------------------------------------------------------
    table.append("\n");

    // TR 03 End 01
    let tr3e01 = document.createElement("tr");
    table.appendChild(tr3e01);
    // ------------------------------------------------------
    let tr3e01_td1 = document.createElement("td");
    tr3e01_td1.style.padding = "2px 50px 2px 10px";
    tr3e01.appendChild(tr3e01_td1);
    tr3e01_td1.append("Data will be exceeded in ");
    // ------------------------------------------------------
    let tr3e01_td2 = document.createElement("td");
    tr3e01.appendChild(tr3e01_td2);
    tr3e01_td2.append(dataExceeded + " days");
    // ------------------------------------------------------
    let tr3e01_td3 = document.createElement("td");
    tr3e01_td3.style.padding = "2px 50px 2px 10px";
    tr3e01.appendChild(tr3e01_td3);
    tr3e01_td3.append("");

    let tr3e01_td3_span = document.createElement("span");
    tr3e01_td3_span.className = "text-muted";
    tr3e01_td3.appendChild(tr3e01_td3_span);
    tr3e01_td3_span.append(dataExceededWarning);
    // ------------------------------------------------------
    table.append("\n");


    // TR 03 End 02
    let tr3e02 = document.createElement("tr");
    table.appendChild(tr3e02);
    // ------------------------------------------------------
    let tr3e02_td1 = document.createElement("td");
    tr3e02_td1.style.padding = "2px 50px 2px 10px";
    tr3e02.appendChild(tr3e02_td1);
    tr3e02_td1.append("Volume will be reset in ");
    // ------------------------------------------------------
    let tr3e02_td2 = document.createElement("td");
    tr3e02.appendChild(tr3e02_td2);
    tr3e02_td2.append(noOfComingDays + " days");
    // ------------------------------------------------------
    let tr3e02_td3 = document.createElement("td");
    tr3e02_td3.style.padding = "2px 50px 2px 10px";
    tr3e02.appendChild(tr3e02_td3);
    tr3e02_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR BR 01
    let trbr01 = document.createElement("tr");
    table.appendChild(trbr01);
    // ------------------------------------------------------
    let trbr01_td1 = document.createElement("td");
    trbr01_td1.style.padding = "2px 50px 2px 10px";
    trbr01.appendChild(trbr01_td1);
    trbr01_td1.append("   ");
    // ------------------------------------------------------
    let trbr01_td2 = document.createElement("td");
    trbr01.appendChild(trbr01_td2);
    trbr01_td2.append("   ");
    // ------------------------------------------------------
    let trbr01_td3 = document.createElement("td");
    trbr01_td3.style.padding = "2px 50px 2px 10px";
    trbr01.appendChild(trbr01_td3);
    trbr01_td3.append("   ");
    // ------------------------------------------------------
    table.append("\n");

    // TR Head 02
    let trhead2 = document.createElement("tr");
    table.appendChild(trhead2);
    // ------------------------------------------------------
    let trhead2_td1 = document.createElement("td");
    trhead2_td1.style.padding = "2px 50px 2px 10px";
    trhead2.appendChild(trhead2_td1);
    let trhead2_td1_strong = document.createElement("strong");
    trhead2_td1.appendChild(trhead2_td1_strong);
    trhead2_td1_strong.append("Total Peak Volume");

    // ------------------------------------------------------
    let trhead2_td2 = document.createElement("td");
    trhead2.appendChild(trhead2_td2);
    trhead2_td2.append("");
    // ------------------------------------------------------
    let trhead2_td3 = document.createElement("td");
    trhead2_td3.style.padding = "2px 50px 2px 10px";
    trhead2.appendChild(trhead2_td3);
    trhead2_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 04
    let tr4 = document.createElement("tr");
    table.appendChild(tr4);
    // ------------------------------------------------------
    let tr4_td1 = document.createElement("td");
    tr4_td1.style.padding = "2px 50px 2px 10px";
    tr4.appendChild(tr4_td1);
    tr4_td1.append("Total Peak Data Monthly Limit");
    // ------------------------------------------------------
    let tr4_td2 = document.createElement("td");
    tr4.appendChild(tr4_td2);
    tr4_td2.append(peakMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr4_td3 = document.createElement("td");
    tr4_td3.style.padding = "2px 50px 2px 10px";
    tr4.appendChild(tr4_td3);
    tr4_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 05
    let tr5 = document.createElement("tr");
    table.appendChild(tr5);
    // ------------------------------------------------------
    let tr5_td1 = document.createElement("td");
    tr5_td1.style.padding = "2px 50px 2px 10px";
    tr5.appendChild(tr5_td1);
    tr5_td1.append("Total Peak Data Remaining");
    // ------------------------------------------------------
    let tr5_td2 = document.createElement("td");
    tr5.appendChild(tr5_td2);
    tr5_td2.append(peakRemaining + " GB");
    // ------------------------------------------------------
    let tr5_td3 = document.createElement("td");
    tr5_td3.style.padding = "2px 50px 2px 10px";
    tr5.appendChild(tr5_td3);
    tr5_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 06
    let tr6 = document.createElement("tr");
    table.appendChild(tr6);
    // ------------------------------------------------------
    let tr6_td1 = document.createElement("td");
    tr6_td1.style.padding = "2px 50px 2px 10px";
    tr6.appendChild(tr6_td1);
    tr6_td1.append("Total Peak Data Used");
    // ------------------------------------------------------
    let tr6_td2 = document.createElement("td");
    tr6.appendChild(tr6_td2);
    tr6_td2.append(peakUsed + " GB");
    // ------------------------------------------------------
    let tr6_td3 = document.createElement("td");
    tr6_td3.style.padding = "2px 50px 2px 10px";
    tr6.appendChild(tr6_td3);
    tr6_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 06 01
    let tr601 = document.createElement("tr");
    table.appendChild(tr601);
    // ------------------------------------------------------
    let tr601_td1 = document.createElement("td");
    tr601_td1.style.padding = "2px 50px 2px 10px";
    tr601.appendChild(tr601_td1);
    tr601_td1.append("Peak data will be exceeded in ");
    // ------------------------------------------------------
    let tr601_td2 = document.createElement("td");
    tr601.appendChild(tr601_td2);
    tr601_td2.append(peakDataExceeded + " days");
    // ------------------------------------------------------
    let tr601_td3 = document.createElement("td");
    tr601_td3.style.padding = "2px 50px 2px 10px";
    tr601.appendChild(tr601_td3);
    tr601_td3.append("");

    let tr601_td3_span = document.createElement("span");
    tr601_td3_span.className = "text-muted";
    tr601_td3.appendChild(tr601_td3_span);
    tr601_td3_span.append(peakDataExceededWarning);
    // ------------------------------------------------------
    table.append("\n");


    // TR BR 02
    let trbr02 = document.createElement("tr");
    table.appendChild(trbr02);
    // ------------------------------------------------------
    let trbr02_td1 = document.createElement("td");
    trbr02_td1.style.padding = "2px 50px 2px 10px";
    trbr02.appendChild(trbr02_td1);
    trbr02_td1.append("   ");
    // ------------------------------------------------------
    let trbr02_td2 = document.createElement("td");
    trbr02.appendChild(trbr02_td2);
    trbr02_td2.append("   ");
    // ------------------------------------------------------
    let trbr02_td3 = document.createElement("td");
    trbr02_td3.style.padding = "2px 50px 2px 10px";
    trbr02.appendChild(trbr02_td3);
    trbr02_td3.append("   ");
    // ------------------------------------------------------
    table.append("\n");


    // TR Head 01
    let trhead3 = document.createElement("tr");
    table.appendChild(trhead3);
    // ------------------------------------------------------
    let trhead3_td1 = document.createElement("td");
    trhead3_td1.style.padding = "2px 50px 2px 10px";
    trhead3.appendChild(trhead3_td1);
    let trhead3_td1_strong = document.createElement("strong");
    trhead3_td1.appendChild(trhead3_td1_strong);
    trhead3_td1_strong.append("Total Off Peak Volume");

    // ------------------------------------------------------
    let trhead3_td2 = document.createElement("td");
    trhead3.appendChild(trhead3_td2);
    trhead3_td2.append("");
    // ------------------------------------------------------
    let trhead3_td3 = document.createElement("td");
    trhead3_td3.style.padding = "2px 50px 2px 10px";
    trhead3.appendChild(trhead3_td3);
    trhead3_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 07
    let tr7 = document.createElement("tr");
    table.appendChild(tr7);
    // ------------------------------------------------------
    let tr7_td1 = document.createElement("td");
    tr7_td1.style.padding = "2px 50px 2px 10px";
    tr7.appendChild(tr7_td1);
    tr7_td1.append("Total Off Peak Monthly Limit");
    // ------------------------------------------------------
    let tr7_td2 = document.createElement("td");
    tr7.appendChild(tr7_td2);
    tr7_td2.append(offPeakMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr7_td3 = document.createElement("td");
    tr7_td3.style.padding = "2px 50px 2px 10px";
    tr7.appendChild(tr7_td3);
    tr7_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 08
    let tr8 = document.createElement("tr");
    table.appendChild(tr8);
    // ------------------------------------------------------
    let tr8_td1 = document.createElement("td");
    tr8_td1.style.padding = "2px 50px 2px 10px";
    tr8.appendChild(tr8_td1);
    tr8_td1.append("Total Off Peak Remaining");
    // ------------------------------------------------------
    let tr8_td2 = document.createElement("td");
    tr8.appendChild(tr8_td2);
    tr8_td2.append(offPeakRemaining + " GB");
    // ------------------------------------------------------
    let tr8_td3 = document.createElement("td");
    tr8_td3.style.padding = "2px 50px 2px 10px";
    tr8.appendChild(tr8_td3);
    tr8_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 09
    let tr9 = document.createElement("tr");
    table.appendChild(tr9);
    // ------------------------------------------------------
    let tr9_td1 = document.createElement("td");
    tr9_td1.style.padding = "2px 50px 2px 10px";
    tr9.appendChild(tr9_td1);
    tr9_td1.append("Total Off Peak Used");
    // ------------------------------------------------------
    let tr9_td2 = document.createElement("td");
    tr9.appendChild(tr9_td2);
    tr9_td2.append(offPeakUsed + " GB");
    // ------------------------------------------------------
    let tr9_td3 = document.createElement("td");
    tr9_td3.style.padding = "2px 50px 2px 10px";
    tr9.appendChild(tr9_td3);
    tr9_td3.append("");
    // ------------------------------------------------------
    table.append("\n");

    // TR 09 01
    let tr901 = document.createElement("tr");
    table.appendChild(tr901);
    // ------------------------------------------------------
    let tr901_td1 = document.createElement("td");
    tr901_td1.style.padding = "2px 50px 2px 10px";
    tr901.appendChild(tr901_td1);
    tr901_td1.append("Off Peak data will be exceeded in ");
    // ------------------------------------------------------
    let tr901_td2 = document.createElement("td");
    tr901.appendChild(tr901_td2);
    tr901_td2.append(offPeakDataExceeded + " days");
    // ------------------------------------------------------
    let tr901_td3 = document.createElement("td");
    tr901_td3.style.padding = "2px 50px 2px 10px";
    tr901.appendChild(tr901_td3);
    tr901_td3.append("");

    let tr901_td3_span = document.createElement("span");
    tr901_td3_span.className = "text-muted";
    tr901_td3.appendChild(tr901_td3_span);
    tr901_td3_span.append(offPeakDataExceededWarning);
    // ------------------------------------------------------
    table.append("\n");


    // TR BR 03
    let trbr03 = document.createElement("tr");
    table.appendChild(trbr03);
    // ------------------------------------------------------
    let trbr03_td1 = document.createElement("td");
    trbr03_td1.style.padding = "2px 50px 2px 10px";
    trbr03.appendChild(trbr03_td1);
    trbr03_td1.append("   ");
    // ------------------------------------------------------
    let trbr03_td2 = document.createElement("td");
    trbr03.appendChild(trbr03_td2);
    trbr03_td2.append("   ");
    // ------------------------------------------------------
    let trbr03_td3 = document.createElement("td");
    trbr03_td3.style.padding = "2px 50px 2px 10px";
    trbr03.appendChild(trbr03_td3);
    trbr03_td3.append("   ");
    // ------------------------------------------------------
    table.append("\n");


    // TR Head 04
    let trhead4 = document.createElement("tr");
    table.appendChild(trhead4);
    // ------------------------------------------------------
    let trhead4_td1 = document.createElement("td");
    trhead4_td1.style.padding = "2px 50px 2px 10px";
    trhead4.appendChild(trhead4_td1);
    let trhead4_td1_strong = document.createElement("strong");
    trhead4_td1.appendChild(trhead4_td1_strong);
    trhead4_td1_strong.append("Total Peak Volume: Per day");

    // ------------------------------------------------------
    let trhead4_td2 = document.createElement("td");
    trhead4.appendChild(trhead4_td2);
    trhead4_td2.append("");
    // ------------------------------------------------------
    let trhead4_td3 = document.createElement("td");
    trhead4_td3.style.padding = "2px 50px 2px 10px";
    trhead4.appendChild(trhead4_td3);
    trhead4_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 10
    let tr10 = document.createElement("tr");
    table.appendChild(tr10);
    // ------------------------------------------------------
    let tr10_td1 = document.createElement("td");
    tr10_td1.style.padding = "2px 50px 2px 10px";
    tr10.appendChild(tr10_td1);
    tr10_td1.append("Allocated Peak Data Per Day");
    // ------------------------------------------------------
    let tr10_td2 = document.createElement("td");
    tr10.appendChild(tr10_td2);
    tr10_td2.append(peakDataPerDay + " GB");
    // ------------------------------------------------------
    let tr10_td3 = document.createElement("td");
    tr10_td3.style.padding = "2px 50px 2px 10px";
    tr10.appendChild(tr10_td3);

    let tr10_td3_span = document.createElement("span");
    tr10_td3_span.className = "text-muted";
    tr10_td3.appendChild(tr10_td3_span);
    tr10_td3_span.append("(Total Peak Data/" + daysInThisMonth + ")");
    // ------------------------------------------------------
    table.append("\n");


    // TR 11
    let tr11 = document.createElement("tr");
    table.appendChild(tr11);
    // ------------------------------------------------------
    let tr11_td1 = document.createElement("td");
    tr11_td1.style.padding = "2px 50px 2px 10px";
    tr11.appendChild(tr11_td1);
    tr11_td1.append("Available Peak Data Per Day");
    // ------------------------------------------------------
    let tr11_td2 = document.createElement("td");
    tr11.appendChild(tr11_td2);
    tr11_td2.append(peakDataAvailablePerDay + " GB");
    // ------------------------------------------------------
    let tr11_td3 = document.createElement("td");
    tr11_td3.style.padding = "2px 50px 2px 10px";
    tr11.appendChild(tr11_td3);

    let tr11_td3_span = document.createElement("span");
    tr11_td3_span.className = "text-muted";
    tr11_td3.appendChild(tr11_td3_span);
    tr11_td3_span.append("(Available Peak Data/" + (daysInThisMonth - dayOfTheMonth) + ")");
    // ------------------------------------------------------
    table.append("\n");


    // TR 12
    let tr12 = document.createElement("tr");
    table.appendChild(tr12);
    // ------------------------------------------------------
    let tr12_td1 = document.createElement("td");
    tr12_td1.style.padding = "2px 50px 2px 10px";
    tr12.appendChild(tr12_td1);
    tr12_td1.append("Average Peak Data Usage");
    // ------------------------------------------------------
    let tr12_td2 = document.createElement("td");
    tr12.appendChild(tr12_td2);
    tr12_td2.append(avgPeakUsage + " GB");
    // ------------------------------------------------------
    let tr12_td3 = document.createElement("td");
    tr12_td3.style.padding = "2px 50px 2px 10px";
    tr12.appendChild(tr12_td3);

    let tr12_td3_span = document.createElement("span");
    tr12_td3_span.className = "text-muted";
    tr12_td3.appendChild(tr12_td3_span);
    tr12_td3_span.append("(Total Peak Used Data/" + dayOfTheMonth + ")");
    // ------------------------------------------------------
    table.append("\n");


    // TR BR 04
    let trbr04 = document.createElement("tr");
    table.appendChild(trbr04);
    // ------------------------------------------------------
    let trbr04_td1 = document.createElement("td");
    trbr04_td1.style.padding = "2px 50px 2px 10px";
    trbr04.appendChild(trbr04_td1);
    trbr04_td1.append("   ");
    // ------------------------------------------------------
    let trbr04_td2 = document.createElement("td");
    trbr04.appendChild(trbr04_td2);
    trbr04_td2.append("   ");
    // ------------------------------------------------------
    let trbr04_td3 = document.createElement("td");
    trbr04_td3.style.padding = "2px 50px 2px 10px";
    trbr04.appendChild(trbr04_td3);
    trbr04_td3.append("   ");
    // ------------------------------------------------------
    table.append("\n");


    // TR Head 03
    let trhead5 = document.createElement("tr");
    table.appendChild(trhead5);
    // ------------------------------------------------------
    let trhead5_td1 = document.createElement("td");
    trhead5_td1.style.padding = "2px 50px 2px 10px";
    trhead5.appendChild(trhead5_td1);
    let trhead5_td1_strong = document.createElement("strong");
    trhead5_td1.appendChild(trhead5_td1_strong);
    trhead5_td1_strong.append("Total Off Peak Volume: Per day");

    // ------------------------------------------------------
    let trhead5_td2 = document.createElement("td");
    trhead5.appendChild(trhead5_td2);
    trhead5_td2.append("");
    // ------------------------------------------------------
    let trhead5_td3 = document.createElement("td");
    trhead5_td3.style.padding = "2px 50px 2px 10px";
    trhead5.appendChild(trhead5_td3);
    trhead5_td3.append("");
    // ------------------------------------------------------
    table.append("\n");


    // TR 13
    let tr13 = document.createElement("tr");
    table.appendChild(tr13);
    // ------------------------------------------------------
    let tr13_td1 = document.createElement("td");
    tr13_td1.style.padding = "2px 50px 2px 10px";
    tr13.appendChild(tr13_td1);
    tr13_td1.append("Allocated Off Peak Data Per Day");
    // ------------------------------------------------------
    let tr13_td2 = document.createElement("td");
    tr13.appendChild(tr13_td2);
    tr13_td2.append(offPeakDataPerDay + " GB");
    // ------------------------------------------------------
    let tr13_td3 = document.createElement("td");
    tr13_td3.style.padding = "2px 50px 2px 10px";
    tr13.appendChild(tr13_td3);

    let tr13_td3_span = document.createElement("span");
    tr13_td3_span.className = "text-muted";
    tr13_td3.appendChild(tr13_td3_span);
    tr13_td3_span.append("(Total Off Peak Used Data/" + daysInThisMonth + ")");
    // ------------------------------------------------------
    table.append("\n");


    // TR 14
    let tr14 = document.createElement("tr");
    table.appendChild(tr14);
    // ------------------------------------------------------
    let tr14_td1 = document.createElement("td");
    tr14_td1.style.padding = "2px 50px 2px 10px";
    tr14.appendChild(tr14_td1);
    tr14_td1.append("Available Off Peak Data Per Day");
    // ------------------------------------------------------
    let tr14_td2 = document.createElement("td");
    tr14.appendChild(tr14_td2);
    tr14_td2.append(offPeakDataAvailablePerDay + " GB");
    // ------------------------------------------------------
    let tr14_td3 = document.createElement("td");
    tr14_td3.style.padding = "2px 50px 2px 10px";
    tr14.appendChild(tr14_td3);

    let tr14_td3_span = document.createElement("span");
    tr14_td3_span.className = "text-muted";
    tr14_td3.appendChild(tr14_td3_span);
    tr14_td3_span.append("(Available Off Peak Data/" + (daysInThisMonth - dayOfTheMonth) + ")");
    // ------------------------------------------------------
    table.append("\n");


    // TR 15
    let tr15 = document.createElement("tr");
    table.appendChild(tr15);
    // ------------------------------------------------------
    let tr15_td1 = document.createElement("td");
    tr15_td1.style.padding = "2px 50px 2px 10px";
    tr15.appendChild(tr15_td1);
    tr15_td1.append("Average Off Peak Data Usage");
    // ------------------------------------------------------
    let tr15_td2 = document.createElement("td");
    tr15.appendChild(tr15_td2);
    tr15_td2.append(avgOffPeakUsage + " GB");
    // ------------------------------------------------------
    let tr15_td3 = document.createElement("td");
    tr15_td3.style.padding = "2px 50px 2px 10px";
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
    document.getElementById("injectIDName").appendChild(docFragment);
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