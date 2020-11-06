package pubsub

import "log"

type MessageHandler func(string) error

type Local struct {
	subscribers map[string][]MessageHandler
}

func (l *Local) Publish(channel, msg string) error {
	log.Printf("%s : %s", channel, msg)
	for _, mh := range l.subscribers[channel] {
		go mh(msg)
	}
	return nil
}

func (l *Local) Subscribe(channel string, mh MessageHandler) error {
	if l.subscribers == nil {
		l.subscribers = map[string][]MessageHandler{}
	}
	l.subscribers[channel] = append(l.subscribers[channel], mh)

	return nil
}
