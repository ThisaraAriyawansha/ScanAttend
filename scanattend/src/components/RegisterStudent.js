import React, { useState } from 'react';

const RegisterStudent = () => {
  const [student, setStudent] = useState({ name: '', age: '', course: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle student registration logic here
    console.log('Student registered:', student);
  };

  return (
    <div className="register-student">
      <h2>Register Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={student.name} onChange={handleChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={student.age} onChange={handleChange} />
        </div>
        <div>
          <label>Course:</label>
          <input type="text" name="course" value={student.course} onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterStudent;
