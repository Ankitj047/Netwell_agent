import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        minWidth: '400px',
        borderBottom: '1px solid #80808057',
        padding: '10px 24px',
        fontWeight: 600
    }

}))

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.closeAlert()
    };


    const classes = useStyles()
    return (
        <div>

            <Dialog
                open={props.showAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>Success</DialogTitle> */}
                <h6 className={classes.dialogTitle}>{props.alertTitle}</h6>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: '#000000d1' }}>
                        {
                            Array.isArray(props.alertMsg) ?
                                props.alertMsg.map((item, indx) => {
                                    return <p key={indx}>{item}</p>
                                })
                                :
                                props.alertMsg}
                    </DialogContentText>
                   
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" style={{ textTransform: 'none',fontWeight:'600' }}>
                        Okay
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}