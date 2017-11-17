var ipAddress = "127.0.0.1";

var btn = document.getElementById("submitButton");
btn.addEventListener("click",function(){
    console.log("anand");
    var clientId = document.getElementById("clientId").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var type = document.getElementById("type").value;
    var database = firebase.database();
    writeUserDataFirebase(clientId,firstName,lastName,type);
    //window.alert("Submitted to firebase");
    console.log("working Firebase");
    writeUserDataComposer(clientId, firstName, lastName, type);
    console.log("working Composer");
    clearFields();
});

function writeUserDataComposer(clientId, firstName, lastName, type){
  var data = {
    "$class": "org.acme.biznet.Client",
    "clientId":clientId,
    "firstName":firstName,
    "lastName": lastName,
    "type":type
  }
  $.post("http://"+ipAddress+":3000/api/Client",data,function(d,status){
    $("#test").html(d);
  });
}
function writeUserDataFirebase(clientId, firstName, lastName, type) {
    firebase.database().ref('client/' + clientId).set({
      firstName: firstName,
      lastName: lastName,
      type : type
    });
  }

  function clearFields(){
    document.getElementById("clientId").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("type").value = "";
}