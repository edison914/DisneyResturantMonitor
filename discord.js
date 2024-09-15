const { EmbedBuilder, WebhookClient } = require("discord.js");
const { webhookId, webhookToken } = require("./config.json");

export const sentWebHook = async () => {
  try {
    const webhookClient = new WebhookClient({
      id: webhookId,
      token: webhookToken,
    });

    const embed = new EmbedBuilder()
      .setTitle("Animal Kingdom Yeti & Yeti Reservation Monitor")
      .setColor(0x00ffff);

    await webhookClient.send({
      content: "Yeti & Yeti has an avalibility on the following time slot...",
      username: "Ed",
      avatarURL: "https://furrygo.s3.amazonaws.com/darkie.jpeg",
      embeds: [embed],
    });
    console.log(`webhook sent successfully`);
  } catch (error) {
    console.log(`webhook sent failed. Error: ${error}`);
  }
};

sentWebHook();
