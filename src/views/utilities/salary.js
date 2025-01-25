import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useAuth } from "views/pages/authentication/AuthContext";

const CustomCard = styled(Card)({
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
  },
});

const NoteBox = styled(Box)({
  backgroundColor: "#f3f9ff",
  borderRadius: "12px",
  padding: 16,
  marginBottom: 32,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  borderLeft: "4px solid #1E88E5",
});

const UserSalaryPlans = () => {
  const [salaryPlans, setSalaryPlans] = useState([]);
  const [directReferrals, setDirectReferrals] = useState(0);
  const [indirectReferrals, setIndirectReferrals] = useState(0);
  const [lastClaimInfo, setLastClaimInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const { username } = useAuth();

  const fetchData = async () => {
    if (!username) return;
    setIsLoading(true);

    try {
      const salaryResponse = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/salaries`
      );
      setSalaryPlans(salaryResponse.data);

      const referralResponse = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/referrals/downline/${username}`
      );
      const { summary } = referralResponse.data;
      setDirectReferrals(summary.activatedDirect);
      setIndirectReferrals(summary.activatedIndirect);

      const claimInfoResponse = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/salaries/${username}`
      );
      setLastClaimInfo(claimInfoResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  const handleClaimPlan = async (planId) => {
    setIsDialogOpen(true);
    setIsChecking(true);
    setDialogMessage("Checking eligibility...");
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/salaries/${planId}/claim`,
        { username }
      );
      setDialogMessage(response.data.message || "Salary plan claimed successfully!");
      setIsChecking(false);
      fetchData();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred while claiming the plan.";
      setDialogMessage(errorMessage);
      setIsChecking(false);
    }
  };
  
  

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogMessage("");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#1E88E5",
          fontWeight: "bold",
          marginBottom: 3,
          textAlign: "center",
        }}
      >
        Salary Plans
      </Typography>

      <NoteBox>
        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#1E88E5" }}>
          <b>Note:</b> Each month, only one salary plan can be claimed. The next salary
          becomes eligible after 30 days and is based on the number of activated members & Salaries will be open after 17/02/2025.
        </Typography>
      </NoteBox>

      {isLoading ? (
        <Grid container spacing={4}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton
                variant="rectangular"
                height={300}
                animation="wave"
                sx={{
                  borderRadius: "16px",
                  backgroundColor: "#f0f0f0",
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          {lastClaimInfo.claimEligible ? (
            <Typography
              variant="body1"
              sx={{ marginBottom: 4, textAlign: "center", color: "#076951" }}
            >
              You are eligible to claim a salary plan this month. But 
            </Typography>
          ) : (
            <Typography
              variant="body1"
              sx={{ marginBottom: 4, textAlign: "center", color: "#FF5722" }}
            >
              You can claim another salary plan after{" "}
              <b>{lastClaimInfo.remainingDays || 0}</b> days.
            </Typography>
          )}
<Grid container spacing={4}>
{salaryPlans.map((plan) => {
  const directProgress = Math.min(
    (directReferrals / plan.directReferralCount) * 100,
    100
  );
  const indirectProgress = Math.min(
    (indirectReferrals / plan.indirectReferralCount) * 100,
    100
  );

  const canClaim =
    lastClaimInfo.claimEligible &&
    directReferrals >= plan.directReferralCount &&
    indirectReferrals >= plan.indirectReferralCount;

  // Check if current date is greater than or equal to claimableAfter date
  const claimableAfterDate = new Date(plan.claimableAfter);
  const currentDate = new Date();
  const isClaimableAfter = currentDate >= claimableAfterDate;

  return (
    <Grid item xs={12} sm={6} md={4} key={plan._id}>
      <CustomCard>
        <CardContent>
          <Typography
            variant="h4"
            sx={{ color: "#1E88E5", fontWeight: "bold" }}
          >
            Rs,{plan.salaryAmount}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2, marginTop: 2 , color: "#00aa33"}}>
            Claimable After:{" "}
            {claimableAfterDate.toLocaleDateString()}
          </Typography>

          {/* Direct Referrals Progress */}
          <Typography variant="body2" sx={{ color: "#076951", marginTop: 2 }}>
            Direct Referrals: {directReferrals}/{plan.directReferralCount}
          </Typography>
          <Box sx={{ position: "relative", marginY: 1 }}>
            <LinearProgress
              variant="determinate"
              value={directProgress}
              sx={{
                height: 12,
                borderRadius: "8px",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: directReferrals >= plan.directReferralCount ? "#076951" : "#FFC107",
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: `${directProgress}%`,
                transform: "translate(-50%, -50%)",
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#076951",
                border: "2px solid white",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Box>

          {/* Indirect Referrals Progress */}
          <Typography variant="body2" sx={{ color: "#076951", marginTop: 2 }}>
            Indirect Referrals: {indirectReferrals}/{plan.indirectReferralCount}
          </Typography>
          <Box sx={{ position: "relative", marginY: 1 }}>
            <LinearProgress
              variant="determinate"
              value={indirectProgress}
              sx={{
                height: 12,
                borderRadius: "8px",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: indirectReferrals >= plan.indirectReferralCount ? "#076951" : "#FFC107",
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: `${indirectProgress}%`,
                transform: "translate(-50%, -50%)",
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#076951",
                border: "2px solid white",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Box>

          {/* Claim Button */}
          <Button
            variant="contained"
            color="success"
            sx={{
              marginTop: 3,
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "none",
              width: "100%",
              backgroundColor: canClaim && isClaimableAfter ? "#076951" : "#d3d3d3",
              color: "white",
              "&:hover": {
                backgroundColor: canClaim && isClaimableAfter ? "#076951" : "#d3d3d3",
              },
            }}
            disabled={!canClaim || !isClaimableAfter} // Disable if not eligible or claimable after date
            onClick={() => handleClaimPlan(plan._id)}
          >
            {canClaim && isClaimableAfter ? "Claim Now" : "Not Eligible"}
          </Button>
        </CardContent>
      </CustomCard>
    </Grid>
  );
})}

</Grid>
        </>
      )}

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{isChecking ? "Processing" : "Claim Status"}</DialogTitle>
        <DialogContent>
          {isChecking ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Typography>{dialogMessage}</Typography>
          )}
        </DialogContent>
        {!isChecking && (
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

export default UserSalaryPlans;
