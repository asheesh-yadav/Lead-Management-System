import { Lead } from "../Model/Lead.js";
import { leadEmailTemplate } from "../utils/leadEmailTemplate.js";
import { sendEmail } from "../utils/sendEmails.js";



export const createWebLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      service,
      source = "website",
      campaignName,
      keyword,
    } = req.body;

    // Required fields
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    // Email validation (only if email exists)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address",
        });
      }
    }

    // Duplicate lead check
const existingLead = await Lead.findOne({
  $or: [
    { phone },
    ...(email ? [{ email }] : []),
  ],
});

if (existingLead) {
  let message = "Lead already exists";

  if (existingLead.phone === phone) {
    message = "Lead with this phone number already exists";
  } else if (email && existingLead.email === email) {
    message = "Lead with this email already exists";
  }

  return res.status(409).json({
    success: false,
    message,
  });
}
    const lead = await Lead.create({
      name,
      email,
      phone,
      service,
      source: "website", 
      campaignName,
      keyword,
    });

     sendEmail({
      subject: `New Website Lead Received`,
      html: leadEmailTemplate(lead),
    }).catch(err => {
      console.error("Email failed:", err);
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
};

// -------------- Get leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leads' });
  }
};


// -------------- Delete lead
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({
      message: "Lead deleted successfully",
      leadId: id,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete lead" });
  }
};


// ========  Meta leads
export const metaWebhookSampleLeads = async (req, res) => {
  try {
    const { name, email, phone, campaignName } = req.body;
    if (!name || !phone) {
      return res.sendStatus(200);
    }
     // Email validation (only if email exists)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address",
        });
      }
    }

    // Duplicate lead check
const existingLead = await Lead.findOne({
  $or: [
    { phone },
    ...(email ? [{ email }] : []),
  ],
});

if (existingLead) {
  let message = "Lead already exists";

  if (existingLead.phone === phone) {
    message = "Lead with this phone number already exists";
  } else if (email && existingLead.email === email) {
    message = "Lead with this email already exists";
  }

  return res.status(409).json({
    success: false,
    message,
  });
}

   const lead = await Lead.create({
      name,
      email,
      phone,
      source: "meta",          
      campaignName,
      status: "new",       
    });


     sendEmail({
      subject: `New Meta Lead Received`,
      html: leadEmailTemplate(lead),
    }).catch(err => {
      console.error("Email failed:", err);
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error("Meta webhook error:", error);
    return res.sendStatus(500);
  }
};




//========== Goodle leads
export const googleWebhook = async (req, res) =>{
  try {
    const { name, email, phone, campaignName, keyword } = req.body;

    if (!name || !phone) {
      return res.sendStatus(200);
    }

    // Email validation (only if email exists)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address",
        });
      }
    }

    // Duplicate lead check
const existingLead = await Lead.findOne({
  $or: [
    { phone },
    ...(email ? [{ email }] : []),
  ],
});

if (existingLead) {
  let message = "Lead already exists";

  if (existingLead.phone === phone) {
    message = "Lead with this phone number already exists";
  } else if (email && existingLead.email === email) {
    message = "Lead with this email already exists";
  }

  return res.status(409).json({
    success: false,
    message,
  });
}

     const lead = await Lead.create({
      name,
      email,
      phone,
      source: "google", 
      campaignName,
      keyword,
      status: "new",    
    });

     sendEmail({
      subject: `New GOOGLE Lead Received`,
      html: leadEmailTemplate(lead),
    }).catch(err => {
      console.error("Email failed:", err);
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error("Google webhook error:", error);
    return res.sendStatus(500);
  }
};