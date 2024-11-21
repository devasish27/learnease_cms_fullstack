const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
// const { console } = require('inspector');



app.use(cors());
app.use(bodyParser.json());
const PORT = 7000;


// Database Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'learnadmins'
});

connection.connect((err) => {
    if (!err) {
        console.log('Database connection successful');
    } else {
        console.log('Database connection failed:', err);
    }
});




// Login API with role-based authentication
// login api




app.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
      }

      connection.query('SELECT * FROM login WHERE email = ?', [email], async (err, results) => {
          if (err) {
              console.error("Database query error:", err);
              return res.status(500).json({ message: "Internal server error" });
          }

          if (!results || results.length === 0) {
              return res.status(202).json({ message: "Invalid email" });
          }

          try {
              const isValidPassword = await bcrypt.compare(password, results[0].password);
              if (isValidPassword) {
                const token = jwt.sign(
                  { payload: results[0] }, 
                  "my_scerect"
              );

              return res.status(200).json({ 
                  message: 'Login successful', 
                  role: results[0].role, 
                  token 
              });
                 
              }
              else{
            
                return res.status(202).json({ message: "Invalid password" });
              }

              
          } catch (hashError) {
              console.error("Password comparison error:", hashError);
              return res.status(500).json({ message: "Internal server error" });
          }
      });
  } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
});

  // Check in admins table
//   connection.query(
//     `SELECT * FROM admins WHERE email = ? AND password = ?`,
//     [Email, Password],
//     (err, results) => {
//       if (err) {
//         return response.status(500).json({ error: "Database error" });
//       } else if (results.length > 0) {
//         // If user is an admin
//         const user = results[0];
//         return response.status(200).json({ message: 'Login successful', role: "admin", token });
//       } else {
//         // Check in students table
//         connection.query(
//           `SELECT * FROM students WHERE email = ? AND password = ?`,
//           [Email, Password],
//           (err, results) => {
//             if (err) {
//               return response.status(500).json({ error: "Database error" });
//             } else if (results.length > 0) {
//               // If user is a student
//               const user = results[0];
//               const token = jwt.sign({ id: user.id, role: "student" }, 'yourSecretKey', { expiresIn: '1h' });
//               return response.status(200).json({ message: 'Login successful', role: "student", token });
//             } else {
//               // Check in faculty table
//               connection.query(
//                 `SELECT * FROM faculty WHERE email = ? AND password = ?`,
//                 [Email, Password],
//                 (err, results) => {
//                   if (err) {
//                     return response.status(500).json({ error: "Database error" });
//                   } else if (results.length > 0) {
//                     // If user is a faculty member
//                     const user = results[0];
//                     const token = jwt.sign({ id: user.id, role: "faculty" }, 'yourSecretKey', { expiresIn: '1h' });
//                     return response.status(200).json({ message: 'Login successful', role: "faculty", token });
//                   } else {
                    // User not found in any table
                    // return response.status(401).json({ message: "Invalid credentials" });
//                   }
//                 }
//               );
//             }
//           }
//         );
//       }
//     }
//   );


// Middleware to authenticate token and check role

const checkAuth = (req, res, next) => {
  try {
      const authHeader = req.headers['authorization'];
      
      if (!authHeader) {
          return res.status(401).json({ error: 'Authorization header is required.' });
      }

      const token =authHeader.split(' ')[1];
      
      if (!token) {
        
          return res.status(401).json({ error: 'Token is missing.' });
      }
      
      jwt.verify(token,"my_scerect", (err, decoded) => {
        
          if (err) {
            console.log(err.message)
              return res.status(403).json({ error: 'Invalid or expired token.' });

          }
          
          req.user = decoded.payload;
       
          next();
      });
  } catch (error) {
      return res.status(500).json({ error: 'Authentication error' });
  }
};



const verifyRole = (allowedRoles) => (req, res, next) => {
  try {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) {
          return res.status(403).json({ message: 'Token is required' });
      }

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
              return res.status(403).json({ message: 'Invalid token' });
          }

          if (!allowedRoles.includes(decoded.payload.role)) {
              return res.status(403).json({ message: 'Access denied' });
          }

          req.user = decoded.payload;
          next();
      });
  } catch (error) {
      return res.status(500).json({ error: 'Role verification error' });
  }
};


module.exports = verifyRole;


const router = express.Router();


