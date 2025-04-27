import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import React, {  useState } from "react";
import InfoIcon from '@mui/icons-material/Info';

const OrderInfoComponent = ({ order , open , setOpen , handleClose}) => {
 

  return (
    <div>
      <button
         onClick={() => setOpen(order?.orderNumber)}
        type="button"
        className="inline-flex items-center hover:cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        View Info
      </button>

      <Dialog
        className="rounded-xl mx-auto bg-transparent shadow-sm"
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            minHeight: "250px",
            maxHeight: "100vh",
            borderRadius: "20px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            mb: 1,
            textAlign: "left",
          }}
          id="responsive-dialog-title"
        >
            <InfoIcon className="me-3"/>
          Order Information
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ px: 1, py: 0 }}>
            <Grid container spacing={2}>
              {/* Order Number */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order Number
                </Typography>
                <Typography variant="body1">{order?.orderNumber}</Typography>
              </Grid>

              {/* Name & Email */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Customer Name
                </Typography>
                <Typography variant="body1">{order?.name}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{order?.email}</Typography>
              </Grid>

              {/* Address, City, Township */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body1">{order?.address}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  City
                </Typography>
                <Typography variant="body1">{order?.city}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Township
                </Typography>
                <Typography variant="body1">{order?.township}</Typography>
              </Grid>

              {/* Delivery Type */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Delivery Type
                </Typography>
                <Typography variant="body1">{order?.deliveryType == 0 ? "Standard" : "Express"}</Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderInfoComponent;
