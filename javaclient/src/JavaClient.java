import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.util.concurrent.Future;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.eclipse.jetty.websocket.client.ClientUpgradeRequest;
import org.eclipse.jetty.websocket.client.WebSocketClient;

@WebSocket
public class JavaClient {
	private static final String WS_SERVER = "ws://localhost:8888/message/";
	
	private final Lock lock = new ReentrantLock();
	private final Condition condition = lock.newCondition();

	@OnWebSocketClose
    public void onClose(int statusCode, String reason) {
		// Not the best way to do it, but doesn't matter for this app.
        System.out.printf("Username is taken\n");
        System.exit(1);
    }
	
    @OnWebSocketMessage
    public void onMessage(String msg) {
        System.out.printf("%s%n", msg);
    }
    
    public Lock getLock() {
    	return lock;
    }

    public Condition getCond() {
    	return condition;
    }

	public static void main(String[] args) {
		if (args.length != 1) {
			System.out.println("Usage: <username>");
			return;
		}
		String username = args[0];
		
		WebSocketClient webSocket = new WebSocketClient();
		JavaClient client = new JavaClient();
		Future<Session> future = null;
		BufferedReader br = null;
		String line;

		try {
			webSocket.start();
			URI wsServerUri = new URI(WS_SERVER + username);
			
			ClientUpgradeRequest request = new ClientUpgradeRequest();
			future = webSocket.connect(client, wsServerUri, request);

			br = new BufferedReader(new InputStreamReader(System.in));
			while ((line = br.readLine()) != null) {
				future.get().getRemote().sendString(line);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				br.close();
				webSocket.stop();
				if (future != null) {
					future.get().close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
