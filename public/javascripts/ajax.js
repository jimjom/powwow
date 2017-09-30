function send_post(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	  parse_response(this.response);
    }
  };
  
  xhttp.open("POST", '/', true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({'message': 'supdawg'}));
  
}

function parse_response(response){
  var res_obj = JSON.parse(response);
  document.getElementById("div_response").innerHTML = res_obj.message;
}