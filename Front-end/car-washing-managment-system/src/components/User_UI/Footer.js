import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
          <hr className="bg-light" />
      <div className="container text-center">
        <p className="mb-2">
          <i className="bi bi-telephone-fill me-2"></i>+91 9553727***
        </p>
        <p className="mb-2">
          <i className="bi bi-envelope-fill me-2"></i>Mr.Wash@Gmail.com
        </p>
      
        <p className="mb-0">&copy; {new Date().getFullYear()} Mr. Wash. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
