import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import survey from './../assets/images/survey.jpg';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 1080,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: 'gray', // Change color to red
    textAlign: 'center', // Align text to the center
  },
  media: {
    minHeight: 600,
  },
  italicText: {
    fontStyle: 'italic', // Set text to italic
    fontSize: '1.5rem', // Set font size to 1.5rem
    color: 'gray', // Change color to gray
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.title}>Home Page</Typography>
      <CardMedia className={classes.media} image={survey} title="Survey" />
      <CardContent>
        <Typography variant="body2" component="p" className={classes.italicText}>
          Welcome to our WeDeb survey home page.
        </Typography>
      </CardContent>
    </Card>
  );
}
