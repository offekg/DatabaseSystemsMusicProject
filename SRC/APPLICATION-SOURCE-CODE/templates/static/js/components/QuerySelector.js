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
import { blue } from "@material-ui/core/colors";
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
    color: blue[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: blue[500],
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
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    maxWidth: "60%"
  },
  regularCell: {
    color: "white"
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

function createData(arg1, arg2, arg3, arg4, arg5, link_id) {
  return { arg1, arg2, arg3, arg4, arg5, link_id };
}

var columns = [];
var rows = [];
var modalData = [];

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

  const handleClickOpen = index => {
    UpdateModalData("song", index, setOpen);
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
                                <Link
                                  onClick={() => handleClickOpen(row.link_id)}
                                >
                                  {value}
                                </Link>
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
                                              {modalData[0]}
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
                                              }}
                                            >
                                              <img
                                                width="200px"
                                                height="250px"
                                                alt="stam"
                                                src={modalData[2]}
                                              />
                                            </Paper>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <h4 id="modal-description">
                                              {modalData[1]}
                                            </h4>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </Fade>
                                </Modal>
                              </div>
                            ) : (
                              <span className={classes.regularCell}>
                                {value}
                              </span>
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

export default function MainSection() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(0);
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

  const queryNumToArgs = {
    1: <QueryArgs1 />,
    2: <QueryArgs2 />,
    3: <QueryArgs3 />,
    4: <QueryArgs4 />,
    5: <QueryArgs5 />,
    6: <QueryArgs6 />,
    7: <QueryArgs7 />
  };

  const queryButtons = [];
  for (let i = 1; i < 8; i++) {
    queryButtons.push(
      <Button
        startIcon={selected !== i ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        variant={selected !== i ? "outlined" : "contained"}
        size="large"
        color="primary"
        onClick={() => {
          if (selected === i) {
            setSelected(0);
            setArgs(<CommonVars />);
            setSendShown(<p />);
          } else {
            setSelected(i);
            setArgs(queryNumToArgs[i]);
            setSendShown(
              <SendButton
                success={success}
                handleButtonClick={handleButtonClick}
              />
            );
          }
        }}
      >
        Query #{i}
      </Button>
    );
  }

  return (
    <div className={classes.root}>
      {queryButtons}
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
  const Http = new XMLHttpRequest();
  const url = "./query?queryNum=" + selected;
  Http.open("GET", url);
  Http.setRequestHeader("Content-Type", "application/json");
  Http.onreadystatechange = e => {
    rows = [];

    if (Http.readyState === XMLHttpRequest.DONE && Http.status === 200) {
      var data = JSON.parse(Http.response);

      for (var index = 0; index < data.length; index++) {
        var current = data[index];
        rows.push(
          createData(
            current[0],
            current[1],
            current[2],
            current[3],
            current[4],
            current[current.length - 1]
          )
        );
      }

      console.log(rows);
    }
  };

  Http.send();
}

function UpdateModalData(queryType, id, _callback) {
  const Http = new XMLHttpRequest();
  const url = "./modal?queryType=" + queryType + "&id=" + id;
  Http.open("GET", url);
  Http.setRequestHeader("Content-Type", "application/json");
  Http.onreadystatechange = e => {
    if (Http.readyState === XMLHttpRequest.DONE && Http.status === 200) {
      var data = JSON.parse(Http.response);

      modalData = [data["name"], data["body"], data["image"]];

      _callback(true);
      console.log(data);
    }
  };

  Http.send();
}

const queryHeaders = {
  1: ["Times Played", "Name", "Artist", "Length", "Album"],
  2: ["Times Played", "Name", "Artist", "Length", "Album"],
  3: ["Name", "Artist", "Times Played", "Most Played Song", "Total Song Plays"],
  4: [
    "Name",
    "Average Times Played",
    "Total Times Played",
    "Most Played Song",
    "Total Song Plays"
  ],
  5: ["Name", "Artist", "Album Length", "Longest Song", "Album Cover"],
  6: ["Name", "Artist", "Album", "Total Times Played", "Release year"],
  7: [
    "Name",
    "Total Times Played",
    "Artist",
    "Album",
    "Total Plays of Artist in Genre"
  ]
};

function UpdatePlaylistHeaders(queryNum) {
  columns = [];
  for (let i = 1; i <= queryHeaders[queryNum].length; i++) {
    columns.push({
      id: "arg" + i,
      label: queryHeaders[queryNum][i - 1],
      align: "center",
      minWidth: 100
    });
  }
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
