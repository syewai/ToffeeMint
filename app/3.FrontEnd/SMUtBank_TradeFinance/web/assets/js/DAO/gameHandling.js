
//game session stored upon login



//web service calls for game 
function getGameQuestion(userId, PIN, OTP, questionId, callback) {

    var headerObj = {
        Header: {
            serviceName: "getGameQuestion",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            questionID: questionId
        }
    };
    var content = JSON.stringify(contentObj);
    $.ajax({
        async: false,
        type: 'POST',
        url: "http://smu.tbankonline.com/SMUtBank_API/Gateway?Header=" + header + "&Content=" + content,
        dataType: 'json',
        success: callback
    });
}

function getGameAnswer(userId, PIN, OTP, questionId, callback) {

    var headerObj = {
        Header: {
            serviceName: "getGameAnswer",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            questionID: questionId
        }
    };
    var content = JSON.stringify(contentObj);
    $.ajax({
        async: false,
        type: 'POST',
        url: "http://smu.tbankonline.com/SMUtBank_API/Gateway?Header=" + header + "&Content=" + content,
        dataType: 'json',
        success: callback
    });
}

function setQuestionScore(userId, PIN, OTP, questionId, gameId, score, mode, groupId, callback) {

    var headerObj = {
        Header: {
            serviceName: "setQuestionScore",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            questionID: questionId,
            gameID: gameId,
            score: score,
            mode: mode,
            groupID: groupId
        }
    };
    var content = JSON.stringify(contentObj);
    $.ajax({
        async: false,
        type: 'POST',
        url: "http://smu.tbankonline.com/SMUtBank_API/Gateway?Header=" + header + "&Content=" + content,
        dataType: 'json',
        success: callback
    });
}

function getGameScore(userId, PIN, OTP, gameId, startTime, endTime, mode, callback) {

    var headerObj = {
        Header: {
            serviceName: "getGameScore",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            gameID: gameId,
            start: startTime,
            end: endTime,
            mode: mode
        }
    };
    var content = JSON.stringify(contentObj);
    $.ajax({
        async: false,
        type: 'POST',
        url: "http://smu.tbankonline.com/SMUtBank_API/Gateway?Header=" + header + "&Content=" + content,
        dataType: 'json',
        success: callback
    });
}

function getGameLeaders(userId, PIN, OTP, gameId, startTime, endTime, mode, byGroup, callback) {

    var headerObj = {
        Header: {
            serviceName: "getGameLeaders",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            gameID: gameId,
            start: startTime,
            end: endTime,
            mode: mode,
            byGroup: byGroup
        }
    };
    var content = JSON.stringify(contentObj);
    $.ajax({
        async: false,
        type: 'POST',
        url: "http://smu.tbankonline.com/SMUtBank_API/Gateway?Header=" + header + "&Content=" + content,
        dataType: 'json',
        success: callback
    });
}


//function to get game score upon next button
function onNext(questionId, timer) {
    var answer;
    var score;

    var getGameItem = sessionStorage.getItem('game');
    var game = $.parseJSON(getGameItem);

    timer.stop();
    var time = timerStart(timer);

    result = $("input[name=" + questionId + "]:checked").val();
    if (questionId >= 1) {
        getGameAnswer("", "", "", questionId, function (callback) {
            answer = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.answer).substr(1).slice(0, -1);

            if (result === answer) {
                score = time * 10;
                setQuestionScore(sessionStorage.userID, sessionStorage.PIN, sessionStorage.OTP, questionId, sessionStorage.gameID, score, "Pretest", 1, function (callback) {
                    console.log(callback);
                });
            }

        });
    }
}

//timer function to calculate score
function timerStart(timer) {
    timer.start({countdown: true, startValues: {seconds: 59}});
    $('#countdownTimer .values').html(timer.getTimeValues().toString(['seconds']));
    timer.addEventListener('secondsUpdated', function (e) {
        $('#countdownTimer .values').html(timer.getTimeValues().toString(['seconds']));
    });
    timer.addEventListener('targetAchieved', function (e) {
        $('#countdownTimer .values').html('No points awarded');
    });

    return timer.getTimeValues().toString(['seconds']);
}



//fill prequiz game modal
function preQuiz() {
    var gNumberOfQuestions = 25;
    var pagesBeforeQuiz = 1;
    var gQuestion;
    var gChoices;
    var gAppendString = "";

    for (var i = 1; i <= gNumberOfQuestions; i++) {
        getGameQuestion("", "", "", i, function (callback) {

            //get respective data from json string
            gQuestion = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.question).substr(1).slice(0, -1);
            gChoices = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.choices);

            //append to div
            gAppendString += '<div class="row hide" data-step="';
            gAppendString += Number(i) + pagesBeforeQuiz;
            gAppendString += '" data-title="Pre-Quiz">';
            gAppendString += ('<div id="countdownTimer"><div class="values"></div></div>');
            gAppendString += gQuestion;
            gAppendString += '<form>';

            //split choices
            var options = gChoices.split("&&");

            //add labels to choices
            var labels = ["a)", "b)", "c)", "d)", "e)"];

            //iterate through all choices to display
            for (var j = 0; j < options.length; j++) {
                var option = options[j];
                var label = labels[j];
                if (j === 0) {
                    option = option.substr(1);
                } else if (j === options.length - 1) {
                    option = option.slice(0, -1);
                }
                var answer = label + " " + option;

                //append to div
                if (option !== undefined) {
                    gAppendString += '<input type="radio" name="';
                    gAppendString += (i);
                    gAppendString += '" value="';
                    gAppendString += option;
                    gAppendString += '">';
                    gAppendString += answer;
                    gAppendString += '<br>';

                }
            }
            //append to div close tag
            gAppendString += '</form></div></div>';
        });
    }
    gAppendString += '<div class="row hide" data-step="';
    gAppendString += gNumberOfQuestions + 1 + pagesBeforeQuiz;
    gAppendString += '" data-title="Congratulations! You have completed the Pre-Quiz">';
    gAppendString += "Head on over to the Leaderboard to view your score! Continue with the instructions on your lab sheet."

    //display append
    $('#target').append(gAppendString);
}


//function to load total score to game modal, outdated
/* function loadTotalScore() {
 var gNumberOfQuestions = 27;
 getGameScore(sessionStorage.userID, sessionStorage.PIN, sessionStorage.OTP, 1, "2017-01-01 00:00:00", "2019-01-01 00:00:00", "Pretest", function (callback) {
 var tScore = JSON.stringify(callback.Content.ServiceResponse.ScoreDetails.total_score).substr(1).slice(0, -1);
 if (tScore === "ul") {
 tScore = 0;
 }
 gAppendString = '<div class="row hide" data-step="';
 gAppendString += gNumberOfQuestions;
 gAppendString += '" data-title="Complete">';
 gAppendString += 'Your Current Score is : ';
 gAppendString += tScore;
 gAppendString += '</div></div>';
 });
 
 $('#target').append(gAppendString);
 } */


