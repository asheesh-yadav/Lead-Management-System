import express from 'express'
import {  createWebLead, deleteLead, getLeads, googleWebhook, metaWebhookSampleLeads} from '../Controller/lead.js';
const router = express.Router();


router.post('/website', createWebLead);
router.get('/', getLeads);
router.delete("/deleteLeads/:id", deleteLead);
router.post("/webhooks/meta/payload", metaWebhookSampleLeads);
router.post("/google/payload", googleWebhook);
export default router;
