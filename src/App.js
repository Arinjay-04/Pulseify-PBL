// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginForm from './components/Loginform/LoginForm';
// import SignupForm from './components/SignUpForm/signUpForm';
// import image from './components/Assets/image.svg';
// import './App.css'; // Import your CSS file for styling

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <div className="form-container">
//           <Routes>
//             <Route path="/login" element={<LoginForm />} />
//             <Route path="/register" element={<SignupForm />} />
//           </Routes>
//         </div>
//         <div className="image-container">
//           <img src={image} alt="Image" width={500} height={500} />
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Loginform/LoginForm';
import SignupForm from './components/SignUpForm/signUpForm';
import loginImage from './components/Assets/image.svg'; // Import login image
import signupImage from './components/Assets/image1.svg'; // Import signup image
import './App.css'; // Import your CSS file for styling

function App() {
  return (
    <Router>
      <div className="container">
        <div className="form-container">
          <Routes>
            <Route
              path="/login"
              element={<LoginForm image={loginImage} />} // Pass login image prop
            />
            <Route
              path="/register"
              element={<SignupForm image={signupImage} />} // Pass signup image prop
            />
          </Routes>
        </div>
        <div className="image-container">
          {/* You can remove the hardcoded width and height attributes */}
          {/* as it's better to specify dimensions in CSS */}
          {/* Also, use a prop to dynamically specify the image source */}
          {/* based on the current page */}
          <img
            src={window.location.pathname === '/login' ? loginImage : signupImage}
            alt={window.location.pathname === '/login' ? 'Login Image' : 'Signup Image'}
            className="image"
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
