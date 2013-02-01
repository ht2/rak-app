define( ['jquery', 'amplify', 'path', 'debugger'], function($, amplify, Path, Debugger){
    var self = this;
    
    var Routes = {
        objects : '#!/objects',
        people  : '#!/people'
    };
    
    var announceRoute = function(route){
        amplify.publish( "RouteChange", {route:route} );
    };
    
    var init = function(){
        Debugger.log("Router initialised");
        
        
        Path.map( Routes.objects+'(/:o_id)' ).to(function(){
            announceRoute( this.path );
            var o_id = this.params["o_id"] || 0;
            amplify.publish( "objects/load", {o_id:o_id});
            
            amplify.publish( "people/visible", false);
        });
        
        Path.map( Routes.people ).to(function(){
            announceRoute( this.path );
            amplify.publish( "people/visible", true);
            amplify.publish( "objects/visible", false);
        });
        
        Path.rescue(function(){
            Debugger.log("Unidentified route '"+Path.routes.current+"'");
            set(Routes.objects);
        });
        
        Path.root( Routes.objects );
        Path.listen();
        
        announceRoute( Path.routes.current );
    };
    
    
    var set = function(route){
        Debugger.log("Routing to "+route);
        window.location.hash = route;
    }
    
    
    return {
        routes: Routes,
        init: init,
        set : set
    };
});