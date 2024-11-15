// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { db } from '../firebase-config'; // Ensure this import is correct
// import { collection, addDoc } from 'firebase/firestore';
// import FormInput from '../components/FormInput';
// import Button from '../components/Button';

// // Function to send the mutation or query for key generation
// const generateKeys = async () => {
//   const url = "https://cloud.resilientdb.com/graphql";
//   const headers = {
//     "Content-Type": "application/json",
//   };

//   const mutation_generate_keys = `
//     mutation {
//       generateKeys {
//         publicKey
//         privateKey
//       }
//     }
//   `;

//   const payload = { query: mutation_generate_keys };

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(payload),
//     });

//     const result = await response.json();
//     const publicKey = result?.data?.generateKeys?.publicKey;
//     const privateKey = result?.data?.generateKeys?.privateKey;

//     if (publicKey && privateKey) {
//       return { publicKey, privateKey };
//     } else {
//       throw new Error('Failed to generate keys');
//     }
//   } catch (error) {
//     console.error('Error generating keys:', error);
//     throw error;
//   }
// };

// const SignupPage = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [type, setType] = useState('Patient'); // New state for user type
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       // Generate keys for the user
//       const { publicKey, privateKey } = await generateKeys();

//       // Store user data in Firestore
//       await addDoc(collection(db, 'users'), {
//         username,
//         email,
//         password,
//         type,
//         publicKey,
//         privateKey,
//         createdAt: new Date(), // Add a timestamp
//       });

//       console.log('User successfully signed up with keys');
//       navigate('/home'); // Redirect to Home Page
//     } catch (error) {
//       console.error('Error during signup: ', error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        
//         <FormInput
//           label="Username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter your username"
//         />
        
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
        
//         {/* Styled Select for user type */}
//         <div className="mb-4">
//           <label htmlFor="user-type" className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
//           <select
//             id="user-type"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value="Patient">Patient</option>
//             <option value="Admin">Admin</option>
//             <option value="Doctor">Doctor</option>
//           </select>
//         </div>

//         <Button text="Signup" onClick={handleSignup} />
        
//         <p className="text-center text-gray-600 text-sm mt-4">
//           Already have an account?{' '}
//           <Link to="/" className="text-blue-500 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config'; // Ensure this import is correct
import { collection, addDoc } from 'firebase/firestore';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

// Function to send the mutation or query for key generation
const generateKeys = async () => {
  const url = "https://cloud.resilientdb.com/graphql";
  const headers = {
    "Content-Type": "application/json",
  };

  const mutation_generate_keys = `
    mutation {
      generateKeys {
        publicKey
        privateKey
      }
    }
  `;

  const payload = { query: mutation_generate_keys };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    const publicKey = result?.data?.generateKeys?.publicKey;
    const privateKey = result?.data?.generateKeys?.privateKey;

    if (publicKey && privateKey) {
      return { publicKey, privateKey };
    } else {
      throw new Error('Failed to generate keys');
    }
  } catch (error) {
    console.error('Error generating keys:', error);
    throw error;
  }
};

// Function to hash the password using the private key
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

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Patient'); // New state for user type
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Generate keys for the user
      const { publicKey, privateKey } = await generateKeys();

      // Hash the password using the private key
      const hashedPassword = await hashPassword(password, privateKey);

      // Store user data in Firestore
      await addDoc(collection(db, 'users'), {
        username,
        email,
        password: hashedPassword,  // Store the hashed password
        type,
        publicKey,
        privateKey,
        createdAt: new Date(), // Add a timestamp
      });

      console.log('User successfully signed up with hashed password and keys');
      navigate('/home'); // Redirect to Home Page
    } catch (error) {
      console.error('Error during signup: ', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        
        <FormInput
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        
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
        
        {/* Styled Select for user type */}
        <div className="mb-4">
          <label htmlFor="user-type" className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
          <select
            id="user-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Patient">Patient</option>
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <Button text="Signup" onClick={handleSignup} />
        
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
