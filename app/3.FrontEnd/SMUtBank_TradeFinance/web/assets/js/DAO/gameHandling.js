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
            url:  "http://smu.tbankonline.com/SMUtBank_API/Gateway?Header="+header+"&Content="+content,
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
            url:  "http://smu.tbankonline.com/SMUtBank_API/Gateway?Header="+header+"&Content="+content,
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
            url:  "http://smu.tbankonline.com/SMUtBank_API/Gateway?Header="+header+"&Content="+content,
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
            url:  "http://smu.tbankonline.com/SMUtBank_API/Gateway?Header="+header+"&Content="+content,
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
            url:  "http://smu.tbankonline.com/SMUtBank_API/Gateway?Header="+header+"&Content="+content,
            dataType: 'json',
            success: callback
        });
    }
    