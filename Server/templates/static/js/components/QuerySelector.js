import clsx from "clsx";
import React from "react";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Zoom from "@material-ui/core/Zoom";
import Link from "@material-ui/core/Link";
import Input from "@material-ui/core/Input";
import Table from "@material-ui/core/Table";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import { green } from "@material-ui/core/colors";
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

function createData(place, name, artist, arg1, arg2) {
  return { place, name, artist, arg1, arg2 };
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

  UpdatePlaylistData();

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
                            {column.id === "name" ? (
                              <Link href="#">{value}</Link>
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
            setArgs(<QueryArgs1 />);
            setSelected("1");
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
            setArgs(<QueryArgs2 />);
            setSelected("2");
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
            setArgs(<QueryArgs3 />);
            setSelected("3");
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
            setArgs(<QueryArgs4 />);
            setSelected("4");
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
            setArgs(<QueryArgs5 />);
            setSelected("5");
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
            setArgs(<QueryArgs6 />);
            setSelected("6");
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
            setArgs(<QueryArgs7 />);
            setSelected("7");
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

function UpdatePlaylistData() {
  rows = [];
  const Http = new XMLHttpRequest();
  const url='./timor';
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText);
    for (var entry in Http.responseText) {
      rows.push(createData(entry[0], entry[1], entry[2], 1, 1));
    }
  }

  // rows = [
  //   createData(1, "Song #1", "Offek", "Ido", "Yael"),
  //   createData(2, "Song #2", 9.0, 37, 4.3),
  //   createData(3, "Song #3", 16.0, 24, 6.0),
  //   createData(4, "Song #4", 3.7, 67, 4.3),
  //   createData(5, "Song #5", 16.0, 49, 3.9),
  //   createData(6, "Song #6", 6.0, 24, 4.0),
  //   createData(7, "Song #7", 9.0, 37, 4.3),
  //   createData(8, "Song #8", 16.0, 24, 6.0),
  //   createData(9, "Song #9", 3.7, 67, 4.3),
  //   createData(10, "Song #10", 16.0, 49, 3.9)
  // ];
}

function UpdatePlaylistHeaders(queryNum) {
  if (queryNum === 1 || queryNum === 2) {
    columns = [
      {
        id: "name",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "artist",
        label: "Artist",
        align: "center",
        minWidth: 100
      },
      {
        id: "album",
        label: "Artist",
        align: "center",
        minWidth: 100
      },
      {
        id: "length",
        label: "Length",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      },
      {
        id: "totalPlayed",
        label: "Times Played",
        minWidth: 100,
        align: "center",
        format: value => value.toFixed(2)
      }
    ];
  } else if (queryNum === 3) {
    columns = [
      {
        id: "name",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "artist",
        label: "Artist",
        align: "center",
        minWidth: 100
      },
      {
        id: "totalPlayed",
        label: "Times Played",
        align: "center",
        minWidth: 100
      },
      {
        id: "mostPlayedSong",
        label: "Most Played Song",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      },
      {
        id: "image",
        label: "Album Cover",
        minWidth: 100,
        align: "center"
        // format: value => value.toFixed(2)
      }
    ];
  } else if (queryNum === 4) {
    columns = [
      {
        id: "name",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "averageTimesPlayed",
        label: "Average Times Played",
        align: "center",
        minWidth: 100
      },
      {
        id: "mostPlayedSong",
        label: "Most Played Song",
        align: "center",
        minWidth: 100
      },
      {
        id: "totalTimesPlayed",
        label: "Total Times Played",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      },
      {
        id: "image",
        label: "Artist Image",
        minWidth: 100,
        align: "center"
        // format: value => value.toFixed(2)
      }
    ];
  } else if (queryNum === 5) {
    columns = [
      {
        id: "name",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "artist",
        label: "Artist",
        align: "center",
        minWidth: 100
      },
      {
        id: "totalPlayed",
        label: "Times Played",
        align: "center",
        minWidth: 100
      },
      {
        id: "longestSong",
        label: "Longest Song",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      },
      {
        id: "image",
        label: "Album Cover",
        minWidth: 100,
        align: "center"
        // format: value => value.toFixed(2)
      }
    ];
  } else if (queryNum === 6) {
    columns = [
      {
        id: "name",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "artist",
        label: "Artist",
        align: "center",
        minWidth: 100
      },
      {
        id: "album",
        label: "Album",
        align: "center",
        minWidth: 100
      },
      {
        id: "releaseData",
        label: "Release Date",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      }
    ];
  } else if (queryNum === 7) {
    columns = [
      {
        id: "name",
        label: "Name",
        align: "center",
        minWidth: 100
      },
      {
        id: "artist",
        label: "Artist",
        align: "center",
        minWidth: 100
      },
      {
        id: "album",
        label: "Album",
        align: "center",
        minWidth: 100
      },
      {
        id: "playedInGenre",
        label: "Total Times Played In Genre",
        minWidth: 100,
        align: "center"
        // format: value => value.toLocaleString()
      }
    ];
  }
}
