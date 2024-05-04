import { Grid, Paper, Typography, Box } from "@mui/material";

export default function Features() {
  return (
    <Grid sx={{ flexGrow: 1, paddingY: "2%" }} container spacing={2} id="targetFeatures">
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={6}>
          <Grid item>
            <Paper sx={sx.card}>
              <Box sx={sx.logoBox}>
                <Typography
                  sx={{
                    paddingBottom: "15%",
                    textAlign: "center",
                    fontSize: { xs: 18, sm: 18, md: 18, lg: 22 },
                  }}
                >
                  Bring all your events together
                </Typography>
              </Box>
              <Typography sx={sx.contentBox}>
                Get a consolidated view of all your events. Stay on top of
                details such as total registrations, the number of tickets sold,
                attendees who've checked in, and more.
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper sx={sx.card}>
              <Box sx={sx.logoBox}>
                <Typography
                  sx={{
                    paddingBottom: "15%",
                    textAlign: "center",
                    fontSize: { xs: 18, sm: 18, md: 18, lg: 22 },
                  }}
                >
                  {" "}
                  Checking in attendees is a breeze
                </Typography>
              </Box>
              <Typography sx={sx.contentBox}>
                Create a great first impression. Avoid long lines by bringing
                your team together to check in your attendees within seconds.
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper sx={sx.card}>
              <Box sx={sx.logoBox}>
                <Typography
                  sx={{
                    paddingBottom: "15%",
                    textAlign: "center",
                    fontSize: { xs: 18, sm: 18, md: 18, lg: 22 },
                  }}
                >
                  Make event updates from anywhere
                </Typography>
              </Box>
              <Typography sx={sx.contentBox}>
                Tackle updates about last-minute changes in your events on the
                go. Keep attendees informed throughout the event by sharing
                important announcements and updates immediately.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Box></Box>
    </Grid>
  );
}

const sx = {
  card: {
    minHeight: { xs: 400, sm: 425, md: 450, lg: 365 },
    maxWidth: "55vh",
    borderRadius: "20px",
    background: "rgba(3, 3, 33, 0.76)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    paddingY: "10%",
    paddingX: "20px",
    paddingBottom: "20%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    position: "relative",
    border:'1px solid'
  },

  contentBox: {
    letterSpacing: ".5px",
    wordSpacing: "1.5%",
    fontFamily: "var(--font-dmsans)",
    textAlign: "center",
  },
};
