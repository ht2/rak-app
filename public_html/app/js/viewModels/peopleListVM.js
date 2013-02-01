define(['knockout', 'amplify'], function(ko, amplify){
    var PeopleListVM = function(){
        var self = this;        
        self.show = ko.observable(false);
        
        amplify.subscribe("people/visible", function(visible){ self.show(visible); });
    };
    
    return PeopleListVM;
});