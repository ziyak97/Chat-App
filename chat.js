// I start by making a Chatroom class
// All the main methods that do the actual internal work is present in this class
class Chatroom {
    constructor(username, room) {
        this.username = username; // setting username
        this.room = room; // setting room
        this.chats = db.collection('chats'); // setting reference to chats collection in my firestore
        this.unsub; // eventually set this to stop listening to live updates
    }

    // adds message to firebase
    async addChats(message) {
        const now = new Date(); // setting a variable to current time
        // making an object which i will store on the firestore
        const chat = {
            message, // takes message in parameter (shorthand ES6 notation)
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now) // to store date in firestore you gotta use these methods
        };
        await this.chats.add(chat); // adding chat to firestore
    }

    // gets chats from firestore
    getChats(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room) // firestore function to set room
            .orderBy('created_at') // firestore function to order documents by date
            // check all the documents using onSnapshot firestore function
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {   // checks document changes andfor each change
                    if (change.type === 'added') {          // if the type is added I output that documents
                        callback(change.doc.data());        // data using a callback function (I create the function later)
                    }
                });
            });
    }
    // this method updates the username
    updateUser(username) {
        this.username = username;
        localStorage.setItem('username', this.username); // I set the local storage to the username
    }
    // this method updates the room
    updateRoom(room) {
        this.room = room;
        if (this.unsub) {       // if live update listener is on 
            this.unsub;         // then I turn it off
        }
    }
}
