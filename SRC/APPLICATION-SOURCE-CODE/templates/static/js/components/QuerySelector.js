import clsx from "clsx";
import React from "react";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Zoom from "@material-ui/core/Zoom";
import Link from "@material-ui/core/Link";
import Fade from "@material-ui/core/Fade";
import Input from "@material-ui/core/Input";
import Table from "@material-ui/core/Table";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import { green } from "@material-ui/core/colors";
import Backdrop from "@material-ui/core/Backdrop";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TableContainer from "@material-ui/core/TableContainer";
import InputAdornment from "@material-ui/core/InputAdornment";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";

import CommonVars from "./CommonVars";
import SkeletonLoad from "./SkeletonLoad";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "90%"
    },
    "& .MuiFormControl-root": {
      margin: theme.spacing(3),
      width: "70%"
    }
  },
  container: {
    position: "relative",
    left: "0%",
    width: "100%"
  },
  rating1: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: (255, 255, 255, 0.4)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    maxWidth: "60%"
  }
}));

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+"
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 }
];

function createData(arg1, arg2, arg3, arg4, arg5) {
  return { arg1, arg2, arg3, arg4, arg5 };
}

var columns = [];
var rows = [];

function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip title={labels[value] || ""}>
      <span {...other} />
    </Tooltip>
  );
}

function SendButton(props) {
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.success
  });

  return (
    <Fab
      aria-label="save"
      color="primary"
      className={buttonClassname}
      onClick={props.handleButtonClick}
    >
      <PlayArrowIcon fontSize="large" />
    </Fab>
  );
}

