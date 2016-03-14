function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function modifyData(json) {
  var response = JSON.parse(json);
  var data = new vis.DataSet();

  var departments = new Array();
  for (i=0; i < response.length; i++){
    if (!isInArray(response[i].department, departments)) {
      departments.push(response[i].department);
    }
    departments.sort();
    var order = false;
    if (i == 0){
      order = true;
    }
    data.add([
      {id: i, y: parseInt(response[i].fiscal_year), z: parseFloat(response[i].sum_amount), x: departments.indexOf(response[i].department)}
    ]);

  }
  drawVisualization(data);
}

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     modifyData(xhttp.responseText);
    }
  };
  xhttp.open("GET", "https://data.sfgov.org/resource/bpnb-jwfb.json?$select=department,fiscal_year,sum(amount)&$limit=50000&$group=department,fiscal_year", true);
  xhttp.send();
}

document.addEventListener("DOMContentLoaded", function(){
  var json = loadDoc();
});
