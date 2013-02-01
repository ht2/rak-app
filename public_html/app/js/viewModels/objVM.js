define(['knockout'], function(ko){
    return function ObjVM(data){
        this.title = ko.observable(data.title);
    }
});