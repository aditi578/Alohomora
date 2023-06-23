import React, { useState } from 'react';
import './Home.css';
import Navbar from '../navbar/Navbar';
import '../navbar/Navbar.css';
import { BASE_URL } from '../../config'

const Home = () => {
  const [isStudentFlipped, setIsStudentFlipped] = useState(false);
  const [isBooksFlipped, setIsBooksFlipped] = useState(false);

  const flipStudentCard = () => {
    setIsStudentFlipped(!isStudentFlipped);
  };

  const flipBooksCard = () => {
    setIsBooksFlipped(!isBooksFlipped);
  };

  return (
    <div className="home-container">
      <Navbar />
      <h1 className="heading">Student Management System</h1>
      <p className="description">
        A comprehensive system to manage student information and academic records.
      </p>
      <div className="card-container">
        <div
          className={`card ${isStudentFlipped ? 'flipped' : ''}`}
          onClick={flipStudentCard}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h2>Students</h2>
            </div>
            <div className="flip-card-back">
              <div className="card-content">
                <h3>Students Section</h3>
                {isStudentFlipped && (
                  <>
                    <p>Student content goes here</p>
                    <p>You can add more content as needed</p>
                    <p>Add some lines of your own content</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`card ${isBooksFlipped ? 'flipped' : ''}`} onClick={flipBooksCard}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h2>Books</h2>
            </div>
            <div className="flip-card-back">
              <div className="card-content">
                <h3>Books Section</h3>
                {isBooksFlipped && (
                  <>
                    <p>Books content goes here</p>
                    <p>You can add more content as needed</p>
                    <p>Add some lines of your own content</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
