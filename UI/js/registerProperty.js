var ipAddress = "127.0.0.1";

var btn = document.getElementById("submitButton");
btn.addEventListener("click",function(){
    console.log("anand");
    var assetId = document.getElementById("assetId").value;
    var owner = document.getElementById("owner").value;
    var current_occupant = document.getElementById("currentOccupant").value;
    var type = document.getElementById("type").value;
    var address = document.getElementById("address").value;
    var cost = document.getElementById("cost").value;
    var database = firebase.database();
    writeUserDataFirebase(assetId,owner,current_occupant,type,address,cost);
    //window.alert("Submitted to firebase");
    console.log("working Firebase");
    writeUserDataComposer(assetId,owner,current_occupant,type,address,cost);
    console.log("working Composer");
    clearFields();
});

function writeUserDataComposer(assetId,owner,current_occupant,type,address,cost){
  var data = {
    "$class": "org.acme.biznet.LandAsset",
    "assetId":assetId,
    "owner":owner,
    "current_occupant": current_occupant,
    "type":type,
    "address":address,
    "value":cost
  }
  $.post("http://"+ipAddress+":3000/api/LandAsset",data,function(d,status){
    $("#test").html(d);
  });
}
function writeUserDataFirebase(assetId,owner,current_occupant,type,address,cost) {
    firebase.database().ref('asset/' + assetId).set({
      owner: owner,
      current_occupant: current_occupant,
      type : type,
      address : address,
      value : cost
    });
  }

function clearFields(){
    document.getElementById("assetId").value = "";
    document.getElementById("owner").value = "";
    document.getElementById("currentOccupant").value = "";
    document.getElementById("type").value = "";
    document.getElementById("address").value = "";
    document.getElementById("cost").value = "";
}