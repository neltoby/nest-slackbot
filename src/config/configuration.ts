export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    slack_token: process.env.SLACK_TOKEN,
    mongo_url: process.env.CONNECTION_URL,
  };
};