// Route protection based on role
router.get('/home2', verifyRole(['admin']), (req, res) => {
  res.send("Welcome, Admin!");
});

router.get('/stuhome', verifyRole(['student']), (req, res) => {
  res.send("Welcome, Student!");
});

router.get('/fachome', verifyRole(['faculty']), (req, res) => {
  res.send("Welcome, Faculty!");
});

router.get('/hodhome', verifyRole(['hod']), (req, res) => {
  res.send("Welcome, Hod!");
});

module.exports = router;

// OTP Sending API
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
        connection.query('SELECT * FROM login WHERE email = ?', [email],(err,user)=>{
          if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        else if(err){
          return res.status(500).json({ message: "Internal Server Error" });
        }

        else{
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000; 
        const id=user[0].userid;
        const useremail=user[0].email 
        
        connection.query('INSERT INTO otp(userid, email, otp, expiresat) VALUES ("'+id+'","'+useremail+'","'+otp+'","'+expiresAt+'")',((err,row)=>{
          if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
          }
          else{
           
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: 'learnease25@gmail.com',
                  pass: 'ipev fxlf dzfu drmv'
              }
          });
        const mailOptions = {
            from: 'learnease25@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP email:', error);
                return res.status(500).json({ message: "Error sending email" });
            }
            res.status(200).json({ message: "OTP sent to your email", id:id,otp:otp });
        }); }
        }))


       
}})
});

// Password Reset API
app.post('/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;
  
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
  
    // First, verify if OTP exists in the otp table
    connection.query('SELECT * FROM otp WHERE email = ? and otp=?', [email,otp], (err, row) => {
  
      if (err) {
        
        return res.status(500).json({ message: "Internal Server Error" });
      } else if (row.length === 0) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      // Hash the new password before updating it
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      connection.query('select * from login where email=?',[email],(err,result)=>{
          if(!err){
           
            connection.query(`UPDATE ${result[0].role}  SET password = ? WHERE email = ?`, [hashedPassword, email], (err) => {
              if (err) {
                return res.status(500).json({ message: "Internal Server Error" });
              }
          
      })}})
      // Update the user's password in the users table
      connection.query('UPDATE login  SET password = ? WHERE email = ?', [hashedPassword, email], (err) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
  
        // Delete OTP record from the otp table after successful password reset
        connection.query('DELETE FROM otp WHERE email = ?', [email], (err) => {
          if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
          }
  
          return res.status(200).json({ message: "Password reset successfully" });
        });
      });
    });
  });

// Branch APIs
app.get("/branches",checkAuth, (req, res) => {
    const query = `SELECT * FROM branches`;
    connection.query(query, (err, results) => {
        if (!err) {
            res.status(200).json(results);
        } else {
            res.status(500).json({ error: `Error: ${err}` });
        }
    });
});

app.post("/addbranch",checkAuth, (req, res) => {
    const { branch } = req.body;
    const query = `INSERT INTO branches (name) VALUES (?)`;
    connection.query(query, [branch], (err) => {
        if (!err) {
            res.status(200).send('Branch added');
        } else {
            res.status(500).json({ error: `Error: ${err}` });
        }
    });
});

