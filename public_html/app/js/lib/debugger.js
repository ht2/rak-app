define(['amplify'], function(amplify){    
    
    var log = function (log_txt) {
        if (window.console != undefined) {
            console.log(log_txt);
        }
    }
    
    
    return {
        log: log
    };
});