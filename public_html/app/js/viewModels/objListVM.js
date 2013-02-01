define(['knockout', 'debugger', 'amplify', 'viewModels/objVM'], function( ko, Debugger, amplify, ObjVM ){
    
    var ObjListVM = function() {
        var self = this;        
        
        
        self.show = ko.observable(false);
        
        self.objs = ko.observableArray([]);
        
        self.newObjTitle = ko.observable('');
        
        self.hasTitle = ko.computed(function(){
            return (self.newObjTitle().length > 0);
        });
        
        self.addObj = function(){
            if( !self.hasTitle() ){
                Debugger.log("No title");
            } else {
                var data = {title: self.newObjTitle() };
                var obj = new ObjVM( data );            
                self.objs.push( obj );
                self.newObjTitle("");
            }
        };
        
        self.removeObj = function(obj){
            self.objs.remove(obj);
        };
        
        
        
        amplify.subscribe("objects/visible", function(visible){ self.show(visible); });
        amplify.subscribe("objects/load", function(data){ 
            if( data.o_id > 0 ){
                Debugger.log("loading o_id: "+data.o_id);
                self.objs.push( new ObjVM({title:data.o_id}) );
            } else {
                Debugger.log("loading all objects");
            }
            
            amplify.publish( "objects/visible", true );
            
        });
        
    };
    return ObjListVM;
});