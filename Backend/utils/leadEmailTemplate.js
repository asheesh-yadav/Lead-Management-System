export const leadEmailTemplate = (lead) => {
  return `
    <h2>🚀 New Lead Received</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email || "N/A"}</p>
    <p><strong>Phone:</strong> ${lead.phone}</p>
    <p><strong>Source:</strong> ${lead.source}</p>
    <p><strong>Campaign:</strong> ${lead.campaignName || "N/A"}</p>
    <p><strong>Keyword:</strong> ${lead.keyword || "N/A"}</p>
    <hr />
    <p>Login to dashboard to take action.</p>
  `;
};
