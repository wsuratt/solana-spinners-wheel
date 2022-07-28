import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState, useCallback } from "react";
import { CircularProgress } from "@material-ui/core";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

// interface attributeFace {
//   trait_type: string;
//   value: string;
// }

export default function LeaderCard(props: any) {
  const [amIMinting, setAmIMinting] = useState(false);
    const [open, setOpen] = useState(false);

    const initiateBet = async (onBet: any, handle: any) => {
        console.log(" i am trying to bet ", handle);
        setAmIMinting(true);
        let tx = await onBet(handle);
        setAmIMinting(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (agreed: boolean) => {
        setOpen(false);

        if (!agreed) {
            return
        }
        initiateBet(props.onBet, props.handle);
    };
  const font = "Lato";

  const classes = useStyles();

  return (
      <div>
          <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to use this key?"}
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      This cannot be undone.
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={() => handleClose(false)}>Disagree</Button>
                  <Button onClick={() => handleClose(true)} autoFocus>
                      Agree
                  </Button>
              </DialogActions>
          </Dialog>
          <Card
              className={classes.root}
          >

              <img
                  height="140"
                  width= "140"

                  src={props.image}
                  className={classes.image}
                  alt={props.image}
              />
              <Typography className = {classes.typo}> {props.name} </Typography>

                <Button
                    onClick={() => {
                        handleClickOpen()
                    }}
                    size="medium"
                    className={classes.button}
                    variant="outlined"

                >
                    {amIMinting ? <CircularProgress /> : "Use"}
                </Button>
          </Card>
      </div>
  );
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#242424",
    padding:"10px",
    fontFamily:'Lato',
    color:"white"
  },
  image:{
  
  padding:"5px",

   

  },
  typo:{
    textAlign:"center",
    fontFamily:'Lato',
    color:"white",
    fontSize:"20px",
    padding:"2px"
    
  },
  button: {
    backgroundColor: "#242424",
    color:"whitesmoke",
    marginLeft:"0",
    padding:"5px"
    
   
  },
  button1: {
    backgroundColor: "#242424",
    color:"whitesmoke",
    marginLeft:"36%",
    padding:"5px",
    fontSize:"20px"
   
  },
});
