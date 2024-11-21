import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Box,
  Typography,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import axios from "axios";
import Navbar3 from "../../components/navbar3";

const TakeQuiz = () => {
  const [quizzes, setQuizzes] = useState([]); // List of available quizzes
  const [currentQuiz, setCurrentQuiz] = useState(null); // Selected quiz
  const [answers, setAnswers] = useState([]); // User's answers
  const [score, setScore] = useState(null); // Final score
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility state
  const token = JSON.parse(localStorage.getItem("token")); // Authentication token

  // Fetch quizzes when the component mounts
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:7000/quizzes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setQuizzes(response.data); // Set the list of quizzes
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  // Start the quiz by selecting a quiz and opening the modal
  const handleStartQuiz = (quiz) => {
    console.log("Selected quiz data:", quiz); // Debugging log
    if (!quiz?.question || !Array.isArray(quiz.question)) {
        console.error("Selected quiz does not have a question property");
        return;
    }
    setCurrentQuiz(quiz);
    setAnswers(Array(quiz.question.length).fill(null));
    setModalOpen(true);
};


  // Accept the terms and begin the quiz
  const acceptTerms = () => {
    setAnswers(Array(currentQuiz?.question?.length || 0).fill(null)); // Initialize answers array
    setModalOpen(false); // Close the modal
  };

  // Submit the quiz and calculate the score
  const submitQuiz = async () => {
    const calculatedScore = answers.reduce((acc, answer, idx) => {
      return acc + (answer === currentQuiz.question[idx].correctOption ? 1 : 0);
    }, 0);
    setScore(calculatedScore); // Update the score

    try {
      await axios.post(
        "http://localhost:7000/submit-quiz",
        {
          studentId: 1, // Replace with actual logged-in student ID
          quizId: currentQuiz.id,
          score: calculatedScore,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <Box id="take-quiz-container" p={3}>
      <Navbar3 />
      {currentQuiz ? (
        <Box id="quiz-section">
          <Typography id="quiz-title" variant="h5">
            {currentQuiz.test_name}
          </Typography>
          {currentQuiz.question?.map((q, idx) => (
            <Box key={idx} className="quiz-question" mb={2}>
              <Typography>{q.question}</Typography>
              {q.options.map((opt, optIdx) => (
                <Button
                  key={optIdx}
                  variant={answers[idx] === optIdx ? "contained" : "outlined"}
                  className="quiz-option"
                  onClick={() => {
                    const updatedAnswers = [...answers];
                    updatedAnswers[idx] = optIdx;
                    setAnswers(updatedAnswers);
                  }}
                >
                  {opt}
                </Button>
              ))}
            </Box>
          ))}
          <Button id="submit-quiz-button" variant="contained" onClick={submitQuiz}>
            Submit
          </Button>
          {score !== null && (
            <Typography id="quiz-score">Your Score: {score}</Typography>
          )}
        </Box>
      ) : (
        <Box id="quiz-selection-section" sx={{marginTop:"70px"}}>
          <Typography variant="h6">Available Quizzes</Typography>
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              onClick={() => handleStartQuiz(quiz)}
              className="quiz-card"
            >
              <Box p={2}>
                <Typography>{quiz.test_name}</Typography>
              </Box>
            </Card>
          ))}
        </Box>
      )}

      {/* Modal for Terms Agreement */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
          <Box id="terms-modal" p={3} bgcolor="background.paper">
            <Typography variant="h6">Before You Begin</Typography>
            <Typography>
              Please agree to not engage in any malpractice during the quiz.
              Ensure a quiet environment and fair attempt.
            </Typography>
            <Button
              id="accept-terms-button"
              variant="contained"
              onClick={acceptTerms}
            >
              Accept & Start
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default TakeQuiz;