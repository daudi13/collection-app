import { Container, Typography, Button } from '@mui/material';
import Hero from "../assets/hero.png"
import { makeStyles } from 'tss-react/mui';
import { CollectionState } from '../CollectionContext';
import Homepage from './Homepage';


const LandingPage = () => {
  const { isAuthenticated } = CollectionState();
  const useStyles = makeStyles()(() => ({
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100vh",
      overflowY: "hidden",
    },
    textBox: {
      width: 450
    },
    content: {
      marginBottom: 30,
      textAlign: "justify"
    },
  }))
  
  const { classes } = useStyles()

  const landingContent = (
    <Container className={classes.wrapper}>
      <div className={classes.textBox}>
        <Typography className={classes.content}>
          SnapHub is an immersive online platform that seamlessly intertwines the worlds of photography, storytelling, and global connection. At its core, SnapHub is a community-driven space where individuals from around the world converge to share the stories captured through their lenses.
          SnapHub goes beyond a typical photo-sharing platform; it&apos;s a sanctuary for visual storytellers. Users craft narratives through their albums and photos, transforming moments into captivating tales that resonate with a diverse and engaged audience
        </Typography>
        <Button variant="contained" style={{
          width: 215,
          height: 40,
          backgroundColor: "#53c28b",
          color: "black"
        }}>
          create an account
        </Button>
      </div>
      <img src={Hero} style={{
        width: 560
      }} alt="hero" />
    </Container>
  );
  return (
      isAuthenticated ? <Homepage/> : landingContent
  )
}
export default LandingPage