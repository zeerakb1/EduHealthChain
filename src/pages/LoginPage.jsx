// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import FormInput from '../components/FormInput';
// import Button from '../components/Button';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Simulate a successful login
//     console.log('Email:', email, 'Password:', password);
//     navigate('/home'); // Redirect to Home Page
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         <FormInput
//           label="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />
//         <FormInput
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter your password"
//         />
//         <Button text="Login" onClick={handleLogin} />
//         <p className="text-center text-gray-600 text-sm mt-4">
//           Don’t have an account?{' '}
//           <Link to="/signup" className="text-blue-500 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config'; // Firebase import
import { query, collection, where, getDocs } from 'firebase/firestore'; // Firebase Firestore functions
import FormInput from '../components/FormInput';
import Button from '../components/Button';

// Function to hash the password using the private key (same as during signup)
const hashPassword = async (password, privateKey) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Use the private key (or derived symmetric key) for hashing
  const keyData = encoder.encode(privateKey); // For simplicity, using private key directly

  const key = await window.crypto.subtle.importKey(
    "raw", 
    keyData, 
    { name: "HMAC", hash: "SHA-256" },
    false, 
    ["sign"]
  );

  const signature = await window.crypto.subtle.sign(
    "HMAC",
    key,
    data
  );

  // Convert the signature to a hexadecimal string
  const hashArray = new Uint8Array(signature);
  return hashArray.reduce((hex, byte) => hex + byte.toString(16).padStart(2, "0"), "");
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Query Firebase to get the user by email
      const q = query(collection(db, 'users'), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User exists, retrieve the data
        const userDoc = querySnapshot.docs[0].data();
        const { publicKey, privateKey, password: storedHashedPassword } = userDoc;

        // Hash the entered password using the stored privateKey
        const hashedPassword = await hashPassword(password, privateKey);

        // Compare the hashed password with the stored hashed password
        if (hashedPassword === storedHashedPassword) {
          console.log('Login successful');
          navigate('/home'); // Redirect to Home Page
        } else {
          console.error('Incorrect password');
          alert('Incorrect password');
        }
      } else {
        console.error('No user found with this email');
        alert('No user found with this email');
      }
    } catch (error) {
      console.error('Error during login: ', error);
      alert('An error occurred during login');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <Button text="Login" onClick={handleLogin} />
        <p className="text-center text-gray-600 text-sm mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
