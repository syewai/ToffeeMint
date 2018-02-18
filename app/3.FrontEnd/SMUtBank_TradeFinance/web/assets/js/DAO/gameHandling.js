
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
function onNextPre(counter, pagesBeforeQuiz, chosenQuestions, timer) {
    var answer;
    var score;

    timer.stop();
    var time = timerStart(timer);

    if (counter >= pagesBeforeQuiz && counter <= chosenQuestions.length) {
        var questionID = counter - pagesBeforeQuiz;

        result = $("input[name=" + counter + "]:checked").val();
        //console.log(result);
        getGameAnswer("", "", "", chosenQuestions[questionID], function (callback) {
            answer = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.answer).substr(1).slice(0, -1);
            //console.log(answer);
            if (result === answer) {
                score = time * 10;
                setQuestionScore(sessionStorage.userID, sessionStorage.PIN, sessionStorage.OTP, chosenQuestions[questionID], sessionStorage.gameID, score, "Pretest", 1, function (callback) {

                });
            }
        });
    }
}

function onNextPost(counter, pagesBeforeQuiz, chosenQuestions, timer) {
    var answer;
    var score;

    timer.stop();
    var time = timerStart(timer);

    if (counter >= pagesBeforeQuiz && counter <= chosenQuestions.length) {
        var questionID = counter - pagesBeforeQuiz;

        result = $("input[name=" + counter + "]:checked").val();
        //console.log(result);
        getGameAnswer("", "", "", chosenQuestions[questionID], function (callback) {
            answer = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.answer).substr(1).slice(0, -1);
            //console.log(answer);
            if (result === answer) {
                score = time * 10;
                setQuestionScore(sessionStorage.userID, sessionStorage.PIN, sessionStorage.OTP, chosenQuestions[questionID], sessionStorage.gameID, score, "Posttest", 1, function (callback) {
                    //console.log(callback);
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
function preQuiz(chosenQuestions, pagesBeforeQuiz) {
    var gQuestion;
    var gChoices;
    var gAppendString = "";

    var gNumberOfQuestions = chosenQuestions.length;
    for (var i = 0; i < gNumberOfQuestions; i++) {
        getGameQuestion("", "", "", chosenQuestions[i], function (callback) {

            //get respective data from json string
            gQuestion = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.question).substr(1).slice(0, -1);
            gChoices = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.choices);


            //append to div

            gAppendString += '<div class="row hide" data-step="';
            gAppendString += Number(i) + pagesBeforeQuiz + 1;
            gAppendString += '" data-title="Pre-Quiz">';
            //append question header container
            gAppendString += '<header class="panel-heading bg-default lt no-border"><div class="clearfix">';

            //append question in <div class="clear"> in header
            gAppendString += '<div class="col-lg-8">';
            gAppendString += '<div class="clear"><div class="h4 m-t-xs m-b-xs text-primary font-bold">';
            gAppendString += gQuestion;
            gAppendString += '</div></div>';
            gAppendString += '</div>';
            //append timer in header
            gAppendString += '<div class="col-lg-4">';
            gAppendString += '<button class="btn-s-md btn-primary btn-rounded" sytle="white-space:normal !important;"><div id="countdownTimer" ><div class="values font-bold h4"></div></div></button>';
            gAppendString += '</div>';
            gAppendString += '</div></header>';

            var options = gChoices.split("&&");

            //add labels to choices
            var labels = ["a)", "b)", "c)", "d)", "e)"];

            gAppendString += '<div class="btn-group" data-toggle="buttons">';
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
                    gAppendString += '<div class="row">';
                    gAppendString += '<div class="col-lg-12">';

                    //gAppendString += '<div class="list-group-item" style="overflow-wrap: break-word">';
                    gAppendString += '<label style="text-align:left;margin:10px;width:500px;white-space:normal;" class="btn font-bold active">';
                    gAppendString += '<input style="display:none" type="radio" name="';
                    gAppendString += (i) + 1;
                    gAppendString += '" value="';
                    gAppendString += option;
                    gAppendString += '">';
                    gAppendString += '<p style="width:500px;white-space:normal;">' + answer + '</p>';
                    gAppendString += '</label>';
                    gAppendString += '</div></div>';
                    //gAppendString += '</div>'

                }
            }
            //append to div close tag
            gAppendString += '</div></div></div>';
        });
    }
    gAppendString += '<div class="row hide" data-step="';
    gAppendString += gNumberOfQuestions + 1 + pagesBeforeQuiz;
    gAppendString += '" data-title="Congratulations! You have completed the Pre-Quiz">';
    gAppendString += '<div class="list-group no-radius alt">';
    gAppendString += '<div class="list-group-item">';
    gAppendString += "Continue with the instructions on your lab sheet.";
    gAppendString += "</div></div></div>";
    //display append
    $('#target').append(gAppendString);
}

function postQuiz(chosenQuestions, pagesBeforeQuiz) {
    var gQuestion;
    var gChoices;
    var gAppendString = "";

    var gNumberOfQuestions = chosenQuestions.length;
    for (var i = 0; i < gNumberOfQuestions; i++) {
        getGameQuestion("", "", "", chosenQuestions[i], function (callback) {

            //get respective data from json string
            gQuestion = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.question).substr(1).slice(0, -1);
            gChoices = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.choices);


            //append to div

            gAppendString += '<div class="row hide" data-step="';
            gAppendString += Number(i) + pagesBeforeQuiz + 1;
            gAppendString += '" data-title="Post-Quiz">';
            //append question header container
            gAppendString += '<header class="panel-heading bg-default lt no-border"><div class="clearfix">';

            //append question in <div class="clear"> in header
            gAppendString += '<div class="col-lg-8">';
            gAppendString += '<div class="clear"><div class="h4 m-t-xs m-b-xs text-primary font-bold">';
            gAppendString += gQuestion;
            gAppendString += '</div></div>';
            gAppendString += '</div>';
            //append timer in header
            gAppendString += '<div class="col-lg-4">';
            gAppendString += '<button class="btn-s-md btn-primary btn-rounded" sytle="white-space:normal !important;"><div id="countdownTimer" ><div class="values font-bold h4"></div></div></button>';
            gAppendString += '</div>';
            gAppendString += '</div></header>';

            var options = gChoices.split("&&");

            //add labels to choices
            var labels = ["a)", "b)", "c)", "d)", "e)"];

            gAppendString += '<div class="btn-group" data-toggle="buttons">';
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
                    gAppendString += '<div class="row">';
                    gAppendString += '<div class="col-lg-12">';

                    //gAppendString += '<div class="list-group-item" style="overflow-wrap: break-word">';
                    gAppendString += '<label style="text-align:left;margin:10px;width:500px;white-space:normal;" class="btn font-bold active">';
                    gAppendString += '<input style="display:none" type="radio" name="';
                    gAppendString += (i) + 1;
                    gAppendString += '" value="';
                    gAppendString += option;
                    gAppendString += '">';
                    gAppendString += '<p style="width:500px;white-space:normal;">' + answer + '</p>';
                    gAppendString += '</label>';
                    gAppendString += '</div></div>';
                    //gAppendString += '</div>'

                }
            }
            //append to div close tag
            gAppendString += '</div></div></div>';
        });
    }
    gAppendString += '<div class="row hide" data-step="';
    gAppendString += gNumberOfQuestions + 1 + pagesBeforeQuiz;
    gAppendString += '" data-title="Congratulations! You have completed the Post-Quiz">';
    gAppendString += '<div class="list-group no-radius alt">';
    gAppendString += '<div class="list-group-item">';
    gAppendString += "We have come to the end of the quiz. Thank you for your time.";
    gAppendString += "</div></div></div>";
    //display append
    $('#target2').append(gAppendString);
}

/*function postQuiz(chosenQuestions, pagesBeforeQuiz) {
 var gQuestion;
 var gChoices;
 var gAppendString = "";
 
 var gNumberOfQuestions = chosenQuestions.length;
 for (var i = 0; i < gNumberOfQuestions; i++) {
 getGameQuestion("", "", "", chosenQuestions[i], function (callback) {
 
 //get respective data from json string
 gQuestion = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.question).substr(1).slice(0, -1);
 gChoices = JSON.stringify(callback.Content.ServiceResponse.QuestionDetails.choices);
 
 //append to div
 gAppendString += '<div class="row hide" data-step="';
 gAppendString += Number(i) + pagesBeforeQuiz + 1;
 gAppendString += '" data-title="Post-Quiz">';
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
 gAppendString += (i) + 1;
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
 gAppendString += '" data-title="The End">';
 gAppendString += "We have come to the end of our UAT. Thank you for taking your time out. We hope you learnt something new today.  "
 
 //display append
 $('#target').append(gAppendString);
 } */

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


