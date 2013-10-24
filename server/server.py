import os.path
import tornado.ioloop
import tornado.web
import tornado.websocket

PORT = 8888
clients = dict()

class MainHandler(tornado.web.RequestHandler):
	@tornado.web.asynchronous
	def get(self):
		self.render("index.html")

class WebSocketHandler(tornado.websocket.WebSocketHandler):
	def open(self, *args):
		self.id = "1234"#self.get_argument("Id")
		#self.stream.set_nodelay(True)
		print "New connection from %s" % (self.id)
		clients[self.id] = {"id": self.id, "object": self}

	def on_message(self, message):
		print "Message %s from %s" % (message, self.id)

	def on_close(self):
		if self.id in clients:
			del clients[self.id]
			print "Connection from %s ended" % (self.id)

def main():
	application = tornado.web.Application([
		(r"/", MainHandler),
		(r"/message", WebSocketHandler),
	],
		static_path=os.path.join(os.path.dirname(__file__), "static"),
		template_path=os.path.join(os.path.dirname(__file__), "templates"),
	)

	application.listen(PORT)
	tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
	main()
