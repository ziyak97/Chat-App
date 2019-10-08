// I create a ChatUI class to add and remove chats to list on screen
class ChatUI {
    constructor(list) {
        this.list = list;
    }
    // if called it will remove all lists
    clear() {
        this.list.innerHTML = '';
    }
    // adds data to the list by taking data in the parameter
    addListUI(data) {
        // use the dateFns class to make the date look better (30 mins ago)
        const niceDate = dateFns.distanceInWordsToNow(data.created_at.toDate(), {addSuffix: true})
        const html = `
            <li class='list-group-item'>
                <span class='username'>${data.username}:</span>
                <span class='message'>${data.message}</span>
                <div class='time'>${niceDate}</div>
            </li>
        `
        this.list.innerHTML += html; // adds the html to my list
    }
}

// this is mainly to change the class on each button when clicked to make it look like you
// are on that chatroom
const buttons = document.querySelector('.buttons');
const allButtons = document.querySelectorAll('.buttons .btn');

buttons.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') {                     // checks if itemclicked is a button
        allButtons.forEach(button => {                      // and if so it goes through all buttons
            if(button.classList.contains('active')) {       // and checks if any of them have the active class
                button.classList.remove('active');          // and then removes that class if present
            }
        });
        e.target.classList.add('active');   // add active class to button clicked
    }
});