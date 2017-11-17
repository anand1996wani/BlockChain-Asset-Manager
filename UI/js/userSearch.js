var ipAddress = "127.0.0.1"

var btn = document.getElementById("submitButton"); 
btn.addEventListener("click", function() {
	var ourRequest = new XMLHttpRequest();
	var clientId= document.getElementById("clientId").value;
	var url = "http://"+ipAddress+":3000/api/Client/";
	url = url + clientId;
ourRequest.open('GET',url);
ourRequest.onload = function() {
	var ourData = JSON.parse(ourRequest.responseText);
	//console.log(ourRequest.responseText);
	//console.log(url);
	renderHTML(ourData);	
};
ourRequest.send();
});

function renderHTML(data){
	document.getElementById("firstName").value = data.firstName;
	document.getElementById("lastName").value = data.lastName;
	document.getElementById("type").value = data.type; 
}
