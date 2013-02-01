define(['knockout', 'debugger', 'app/router'], function(ko, Debugger, Router ){
    var NavBarVM = function(){
        var self = this;     
        
        /*
         * RouteChange handler
         * Sets the currentRoute observable to the newly updated route from the Router
         */
        self.setNav = function(data){
            self.currentRoute( data.route );
        };
        
        //Observable array of links to include in navbar
        self.links = ko.observableArray([
            { name:'Objects', route: Router.routes.objects },
            { name:'People', route: Router.routes.people }
        ]);
        
        //Define the currentRoute observable (defined as objects for default)
        //This sets the 'active' class on the nav-bar record in the View
        self.currentRoute = ko.observable( Router.routes.objects );

        //Pub-Sub to the RouteChange topic
        amplify.subscribe( "RouteChange",  self.setNav );      
    };
    
    return NavBarVM;
});