import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import LeadTable from "../Component/LeadTable";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
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
    <Box px={{ xs: 2, md: 4 }} py={2}>
      <Typography variant="h4" mb={2}>
        Lead Management Dashboard
      </Typography>

      {/* TOP SECTION */}
      <Grid
        container
        spacing={2}
        alignItems="center"
      >
        {/* SUMMARY CARDS */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {[
              { label: "Total Leads", value: total },
              { label: "Website Leads", value: website },
              { label: "Meta Leads", value: meta },
              { label: "Google Leads", value: google }
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6">{item.label}</Typography>
                    <Typography variant="h4">{item.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* PIE / DONUT */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: 260,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography variant="h6" mb={1}>
              Leads by Source
            </Typography>

            <ResponsiveContainer width="100%" minWidth={"500px"} height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}   // donut feel
                  outerRadius={90}
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>

      {/* TABLE — reduced spacing */}
      <Box mt={2}>
        <LeadTable leads={leads} />
      </Box>
    </Box>
  );
};

export default Dashboard;
