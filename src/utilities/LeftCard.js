import React, { useState } from "react";
import { useUserState } from "./firebase";
import "./css/LeftCard.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ListItemText from "@mui/material/ListItemText";
import {FormHelperText} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {Typography} from "@mui/material";
import { useData, setData } from "./firebase";
import netflix from "./assets/netflix.png";
import spotify from "./assets/spotify.png";
import prime from "./assets/prime.png";
import adobe from './assets/adobe.jpeg';
import paste from './assets/paste.png';

const subscriptionIcons = {
  "spotify": spotify,
  "netflix": netflix,
  "prime": prime,
  "adobe": adobe,
  "paste": paste,
}

const SubscriptionBar = ({ name, price, date, type, index, deleteSubscription, status, path }) => {
  const [isClicked, setIsClicked] = useState(false)

  const ListItemStyleStatic = {
    borderRadius: 2,
    bgcolor: "rgba(255, 255, 255, 0.9)",
    boxShadow: 2,
    marginBottom: 2,
    width: "170%",
  }

  const ListItemStyleLogin = {
    borderRadius: 2,
    bgcolor: "rgba(255, 255, 255, 0.9)",
    boxShadow: 2,
    marginBottom: 2,
    width: "75%",
  }

  const clicked = () => {
    setIsClicked(!isClicked)
  }

  const mouseLeave = () => {
    if(isClicked) setTimeout(()=>{setIsClicked(!isClicked)}, 500);
  }

  return (
    <ListItem disablePadding sx={() => {return status === 1 ? ListItemStyleStatic : ListItemStyleLogin}}>
      <ListItemButton onClick={clicked}
                      onMouseLeave={mouseLeave}>
        {subscriptionIcons[name.toLowerCase()] != null ? <img alt="subscriptionIcons"
                                                              src={subscriptionIcons[name.toLowerCase()]}
                                                              style={{height:"30px", width: "30px"}}/> : <ChevronRightIcon />}
        <ListItemText primary={name} style={{textAlign:"center"}}/>
        <ListItemText primary={"$ " + price} style={{textAlign:"center"}} />
        <ListItemText primary={typeof date === "string" ? date : date != null ? date.toDateString() : ""} style={{textAlign:"center"}} />
        <ListItemText primary={type === 2 ? "Monthly": "Annually"} style={{textAlign:"center"}} />
        {isClicked && <Button onClick={() => deleteSubscription(index, path)}>Delete?</Button>}
      </ListItemButton>
    </ListItem>
  );
};

const SubscriptionList = ({ subscriptions, path, setDeleteSnackbar}) => {
  const deleteSubscription = (index) => {
    let subsCopy = subscriptions;
    subsCopy.splice(index,1);
    console.log(subsCopy);
    setData(path, subsCopy);
    setDeleteSnackbar(true);
  }
  return (
    <List>
      {subscriptions.map((e, index) => (
        <SubscriptionBar name={e.name}
                         price={e.price}
                         date={e.date}
                         type={e.type}
                         index={index}
                         deleteSubscription={deleteSubscription}
                         status={0}
                         path={path} />
      ))}
    </List>
  );
};

const FormModal = ({ open, handleClose, closeModal, user, openSnackbar, setOpenSnackbar}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState('');
  const today = new Date();
  const [date, setDate] = useState(today);
  const [type, setType] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "rgba(255, 255, 255, .95)",
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexFlow: "column nowrap",
    padding: "5rem",
  };

  const inputStyle = {
    margin: "0.5rem 0",
    marginBottom: "15px",
  };

  const handleCloseModal = (name, price, date, type, user) => {
    handleClose(name, price, date, type, "/" + reformatPath(user.email) + "/subscriptions");
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{fontSize:18, marginBottom:"20px"}}> Please Enter Subscription Data: </Typography>
        <Divider />
        <InputLabel id="name-label" sx={{fontSize:14, marginTop:"15px"}}>Name of subscription</InputLabel>
        <TextField
          sx={inputStyle}
          labelId="name-label"
          id="name"
          label="Name"
          value={name}
          onChange={(newName) => setName(newName.target.value)}/>
        <FormHelperText sx={{textAlign:"center", marginTop:-1}}> Enter the name of your subscription</FormHelperText>
        <InputLabel id="price-label" sx={{fontSize:14}}>Price of subscription</InputLabel>
        <TextField
          sx={inputStyle}
          labelId="price-label"
          id="price"
          label="Price"
          value={price}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(newPrice) => setPrice(newPrice.target.value)}/>
        <FormHelperText sx={{textAlign:"center", marginTop:-1}}> Should only contains 0~9 & .</FormHelperText>
        <InputLabel id="type-label" sx={{fontSize:14}}>Type of subscription</InputLabel>
        <Select
          sx={inputStyle}
          labelId="type-label"
          id="type"
          label="Type"
          value={type}
          onChange={(newType) => setType(newType.target.value)}>
          <MenuItem disabled value=""><em>None</em></MenuItem>
          <MenuItem value={2}>Monthly</MenuItem>
          <MenuItem value={1}>Annually</MenuItem>
        </Select>
        <FormHelperText sx={{textAlign:"center", marginTop:-1, marginBottom:1}}> Monthly / Annually</FormHelperText>
        <InputLabel id="date-label" sx={{fontSize:14, marginBottom:2}}>Start date of subscription</InputLabel>
        <LocalizationProvider sx={inputStyle} dateAdapter={DateAdapter} >
          <DatePicker
            sx={inputStyle}
            id="date"
            labelId="date-label"
            label="Start Date"
            value={date}
            onChange={(newDate) => {
              setDate(newDate.$d);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          style={{width:"50%", margin:"0 auto", marginTop:"30px"}}
          variant="contained"
          onClick={() => {
            setOpenSnackbar(true);
            handleCloseModal(name, price, date, type, user)
          }}>
          Submit Subscription
        </Button>
      </Box>
    </Modal>
  );
};

