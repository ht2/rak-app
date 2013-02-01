define(['knockout', 'debugger', 'amplify', 'viewModels/objVM'], 
function( ko, Debugger, amplify, ObjVM ){
    
    var ObjListVM = function() {
        var self = this;        
        
        //Observable for element visibility
        self.show = ko.observable(false);
        
        //Observable array of objects
        self.objs = ko.observableArray([]);
        
        //Observable for new object title
        self.newObjTitle = ko.observable('');
        
        //Computed observable boolean (for validation purposes)
        self.hasTitle = ko.computed(function(){
            return (self.newObjTitle().length > 0);
        });
        
        /*
         * Creates a new Object (ObjVM) and adds it to the objs oarray
         */
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
        
        /*
         * Remove object from the array
         */
        self.removeObj = function(obj){
            self.objs.remove(obj);
        };
        
        
        //Pub-Sub for element visibility
        amplify.subscribe("objects/visible", function(visible){ self.show(visible) });
        
        //Pub-Sub for loading objects via ID (TODO)
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