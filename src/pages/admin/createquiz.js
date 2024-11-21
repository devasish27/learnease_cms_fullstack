import React, { useState, useEffect } from "react";
import { Button, Box, TextField, Card, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Navbar2 from "../../components/navbar2";
import Footer from "../../components/footer";

const CreateQuiz = () => {
    const [testName, setTestName] = useState("");
    const [questions, setQuestions] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [results, setResults] = useState([]);
    const [quizDetails, setQuizDetails] = useState([]); // To store selected quiz details
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get("http://localhost:7000/quizzes", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuizzes(response.data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    const fetchResults = async (quizId) => {
        try {
            const response = await axios.get(`http://localhost:7000/quiz-results/${quizId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    };


    const fetchQuizDetails = async (quizId) => {
        try {
            const response = await axios.get(`http://localhost:7000/quiz-details/${quizId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuizDetails(response.data);
        } catch (error) {
            console.error("Error fetching quiz details:", error);
        }
    };

    const handleQuizSelection = (quiz) => {
        setSelectedQuiz(quiz);
        fetchResults(quiz.id);
        fetchQuizDetails(quiz.id);
    };

    const handleCreateQuiz = () => {
        const newQuestions = Array.from({ length: 1 }, () => ({
            question: "",
            options: ["", "", "", ""],
            correctOption: 0,
        }));
        setQuestions(newQuestions);
    };

    const saveQuiz = async () => {
        if (!testName || questions.length === 0) {
            alert("Please provide a test name and at least one question.");
            return;
        }
        console.log("Payload sent:", { testName, questions }); 
        
        try {
            await axios.post(
                "http://localhost:7000/create-quiz",
                { testName, questions },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setTestName("");
            setQuestions([]);
            fetchQuizzes(); // Refresh the quizzes after saving
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };
    

    return (
        <div className="QuizApp" >
            <Navbar2 />
        <Box p={3} sx={{ marginTop: "70px", height:'740px' }}>
            <Button variant="contained" onClick={handleCreateQuiz}>
                Create Quiz
            </Button>
            {questions.length > 0 && (
                <Box mt={2}>
                    <TextField
                        label="Test Name"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    {questions.map((q, idx) => (
                        <Box key={idx} mb={2}>
                            <TextField
                                label={`Question ${idx + 1}`}
                                value={q.question}
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[idx].question = e.target.value;
                                    setQuestions(updatedQuestions);
                                }}
                                fullWidth
                            />
                            {[0, 1, 2, 3].map((optIdx) => (
                                <TextField
                                    key={optIdx}
                                    label={`Option ${optIdx + 1}`}
                                    value={q.options[optIdx]}
                                    onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[idx].options[optIdx] = e.target.value;
                                        setQuestions(updatedQuestions);
                                    }}
                                    fullWidth
                                    margin="normal"
                                />
                            ))}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Correct Option</InputLabel>
                                <Select
                                    value={q.correctOption}
                                    onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[idx].correctOption = e.target.value;
                                        setQuestions(updatedQuestions);
                                    }}
                                >
                                    {[0, 1, 2, 3].map((optIdx) => (
                                        <MenuItem key={optIdx} value={optIdx}>
                                            Option {optIdx + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    ))}
                    <Button variant="contained" onClick={saveQuiz}>
                        Save Quiz
                    </Button>
                </Box>
            )}

<Box mt={5}>
                <Typography variant="h6">Quizzes</Typography>
                {quizzes.map((quiz) => (
                    <Card
                        key={quiz.id}
                        style={{
                            marginBottom: "10px",
                            backgroundColor: selectedQuiz?.id === quiz.id ? "#e0f7fa" : "#f5f5f5",
                            cursor: "pointer",
                        }}
                        onClick={() => handleQuizSelection(quiz)}
                    >
                        <Box p={2}>
                            <Typography>{quiz.test_name}</Typography>
                        </Box>
                    </Card>
                ))}
            </Box>

            {selectedQuiz && (
                <Box mt={5}>
                    <Typography variant="h6">Quiz Details: {selectedQuiz.test_name}</Typography>
                    <Box mt={2}>
                        {quizDetails.map((detail, index) => (
                            <Box key={detail.question_id} mb={2}>
                                <Typography variant="subtitle1">
                                    Q{index + 1}: {detail.question_text}
                                </Typography>
                                <Typography variant="body2">
                                    Options: {JSON.parse(detail.options).join(", ")}
                                </Typography>
                                <Typography variant="body2">
                                    Correct Option: Option {detail.correct_option + 1}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

            {selectedQuiz && (
                <Box mt={5}>
                    <Typography variant="h6">Results for Quiz: {selectedQuiz.test_name}</Typography>
                    <Box style={{ height: 400, width: "100%" }}>
                        {results.length > 0 ? (
                            <DataGrid
                                rows={results.map((result, index) => ({
                                    id: index + 1,
                                    studentName: result.student_name,
                                    score: result.score,
                                }))}
                                columns={[
                                    { field: "id", headerName: "ID", width: 70 },
                                    { field: "studentName", headerName: "Student Name", width: 200 },
                                    { field: "score", headerName: "Score", width: 130 },
                                ]}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
                        ) : (
                            <Typography variant="body1" style={{ textAlign: "center", marginTop: 20 }}>
                                No results available.
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
        <Footer />
        </div>
    );
};

export default CreateQuiz;
