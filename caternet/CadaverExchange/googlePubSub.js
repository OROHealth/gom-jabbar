// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');
// Instantiates a client
var projectId = process.env.GOOGLE_PROJECT_ID;
const pubsub = new PubSub({ projectId });

exports.createTopic = async (topicName) => {

  // Creates a new topic
  const [topic] = await pubsub.createTopic(topicName);
  console.log(`Topic ${topic.name} created.`);

}

exports.sendMessageToTopic = async (topicName, message) => {


  console.log("Pub/Sub : Send the message : " + message + " inside the topic " + topicName );

  try {
    // Creates a new topic
    const [topic] = await pubsub.createTopic(topicName);
    console.log(`Topic ${topic.name} created.`);

    // Send a message to the topic
    topic.publish(Buffer.from(message));

  } catch (error) {
  //  console.error(error)
  }

}


exports.subscribeToTopic = async (topicName) => {


  console.log("Pub/Sub : subscribe to the topic " + topicName );

  try {
    // Creates a new topic
    const [topic] = await pubsub.createTopic(topicName);
    console.log(`Topic ${topic.name} created.`);

   // Creates a subscription on that new topic
   const [subscription] = await topic.createSubscription(subscriptionName);

   // Receive callbacks for new messages on the subscription
   subscription.on('message', message => {
     console.log('Pub/Sub : Received message:', message.data.toString());
     process.exit(0);
   });
 
   // Receive callbacks for errors on the subscription
   subscription.on('error', error => {
     console.error('Pub/Sub : Received error:', error);
     process.exit(1);
   });

  } catch (error) {
  //  console.error(error)
  }

}