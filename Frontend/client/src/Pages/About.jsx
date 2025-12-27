import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import "./About.css";

import metaWebhook from "../assets/img/meta-webhook-verified.png";
import metaLeadgen from "../assets/img/meta-leadgen-subscription.png";
import terminalLog from "../assets/img/terminal-webhook-log.png";
import emailProof from "../assets/img/email-notification-proof.jpeg";

const About = () => {
  return (
    <Box className="about-container">
      <Typography variant="h3" className="about-title">
        Automated Lead Management System
      </Typography>

      <Typography className="about-subtitle">
        Real-time lead collection from Website, Meta Ads & Google Ads
      </Typography>

      <Divider className="section-divider" />

      {/* Project Overview */}
      <section>
        <Typography variant="h5" className="section-title">
          Project Overview
        </Typography>

        <Typography className="section-text">
          This project is a centralized Lead Management System designed to
          automatically capture, validate, and manage leads from multiple
          marketing platforms. It eliminates manual lead handling and provides a
          unified real-time dashboard for sales and marketing teams.
        </Typography>

        <Grid container spacing={3} className="card-grid">
          {["Website Leads", "Meta Ads Leads", "Google Ads Leads"].map(
            (item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="info-card">
                  <CardContent>
                    <Typography variant="h6">{item}</Typography>
                    <Typography className="card-text">
                      Automated ingestion with proper source attribution
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </section>

      {/* Architecture Flow */}
      <section>
        <Typography variant="h5" className="section-title">
          Lead Flow Architecture
        </Typography>

        <Box className="flow-box">
          <pre>
{`User / Ad Platform
        ↓
Lead Source (Website / Meta / Google)
        ↓
Webhook / API Endpoint (Node.js)
        ↓
Validation & Deduplication
        ↓
MongoDB Database
        ↓
Real-Time Dashboard & Notifications`}
          </pre>
        </Box>
      </section>

      {/* Meta Integration */}
      <section>
        <Typography variant="h5" className="section-title">
          Meta Ads Integration
        </Typography>

        <Typography className="section-text">
          Meta Ads (Facebook & Instagram) leads are captured using a secure
          webhook-based integration. When a user submits a lead form, Meta sends
          a webhook event containing a <strong>leadgen_id</strong>.
        </Typography>

        <Typography className="section-text highlight">
          For security and privacy reasons, Meta does not send full lead data
          directly. The backend securely fetches complete lead details using the
          Meta Graph API based on the received <strong>leadgen_id</strong>.
        </Typography>

        <Grid container spacing={3} className="image-grid">
          {[metaWebhook, metaLeadgen, terminalLog].map((img, i) => (
            <Grid item xs={12} md={4} key={i}>
              <img src={img} alt="Meta Integration Proof" />
            </Grid>
          ))}
        </Grid>
      </section>

      {/* Google Integration */}
      <section>
        <Typography variant="h5" className="section-title">
          Google Ads Integration
        </Typography>

        <Typography className="section-text">
          Google Ads Lead Form Extensions send lead data directly to backend API
          endpoints. Campaign and keyword information is captured to support
          performance tracking and ROI analysis.
        </Typography>
      </section>

      {/* Website Leads */}
      <section>
        <Typography variant="h5" className="section-title">
          Website Lead Capture
        </Typography>

        <Typography className="section-text">
          Website leads are captured via a frontend form that simulates real
          landing page submissions. These leads are automatically tagged as
          <strong> website</strong> source and validated before storage.
        </Typography>
      </section>

      {/* Dashboard */}
      <section>
        <Typography variant="h5" className="section-title">
          Central Dashboard
        </Typography>

        <ul className="feature-list">
          <li>Unified lead view across all sources</li>
          <li>Source-based filtering</li>
          <li>Status & pipeline tracking</li>
          <li>Campaign-level visibility</li>
          <li>Real-time updates</li>
        </ul>
      </section>

      {/* Email Notification */}
      <section>
        <Typography variant="h5" className="section-title">
          Real-Time Email Notifications
        </Typography>

        <Typography className="section-text">
          Whenever a new lead is received from any source, the system triggers a
          real-time email notification to the admin using SMTP configuration.
        </Typography>

        <Typography className="section-text highlight">
          This is not a mock setup. Real emails are delivered to the admin inbox
          containing lead details such as name, phone number, source, and
          campaign information.
        </Typography>

        <Grid container spacing={3} className="image-grid">
          <Grid item xs={12} md={6}>
            <img src={emailProof} alt="Email Notification Proof" />
          </Grid>
        </Grid>
      </section>

      {/* Demo Note */}
      <section className="demo-note">
        <Typography variant="h6">Demo & Evaluation Note</Typography>
        <Typography>
          This system follows real production architecture. Due to advertising
          costs and platform restrictions, Meta and Google Ads leads are
          demonstrated in controlled test mode during evaluation. The webhook
          configuration, API integration, database logic, and email
          notifications remain identical to a live production environment.
        </Typography>
      </section>
    </Box>
  );
};

export default About;
