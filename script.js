const firebaseConfig = {
  apiKey: "AIzaSyAKz4LhJcThTJ1ZowKYMV7rVlKwDhuXz3g",
  authDomain: "rolebased-test-1.firebaseapp.com",
  databaseURL: "https://rolebased-test-1-default-rtdb.firebaseio.com",
  projectId: "rolebased-test-1",
  storageBucket: "rolebased-test-1.firebasestorage.app",
  messagingSenderId: "951301430114",
  appId: "1:951301430114:web:17cae16a755c2cbc086a3b",
  measurementId: "G-CFC2EF9MQF"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#login-button').addEventListener('click', login);
    document.querySelector('#signup-button').addEventListener('click', signup);
});

function login() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            if (user.email === 'harshavardhanjw@gmail.com') {
                window.location.href = 'admin/index.html';
            } else {
                window.location.href = 'student/index.html';
            }
        })
        .catch(error => {
            console.error('Login error:', error.message);
            alert('Login failed: ' + error.message);
        });
}

function signup() {
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            window.location.href = 'student/index.html';
        })
        .catch(error => {
            console.error('Signup error:', error.message);
            alert('Signup failed: ' + error.message);
        });
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = '../index.html';
    });
}

function loadCourses(elementId, callback) {
    db.collection('courses').onSnapshot(snapshot => {
        const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(courses);
    });
}

function loadEnrolledCourses(userEmail, callback) {
    db.collection('enrollments')
        .where('userEmail', '==', userEmail)
        .onSnapshot(snapshot => {
            const enrollments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(enrollments);
        });
}
