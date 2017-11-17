var ipAddress = "127.0.0.1"

var btn = document.getElementById("submitButton"); 
btn.addEventListener("click", function() {
	var ourRequest = new XMLHttpRequest();
	var assetId= document.getElementById("assetId").value;
	var url = "http://"+ipAddress+":3000/api/LandAsset/";
	url = url + assetId;
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
	document.getElementById("owner").value = data.owner;
	document.getElementById("current_occupant").value = data.current_occupant;
    document.getElementById("type").value = data.type;
    document.getElementById("address").value = data.address;
    document.getElementById("value").value = data.value; 
}
