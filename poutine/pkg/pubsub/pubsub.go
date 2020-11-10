package pubsub

type Bus interface {
	Publish(channel, msg string) error
	Subscribe(channel string, mh MessageHandler)
}

type MessageHandler func(string) error
