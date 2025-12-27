import express from 'express'
import { metaWebhook } from '../Controller/metaWebhook.js';
const router = express.Router();


router.post("/webhooks/meta", metaWebhook);
export default router;
