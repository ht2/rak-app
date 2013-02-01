define(['knockout', 'debugger', 'app/router'], function(ko, Debugger, Router ){
    var NavBarVM = function(){
        var self = this;     
        
        self.subscriptions = function(){
            amplify.subscribe( "RouteChange",  self.setNav );
        };
        
        self.setNav = function(data){
            self.currentRoute( data.route );
        };
        
        self.init = function(){
            self.links = ko.observableArray([
                { name:'Objects', route: Router.routes.objects },
                { name:'People', route: Router.routes.people }
            ]);

            self.currentRoute = ko.observable( Router.routes.objects );

            self.setLink = function(){
                Router.set(this.route);
            };
            
            self.subscriptions();            
        };
        
        self.init();
    };
    
    return NavBarVM;
});