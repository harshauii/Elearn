import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';

function StudentDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'enrollments'),
      where('userId', '==', auth.currentUser.uid)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const coursesData = snapshot.docs.map(doc => doc.data());
      setCourses(coursesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>My Courses</h1>
      {courses.map(course => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <button>Continue Course</button>
        </div>
      ))}
    </div>
  );
}