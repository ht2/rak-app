requirejs.config({
    baseUrl: 'js',
    shim: {
        'amplify' : {
            deps: ['jquery'],
            exports: 'amplify'
        },
        'path'  : {
            deps: [],
            exports: 'Path'
        }
    },
    paths: {
        jquery      : 'lib/jquery',
        knockout    : 'lib/knockout',
        amplify     : 'lib/amplify',
        path        : 'lib/path',
        debugger    : 'lib/debugger'
    }
});

// Start the main app logic.
requirejs([
    'jquery', 
    'knockout', 
    'lib/domReady!', 
    'amplify',
    'debugger',
    'app/Router',
    'viewModels/objListVM',
    'viewModels/peopleListVM',
    'viewModels/navBarVM'
],
function( $, ko, doc, amplify, Debugger, Router, ObjListVM, PeopleListVM, NavBarVM ) {
    
    //Test the debugger
    Debugger.log("App started");
    
    
    //Bind the object list
    ko.applyBindings( new ObjListVM, $('#objectsCont')[0] );
    ko.applyBindings( new PeopleListVM, $('#peopleCont')[0] );
    ko.applyBindings( new NavBarVM, $('#navbar')[0] );
    
    //Initiliase the routing module
    Router.init();
    
});