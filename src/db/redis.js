/*
import { createClient } from "redis";

const redisClient = createClient({
    url: "redis://localhost:6380"
});

redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error);
});

async function connectRedis() {
    await redisClient.connect();
    console.log("Redis connected successfully");
}

export { redisClient, connectRedis };

*/