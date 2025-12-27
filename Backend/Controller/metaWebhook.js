import { Lead } from "../Model/Lead.js";
import { leadEmailTemplate } from "../utils/leadEmailTemplate.js";
import { sendEmail } from "../utils/sendEmails.js";
import { fetchMetaLeadDetails } from "../utils/metaLeadFetcher.js";


/**
 * NOTE:
 * In production, Meta/Google send lead IDs via webhook.
 * Full lead details are fetched using Graph API.
 * For demo & HR evaluation, this flow is simulated using Postman.
 * you can check lead.js controller
 */



export const metaWebhook = async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const change = entry?.changes?.[0];
    const leadgenId = change?.value?.leadgen_id;

    if (!leadgenId) {
      return res.sendStatus(200);
    }

    // Fetch lead data from Meta API
    const fields = await fetchMetaLeadDetails(leadgenId);

    const leadData = {};
    fields.forEach((item) => {
      leadData[item.name] = item.values[0];
    });

    const {
      full_name: name,
      email,
      phone_number: phone,
      campaign_name: campaignName,
    } = leadData;

    if (!phone) return res.sendStatus(200);

    // Duplicate check
    const existingLead = await Lead.findOne({
      $or: [
        { phone },
        ...(email ? [{ email }] : []),
      ],
    });

    if (existingLead) return res.sendStatus(200);

    const lead = await Lead.create({
      name,
      email,
      phone,
      source: "meta",
      campaignName,
      status: "new",
    });

    // Admin email 
    sendEmail({
      subject: "New META Lead Received",
      html: leadEmailTemplate(lead),
    }).catch(console.error);

    return res.sendStatus(200);
  } catch (error) {
    console.error("Meta webhook error:", error);
    return res.sendStatus(500);
  }
};
