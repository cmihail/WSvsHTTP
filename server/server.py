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
	def open(self, username):
		if (username in clients):
			self.close() # Not best way to handle this, but we don't care.
			return

		self.id = username
		print "New connection from %s" % (self.id)
		clients[self.id] = self

	def on_message(self, message):
		print "Message %s from %s" % (message, self.id)
		# Redundent write to sender is ok in this case.
		for userId, obj in clients.iteritems():
			obj.write_message("<b>" + self.id + "</b>: " + message)

	def on_close(self):
		if self.id in clients:
			del clients[self.id]
			print "Connection from %s ended" % (self.id)
			for userId, obj in clients.iteritems():
				obj.write_message("<b>" + self.id + "</b> left chat")

def main():
	application = tornado.web.Application([
		(r"/", MainHandler),
		(r"/message/(.*)", WebSocketHandler),
	],
		static_path=os.path.join(os.path.dirname(__file__), "static"),
		template_path=os.path.join(os.path.dirname(__file__), "templates"),
	)

	application.listen(PORT)
	tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
	main()
