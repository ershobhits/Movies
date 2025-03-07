import amqp from "amqplib";

let channel;
const queueName = "moviesQueue";

// Connect to RabbitMQ
const connectQueue = async () => {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
};

// Add movie to queue
const addToQueue = async (movieData) => {
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(movieData)), { persistent: true });
};

// Process movies from queue
const processQueue = async () => {
    await connectQueue();
    channel.consume(queueName, async (msg) => {
        if (msg) {
            const movieData = JSON.parse(msg.content.toString());
            console.log("Processing movie:", movieData.title);

            // Insert into DB
            await new Movie(movieData).save();
            channel.ack(msg);
        }
    });
};

export { connectQueue, addToQueue, processQueue };
