const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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