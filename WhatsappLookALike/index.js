const users = [
    {
        "name":"Bruno",
        "profile":"./assets/images/bruno.jpg",
        "text":"Hi",
        "time":"02:01",
        "Status" : "typing..."
    },
    {
        "name":"Zayn",
        "profile":"./assets/images/zayn.jpeg",
        "text":"Hi",
        "time":"02:01",
        "Status" : "Online"
    },
    {
        "name":"Tyler",
        "profile":"./assets/images/tylerDurden.jpg",
        "text":"Hi",
        "time":"02:01",
        "Status" : "typing..."
    }
]

// users.forEach((user, index) => {
//     document.getElementById("chat-list").innerHTML="<h1>hi</h1>"
//   });

function openChat(index) {
    document.getElementById("dp").src = users[index].profile
    document.getElementById("name").textContent = users[index].name
    document.getElementById("status").textContent = users[index].Status
    document.getElementById("msg-screen").innerHTML = ""
}

function sendChat(){
    sendMsg(message)
}

function sendMsg(message){
    var message = document.getElementById("typed-text").value;
    if (message){
        var innerhtml = '<div class="message-cont"><p class="message">'+ message +'</p><p class="time">'+ new Date().getHours() + ':' + new Date().getMinutes() +'</p></div>'
        document.getElementById("msg-screen").innerHTML += innerhtml
        document.getElementById("typed-text").value = ""
    }
}


const date = new Date();
const options = { day: '2-digit', month: 'short', year: 'numeric' };
document.getElementById("date").textContent = date.toLocaleDateString('en-US', options);

document.getElementById("typed-text").addEventListener("keypress", function (event){
    if (event.key == "Enter"){
        var message = document.getElementById("typed-text").textContent
        sendMsg(message)
    }
})