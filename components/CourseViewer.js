import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';

function CourseViewer() {
  const { courseId } = useParams();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch course details and enrollment progress
  useEffect(() => {
    const fetchData = async () => {
      // Get course information
      const courseRef = doc(db, 'courses', courseId);
      const courseSnap = await getDoc(courseRef);
      
      if (courseSnap.exists()) {
        setCourse(courseSnap.data());
        
        // Get chapters in order
        const chaptersQuery = query(
          collection(db, `courses/${courseId}/chapters`),
          orderBy('order')
        );
        
        const unsubscribe = onSnapshot(chaptersQuery, (snapshot) => {
          const chaptersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setChapters(chaptersData);
        });
        
        // Get user's progress
        const enrollmentRef = doc(db, 'enrollments', `${auth.currentUser.uid}_${courseId}`);
        const enrollmentSnap = await getDoc(enrollmentRef);
        
        if (enrollmentSnap.exists()) {
          setCurrentChapterIndex(enrollmentSnap.data().currentChapter || 0);
        } else {
          // Create enrollment if doesn't exist
          await setDoc(enrollmentRef, {
            userId: auth.currentUser.uid,
            courseId,
            currentChapter: 0,
            completed: false
          });
        }
        
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleNextChapter = async () => {
    if (currentChapterIndex < chapters.length - 1) {
      const newIndex = currentChapterIndex + 1;
      setCurrentChapterIndex(newIndex);
      
      // Update progress in Firestore
      const enrollmentRef = doc(db, 'enrollments', `${auth.currentUser.uid}_${courseId}`);
      await updateDoc(enrollmentRef, {
        currentChapter: newIndex,
        completed: newIndex === chapters.length - 1
      });
    }
  };

  if (loading) return <div>Loading course...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="course-viewer">
      <h1>{course.title}</h1>
      {chapters.length > 0 && (
        <div className="chapter-container">
          <div className="chapter-content">
            <h2>{chapters[currentChapterIndex].title}</h2>
            <img 
              src={chapters[currentChapterIndex].imageURL} 
              alt={chapters[currentChapterIndex].title}
              style={{ maxWidth: '100%' }}
            />
            <p>{chapters[currentChapterIndex].content}</p>
          </div>
          
          <div className="navigation-buttons">
            {currentChapterIndex > 0 && (
              <button onClick={() => setCurrentChapterIndex(prev => prev - 1)}>
                Previous
              </button>
            )}
            
            {currentChapterIndex < chapters.length - 1 ? (
              <button onClick={handleNextChapter}>
                Next Chapter
              </button>
            ) : (
              <button disabled>Course Completed!</button>
            )}
          </div>
          
          <div className="progress">
            Progress: {Math.round((currentChapterIndex + 1) / chapters.length * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseViewer;
