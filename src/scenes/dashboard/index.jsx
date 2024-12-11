import { Box, Button,  useTheme} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="HR Dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: "orange",
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor=""
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="orange"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="orange"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
