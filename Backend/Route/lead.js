import express from 'express'
import {  createWebLead, getLeads, googleWebhook, metaWebhookSampleLeads} from '../Controller/lead.js';
const router = express.Router();


router.post('/website', createWebLead);
router.get('/', getLeads);
router.post("/webhooks/meta/payload", metaWebhookSampleLeads);
router.post("/google/payload", googleWebhook);
export default router;
