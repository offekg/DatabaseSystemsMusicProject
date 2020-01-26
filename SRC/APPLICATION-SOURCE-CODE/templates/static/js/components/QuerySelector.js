import clsx from "clsx";
import React from "react";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import Fade from "@material-ui/core/Fade";
import Input from "@material-ui/core/Input";
import Table from "@material-ui/core/Table";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import ReactHtmlParser from "react-html-parser";
import Tooltip from "@material-ui/core/Tooltip";
import { blue } from "@material-ui/core/colors";
import Backdrop from "@material-ui/core/Backdrop";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import { FormHelperText } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TableContainer from "@material-ui/core/TableContainer";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: "70%",
    maxWidth: "70%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
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
    position: "relative",
    left: "30%"
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
    minWidth: "40%",
    maxWidth: "70%",
    overflowY: "scroll",
    maxHeight: "70%",
    paddingLeft: "1%"
  },
  regularCell: {
    color: "black"
  },
  whitespace: {
    whiteSpace: "pre-wrap",
    fontSize: "smaller"
  }
}));

function createData(arg1, arg2, arg3, arg4, arg5, link_id) {
  return { arg1, arg2, arg3, arg4, arg5, link_id };
}

var columns = [];
var rows = [];
var modalData = [];

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

  var delay = -200;

  const [open, setOpen] = React.useState(false);

  const queryNum = parseInt(document.getElementById("queryNum").value, 10);
  const handleClickOpen = index => {
    switch (queryNum) {
      case 1:
        UpdateModalData("artist", index, setOpen);
        break;
      case 2:
      case 3:
      case 4:
      case 6:
        UpdateModalData("song", index, setOpen);
        break;
      case 5:
        UpdateModalData("album", index, setOpen);
        break;
      default:
        break;
    }
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
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleClickOpen(row.link_id)}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </Link>
                              </div>
                            ) : (
                              <span className={classes.regularCell}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
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
              <table color="white" width="100%">
                <tr>
                  <td height="10%" width="60%">
                    <h2 id="modal-title">{modalData[0]}</h2>
                  </td>
                  <td rowspan="2" width="40%">
                    <Paper
                      circle={true}
                      width="40%"
                      height="60%"
                      style={{
                        align: "right",
                        overflow: "hidden",
                        borderBottomLeftRadius: "50%",
                        borderTopLeftRadius: "50%"
                      }}
                    >
                      <img alt="relatedImage" width="100%" src={modalData[2]} />
                    </Paper>
                  </td>
                </tr>
                <tr>
                  <td width="60%">
                    <p className={classes.whitespace} id="modal-description">
                      {ReactHtmlParser(modalData[1])}
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

function validateInputs(queryNum) {
  var isValid = true;
  switch (queryNum) {
    case "1":
      if (
        document.getElementById("manualWords").value === "" &&
        document.getElementById("wordSelector").value === ""
      ) {
        isValid = false;
      }
      break;
    case "2":
      if (document.getElementById("countrySelector").value === "") {
        isValid = false;
      }
      break;
    case "3":
      if (document.getElementById("fromYear").value === "") {
        isValid = false;
      }
      if (document.getElementById("toYear").value === "") {
        isValid = false;
      }
      break;
    case "4":
      if (document.getElementById("genreSelector").value === "") {
        isValid = false;
      }
      break;
    case "5":
      if (document.getElementById("searchByArtist").value === "") {
        isValid = false;
      }
      break;
    case "6":
      if (document.getElementById("songByName").value === "") {
        isValid = false;
      }
      break;
    default:
      break;
  }

  return isValid;
}

export default function MainSection() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(0);
  const [args, setArgs] = React.useState(<CommonVars />);

  const [tableBody, SetTableBody] = React.useState(<SkeletonLoad />);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [sendShown, setSendShown] = React.useState(<p />);

  const handleButtonClick = () => {
    if (validateInputs(document.getElementById("queryNum").value)) {
      SetTableBody(<SkeletonLoad />);
      setSuccess(false);
      setLoading(true);
      UpdatePlaylistData(
        document.getElementById("queryNum").value,
        showPlaylist
      );
    }
  };

  const showPlaylist = () => {
    setSuccess(true);
    setLoading(false);
    SetTableBody(<PlaylistManager />);
  };

  const queryNumToArgs = {
    1: <QueryArgs1 />,
    2: <QueryArgs2 />,
    3: <QueryArgs3 />,
    4: <QueryArgs4 />,
    5: <QueryArgs5 />,
    6: <QueryArgs6 />
  };

  const queryButtons = [];
  for (let i = 1; i < 7; i++) {
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
                align="center"
                success={success}
                handleButtonClick={handleButtonClick}
              />
            );
          }
        }}
      >
        {queryNames[i]}
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

async function UpdatePlaylistData(selected, _callback) {
  const Http = new XMLHttpRequest();

  let getData = new Promise((resolve, reject) => {
    const url = buildUrl(parseInt(selected, 10));
    resolve(url);
  });
  let url = await getData;

  Http.open("GET", url, true);
  Http.setRequestHeader("Content-Type", "application/json");
  Http.onreadystatechange = e => {
    rows = [];

    if (Http.readyState === XMLHttpRequest.DONE) {
      if (Http.status === 200) {
        try {
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
        } catch (err) {
          console.log("Failed retrieving data");
        }
      }
      _callback();
    }
  };

  Http.send();
}