app.delete("/branch/:id",checkAuth, (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM branches WHERE id = ?`;
    connection.query(query, [id], (err) => {
        if (!err) {
            res.status(200).send({ message: 'Branch deleted' });
        } else {
            res.status(500).json({ error: `Error: ${err}` });
        }
    });
});



// Student APIs
app.get('/students',checkAuth, (req, res) => {
    const sql = `SELECT * FROM students`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Error fetching students" });
        res.json(results);
    });
});

app.post('/students',checkAuth, async(req, res) => {
    const {name,email,password,age,gender,branch,phone_number,
        course_duration,
        course_fee,
        total_fee}=req.body;

        
        const now = new Date();

        // Manually format the date and time
        const formattedDate = `${now.getFullYear()}/${
          (now.getMonth() + 1).toString().padStart(2, '0')
        }/${now.getDate().toString().padStart(2, '0')} ${
          now.getHours().toString().padStart(2, '0')
        }:${now.getMinutes().toString().padStart(2, '0')}:${now
          .getSeconds()
          .toString()
          .padStart(2, '0')}`;
        
        console.log("Current date and time: " + formattedDate);
        
       
        const hashpass=await bcrypt.hash(password,10);
        connection.query('select * from login where email=?',[email],(err,result)=>{
          if(result.length>0){
            return res.status(202).json({error:"Email already exists"})
            }
          else{
            let sql = `INSERT INTO students(name,email,password,age,gender,branch,phone_number,joindate,course_duration,course_fee,total_fee) values('${name}','${email}','${hashpass}',${age},'${gender}','${branch}',${phone_number},'${formattedDate}',${course_duration
            },${ course_fee
            },${ total_fee})`;
            connection.query(sql,(err, result) => {
                 if (err) {
                     console.error("Error adding student:", err);
                     return res.status(500).json({ error: "Error adding student" });
                 }
                 
            console.log("Student added in login  with ID:", result.insertId);
                connection.query(`insert into login(userid,email,password,role) values(${result.insertId},'${email}','${hashpass}','students')`,(err, result) => {
                  if (err) {
                      console.error("Error adding student into login :", err);
                      return res.status(500).json({ error: "Error adding student" });
                  } 
                  res.status(200).json({ message: 'Student added', id: result.insertId });
                  })
                
            });
          }
        })     
});


app.put('/students/:id',checkAuth, (req, res) => {
    const updatedData = req.body;
    
    const sql = `UPDATE students SET ? WHERE id = ?`;
    connection.query(sql, [updatedData, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: "Error updating student" });

        res.status(200).json({ message: 'Student updated' });
    });
});


app.delete('/students/:id',checkAuth, (req, res) => {
  // First, get the email associated with the student ID
  connection.query('SELECT email FROM students WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error retrieving student" });
    }

    // Check if a student with the given ID exists
    if (result.length > 0) {
      const email = result[0].email; // Store the email from the result

      // Delete from the login table
      connection.query('DELETE FROM login WHERE email = ?', [email], (err) => {
        if (err) {
          return res.status(500).json({ error: "Error deleting student from login" });
        }

        // Now, delete the student from the students table
        connection.query('DELETE FROM students WHERE id = ?', [req.params.id], (err) => {
          if (err) {
            return res.status(500).json({ error: "Error deleting student" });
          }

          // Respond with a 204 No Content status
          res.status(204).send(); // Send no content
        });
      });
    } else {
      // If no student found with the given ID
      res.status(404).json({ error: "Student not found" });
    }
  });
});

      

app.get('/students/:id',checkAuth, (req, res) => {
    const sql = `SELECT * FROM students WHERE id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error fetching student" });
        res.send(result[0]);
    });
});



// Faculty APIs
app.get('/faculty',checkAuth, (req, res) => {
    const sql = `SELECT * FROM faculty`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Error fetching faculty" });
        res.send(results);
    });
});



