package pubsub

import "log"

type Local struct {
	subscribers map[string][]MessageHandler
}

func (l *Local) Publish(channel, msg string) error {
	log.Printf("%s : %s", channel, msg)
	for _, mh := range l.subscribers[channel] {
		go func(m MessageHandler) {
			if err := m(msg); err != nil {
				log.Printf("error handler(%s) with message %s: %s", channel, msg, err)
			}
		}(mh)
	}
	return nil
}

func (l *Local) Subscribe(channel string, mh MessageHandler) {
	if l.subscribers == nil {
		l.subscribers = map[string][]MessageHandler{}
	}
	l.subscribers[channel] = append(l.subscribers[channel], mh)
}
