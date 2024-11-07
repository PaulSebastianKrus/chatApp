import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@ServerEndpoint("/ws")
public class WebSocketServer {
    private static final Set<Session> sessions = Collections.synchronizedSet(new HashSet<>());
    private static final long IDLE_TIMEOUT = 600000; // 10 minutes (600,000 ms)

    // Called when a new client connects
    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("New connection: " + session.getId());

        // Set idle timeout for the session
        session.setMaxIdleTimeout(IDLE_TIMEOUT);
    }

    // Called when a message is received from a client
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("Received message: " + message);
        broadcast(message, session);
    }

    // Called when a client disconnects
    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
        System.out.println("Connection closed: " + session.getId());
    }

    // Broadcasts a message to all connected clients
    private void broadcast(String message, Session senderSession) {
        for (Session session : sessions) {
            if (session.isOpen() && !session.equals(senderSession)) {
                try {
                    session.getBasicRemote().sendText(message);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
