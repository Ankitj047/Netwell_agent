import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
const useStyles = makeStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 99999,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#8e89a73d'
  }

}))

const Loader = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.container} hidden={!props.showLoader}>
      <CircularProgress />
    </div>

  )

}

export default Loader;