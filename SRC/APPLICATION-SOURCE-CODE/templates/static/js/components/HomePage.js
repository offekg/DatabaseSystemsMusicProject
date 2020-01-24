import React from "react";
import Zoom from "@material-ui/core/Zoom";
import Link from "@material-ui/core/Link";
import Fade from "@material-ui/core/Fade";
import Table from "@material-ui/core/Table";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import ReactHtmlParser from "react-html-parser";
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
    zIndex: 1,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    minWidth: "40%",
    maxWidth: "70%"
  },
  regularCell: {
    color: "black"
  },
  whitespace: {
    whiteSpace: "pre-wrap",
    fontSize: "smaller"
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
    img: "https://m.media-amazon.com/images/I/71ELOW+wB2L._SS500_.jpg",
    title: "Old Love Songs"
  },
  {
    img:
      "https://images.pexels.com/photos/250177/pexels-photo-250177.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Christmas Songs"
  },
  {
    img:
      "https://images.pexels.com/photos/1510682/pexels-photo-1510682.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "French Music"
  },
  {
    img:
      "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Pop Music"
  },
  {
    img:
      "https://images.pexels.com/photos/162520/farmer-man-shepherd-dog-162520.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Country Music"
  },
  {
    img:
      "https://images.pexels.com/photos/2002604/pexels-photo-2002604.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Israel Top 10 - 2019"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2018/07/23/22/11/frank-3557974_960_720.png",
    title: "Frank Sinatra songs"
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
      case 20:
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
                      <img alt="reltedImage" width="100%" src={modalData[2]} />
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

const queryHeaders = {
  11: [
    "Name",
    "Artist",
    "Total Times Played",
    "Most Played Song",
    "Total Times Song Played"
  ],
  12: [
    "Name",
    "Average Plays",
    "Total Times Played",
    "Most Played Song",
    "Total Times Song Played"
  ],
  13: ["Name", "Artist", "Duration", "Longest Song", "Longest Song Duration"],
  14: ["Name", "Artist", "Duration", "Release Year", "Album"],
  15: ["Name", "Artist", "Duration", "Release Year", "Album"],
  16: ["Name", "Artist", "Duration", "Total Plays"],
  17: ["Name", "Artist", "Duration", "Total Plays"],
  18: ["Name", "Duration", "Artist", "Album"],
  19: ["Name", "Total Plays", "Artist", "Album"],
  20: ["Name", "Duration", "Release Year", "Album"]
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
