import { useRef, useState } from "react";
import "./Quiz.css";
import { quiz } from "../assets/quiz";
import { motion } from "framer-motion";

export function Quiz() {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(quiz[index]);
    const [score, setScore] = useState(0);
    const [lock, setLock] = useState(false);
    const [result, setResult] = useState(false);
    
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    let option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (index === quiz.length - 1) {
                setResult(true);
            }
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore((score) => score + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans - 1].current.classList.add("correct");
            }
        }
    };

    const next = () => {
        if (lock === true) {
            setIndex(index + 1);
            setQuestion(quiz[index + 1]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setQuestion(quiz[index]);
        setScore(0);
        setLock(false);
        setResult(false);
    };

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {
                result ? (
                    <>
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            You scored {score}
                        </motion.h2>
                        <button onClick={reset}>Reset</button>
                    </>
                ) : (
                    <>
                        <h2>{index + 1}. {question.question}</h2>
                        <ul>
                            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                        </ul>
                        <button onClick={next}>Next</button>
                        <div className="index">{index + 1} of {quiz.length} questions</div>
                    </>
                )
            }
        </div>
    );
}
