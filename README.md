rak-app
=======
RequireJS-Amplify-Knockout Application - RAK App!

A lightweight app combining Knockout, RequireJS and Amplify to create a single page javascript application.

PathJS is used to handle hashchanges and routing. We subscribe and publish notifications using Amplify to cause state changes.

Individual ViewModels are created for the seperate elements contained in the DOM. In this demo, you can add and delete to a list of 'objects'.

The nav-bar is created dynamically using the routes defined in app/router. The nav listens for changes in the 'route' and knockout applies the active class to the relevant <li>.
