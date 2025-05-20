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

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.email === 'harshavardhanjw@gmail.com') {
                window.location.href = 'admin/index.html';
            } else {
                window.location.href = 'student/index.html';
            }
        })
        .catch((error) => {
            alert('Login failed: ' + error.message);
        });
}

// Signup function (for students)
function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'student/index.html';
        })
        .catch((error) => {
            alert('Signup failed: ' + error.message);
        });
}

// Logout function (used in dashboards)
function logout() {
    auth.signOut().then(() => {
        window.location.href = '../index.html';
    });
}

// Load courses for admin/student dashboards
function loadCourses(elementId, callback) {
    db.collection('courses').onSnapshot((snapshot) => {
        const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(courses);
    });
}

// Load enrolled courses for student
function loadEnrolledCourses(userEmail, callback) {
    db.collection('enrollments')
        .where('userEmail', '==', userEmail)
        .onSnapshot((snapshot) => {
            const enrollments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(enrollments);
        });
}
