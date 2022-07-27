let socket = io.connect();

let messageBox = document.getElementById('inputChat');
let toAll = document.getElementById('everyone');
let toMe = document.getElementById('me');
let target  = document.getElementById('target');
let userlist = document.getElementById('userlist');

let username;
do {
    username = window.prompt('How should we call you?');
} while (username === "")

//if username is submitted, send to server to put into usernames array
if (username !== "") {
    socket.emit('sendToList', (username));
}



//button logic
toAll.addEventListener('click',()=>{
    let message = messageBox.value;
    socket.emit('sendToAll', username + " " + "says" +': ' + message);
    console.log(messageBox.value);
});

toMe.addEventListener('click',()=>{
    let message = messageBox.value;
    socket.emit('sendToMe', username +': ' + message);
    console.log(messageBox.value);
});

//receiving



// Add users to chatroom
socket.on('displayList', (usernames) => { // receive usernames array from server
    if (!userlist.innerHTML) { //if the list is empty on the client side do the for each
        console.log(usernames);
        usernames.forEach(username => {  //loop through list
            userlist.innerHTML += '<br>' + username;  // each username get displayed
        });
    } else {                              //if the client already has online users add the new online user(s) to the list
        userlist.innerHTML += '<br>' + usernames[usernames.length - 1];
    }
});
socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>'+message;
});
