import React from "react";
import Zoom from "@material-ui/core/Zoom";
import Link from "@material-ui/core/Link";
import Fade from "@material-ui/core/Fade";
import Table from "@material-ui/core/Table";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import GridList from "@material-ui/core/GridList";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import TableContainer from "@material-ui/core/TableContainer";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    "& > *": {
      margin: theme.spacing(1),
      minHeight: "60%",
      minWidth: "80%",
      marginTop: theme.spacing(1)
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
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    minHeight: "350px",
    cursor: "pointer",
    backgroundColor: "#0099cc"
  },
  title: {
    fontSize: "18",
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 100%, rgba(0,0,0,0.3) 100%, rgba(0,0,0,0) 100%)"
  },
  oneCell: {
    minHeight: "100%"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "40%",
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
    color: "black"
  }
}));

const tileData = [
  {
    img:
      "https://images.pexels.com/photos/1616095/pexels-photo-1616095.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Top Albums"
  },
  {
    img:
      "https://images.pexels.com/photos/1808711/pexels-photo-1808711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Top Artists"
  },
  {
    img:
      "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Longest Albums"
  },
  {
    img:
      "https://images.pexels.com/photos/1510682/pexels-photo-1510682.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "French Pop"
  },
  {
    img:
      "https://images.pexels.com/photos/593467/pexels-photo-593467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Disco"
  },
  {
    img:
      "https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Japanese"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2018/07/23/22/11/frank-3557974_960_720.png",
    title: "Sinatra"
  },
  {
    img:
      "https://images.pexels.com/photos/1053778/pexels-photo-1053778.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Album Openers"
  },
  {
    img:
      "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Pop Music"
  },
  {
    img: "https://q-cf.bstatic.com/images/hotel/max1024x768/175/175016579.jpg",
    title: "Qurey #10"
  }
];

export default function SingleLineGridList() {
  const classes = useStyles();

  const [opened, setOpened] = React.useState(<p />);
  const [selected, setSelected] = React.useState(0);

  const handleClick = e => {
    var id = parseInt(e.target.id, 10);

    if (selected !== id) {
      setOpened(<p />);
      document.getElementById("queryNum").name = id;
      UpdatePlaylistHeaders(id);
      UpdatePlaylistData(id, setOpened);
      setSelected(id);
    } else {
      setOpened(<p />);
      setSelected(0);
    }
  };

  var count = 11;

  return (
    <div align="left" className={classes.root}>
      <input type="hidden" id="queryNum" name="queryNum" value="0" />
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <GridListTile
            onClick={handleClick}
            key={tile.img}
            className={classes.oneCell}
          >
            <img id={count} src={tile.img} alt={tile.title} />
            <GridListTileBar
              id={count++}
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      {opened}
    </div>
  );
}

var columns = [];
var rows = [];
var modalData = [];

function createData(arg1, arg2, arg3, arg4, arg5, link_id) {
  return { arg1, arg2, arg3, arg4, arg5, link_id };
}

function PlaylistManager() {
  const classes = useStyles();

  var delay = -200;

  const [open, setOpen] = React.useState(false);

  const queryNum = parseInt(document.getElementById("queryNum").name, 10);
  const handleClickOpen = index => {
    switch (queryNum) {
      case 11:
      case 13:
        UpdateModalData("album", index, setOpen);
        break;
      case 12:
        UpdateModalData("artist", index, setOpen);
        break;
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
        UpdateModalData("song", index, setOpen);
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
                                              <pre>{modalData[1]}</pre>
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
    </div>
  );
}

const queryHeaders = {
  11: ["Times Played", "Name", "Artist", "Length", "Album"],
  12: ["Times Played", "Name", "Artist", "Length", "Album"],
  13: [
    "Name",
    "Artist",
    "Times Played",
    "Most Played Song",
    "Total Song Plays"
  ],
  14: [
    "Name",
    "Average Times Played",
    "Total Times Played",
    "Most Played Song",
    "Total Song Plays"
  ],
  15: ["Name", "Artist", "Album Length", "Longest Song", "Album Cover"],
  16: ["Name", "Artist", "Album", "Total Times Played", "Release year"],
  17: [
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

async function UpdatePlaylistData(selected, _callback) {
  const Http = new XMLHttpRequest();
  const url = "./query?queryNum=" + selected;
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
      _callback(<PlaylistManager />);
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