app.post('/faculty', checkAuth, async (req, res) => {
  const { name, email, password, age, gender, branch, phone_number } = req.body;

  try {
      // Hashing the password
      const hashpass = await bcrypt.hash(password, 10);

      // Check if email already exists
      connection.query('SELECT * FROM login WHERE email = ?', [email], (err, result) => {
          if (err) {
              console.error("Error checking existing email:", err);
              return res.status(500).json({ error: "Internal server error" });
          }

          if (result.length > 0) {
              return res.status(409).json({ error: "Email already exists" });
          }

          // Insert faculty details into the faculty table
          const sql = `INSERT INTO faculty (name, email, password, age, gender, branch, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
          connection.query(sql, [name, email, hashpass, age, gender, branch, phone_number], (err, result) => {
              if (err) {
                  console.error("Error adding faculty:", err);
                  return res.status(500).json({ error: "Error adding faculty" });
              }

              const facultyId = result.insertId;

              // Add login details for the faculty
              const loginSql = `INSERT INTO login (userid, email, password, role) VALUES (?, ?, ?, 'faculty')`;
              connection.query(loginSql, [facultyId, email, hashpass], (err) => {
                  if (err) {
                      console.error("Error adding faculty login details:", err);
                      return res.status(500).json({ error: "Error adding faculty" });
                  }

                  res.status(201).json({ message: "Faculty added successfully", id: facultyId });
              });
          });
      });
  } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


app.delete('/faculty/:id',checkAuth, (req, res) => {
    const sql = `SELECT email FROM faculty WHERE id = ?`;
    connection.query(sql, [req.params.id],  [req.params.id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error retrieving student" });
      }
        
        if (result.length > 0) {
          const email = result[0].email; // Store the email from the result
    
          connection.query('DELETE FROM login WHERE email = ?', [email], (err) => {
            if (err) {
              return res.status(500).json({ error: "Error deleting staff from login" });
            }
    
            // Now, delete the student from the students table
            connection.query('DELETE FROM faculty WHERE id = ?', [req.params.id], (err) => {
              if (err) {
                return res.status(500).json({ error: "Error deleting staff" });
              }
    
              // Respond with a 204 No Content status
              res.status(204).send(); // Send no content
            });
          });
        } else {
          // If no student found with the given ID
          res.status(404).json({ error: "Staff not found" });
        }
      });
    });


app.put('/faculty/:id',checkAuth, (req, res) => {
    const updatedData = req.body;
    
    const sql = `UPDATE faculty SET ? WHERE id = ?`;
    connection.query(sql, [updatedData, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: "Error updating staff" });

        res.status(200).json({ message: 'Staff updated' });
    });
});

app.get('/faculty/:id',checkAuth, (req, res) => {
  const sql = `SELECT * FROM faculty WHERE id = ?`;
  connection.query(sql, [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error fetching staff" });
      res.send(result[0]);
  });
});


// Authentication middleware
app.get('/student/profile', checkAuth, (req, res) => {
  const studentId = req.user.userid; // Extracted from the token payload
  console.log(studentId)
  const sql = `SELECT name, email, age, branch, phone_number FROM students WHERE id = ?`;
  connection.query(sql, [studentId], (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching student profile" });
    
    res.json(result[0]); // Send the student's profile details
  });
});

app.get('/faculty/profile', checkAuth, (req, res) => {
  const facultyId = req.user.userid; // Extracted from the token payload
  console.log(facultyId)
  const sql = `SELECT name, email, age, phone_number, branch FROM faculty WHERE id = ?`;
  connection.query(sql, [facultyId], (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching staff profile" });
    
    res.json(result[0]);
  });
});


app.get('/hod/profile', checkAuth, (req, res) => {
  const hodId = req.user.userid; // Extracted from the token payload
  console.log(hodId); // Ensure this is the correct value
  const sql = `SELECT name, email, branch, phone_number FROM hod1 WHERE id = ?`;

  connection.query(sql, [hodId], (err, result) => {
    if (err) {
      console.error("Error fetching HOD profile:", err);
      return res.status(500).json({ error: "Error fetching HOD profile" });
    }
    
    if (result.length > 0) {
      res.json(result[0]); // Send the HOD profile details
    } else {
      res.status(404).json({ error: "HOD profile not found" });
    }
  });
});

//hod

// Student APIs
app.get('/hod',checkAuth, (req, res) => {
  const sql = `SELECT * FROM hod1`;
  connection.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: "Error fetching" });
      res.json(results);
  });
});

app.post('/hod',checkAuth, async(req, res) => {
  const {name,email,password,branch,phone_number}=req.body;

      
     
      const hashpass=await bcrypt.hash(password,10);
      connection.query('select * from login where email=?',[email],(err,result)=>{
        if(result.length>0){
          return res.status(202).json({error:"Email already exists"})
          }
        else{
          let sql = `INSERT INTO hod1(name,email,password,branch,phone_number) values('${name}','${email}','${hashpass}','${branch}',${phone_number})`;
          connection.query(sql,(err, result) => {
               if (err) {
                   console.error("Error adding :", err);
                   return res.status(500).json({ error: "Error adding" });
               }
               
          console.log("hod added in login  with ID:", result.insertId);
              connection.query(`insert into login(userid,email,password,role) values(${result.insertId},'${email}','${hashpass}','hod')`,(err, result) => {
                if (err) {
                    console.error("Error adding hod into login :", err);
                    return res.status(500).json({ error: "Error adding " });
                } 
                res.status(200).json({ message: 'hod added', id: result.insertId });
                })
              
          });
        }
      })     
});


app.put('/hod/:id',checkAuth, (req, res) => {
  const updatedData = req.body;
  
  const sql = `UPDATE hod1 SET ? WHERE id = ?`;
  connection.query(sql, [updatedData, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: "Error updating" });

      res.status(200).json({ message: ' updated' });
  });
});


app.delete('/hod/:id',checkAuth, (req, res) => {
// First, get the email associated with the student ID
connection.query('SELECT email FROM hod1 WHERE id = ?', [req.params.id], (err, result) => {
  if (err) {
    return res.status(500).json({ error: "Error retrieving " });
  }

  // Check if a student with the given ID exists
  if (result.length > 0) {
    const email = result[0].email; // Store the email from the result

    // Delete from the login table
    connection.query('DELETE FROM login WHERE email = ?', [email], (err) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting hod from login" });
      }

      // Now, delete the student from the students table
      connection.query('DELETE FROM hod1 WHERE id = ?', [req.params.id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Error deleting " });
        }

        // Respond with a 204 No Content status
        res.status(204).send(); // Send no content
      });
    });
  } else {
    // If no student found with the given ID
    res.status(404).json({ error: " not found" });
  }
});
});

    

app.get('/hod/:id',checkAuth, (req, res) => {
  const sql = `SELECT * FROM hod1 WHERE id = ?`;
  connection.query(sql, [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error fetching " });
      res.send(result[0]);
  });
});



// Create Quiz
// app.post("/create-quiz", checkAuth, async (req, res) => {
//   const { testName, questions } = req.body;


//   console.log("Payload received:", req.body);

//   if (!testName || !Array.isArray(questions) || questions.length === 0) {
//       return res.status(400).send("Test name and a valid questions array are required.");
//   }

//   const isValidQuestions = questions.every(
//       (q) => q.question && Array.isArray(q.options) && q.options.length > 0 && q.correctOption !== undefined
//   );
//   if (!isValidQuestions) {
//       return res.status(400).send("Each question must include question text, options, and a correctOption.");
//   }

//   try {
//       const [quizResult] = await connection.query("INSERT INTO quizzes (test_name) VALUES (?)", [testName]);
//       const quizId = quizResult.insertId;

//       const questionPromises = questions.map((question) =>
//           connection.query(
//               "INSERT INTO questions (quiz_id, question_text, options, correct_option) VALUES (?, ?, ?, ?)",
//               [quizId, question.question, JSON.stringify(question.options), question.correctOption]
//           )
//       );

//       await Promise.all(questionPromises);
//       res.status(201).send("Quiz created successfully.");
//   } catch (error) {
//       console.error("Error creating quiz:", error);
//       res.status(500).send("Error creating quiz.");
//   }
// });



//count
// API to fetch counts for students and faculty
// app.get('/getCounts',checkAuth, async (req, res) => {
//   const branch = req.query.branch;
//   const studentQuery = 'SELECT COUNT(*) AS count FROM students WHERE branch = ?';
//   const facultyQuery = 'SELECT COUNT(*) AS count FROM faculty WHERE branch = ?';

//   let counts = { students: 0, faculty: 0 };

//   connection.query(studentQuery, [branch], (err, studentResult) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       counts.students = studentResult[0].count;

//       connection.query(facultyQuery, [branch], (err, facultyResult) => {
//         if (err) {
//           res.status(500).send(err);
//         } else {
//           counts.faculty = facultyResult[0].count;
//           res.send(counts);
//         }
//       });
//     }
//   });
// });

// API to fetch students by branch
app.get('/getStudents/', checkAuth, async (req, res) => {
  const branch = req.query.branch;
  
  if (!branch) {
    return res.status(400).json({ error: 'Branch parameter is missing' });
  }

  const query = `SELECT * FROM students WHERE branch = '${branch}'`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).send(err);
    } else {
      if (result.length === 0) {
        return res.status(404).json({ message: 'No students found for this branch' });
      }
      res.send(result);
    }
  });
});

// API to fetch faculty by branch
app.get('/getFaculty',checkAuth, async (req, res) => {
  const branch = req.query.branch;
  const query = 'SELECT *  FROM faculty WHERE branch = ?';
  connection.query(query, [branch], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

    
// API to fetch counts for students and faculty across branches or for a specific branch
app.get('/getCounts', checkAuth, (req, res) => {
  const branch = req.query.branch;

  const counts = { students: 0, faculty: 0 };

  const studentQuery = branch && branch !== "All" 
    ? 'SELECT COUNT(*) AS count FROM students WHERE branch = ?' 
    : 'SELECT COUNT(*) AS count FROM students';
  
  const facultyQuery = branch && branch !== "All" 
    ? 'SELECT COUNT(*) AS count FROM faculty WHERE branch = ?' 
    : 'SELECT COUNT(*) AS count FROM faculty';

  connection.query(studentQuery, branch ? [branch] : [], (err, studentResult) => {
    if (err) {
      console.error("Error fetching student count:", err);
      return res.status(500).json({ error: "Error fetching student count" });
    }
    counts.students = studentResult[0].count;

    connection.query(facultyQuery, branch ? [branch] : [], (err, facultyResult) => {
      if (err) {
        console.error("Error fetching faculty count:", err);
        return res.status(500).json({ error: "Error fetching faculty count" });
      }
      counts.faculty = facultyResult[0].count;
      res.status(200).json(counts);
    });
  });
});


// Get All Quizzes
// 1. Fetch All Quizzes with Questions
app.get("/quizzes", checkAuth, async (req, res) => {
  try {
    const [rows] = await connection.query(`
      SELECT q.id, q.test_name, 
             GROUP_CONCAT(
                 CONCAT(
                     '{"question":"', qs.question_text, 
                     '", "options":', qs.options, 
                     ', "correctOption":', qs.correct_option, 
                     '}'
                 )
             ) AS questions
      FROM quizzes q
      LEFT JOIN questions qs ON q.id = qs.quiz_id
      GROUP BY q.id
    `);

    console.log("Rows structure:", rows);// Debugging log

    const formattedQuizzes = rows.map((quiz) => ({
      ...quiz,
      questions: quiz.questions ? JSON.parse(`[${quiz.questions}]`) : [],
    }));

    res.status(200).json(formattedQuizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).send("Error fetching quizzes.");
  }
});



// 2. Create a New Quiz with Questions
app.post("/create-quiz", checkAuth, async (req, res) => {
  const { testName, questions } = req.body;

  if (!testName || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).send("Test name and valid questions are required.");
  }

  const isValidQuestions = questions.every(
    (q) =>
      q.question &&
      Array.isArray(q.options) &&
      q.options.length > 0 &&
      q.correctOption !== undefined
  );

  if (!isValidQuestions) {
    return res
      .status(400)
      .send("Each question must include text, options, and a correct option.");
  }

  try {
    const [quizResult] = await connection.query(
      "INSERT INTO quizzes (test_name) VALUES (?)",
      [testName]
    );
    const quizId = quizResult.insertId;

    const questionPromises = questions.map((q) =>
      connection.query(
        "INSERT INTO questions (quiz_id, question_text, options, correct_option) VALUES (?, ?, ?, ?)",
        [quizId, q.question, JSON.stringify(q.options), q.correctOption]
      )
    );

    await Promise.all(questionPromises);
    res.status(201).send("Quiz created successfully.");
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).send("Error creating quiz.");
  }
});

// 3. Fetch a Specific Quiz with Questions
app.get("/quiz/:id", checkAuth, async (req, res) => {
  try {
    const quizId = req.params.id;
    const [quiz] = await connection.query(
      "SELECT * FROM quizzes WHERE id = ?",
      [quizId]
    );
    const questions = await connection.query(
      "SELECT question_text AS question, options, correct_option AS correctOption FROM questions WHERE quiz_id = ?",
      [quizId]
    );

    if (!quiz.length) return res.status(404).send("Quiz not found");
    res.status(200).json({ ...quiz[0], questions });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).send("Error fetching quiz.");
  }
});

// 4. Submit Quiz Results
app.post("/submit-quiz", checkAuth, async (req, res) => {
  const { studentId, quizId, score } = req.body;

  if (!studentId || !quizId || score === undefined) {
    return res.status(400).send("Student ID, Quiz ID, and score are required.");
  }

  try {
    await connection.query(
      "INSERT INTO quiz_results (student_id, quiz_id, score) VALUES (?, ?, ?)",
      [studentId, quizId, score]
    );
    res.status(200).send("Quiz submitted successfully.");
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).send("Error submitting quiz.");
  }
});

// 5. Get Quiz Results for a Specific Quiz
app.get("/quiz-results/:quizId", checkAuth, async (req, res) => {
  const { quizId } = req.params;

  try {
    const results = await connection.query(
      `SELECT qr.*, s.name AS student_name 
       FROM quiz_results qr 
       JOIN students s ON qr.student_id = s.id 
       WHERE qr.quiz_id = ?`,
      [quizId]
    );
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).send("Error fetching results.");
  }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});