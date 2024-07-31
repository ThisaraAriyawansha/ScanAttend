import React, { useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([
    { name: 'John Doe', age: 20, course: 'Computer Science' },
    { name: 'Jane Smith', age: 22, course: 'Mathematics' },
    // Add more students as needed
  ]);

  return (
    <div className="student-list">
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
