import { useState } from 'react';
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [signIn] = useSignInWithEmailAndPassword(auth);
  const [signUp] = useCreateUserWithEmailAndPassword(auth);

  return (
    <div>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => signIn(email, password)}>Login</button>
      <button onClick={() => signUp(email, password)}>Sign Up</button>
    </div>
  );
}