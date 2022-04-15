import "./styles.css";
import { Fragment, useState } from "react";

export default function App() {
  // Array of objects
  // All values are changing so we use useState for questions
  const [questions, setQuestions] = useState([
    {
      // title of the questions
      title: "Sunder Pichai is CEO of",
      //options in array format
      options: ["Twitter", "Google", "Facebook", "Uber"],
      // my answer is ....
      answer: "Google",
      // Is my question isAnswered ?
      isAnswered: false,
      // Show whats the error or message
      error: false,
      // Is my answer isAnsweredCorrectly ?
      isAnsweredCorrectly: false,
      //Is my question is active or not

      isActive: false
    },
    {
      title: "Jaipur is the capital of",
      options: ["Delhi", "Rajasthan", "Uttrakhand", "Uttar Pradesh"],
      answer: "Rajasthan",
      isAnswered: false,
      error: false,
      isAnsweredCorrectly: false,
      isActive: false
    },
    {
      title: "Sum of three angles of triangle is",
      options: ["180 degree", "90 degree", "45 degree", "360 degree"],
      answer: "180 degree",
      isAnswered: false,
      error: false,
      isAnsweredCorrectly: false,
      isActive: false
    }
  ]);

  // Score storing and updating
  const [score, setScore] = useState(0);

  // Message updating related to score
  const [scoreMsg, setScoreMsg] = useState("");
  //options are changing so using useState for this
  const [select, setSelect] = useState("");
  //Is start play button clicked or not after clicking it will be inactive from the screen.
  const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);

  // save the option
  const selectOption = (event) => {
    setSelect(event.target.value);
    console.log(event.target.value);
  };

  //Made a startButton function
  const startButton = () => {
    //we can't store directly so we use tempArr to declare
    const tempArr = questions;
    //afterclicking start button function we make startbutton clicked true
    setIsStartButtonClicked(true);
    //after clicking we make first question active
    tempArr[0].isActive = true;
  };

  const updateQuestions = (index, isAnswered, isAnsweredCorrectly, error) => {
    // We can't store directly, so we use tempArr
    const tempArr = questions;
    tempArr[index].isAnswered = isAnswered; //Checking question is answerd or not
    tempArr[index].isAnsweredCorrectly = isAnsweredCorrectly; //Checking question is answered correctly or not
    tempArr[index].error = error;
    setQuestions(tempArr);
  };

  //function for updating every question
  const updateActiveQuestion = (index) => {
    const tempArr = questions;

    //present question will become inactive
    tempArr[index].isActive = false;

    if (index >= questions.length - 1) {
      setScoreMsg("Your total score is ");
    } else {
      //next question will become active
      tempArr[index + 1].isActive = true;
    }
    setQuestions(tempArr);
  };

  // checking the answer step by step
  // Using index for numbering
  const answerCheck = (index) => {
    if (select === questions[index].answer) {
      setScore(score + 1);
      updateQuestions(index, true, true, "Correct Answer");
    } else {
      setScore(score - 1);
      updateQuestions(index, true, false, "Incorrect Answer");
    }

    updateActiveQuestion(index);
  };

  return (
    <div className="App">
      <div className="quiz-container">
        <div className="quiz-container-heading">
          <h1>Quizap</h1>
        </div>

        {isStartButtonClicked ? null : (
          <div>
            <button onClick={startButton} className="button-heading">
              PLAY
            </button>
          </div>
        )}

        {questions.map((question, index) => {
          //question and index are parameters ,index is used for numbering
          // question is equal to object

          const {
            isActive,
            title,
            isAnswered,
            isAnsweredCorrectly,
            error,
            options
          } = question;

          if (isActive) {
            return (
              <div key={index} className="quizBox">
                <div className="quizQuestion">
                  <h2>Q. {title}</h2>
                </div>

                <div className="quizOption">
                  {options.map((element, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="inputQuizOption">
                          <input
                            type="radio"
                            id={element}
                            name="fav_language"
                            value={element}
                            onChange={selectOption}
                          />
                        </div>
                        <div className="labelQuizOption">
                            <label for={element}>{element}</label>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>

                <button
                  disabled={isAnswered ? true : false}
                  onClick={() => answerCheck(index)}
                >
                  Check
                </button>
                <div className="msgError">
                  {error && (
                    <h4
                      style={{
                        color: isAnsweredCorrectly ? "green" : "red"
                      }}
                    >
                      {error}
                    </h4>
                  )}
                </div>
              </div>
            );
          }
        })}

        {questions[questions.length - 1].isAnswered && (
          <div className="scoreMsg">
            {scoreMsg && (
              <>
                <h4>{scoreMsg}</h4>
                <span>{score}</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
