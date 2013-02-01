define(['knockout'], 
function(ko){
    return function ObjVM(data){
        //Observable for the object title
        this.title = ko.observable(data.title);
    }
});