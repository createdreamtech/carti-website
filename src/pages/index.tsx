import React from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import { Link as GatsbyLink } from "gatsby";
import Link from "@material-ui/core/Link";
import { grey } from "@material-ui/core/colors";
import { VideoCall } from "@material-ui/icons";

const MyApp: React.FC = () => {

  return (
    <>
      <Grid container alignContent="center" alignItems="center" justify="center" direction="column">
        <Grid container alignContent="center" alignItems="center" justify="space-around" direction="row">
          <Grid item>
            <img className="logo" alt="logo" src={"https://raw.githubusercontent.com/createdreamtech/carti-design/main/svg/carti-logo.svg"} style={{ paddingTop: "10%" }} />
          </Grid>
        </Grid>
        <Typography variant="h1" style={{ paddingTop: "80px", paddingBottom: "20px" }}>What is Carti?</Typography>
        <Typography gutterBottom  variant="inherit" style={{paddingBottom: "50px"}}>
          Carti is a decentralized package manager for Cartesi machines that makes sharing Cartesi drives and full machines easy
        </Typography>
        <Grid container justify="center">
          <Link
            component={(props: { children: any }) => (
              <GatsbyLink to={"/webinar"} style={{ textDecoration: "none", color: grey[500], marginRight: "10px" }} activeStyle={{ color: grey[500] }}>
                {props.children}
              </GatsbyLink>
            )}>
            <Button variant="contained" startIcon={<VideoCall />} color="primary">Watch the talk!</Button>
          </Link>
          <Link
            component={(props: { children: any }) => (
              <GatsbyLink to={"/getting-started"} style={{ textDecoration: "none", color: grey[500] }} activeStyle={{ color: grey[500] }}>
                {props.children}
              </GatsbyLink>
            )}>
            <Button variant="contained">Get Started</Button>
          </Link>
        </Grid>
        <br />
        <br />
        <br />
        <Grid container justify="space-between" style={{ marginBottom: "85px" }}>
          <Grid item container direction="column" style={{ width: "230px" }}>
            <Link
              component={(props: { children: any }) => (
                <GatsbyLink to={"/beginners"} style={{ textDecoration: "none", color: grey[500] }} activeStyle={{ color: grey[500] }}>
                  {props.children}
                </GatsbyLink>
              )}>
              <Grid>
                <Box>
                  <Typography variant="h6" gutterBottom color="primary">→ Beginners</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="secondary">- New to Carti?</Typography>
                </Box>
                <Box>
                  <Typography variant="caption">- Why use this?</Typography>
                </Box>
              </Grid>
            </Link>
          </Grid>
          <Grid item container direction="column" style={{ width: "230px" }}>
            <Link
              component={(props: { children: any }) => (
                <GatsbyLink
                  to={"/learn"}
                  style={{ textDecoration: "none", color: grey[500] }}
                  activeStyle={{ color: grey[500] }}
                >
                  {props.children}
                </GatsbyLink>
              )}>
              <Grid>
                <Box>
                  <Typography variant="h6" gutterBottom color="primary">→ Learn</Typography>
                </Box>
                <Box>
                  <Typography variant="caption">- Beginner Resources</Typography>
                </Box>
                <Box>
                  <Typography variant="caption">- How Carti works</Typography>
                </Box>
              </Grid>
            </Link>
          </Grid>
          <Grid item container direction="column" style={{ width: "230px" }}>
            <Link
              component={(props: { children: any }) => (
                <GatsbyLink to={"/developers"}
                  style={{ textDecoration: "none", color: grey[500] }}
                  activeStyle={{ color: grey[500] }}
                >
                  {props.children}
                </GatsbyLink>
              )}>
              <Grid>
                <Box>
                  <Typography variant="h6" gutterBottom color="primary">→ Developers</Typography>
                </Box>
                <Box>
                  <Typography variant="caption">- Repository Links</Typography>
                </Box>
                <Box>
                  <Typography variant="caption">- Find the latest dev tools</Typography>
                </Box>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MyApp;
