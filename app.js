const list = document.querySelector('.list-group');
const addChatForm = document.querySelector('.message-input');
const updateNameForm = document.querySelector('.username-input');
const updateMsg = document.querySelector('.update-msg');

// check for submit on message form
addChatForm.addEventListener('submit', e => {
    e.preventDefault(); // prevents page from reloading
    const message = addChatForm.message.value.trim(); // takes value in the form
    chatroom.addChats(message)         // i pass the message to the addChats method 
        .then(() => {                  // that i created earlier and then i reset
            addChatForm.reset();       // the form
        });
});

// checks for submit on update name form
updateNameForm.addEventListener('submit', e => {
    e.preventDefault(); // prevents page from reloading
    const name = updateNameForm.username.value.trim(); // takes value in the form
    chatroom.updateUser(name);    // i pass the message to the addChats method 
    updateNameForm.reset();       // that i created earlier and then i reset the form
    updateMsg.innerHTML = `Your name has been changed to <strong>${name}</strong>.`; // show that i changed the name
    setTimeout(() => {
        updateMsg.innerHTML = '';    // do it for only three seconds then remove the html i just added
    }, 3000);
});

// change room
buttons.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') {                         //check if i clicked on a chatroom
        chatUI.clear();                                         // if so clear the form
        chatroom.updateRoom(e.target.getAttribute('id'));       // update room using updateRoom method
        chatroom.getChats(data => chatUI.addListUI(data));      // i made earlier and then call it
    }
});

const localName = localStorage.username ? localStorage.username : 'anon'; // ternary operator to seeif there is local storage and set a name accordingly

// calling all the classes
const chatUI = new ChatUI(list);
const chatroom = new Chatroom(localName, 'general');

// getting the chats and puting data in addListUI method created in ChatUI class
chatroom.getChats(data => chatUI.addListUI(data));