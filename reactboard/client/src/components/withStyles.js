import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: 960,
    marginTop: theme.spacing(3),
    margin: 'auto',
    overflowX: "auto"
  }
});

export default withStyles(styles);