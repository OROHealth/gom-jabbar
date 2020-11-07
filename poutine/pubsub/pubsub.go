package pubsub

type PubSub interface {
	Publish(channel, msg string) error
	Subscribe(channel string, mh MessageHandler) error
}

type MessageHandler func(string) error
