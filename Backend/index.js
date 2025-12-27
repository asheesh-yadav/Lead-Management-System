import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import leadRouter from "./Route/lead.js";
import webhookRouter from "./Route/metaWebhook.js"

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow all origins
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: false,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "this is home route" });
});


const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

//  Webhook verification (REQUIRED by Meta)
app.get("/webhooks/meta", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log(" Webhook verified by Meta");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

app.use("/",webhookRouter)
app.use("/api/leads", leadRouter);

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});



/* =================== NOTE=======================
1. Website leads > Direct API submission
2. Meta Ads > Webhook > leadgen_id > Graph API > DB
3. Google Ads > Webhook > Lead Form API > DB
4. Dashboard auto-fetches data from MongoDB
5. Admin notified via Email on new lead */
 