How to use separate Keycloak instance in your Liveoak
=====================================================
By default Liveoak contains embedded Keycloak instance to have admin console and examples working without too much additional efforts. 
However in some cases, you may need to use separate Keycloak instance instead of the embedded one. In this case, you can follow these instructions:

In next steps, I assume that your Liveoak will be running on:
http://localhost:8080
and your separate Keycloak will be running on:
http://localhost:8081

Keycloak setup
--------------
 
- Run Keycloak server.
   
- Login as "admin" into Keycloak admin console and go to http://localhost:8081/auth/admin/master/console/#/realms/master/applications
Then click to "Add Application" and add application like this:
-- Name: "console"
-- Access type: public
-- 2 redirect URIs with values: 
"http://localhost:8080/admin" 
and 
"http://localhost:8080/admin/"
-- Then click "Save" button

- Now once Application is created, you can configure:
-- Base URL: "http://localhost:8080/admin/"
-- Web origins: "http://localhost:8080"
 
- Then you need to create "liveoak-apps" realm
-- Go to http://localhost:8081/auth/admin/master/console/#/realms/master and click on "Add Realm"
-- Fill name "liveoak-apps"
-- On page http://localhost:8081/auth/admin/master/console/#/realms/liveoak-apps/login-settings you may need to check "User Registration" 
to enable registration of new users in "liveoak-apps" realm 

Liveoak setup
-------------

- Delete file $LIVEOAK_HOME/standalone/deployments/auth-server.war and $LIVEOAK_HOME/standalone/deployments/auth-server.war.dodeploy to ensure that
 embedded Keycloak is not deployed within Liveoak.
 
- Edit file $LIVEOAK_HOME/apps/admin/console/js/app.js and change particular part of the file when "liveOak" object is configured to look like this:

    var liveOak = new LiveOak({
      auth: {
        url: 'http://localhost:8081/auth',        
        realm: 'master',
        clientId: 'console',
        onload: 'login-required'
      }
    });
    
- Edit file $LIVEOAK_HOME/conf/extensions/keycloak.js and edit "keycloak-url" to look like:
    
    keycloak-url: 'http://localhost:8081/auth',



After doing these, you can go to http://localhost:8080/admin and enjoy Liveoak admin console secured by external Keycloak from localhost:8081


SECURING LIVEOAK APPLICATIONS
-----------------------------
In most cases, you just need to follow the README for each application. There is not much differences between the default setup (embedded Keycloak) and external Keycloak setup. Only things to keep in mind are especially:

- In your application, you need to change the place where liveOak object is created and add the property "url" to the "auth" part. The line with the value of property URL will be like this:
url: 'http://localhost:8081/auth',

For example in chat-html-secured application, you need to add the line here https://github.com/liveoak-io/liveoak-examples/blob/master/chat/chat-html-secured/app/chat.js#L8 so the whole part with 'auth' object will look like this:

      auth: {
        url: 'http://localhost:8081/auth',
        clientId: 'chat-html-secured-client',
        realm: 'liveoak-apps'
      }

Similarly for other example application. Most example applications are designed in a way that creation of liveOak object is at only one place. So you need to change just this one place.

- Make sure that when you're creating client, you won't use relative redirect URI like "/chat-html-secured/*" but you will always use redirect URIs with whole domain part like for example "http://localhost:8080/chat-html-secured/*" . Relative URI can be used just in case that Keycloak and Liveoak are on same host, which is not the case with external Keycloak.

- Make sure that when you're creating client, you will always configure Web Origins with the Liveoak host. Usually value of Web Origin will be like "http://localhost:8080" . Web Origins are normally not needed with default setup (embedded Keycloak) as in this case both LiveOak and Keycloak have same origin. But with external Keycloak, you always need to add Web Origin. More info is "here" ---- CORS DOCUMENTATION
