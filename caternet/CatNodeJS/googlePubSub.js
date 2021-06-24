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


  console.log("Topic " + topicName + " send message : " + message);

  try {
    // Creates a new topic
    const [topic] = await pubsub.createTopic(topicName);
    console.log(`Topic ${topic.name} created.`);

    // Send a message to the topic
    topic.publish(Buffer.from(message));

  } catch (error) {
    console.error(error)
  }

}