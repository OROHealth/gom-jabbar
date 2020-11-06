package robots

import (
	"math/rand"
	"strings"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
)

type montroyashi struct {
	Robot
}

func NewMontroyashi(bus pubsub.PubSub) Montroyashi {
	r := &montroyashi{
		Robot: Robot{
			bus: bus,
		},
	}

	r.setSubscriptions()
	return r
}

func (r *montroyashi) setSubscriptions() {
	r.Listen("order-received", r.handleOrderStart)
	r.Listen("cheese-screams", r.handleCheeseScream)
}

func (r *montroyashi) handleOrderStart(msg string) error {
	o := &resto.PoutineOrder{}
	fromJSON(&o, msg)
	r.DetectDrunkPeople(o)
	return nil
}

func (r *montroyashi) handleCheeseScream(msg string) error {
	r.DisplayLeonardCohenLyrics()
	return nil
}

func (r *montroyashi) DetectDrunkPeople(o *resto.PoutineOrder) {
	if o.Gravy == resto.GravyKindTequila {
		r.Send("drunk-people", o.ID)
	}
}

func (r *montroyashi) DisplayLeonardCohenLyrics() {
	r.Send("leonard-cohen-lyrics", leonardCohenLyrics[rand.Intn(len(leonardCohenLyrics))])
}

var leonardCohenLyrics = strings.Split(strings.TrimSpace(`
Now I've heard there was a secret chord
That David played, and it pleased the Lord
But you don't really care for music, do you?
It goes like this, the fourth, the fifth
The minor fall, the major lift
The baffled king composing Hallelujah
Hallelujah, Hallelujah
Hallelujah, Hallelujah
Your faith was strong but you needed proof
You saw her bathing on the roof
Her beauty and the moonlight overthrew you
She tied you to a kitchen chair
She broke your throne, and she cut your hair
And from your lips she drew the Hallelujah
Hallelujah, Hallelujah
Hallelujah, Hallelujah
You say I took the name in vain
I don't even know the name
But if I did—well, really—what's it to you?
There's a blaze of light in every word
It doesn't matter which you heard
The holy or the broken Hallelujah
Hallelujah, Hallelujah
Hallelujah, Hallelujah
I did my best, it wasn't much
I couldn't feel, so I tried to touch
I've told the truth, I didn't come to fool you
And even though it all went wrong
I'll stand before the Lord of Song
With nothing on my tongue but Hallelujah
Come over to the window, my little darling,
I'd like to try to read your palm.
I used to think I was some kind of Gypsy boy
before I let you take me home.
Now so long, Marianne, it's time that we began
to laugh and cry and cry and laugh about it all again.
Well you know that I love to live with you,
but you make me forget so very much.
I forget to pray for the angels
and then the angels forget to pray for us.
Now so long, Marianne, it's time that we began ...
We met when we were almost young
deep in the green lilac park.
You held on to me like I was a crucifix,
as we went kneeling through the dark.
Oh so long, Marianne, it's time that we began ...
Your letters they all say that you're beside me now.
Then why do I feel alone?
I'm standing on a ledge and your fine spider web
is fastening my ankle to a stone.
Now so long, Marianne, it's time that we began ...
For now I need your hidden love.
I'm cold as a new razor blade.
You left when I told you I was curious,
I never said that I was brave.
Oh so long, Marianne, it's time that we began ...
Oh, you are really such a pretty one.
I see you've gone and changed your name again.
And just when I climbed this whole mountainside,
to wash my eyelids in the rain!
Oh so long, Marianne, it's time that we began ...
It's four in the morning, the end of December
I'm writing you now just to see if you're better
New York is cold, but I like where I'm living
There's music on Clinton Street all through the evening.
I hear that you're building your little house deep in the desert
You're living for nothing now, I hope you're keeping some kind of record.
Yes, and Jane came by with a lock of your hair
She said that you gave it to her
That night that you planned to go clear
Did you ever go clear?
Ah, the last time we saw you you looked so much older
Your famous blue raincoat was torn at the shoulder
You'd been to the station to meet every train
And you came home without Lili Marlene
And you treated my woman to a flake of your life
And when she came back she was nobody's wife.
Well I see you there with the rose in your teeth
One more thin gypsy thief
Well I see Jane's awake --
She sends her regards.
And what can I tell you my brother, my killer
What can I possibly say?
I guess that I miss you, I guess I forgive you
I'm glad you stood in my way.
If you ever come by here, for Jane or for me
Your enemy is sleeping, and his woman is free.
Yes, and thanks, for the trouble you took from her eyes
I thought it was there for good so I never tried.
And Jane came by with a lock of your hair
She said that you gave it to her
That night that you planned to go clear --
`), "\n")
