define(['amplify'], function(amplify){    
    
    /*
     * Provides a method for communicating to the console
     */
    var log = function (log_txt) {
        if (window.console != undefined) {
            console.log(log_txt);
        }
    }
    
    
    return {
        log: log
    };
});