async function buildUrl(selected) {
  var url = "./query?queryNum=" + selected;
  switch (selected) {
    case 1:
      var searchWords = "";
      const wordSelector = document.getElementById("wordSelector").value;
      const manualWords = document
        .getElementById("manualWords")
        .value.replace(/\s+/g, ",");

      if (!(wordSelector === "") && !(manualWords === "")) {
        searchWords = wordSelector + "," + manualWords;
      } else if (!(wordSelector === "") && manualWords === "")
        searchWords = wordSelector;
      else if (wordSelector === "" && !(manualWords === ""))
        searchWords = manualWords;

      url +=
        "&search=" +
        searchWords +
        "&fromYear=" +
        document.getElementById("fromYear1").value +
        "&toYear=" +
        document.getElementById("toYear1").value;
      return url;
    case 2:
      url += "&countries=" + document.getElementById("countrySelector").value;
      return url;
    case 3:
      url +=
        "&fromYear=" +
        document.getElementById("fromYear").value +
        "&toYear=" +
        document.getElementById("toYear").value;
      return url;
    case 4:
      url += "&genre=" + document.getElementById("genreSelector").value;
      return url;
    case 5:
      url += "&search=" + document.getElementById("searchByArtist").value;
      return url;
    case 6:
      url += "&search=" + document.getElementById("songByName").value;
      return url;
    default:
      return url;
  }
}

function UpdateModalData(queryType, id, _callback) {
  const Http = new XMLHttpRequest();
  const url = "./modal?queryType=" + queryType + "&id=" + id;
  Http.open("GET", url);
  Http.setRequestHeader("Content-Type", "application/json");
  Http.onreadystatechange = e => {
    if (Http.readyState === XMLHttpRequest.DONE && Http.status === 200) {
      try {
        var data = JSON.parse(Http.response);

        modalData = [data["name"], data["body"], data["image"]];

        _callback(true);
        console.log(data);
      } catch (err) {
        console.log("Failed retrieving data");
      }
    }
  };

  Http.send();
}

const queryHeaders = {
  1: ["Name", "Birth Year"],
  2: ["Name", "Times Played", "Artist", "Duration", "Album"],
  3: ["Name", "Artist", "Album", "Release year", "Times Played"],
  4: [
    "Name",
    "Times Played",
    "Artist",
    "Album",
    "Total Artist's Played In Genre"
  ],
  5: ["Album", "Artist", "Release year"],
  6: ["Name", "Artist", "Album", "Release year", "Genre"]
};

function UpdatePlaylistHeaders(queryNum) {
  columns = [];
  for (let i = 1; i <= queryHeaders[queryNum].length; i++) {
    columns.push({
      id: "arg" + i,
      label: queryHeaders[queryNum][i - 1],
      align: "center",
      minWidth: 100,
      format: value => value.toLocaleString()
    });
  }
}

