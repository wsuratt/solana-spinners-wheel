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
        console.log(" i am trying to use ", handle);
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
              sx={{
                  backgroundColor: "#242424",
                  borderRadius: "5px",
                  border: "2px whitesmoke",
                  borderColor: "none",
                  maxHeight: 600,
                  padding:"10px",
                  fontFamily:'Lato',
                  color:"white",
                  paddingTop: "20px"

              }}
          >

              <img
                  height="140"
                  width= "140"

                  src={props.image}
                  alt={props.image}
              />
              <Typography> {props.name} </Typography>

                <Button
                    onClick={() => {
                        handleClickOpen()
                    }}

                    sx={{
                        backgroundColor: "#242424",
                        color:"whitesmoke",
                        marginLeft:"0",
                        padding:"5px",
                        hover: {
                            "&:hover": {
                                backgroundColor: "whitesmoke",
                            },
                        },
                        marginTop: "20px",
                        width: "100px",
                        height: "50px",

                        fontFamily: font,
                        font: "caption",
                        borderRadius: "40px",
                        borderColor:"whitesmoke"
                    }}
                    size="medium"
                    variant="outlined"

                >
                    {amIMinting ? <CircularProgress /> : "Use"}
                </Button>
          </Card>
      </div>
  );
}