function PlaylistManager() {
  const classes = useStyles();

  const [value, setValue] = React.useState(2.5);

  var delay = -200;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                delay += 200;

                return (
                  <Zoom
                    in="true"
                    style={{ transitionDelay: true ? delay + "ms" : "0ms" }}
                  >
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map(column => {
                        var value = row[column.id];
                        if (column.format && typeof value === "number")
                          value = column.format(value);

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "arg1" ? (
                              <div>
                                <Link onClick={handleClickOpen}>{value}</Link>
                                <Modal
                                  aria-labelledby="additional-info"
                                  aria-describedby="additional-info"
                                  className={classes.modal}
                                  open={open}
                                  onClose={handleClose}
                                  closeAfterTransition
                                  BackdropComponent={Backdrop}
                                  BackdropProps={{
                                    timeout: 500
                                  }}
                                >
                                  <Fade in={open}>
                                    <div className={classes.paper}>
                                      <table color="white">
                                        <tr>
                                          <td height="10%">
                                            <h2 id="modal-title">
                                              Artist: Ed Sheeran
                                            </h2>
                                          </td>
                                          <td rowspan="2">
                                            <Paper
                                              zDepth={5}
                                              circle={true}
                                              style={{
                                                overflow: "hidden",
                                                borderBottomLeftRadius: "50%",
                                                borderTopLeftRadius: "50%"
                                                // borderBottomRightRadius: "15%",
                                                // borderTopRightRadius: "15%"
                                              }}
                                            >
                                              <img
                                                width="200px"
                                                height="250px"
                                                alt="stam"
                                                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Ed_Sheeran_2013.jpg"
                                              />
                                            </Paper>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <h4 id="modal-description">
                                              Biography: Edward Christopher "Ed"
                                              Sheeran (born 17 February 1991) is
                                              an English singer-songwriter and
                                              musician. He was born in Hebden
                                              Bridge in Yorkshire and raised in
                                              Framlingham, Suffolk. He dropped
                                              out of school at 16, and moved to
                                              London the following year, in
                                              2008, to pursue a career in music.
                                              In early 2011, Sheeran
                                              independently released the
                                              extended play, No. 5
                                              Collaborations Project, which
                                              caught the attention of Elton John
                                              and Jamie Foxx. After signing with
                                              Asylum Records, his debut album, +
                                              (read as "plus"), was released on
                                              9 September 2011 and has since
                                              been certified six-times platinum
                                              in the UK. The album contains the
                                              single, "The A Team", which earned
                                              him the Ivor Novello Award for
                                              Best Song Musically and Lyrically.
                                              In 2012, Sheeran won the Brit
                                              Awards for Best British Male Solo
                                              Artist and British Breakthrough
                                              Act….
                                            </h4>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </Fade>
                                </Modal>
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </Zoom>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div align="center">
        <Zoom in="true" style={{ transitionDelay: true ? "2000ms" : "0ms" }}>
          <Box fullWidth component="fieldset" mb={3} borderColor="transparent">
            <Typography>Rate this playlist:</Typography>
            <Rating
              name="hover-tooltip"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              precision={0.5}
              IconContainerComponent={IconContainer}
            />
          </Box>
        </Zoom>
      </div>
    </div>
  );
}

function QueryArgs1() {
  const classes = useStyles();

  UpdatePlaylistHeaders(1);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="1" />
      <div align="center">
        <FormControlLabel
          control={<Switch value="explicit" color="primary" />}
          label="Include Explicit"
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
        />
      </div>
      <div>
        <Autocomplete
          fullWidth
          id="combo-box-demo"
          options={top100Films}
          getOptionLabel={option => option.title}
          renderInput={params => (
            <TextField
              {...params}
              label="Combo box"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">
            With a start adornment
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </form>
  );
}

function QueryArgs2() {
  const classes = useStyles();

  UpdatePlaylistHeaders(2);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="2" />
      <div>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">
            This is QueryArgs2
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div>
        <TextField
          fullWidth
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
        />
      </div>
      <div>
        <Autocomplete
          fullWidth
          id="combo-box-demo"
          options={top100Films}
          getOptionLabel={option => option.title}
          renderInput={params => (
            <TextField
              {...params}
              label="Combo box"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        />
      </div>
    </form>
  );
}

function QueryArgs3() {
  const classes = useStyles();

  UpdatePlaylistHeaders(3);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="3" />
      <div>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">
            This is QueryArgs2
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div>
        <TextField
          fullWidth
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
        />
      </div>
      <div>
        <Autocomplete
          fullWidth
          id="combo-box-demo"
          options={top100Films}
          getOptionLabel={option => option.title}
          renderInput={params => (
            <TextField
              {...params}
              label="Combo box"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        />
      </div>
    </form>
  );
}

function QueryArgs4() {
  const classes = useStyles();

  UpdatePlaylistHeaders(4);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="4" />
      <div>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">
            This is QueryArgs2
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div>
        <TextField
          fullWidth
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
        />
      </div>
      <div>
        <Autocomplete
          fullWidth
          id="combo-box-demo"
          options={top100Films}
          getOptionLabel={option => option.title}
          renderInput={params => (
            <TextField
              {...params}
              label="Combo box"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        />
      </div>
    </form>
  );
}

function QueryArgs5() {
  const classes = useStyles();

  UpdatePlaylistHeaders(5);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="5" />
      <div>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">
            This is QueryArgs2
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div>
        <TextField
          fullWidth
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
        />
      </div>
      <div>
        <Autocomplete
          fullWidth
          id="combo-box-demo"
          options={top100Films}
          getOptionLabel={option => option.title}
          renderInput={params => (
            <TextField
              {...params}
              label="Combo box"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        />
      </div>
    </form>
  );
}

function QueryArgs6() {
  const classes = useStyles();

  UpdatePlaylistHeaders(6);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="6" />
      <div>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">
            This is QueryArgs2
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div>
        <TextField
          fullWidth
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
        />
      </div>
      <div>
        <Autocomplete
          fullWidth
          id="combo-box-demo"
          options={top100Films}
          getOptionLabel={option => option.title}
          renderInput={params => (
            <TextField
              {...params}
              label="Combo box"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        />
      </div>
    </form>
  );
}

function QueryArgs7() {
  const classes = useStyles();

  UpdatePlaylistHeaders(7);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="7" />
      <div>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">
            This is QueryArgs2
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div>
        <TextField
          fullWidth
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
        />
      </div>
      <div>
        <Autocomplete
          fullWidth
          id="combo-box-demo"
          options={top100Films}
          getOptionLabel={option => option.title}
          renderInput={params => (
            <TextField
              {...params}
              label="Combo box"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        />
      </div>
    </form>
  );
}

export default function MainSection() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState("0");
  const [args, setArgs] = React.useState(<CommonVars />);

  const [tableBody, SetTableBody] = React.useState(<SkeletonLoad />);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const [sendShown, setSendShown] = React.useState(<p />);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      SetTableBody(<SkeletonLoad />);
      setSuccess(false);
      setLoading(true);
      UpdatePlaylistData(document.getElementById("queryNum").value);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        SetTableBody(<PlaylistManager />);
      }, 5000);
    }
  };

  return (
    <div className={classes.root}>
      <Button
        startIcon={selected !== "1" ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        variant={selected !== "1" ? "outlined" : "contained"}
        value="1"
        size="large"
        color="primary"
        onClick={() => {
          if (selected === "1") {
            setArgs(<CommonVars />);
            setSelected("0");
            setSendShown(<p />);
          } else {
            setSelected("1");
            setArgs(<QueryArgs1 />);
            setSendShown(
              <SendButton
                success={success}
                handleButtonClick={handleButtonClick}
              />
            );
          }
        }}
      >
        Query #1
      </Button>
      <Button
        startIcon={selected !== "2" ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        variant={selected !== "2" ? "outlined" : "contained"}
        value="2"
        size="large"
        color="primary"
        onClick={() => {
          if (selected === "2") {
            setArgs(<CommonVars />);
            setSelected("0");
            setSendShown(<p />);
          } else {
            setSelected("2");
            setArgs(<QueryArgs2 />);
            setSendShown(
              <SendButton
                success={success}
                handleButtonClick={handleButtonClick}
              />
            );
          }
        }}
      >
        Query #2
      </Button>
      <Button
        startIcon={selected !== "3" ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        variant={selected !== "3" ? "outlined" : "contained"}
        value="3"
        size="large"
        color="primary"
        onClick={() => {
          if (selected === "3") {
            setArgs(<CommonVars />);
            setSelected("0");
            setSendShown(<p />);
          } else {
            setSelected("3");
            setArgs(<QueryArgs3 />);
            setSendShown(
              <SendButton
                success={success}
                handleButtonClick={handleButtonClick}
              />
            );
          }
        }}
      >
        Query #3
      </Button>
      <Button
        startIcon={selected !== "4" ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        variant={selected !== "4" ? "outlined" : "contained"}
        value="4"
        size="large"
        color="primary"
        onClick={() => {
          if (selected === "4") {
            setArgs(<CommonVars />);
            setSelected("0");
            setSendShown(<p />);
          } else {
            setSelected("4");
            setArgs(<QueryArgs4 />);
            setSendShown(
              <SendButton
                success={success}
                handleButtonClick={handleButtonClick}
              />
            );
          }
        }}
      >
        Query #4
      </Button>
      <Button
        startIcon={selected !== "5" ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        variant={selected !== "5" ? "outlined" : "contained"}
        value="5"
        size="large"
        color="primary"
        onClick={() => {
          if (selected === "5") {
            setArgs(<CommonVars />);
            setSelected("0");
            setSendShown(<p />);
          } else {
            setSelected("5");
            setArgs(<QueryArgs5 />);
            setSendShown(
              <SendButton
                success={success}
                handleButtonClick={handleButtonClick}
              />
            );
          }
        }}
      >
        Query #5
      </Button>
      <Button
        startIcon={selected !== "6" ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        variant={selected !== "6" ? "outlined" : "contained"}
        value="6"
        size="large"
        color="primary"
        onClick={() => {
          if (selected === "6") {
            setArgs(<CommonVars />);
            setSelected("0");
            setSendShown(<p />);
          } else {
            setSelected("6");
            setArgs(<QueryArgs6 />);
            setSendShown(
              <SendButton
                success={success}
                handleButtonClick={handleButtonClick}
              />
            );
          }
        }}
      >
        Query #6
      </Button>
      <Button
        startIcon={selected !== "7" ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        variant={selected !== "7" ? "outlined" : "contained"}
        value="7"
        size="large"
        color="primary"
        onClick={() => {
          if (selected === "7") {
            setArgs(<CommonVars />);
            setSelected("0");
            setSendShown(<p />);
          } else {
            setSelected("7");
            setArgs(<QueryArgs7 />);
            setSendShown(
              <SendButton
                success={success}
                handleButtonClick={handleButtonClick}
              />
            );
          }
        }}
      >
        Query #7
      </Button>
      <table width="100%">
        <tbody>
          <tr>
            <td width="40%">{args}</td>
            <td rowspan="2" width="60%">
              {tableBody}
            </td>
          </tr>
          <tr>
            <td>
              <div className={classes.wrapper}>
                {sendShown}
                {loading && (
                  <CircularProgress size={68} className={classes.fabProgress} />
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function UpdatePlaylistData(selected) {
  //var some_data = document.getElementById("input-with-icon-adornment").value;

  const Http = new XMLHttpRequest();
  const url = "./timor?queryNum=" + selected;
  Http.open("GET", url);
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send();

  Http.onreadystatechange = e => {
    rows = [];

    var data = JSON.parse(Http.response);

    for (var index = 0; index < data.length; index++) {
      var current = data[index];
      if (current.length === 4)
        rows.push(createData(current[0], current[1], current[2], current[3]));
      else
        rows.push(
          createData(current[0], current[1], current[2], current[3], current[4])
        );
    }

    console.log(rows);
  };
}

function UpdatePlaylistHeaders(queryNum) {
  if (queryNum === 1 || queryNum === 2) {
    columns = [
      {
        id: "arg1",
        label: "Times Played",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg2",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg3",
        label: "Artist",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg4",
        label: "Length",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      },
      {
        id: "arg5",
        label: "Album",
        minWidth: 100,
        align: "center",
        format: value => value.toFixed(2)
      }
    ];
  } else if (queryNum === 3) {
    columns = [
      {
        id: "arg1",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg2",
        label: "Artist",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg3",
        label: "Times Played",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg4",
        label: "Most Played Song",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      },
      {
        id: "arg5",
        label: "Total Song Plays",
        minWidth: 100,
        align: "center"
        // format: value => value.toFixed(2)
      }
    ];
  } else if (queryNum === 4) {
    columns = [
      {
        id: "arg1",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg2",
        label: "Average Times Played",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg3",
        label: "Total Times Played",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      },
      {
        id: "arg4",
        label: "Most Played Song",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg5",
        label: "Artist Image",
        minWidth: 100,
        align: "center"
        // format: value => value.toFixed(2)
      }
    ];
  } else if (queryNum === 5) {
    columns = [
      {
        id: "arg1",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg2",
        label: "Artist",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg3",
        label: "Album Length",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg4",
        label: "Longest Song",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      },
      {
        id: "arg5",
        label: "Album Cover",
        minWidth: 100,
        align: "center"
        // format: value => value.toFixed(2)
      }
    ];
  } else if (queryNum === 6) {
    columns = [
      {
        id: "arg1",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg2",
        label: "Artist",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg3",
        label: "Album",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg4",
        label: "Total Times Played",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      },
      {
        id: "arg5",
        label: "Release year",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      }
    ];
  } else if (queryNum === 7) {
    columns = [
      {
        id: "arg1",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg2",
        label: "Total Times Played",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg3",
        label: "Artists",
        align: "center",
        minWidth: 100
      },
      {
        id: "arg4",
        label: "Album",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      },
      {
        id: "arg5",
        label: "Total Plays of Artist in Genre",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      }
    ];
  }
}