function QueryArgs1() {
  const classes = useStyles();

  UpdatePlaylistHeaders(1);

  const theme = useTheme();
  const [word, setWord] = React.useState([]);

  const handleChange = e => {
    setWord(e.target.value);
  };

  const [error, setError] = React.useState(true);

  React.useEffect(() => {
    if (document.getElementById("wordSelector").value === "") setError(true);
    else setError(false);
  }, [word]);

  const isError = () => {
    if (document.getElementById("manualWords").value === "") setError(true);
    else setError(false);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="1" />
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel error={error} id="demo-mutiple-chip-label">
            Pre-defind options
          </InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="words"
            multiple
            error={error}
            value={word}
            onChange={handleChange}
            input={<Input id="wordSelector" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {fullTextOptions.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, word, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          {error ? (
            <FormHelperText error={error}>
              Dont Leave Both of us Empty
            </FormHelperText>
          ) : null}
        </FormControl>
      </div>
      <div>
        <TextField
          fullWidth
          error={error}
          id="manualWords"
          label="Enter Words to Search, divided by Spaces"
          type="search"
          variant="outlined"
          onChange={e => isError()}
          helperText={error ? "Don't Leave Both of us Empty" : null}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="fromYear1"
          label="From Year"
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
          id="toYear1"
          label="To Year"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
    </form>
  );
}

function QueryArgs2() {
  const classes = useStyles();

  UpdatePlaylistHeaders(2);

  const theme = useTheme();
  const [countryName, setCountryName] = React.useState([]);

  const handleChange = e => {
    setCountryName(e.target.value);
  };

  const [error, setError] = React.useState(true);

  React.useEffect(() => {
    if (document.getElementById("countrySelector").value === "") setError(true);
    else setError(false);
  }, [countryName]);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="2" />
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel error={error} required id="demo-mutiple-chip-label">
            Select Countries
          </InputLabel>
          <Select
            error={error}
            labelId="demo-mutiple-chip-label"
            id="countries"
            multiple
            value={countryName}
            onChange={handleChange}
            input={<Input id="countrySelector" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {countries.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, countryName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          {error ? (
            <FormHelperText error={error}>Dont Leave Me Empty</FormHelperText>
          ) : null}
        </FormControl>
      </div>
    </form>
  );
}

function QueryArgs3() {
  const classes = useStyles();

  UpdatePlaylistHeaders(3);

  const [error1, setError1] = React.useState(true);
  const [error2, setError2] = React.useState(true);

  const isError = () => {
    if (document.getElementById("fromYear").value === "") setError1(true);
    else setError1(false);

    if (document.getElementById("toYear").value === "") setError2(true);
    else setError2(false);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="3" />* Data
      starts from 2014.
      <div>
        <TextField
          fullWidth
          required
          error={error1}
          id="fromYear"
          label="From Year"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          onChange={e => isError()}
          helperText={error1 ? "Don't Leave Me Empty" : null}
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          error={error2}
          id="toYear"
          label="To Year"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          onChange={e => isError()}
          helperText={error2 ? "Don't Leave Me Empty" : null}
        />
      </div>
    </form>
  );
}

function QueryArgs4() {
  const classes = useStyles();

  UpdatePlaylistHeaders(4);

  const [error, setError] = React.useState(true);

  const isError = e => {
    if (e.target.textContent === "") setError(true);
    else setError(false);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="4" />
      <div>
        <Autocomplete
          fullWidth
          error={error}
          id="genreSelector"
          options={genres}
          getOptionLabel={option => option}
          renderInput={params => (
            <TextField
              {...params}
              required
              error={error}
              label="Choose a Genre"
              variant="outlined"
              fullWidth
            />
          )}
          onChange={e => isError(e)}
        />
        {error ? (
          <FormHelperText error={error}>Dont Leave Me Empty</FormHelperText>
        ) : null}
      </div>
    </form>
  );
}

function QueryArgs5() {
  const classes = useStyles();

  UpdatePlaylistHeaders(5);

  const [error, setError] = React.useState(true);

  const isError = () => {
    if (document.getElementById("searchByArtist").value === "") setError(true);
    else setError(false);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="5" />
      <div>
        <TextField
          fullWidth
          required
          error={error}
          id="searchByArtist"
          label="Enter Artist Name To Search"
          type="search"
          variant="outlined"
          helperText={error ? "Don't Leave Me Empty" : null}
          onChange={e => isError()}
        />
      </div>
    </form>
  );
}

function QueryArgs6() {
  const classes = useStyles();

  UpdatePlaylistHeaders(6);

  const [error, setError] = React.useState(true);

  const isError = () => {
    if (document.getElementById("songByName").value === "") setError(true);
    else setError(false);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input type="hidden" id="queryNum" name="queryNum" value="6" />
      <div>
        <TextField
          fullWidth
          required
          error={error}
          id="songByName"
          label="Enter Text To Search"
          type="search"
          variant="outlined"
          helperText={error ? "Don't Leave Me Empty" : null}
          onChange={e => isError()}
        />
      </div>
    </form>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
function getStyles(name, countryName, theme) {
  return {
    fontWeight:
      countryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const countries = [
  "Argentina",
  "Andorra",
  "Australia",
  "Austria",
  "Belgium",
  "Bolivia",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Chile",
  "Colombia",
  "Costa_Rica",
  "Cyprus",
  "Czech_Republic",
  "Denmark",
  "Dominican_Republic",
  "Ecuador",
  "El_Salvador",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "bal;Global",
  "Greece",
  "Guatemala",
  "Honduras",
  "Hong_Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Malta",
  "Mexico",
  "Netherlands",
  "New_Zealand",
  "Nicaragua",
  "Norway",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Romania",
  "Singapore",
  "Slovakia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Turkey",
  "United_Kingdom",
  "United_States",
  "Uruguay",
  "Vietnam"
];

const genres = [
  "Acoustic",
  "Alternative Hip-Hop",
  "Alternative Rock",
  "BlueGrass",
  "Blues",
  "Classic Rock",
  "Country",
  "Dance",
  "Deep House",
  "Electro House",
  "Electronic",
  "Folk",
  "Funk",
  "Grime",
  "Hard Rock",
  "Hip-Hop",
  "House",
  "Indie",
  "Indie Pop",
  "Indie Rock",
  "K-Pop",
  "Latin",
  "Metal",
  "Musical",
  "Pop",
  "Pop-Punk",
  "Pop-Rock",
  "R&B",
  "Rap",
  "Reggae",
  "Reggae fusion",
  "Singer Songwriter",
  "Soul",
  "Synthpop",
  "Trap"
];

const fullTextOptions = [
  "singer",
  "songwriter",
  "rapper",
  "actor",
  "actress",
  "dancer",
  "producer",
  "author",
  "band",
  "jewish",
  "canadian"
];

const queryNames = {
  1: "Search Artists By Keywords and Birth Year",
  2: "Most Popular Songs By Countries",
  3: "Most Popular Songs By Release Years",
  4: "Top Song Of Top Artists By Genre",
  5: "Albums By Artist Name",
  6: "Songs By Name"
};
