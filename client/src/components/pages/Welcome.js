import { Grid, Card, CardContent, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
export default function Welcome() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      sx={{ minHeight: "100vh", pt: "15em" }}
    >
      <Grid item>
        <Card style={{ background: "white" }}>
          <CardContent>
            <div className="ui header" style={{ textAlign: "center" }}>
              <h1>Welcome to the Berry Club 🍇</h1>
            </div>

            <div style={{ textAlign: "center" }}>
              <a href="/auth/google">
                <Button variant="contained">
                  <GoogleIcon />
                  <span style={{ paddingLeft: "0.5em" }}>
                    Sign in with Google
                  </span>
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
