import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import avatar from "assets/img/faces/marc.jpg";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// core components
import GridItem from "components/Grid/GridItem.js";
import React from "react";

import { connect } from "react-redux";

import { decodeCertificateInfo } from 'decodePK.js';

const CssTextField = withStyles({
  root: {
    marginTop: "1rem",
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey"
      },
      "&:hover fieldset": {
        borderColor: "black"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    }
  }
})(TextField);

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControll: {
    marginTop: "1rem",
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red"
      },
      "&:hover fieldset": {
        borderColor: "yellow"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    }
  }
};

const useStyles = makeStyles(styles);


const mapDispatchToProps = dispatch => {
  return {
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function UserProfile(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const [showCertificate, setShowCertificate] = React.useState(false);

  const handleShowCertificate = () => {
    setShowCertificate(!showCertificate);
  }


  // const [email, setEmail] = React.useState(props.currentUser.email);

  // const bufferToString = buf => {
  //   return Buffer.from(buf.data).toString()
  // }

  const printCertInfo = () => {
    const decodedCert = decodeCertificateInfo(props.currentUser.cert);
    return (
      <List component="nav" className={classes.root} aria-label="contacts">
        <ListItem button>
          <ListItemIcon>
            <CheckCircleTwoToneIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Certificate Serial Number" secondary={decodedCert.serialNumber} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CheckCircleTwoToneIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Encode Algorithm OID" secondary={decodedCert.algorithm} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CheckCircleTwoToneIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Valid From" secondary={decodedCert.validFrom} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CheckCircleTwoToneIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Valid Until" secondary={decodedCert.validUntil} />
        </ListItem>
        {decodedCert.subject.map((e, i) => {
          return (
            <ListItem button key={`cert-subject${i}`}>
              <ListItemIcon>
                <CheckCircleTwoToneIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"OID: " + e.type} secondary={e.value} />
            </ListItem>
          )
        })}
        {decodedCert.issuer.map((e, i) => {
          return (
            <ListItem button key={`cert-issuer${i}`}>
              <ListItemIcon>
                <CheckCircleTwoToneIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"OID: " + e.type} secondary={e.value} />
            </ListItem>
          )
        })}
      </List>
    )
  }

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="primary">
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <h4 className={classes.cardTitleWhite}>{props.currentUser.email}</h4>
              <p className={classes.cardCategoryWhite}>{props.currentUser.username}</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CssTextField
                    className={classes.margin}
                    id="username"
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    value={props.currentUser.username}
                    disabled
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CssTextField
                    className={classes.margin}
                    id="email-address"
                    fullWidth
                    label="Email address"
                    variant="outlined"
                    value={props.currentUser.email}
                    disabled
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl fullWidth className={classes.formControll}>
                    <InputLabel id="genderr">Gender</InputLabel>
                    <Select id="genderr" value="1" disabled>
                      <MenuItem value={1}>Male</MenuItem>
                      <MenuItem value={2}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <MuiPickersUtilsProvider
                    className={classes.formControll}
                    utils={DateFnsUtils}
                  >
                    <KeyboardDatePicker
                      disableToolbar
                      // variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date of Birth"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                      fullWidth
                      helperText="MM/dd/yyyy"
                      variant="outlined"
                      disabled
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
              <Button color="danger">Reset</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={5} >
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Your Digital Certificate</h4>
              {/* <p className={classes.cardCategoryWhite}>{bufferToString(props.currentUser.private_key)}</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {!showCertificate ? <CssTextField
                    className={classes.margin}
                    id="cert"
                    fullWidth
                    label="Encoded Certificate"
                    variant="outlined"
                    value={props.currentUser.cert}
                    disabled
                    multiline={true}
                    rows={14}
                  /> :
                    printCertInfo()
                  }
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={handleShowCertificate} color="primary">{!showCertificate ? "Readable Certificate" : "Encoded Certificate"}</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
)