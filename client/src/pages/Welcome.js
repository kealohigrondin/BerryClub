import { Grid, Card, CardContent, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

export default function Welcome() {
  const auth = useAppSelector((state) => state.auth);

  return auth === false ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      // background: "darkslateblue"
      sx={{ minHeight: "100vh", pt: "15em" }}
    >
      <Grid item>
        <Card style={{ background: "darkslateblue" }}>
          <CardContent>
            <div
              className="ui header"
              style={{ textAlign: "center", color: "ivory" }}
            >
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
  ) : (
    <Navigate to="dashboard" />
  );
}
