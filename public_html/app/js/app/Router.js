define( ['jquery', 'amplify', 'path', 'debugger'], 
function($, amplify, Path, Debugger){
    var self = this;
    
    //Define the routes
    var Routes = {
        objects : '#!/objects',
        people  : '#!/people'
    };
    
    /*
     * Publish a RouteChange topic with the desired route
     */
    var announceRoute = function(route){
        amplify.publish( "RouteChange", {route:route} );
    };
    
    /*
     * Initliasing func
     */
    var init = function(){
        Debugger.log("Router initialised");
        
        /*
         * Map the Objects route
         */
        Path.map( Routes.objects+'(/:o_id)' ).to(function(){
            announceRoute( Routes.objects );
            
            //TODO Provide the current object id to the "objects/load" topic
            var o_id = this.params["o_id"] || 0;
            amplify.publish( "objects/load", {o_id:o_id});            
            amplify.publish( "people/visible", false);
        });
        
        /*
         * Map the Peoples route
         */
        Path.map( Routes.people ).to(function(){
            announceRoute( this.path );
            
            amplify.publish( "people/visible", true);
            amplify.publish( "objects/visible", false);
        });
        
        /*
         * Map back to objects for unrecognised routes
         */
        Path.rescue(function(){
            Debugger.log("Unidentified route '"+Path.routes.current+"'");
            set(Routes.objects);
        });
        
        //Set the default route
        Path.root( Routes.objects );
        
        //Tell Path to start
        Path.listen();
        
        //Announce the current route on startup
        announceRoute( Path.routes.current );
    };
    
    /*
     * Change the hash, forcing a new routing behaviour
     */
    var set = function(route){
        Debugger.log("Routing to "+route);
        window.location.hash = route;
    };
    
    return {
        routes: Routes,
        init: init,
        set : set
    };
});