const LeftCardStatic = () => {
  const style = {
    borderRadius: 2,
  }

  return (
    <div>
      <p style={{paddingTop: "50px",
                 fontSize: "22px",
                 fontWeight: "bold",
                 color: "dodgerblue",
                 fontFamily: "Gill Sans"}}> Examples for subscript </p>
      <div className="descriptions">
        <List sx={style}>
          <SubscriptionBar name={"Netflix"} price={17.99} date={new Date()} type={2} index={0} deleteSubscription={()=>{}} status={1} />
          <SubscriptionBar name={"Adobe"} price={19.99} date={new Date()} type={2} index={1} deleteSubscription={()=>{}} status={1} />
          <SubscriptionBar name={"Spotify"} price={4.99} date={new Date()} type={2} index={2} deleteSubscription={()=>{}} status={1} />
          <SubscriptionBar name={"Paste"} price={14.99} date={new Date()} type={1} index={3} deleteSubscription={()=>{}} status={1} />
          <SubscriptionBar name={"Prime"} price={12.99} date={new Date()} type={2} index={4} deleteSubscription={()=>{}} status={1} />
        </List>
      </div>
    </div>
  );
};

const reformatPath = (path) => path.replace(/[^A-Z0-9]+/ig, "_");

const LeftCardLogin = ({ subscriptions, setSubscriptions, handleOpen, handleClose, closeModel, open, user, deleteSnackbar, setDeleteSnackbar }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [subscriptionsData, loading, error] = useData("/" + reformatPath(user.email) + "/subscriptions");
  if (error) return <h2>{error}</h2>;
  if (loading) return <h2>Loading the subscriptions...</h2>;
  setSubscriptions(subscriptionsData);

  const style = {
    marginLeft: -22,
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setDeleteSnackbar(false);
  };

  return (
      <div className="leftCardLoginPage">
        <p style={{paddingTop: "50px",
          fontSize: "22px",
          fontWeight: "bold",
          color: "dodgerblue",
          fontFamily: "Gill Sans"}}> Manage your subscriptions ! </p>
        <div className="leftCardLogin">
          {subscriptions != null && subscriptions.length > 0 ? (
              <SubscriptionList subscriptions={subscriptions} path={"/" + reformatPath(user.email) + "/subscriptions"} setDeleteSnackbar={setDeleteSnackbar}/>
          ) : <h2>You haven't added any subscriptions yet!</h2>}
          <Button sx={style} variant="contained" onClick={handleOpen}>
            Add Subscription
          </Button>
          <FormModal
              open={open}
              handleClose={handleClose}
              closeModal={closeModel}
              subscriptions={subscriptions != null ? subscriptions : []}
              user={user}
              openSnackbar={openSnackbar}
              setOpenSnackbar={setOpenSnackbar}
          />
          <Snackbar open={openSnackbar}
                    autoHideDuration={4000}
                    anchorOrigin={{horizontal:"left", vertical:"top"}}
                    onClose={() => handleSnackbarClose()}>
            <Alert onClose={() => handleSnackbarClose()} severity="success" sx={{ width: '100%' }}>
              Add subscription successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={deleteSnackbar}
                    autoHideDuration={4000}
                    anchorOrigin={{horizontal:"left", vertical:"top"}}
                    onClose={() => handleSnackbarClose()}>
            <Alert onClose={() => handleSnackbarClose()} severity="success" sx={{ width: '100%' }}>
              Delete subscription successfully!
            </Alert>
          </Snackbar>
        </div>
      </div>
  );
};


export const LeftCard = ({ subscriptions, setSubscriptions }) => {
  const [user] = useUserState();
  const [open, setOpen] = useState(false);
  const [deleteSnackbar, setDeleteSnackbar] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const closeModel = () => {
    setOpen(false);
  };

  const handleClose = (name, price, date, type, path) => {
    console.log(name, price, date, type);
    let subsCopy = subscriptions;
    if (subsCopy == null){
      subsCopy = [];
    }
    if (name && price && date) {
      subsCopy.push({ name: name, price: price, date: date.toDateString(), type: type });
      console.log(subsCopy);
      setData(path, subsCopy);
      setOpen(false);
    } else {
      alert('Enter valid inputs')
    }
  };

  return (
    <div className="leftcard">
      {user ? <LeftCardLogin subscriptions={subscriptions}
                             setSubscriptions={setSubscriptions}
                             handleOpen={handleOpen}
                             handleClose={handleClose}
                             closeModel={closeModel}
                             open={open}
                             user={user}
                             deleteSnackbar={deleteSnackbar}
                             setDeleteSnackbar={setDeleteSnackbar}/> : <LeftCardStatic />}
    </div>
  );
};
