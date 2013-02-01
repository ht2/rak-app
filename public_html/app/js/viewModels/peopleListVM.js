define(['knockout', 'amplify'], 
function(ko, amplify){
    var PeopleListVM = function(){
        var self = this;        
        
        //Observable for element visibility
        self.show = ko.observable(false);
        
        //Subscrive to the visiblity element
        amplify.subscribe("people/visible", function(visible){ self.show(visible); });
    };
    
    return PeopleListVM;
});