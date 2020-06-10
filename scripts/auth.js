// listen for auth status change
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('guides').get().then(snapshot => {
            // console.log(snapshot.docs);
            setupGuides(snapshot.docs);
        });
        console.log('user logged in: ', user);
    } else {
        setupGuides([]);
        console.log('user logged out');
    }
})

// sign up
const signupForm = document.querySelector('#signup-form');

$("#signup-form").on('submit', (e) => {
    e.preventDefault();

    const email = $("#signup-email").val();
    const password = $("#signup-password").val();

    // console.log(email, password);

    // sign up user
    auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
        console.log(cred.user);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
});

// logout
// const logout = document.querySelector('#logout');
// logout.addEventListener('click', (e)=>{
$("#logout").on('click', (e) => {
    e.preventDefault();
    auth.signOut()
    .then(() => {
        console.log('user signed out');
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
})

// login
const loginForm = document.querySelector('#login-form');
$('#login-form').on('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        // close the login modal and rest the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})



















