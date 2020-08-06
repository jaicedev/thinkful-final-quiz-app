// Home Screen Configuration

function homeScreen(){
    $('#js-quiz').hide();
    $('#js-correct').hide();
    $('#js-incorrect').hide();
    $('#js-final').hide();
    $('#js-start').on('click', function(e){
        $('#js-start-screen').hide();
        renderQuiz();
    });
}
// Renders the current score and question count.
function renderScoreAndCount(){
    $('#js-count').text('Question: ' + (STORE.currentQuestion + 1) + '/' + STORE.questions.length)
    $('#js-score').text('Score: ' + STORE.currentScore)
}

// Used to render current question
function renderQuestion(){
    $('#js-question').text(STORE.questions[STORE.currentQuestion].question)
}

// Used to render choices for current question
function renderChoices(){
    $('#js-choices').html(
        '<fieldset>' +
        '<legend hidden>Question Choices</legend>' +
        '<label for="choice-0" class="sr-only">Choice 1</label>' +
        `<li class="choice" aria-label="choice-1"><input id="choice-0" name="choice" value="${STORE.questions[STORE.currentQuestion].options[0]}" type="radio">${STORE.questions[STORE.currentQuestion].options[0]}</input></li>` +
        '<label for="choice-1" class="sr-only">Choice 2</label>' +
        `<li class="choice" aria-label="choice-2"><input id="choice-1" name="choice" value="${STORE.questions[STORE.currentQuestion].options[1]}" type="radio">${STORE.questions[STORE.currentQuestion].options[1]}</input></li>` +
        '<label for="choice-2" class="sr-only">Choice 3</label>' +
        `<li class="choice" aria-label="choice-3"><input id="choice-2" name="choice" value="${STORE.questions[STORE.currentQuestion].options[2]}" type="radio">${STORE.questions[STORE.currentQuestion].options[2]}</input></li>` +
        '<label for="choice-3" class="sr-only">Choice 4</label>' +
        `<li class="choice" aria-label="choice-4"><input id="choice-0" name="choice" value="${STORE.questions[STORE.currentQuestion].options[3]}" type="radio">${STORE.questions[STORE.currentQuestion].options[3]}</input></li>` +
        '</fieldset>'
    );
}

// Handles Submission of Choice
function checkSubmission(){
    $('#js-submit').on('click', function(e) {
        if($('input[name="choice"]:checked').length == 0){
            alert('Please Slect an Answer to Continue!')
            console.log('No Answer Provided, Try Again')
        }
        else if($(`input:radio[name="choice"]:checked`).val() === STORE.questions[STORE.currentQuestion].correctAnswer){
            STORE.currentQuestion++;
            STORE.currentScore++;
            if(STORE.currentQuestion >= 10){
                renderFinal();
            }else{
                renderCorrect();
            }
        }else if($(`input:radio[name="choice"]:checked`).val() != STORE.questions[STORE.currentQuestion].correctAnswer){
            STORE.currentQuestion++;
            if(STORE.currentQuestion >= 10){
                renderFinal();
            }else{
                renderIncorrect();
            }
        }
        e.preventDefault();
    });
}

function renderCorrect(){
    $('#js-correct').show();
    $('#js-quiz').hide();
    $('#js-next-correct').on('click', function(){
        $('#js-correct').hide();
        $('#js-quiz').show();
        renderQuiz();
    });
    console.log('Correct Answer Given')
}

function renderIncorrect(){
    $('#js-incorrect').show();
    $('#js-quiz').hide();
    $('#js-correct-answer').text(STORE.questions[STORE.currentQuestion -1].correctAnswer);
    $('#js-next-incorrect').on('click', function(){
        $('#js-incorrect').hide();
        $('#js-quiz').show();
        renderQuiz();
    });
    console.log('Incorrect Answer Given')
}

function renderFinal(){
    $('#js-quiz').hide();
    $('$js-final').show();
    $('#js-final-score').text(STORE.currentScore)
    $('#js-start-new').on('click', function(){
        location.reload();
    });
}

function renderQuiz(){
    $('#js-quiz').show();
    renderScoreAndCount();
    renderQuestion();
    renderChoices();
}

function checkQuizOver(){
    if(STORE.currentQuestion === 10){
        renderFinal();
    }
}

$(checkQuizOver);
$(homeScreen);
$(checkSubmission);
