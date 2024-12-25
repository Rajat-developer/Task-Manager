import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/img/logo.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      
      <section className="hero">
      <img src={logo} alt="logo" style={{width:"80px", height:"80px"}}/>
        <div className="hero-content">
          <h1 className="hero-title">Manage Your Tasks with Ease</h1>
          <p className="hero-subtitle">
            The ultimate task management tool to organize your workflow and boost productivity.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary"><Link to ="/login" style={{textDecoration: "none"}}>Get Started</Link></button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <i className="feature-icon fas fa-tasks"></i>
            <h3>Task Management</h3>
            <p>Create, edit, and delete tasks effortlessly.</p>
          </div>
          <div className="feature-item">
            <i className="feature-icon fas fa-arrows-alt"></i>
            <h3>Drag-and-Drop</h3>
            <p>Update task statuses with a simple drag-and-drop.</p>
          </div>
          <div className="feature-item">
            <i className="feature-icon fas fa-sync-alt"></i>
            <h3>Real-Time Updates</h3>
            <p>Experience seamless real-time task updates.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="testimonials">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonial">
          <p>
            "This task manager has revolutionized the way I organize my work. Highly recommend!"
          </p>
          <span>- Jane Doe</span>
        </div>
        <div className="testimonial">
          <p>
            "Real-time updates and drag-and-drop make this app a game-changer for productivity."
          </p>
          <span>- John Smith</span>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>Step 1</h3>
            <p>Sign up and create your account.</p>
          </div>
          <div className="step">
            <h3>Step 2</h3>
            <p>Add your tasks and organize them effortlessly.</p>
          </div>
          <div className="step">
            <h3>Step 3</h3>
            <p>Manage your tasks and stay productive!</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 Task Manager. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
