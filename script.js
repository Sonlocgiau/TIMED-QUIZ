
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var start_btn = info_box.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".quiz_box");
var result_box = document.querySelector(".result_box");
var option_list = document.querySelector(".option_list");
var time_line = document.querySelector("header .time_line");
var timeText = document.querySelector(".timer .time_left_txt");
var timeCount = document.querySelector(".timer .timer_sec");

exit_btn.onclick = function() {
    info_box.classList.remove("activeInfo");
}

start_btn.onclick = function () {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);
    startTimer(10);
    startTimerLine(0);
}

var timeValue =  10;
var que_count = 0;
var que_numb = 1;
var userScore = 0;
var counter;
var counterLine;
var widthValue = 0;

var start_quiz = result_box.querySelector(".buttons .restart");

start_quiz.onclick = function() {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 10; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue); 
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

var next_btn = document.querySelector("footer .next_btn");
var bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = function() {
    if(que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showQuetions(index) {
    var que_text = document.querySelector(".que_text");
    var que_tag = ''+ questions[index].numb + ". " + questions[index].question +'';
    var option_tag = '<div class="option">'+ questions[index].options[0] +'</div>'
    + '<div class="option">'+ questions[index].options[1] +'</div>'
    + '<div class="option">'+ questions[index].options[2] +'</div>'
    + '<div class="option">'+ questions[index].options[3] +'</div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
    var option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

var tickIcon = '<div class="icon tick"><a class="fas fa-check"></a></div>';
var crossIcon = '<div class="icon cross"><a class="fas fa-times"></a></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    var userAns = answer.textContent;
    var correcAns = questions[que_count].answer;
    var allOptions = option_list.children.length;
    
    if(userAns == correcAns) { 
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    var scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        var scoreTag = 'and congrats!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 2) {
        var scoreTag = 'and nice, You got <p>'+ userScore +'</p> out of <p>'+ questions.length + '</p>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        var scoreTag = 'and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length + '</p>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9) { 
            var addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) { 
            clearInterval(counter);
            timeText.textContent = "Time Off";
            var allOptions = option_list.children.length;
            var correcAns = questions[que_count].answer;
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time --;
        time_line.style.width = time + " seconds left till colorsplosion.";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}


function queCounter(index) {
    var totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}