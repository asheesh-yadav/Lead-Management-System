import { DataGrid } from "@mui/x-data-grid";
import { Box, MenuItem, Select, Button } from "@mui/material";
import { useState } from "react";

const LeadTable = ({ leads }) => {
  const [source, setSource] = useState("all");

  const filteredLeads =
    source === "all" ? leads : leads.filter(l => l.source === source);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "source", headerName: "Source", flex: 1 },
    { field: "campaignName", headerName: "Campaign", flex: 1},
    { field: "createdAt", headerName: "Date", flex: 1 }
  ];

  const exportCSV = () => {
    const rows = filteredLeads.map(l =>
      `${l.name},${l.phone},${l.email},${l.source},${l.createdAt}`
    );
    const csv = ["Name,Phone,Email,Source,Date", ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <Select value={source} onChange={e => setSource(e.target.value)}>
          <MenuItem value="all">All Sources</MenuItem>
          <MenuItem value="website">Website</MenuItem>
          <MenuItem value="meta">Meta</MenuItem>
          <MenuItem value="google">Google</MenuItem>
        </Select>

        <Button variant="contained" onClick={exportCSV}>
          Export CSV
        </Button>
      </Box>

      <DataGrid
        rows={filteredLeads}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
};

export default LeadTable;
