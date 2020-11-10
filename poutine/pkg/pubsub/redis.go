package pubsub

import (
	"log"
	"strings"
	"time"

	"github.com/gomodule/redigo/redis"
)

func NewRedisBus(host string) (Bus, error) {
	pool := &redis.Pool{
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", host)
			if err != nil {
				return nil, err
			}
			return c, nil
		},

		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			if time.Since(t) < time.Minute {
				return nil
			}
			_, err := c.Do("PING")
			return err
		},
	}
	c := pool.Get()
	defer c.Close()
	if _, err := c.Do("PING"); err != nil {
		return nil, err
	}

	return &RedisBus{
		pool: pool,
	}, nil
}

type RedisBus struct {
	pool *redis.Pool
}

func (rb *RedisBus) Publish(channel, msg string) error {
	c := rb.pool.Get()
	defer c.Close()
	_, err := c.Do("PUBLISH", channel, msg)
	return err
}

func (rb *RedisBus) Subscribe(channel string, mh MessageHandler) {
	//TODO: Make this more robust with retries and stuff...
	go func() {
		c := rb.pool.Get()
		defer c.Close()
		psc := redis.PubSubConn{Conn: c}

		if strings.Contains(channel, "*") {
			psc.PSubscribe(channel)
		} else {
			psc.Subscribe(channel)
		}

		for {
			switch n := psc.Receive().(type) {
			case error:
				log.Printf("received error on channel subscription %s: %s", channel, n)
			case redis.Message:
				msg := string(n.Data)
				if err := mh(msg); err != nil {
					log.Printf("received error when handling message %s on channel %s: %s", msg, channel, n)
				}
			}
		}
	}()
}
