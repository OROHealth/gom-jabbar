package pubsub

func NewRedisBus(host, port string) Bus {
	return &RedisBus{}
}

type RedisBus struct{}

func (rb *RedisBus) Publish(channel, msg string) error {
	return nil
}

func (rb *RedisBus) Subscribe(channel string, mh MessageHandler) error {
	return nil
}
