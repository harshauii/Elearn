import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function AdminDashboard() {
  const [courseTitle, setCourseTitle] = useState('');

  const createCourse = async () => {
    await addDoc(collection(db, 'courses'), {
      title: courseTitle,
      createdAt: new Date(),
    });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input 
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
      />
      <button onClick={createCourse}>Create Course</button>
    </div>
  );
}