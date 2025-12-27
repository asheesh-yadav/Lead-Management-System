import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import LeadTable from "../Component/LeadTable";
import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";
import api from "../api";

const COLORS = ["#1976d2", "#9c27b0", "#2e7d32"];

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const res = await api.get("/api/leads");
    setLeads(
      res.data.map(l => ({
        ...l,
        id: l._id   
      }))
    );
  };

  const total = leads.length;
  const website = leads.filter(l => l.source === "website").length;
  const meta = leads.filter(l => l.source === "meta").length;
  const google = leads.filter(l => l.source === "google").length;

  const chartData = [
    { name: "Website", value: website },
    { name: "Meta Ads", value: meta },
    { name: "Google Ads", value: google }
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Lead Management Dashboard
      </Typography>

     
     <div style={{display:"flex", width:"100%", justifyContent:"space-around"}}>
      {/* Summary Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          { label: "Total Leads", value: total },
          { label: "Website Leads", value: website },
          { label: "Meta Leads", value: meta },
          { label: "Google Leads", value: google }
        ].map((item, i) => (
          <Grid item xs={12} md={3} key={i}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="h4">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
       
       <div style={{minWidth:"500px", display:"flex", flexDirection:"column",alignItems:"center",marginTop:"-100px"}}>
                {/* Analytics */}
      <Box mt={6} height={300} width={300}>
        <Typography variant="h6" mb={2}>
         <h3 style={{minWidth:"500px", textAlign:"center"}}> Leads by Source</h3>
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      </div>

    </div>
      {/* Leads Table */}
      <LeadTable leads={leads} />
    </Box>
  );
};

export default Dashboard;
