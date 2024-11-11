import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;
import javax.websocket.server.ServerContainer;

public class Main {
    public static void main(String[] args) throws Exception {
        // Create a Jetty server object, listening on port 8081
        Server server = new Server(8081);

        // Create a ResourceHandler to serve static files from the "frontend/public" directory
        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setResourceBase("frontend/public");  // Set the path to the public directory
        resourceHandler.setDirectoriesListed(true);  // Allow directory listing if no index file is found
        resourceHandler.setWelcomeFiles(new String[]{"WebSocketClient.html"}); // Set default file to be served

        // Create a ServletContextHandler to handle WebSocket requests
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");

        // Add the static file handler to the context
        HandlerCollection handlers = new HandlerCollection();
        handlers.addHandler(resourceHandler);
        handlers.addHandler(context);
        server.setHandler(handlers);

        // Initialize the WebSocket layer
        ServerContainer wsContainer = WebSocketServerContainerInitializer.configureContext(context);

        // Check if the WebSocket container is initialized
        if (wsContainer != null) {
            System.out.println("WebSocket server container initialized.");
        } else {
            System.err.println("Failed to initialize WebSocket server container!");
        }

        // Register WebSocket endpoint
        wsContainer.addEndpoint(WebSocketServer.class);

        // Start the server
        server.start();
        server.join();
    }
}
