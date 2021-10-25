import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Box,
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Pagination } from "@material-ui/lab";
import axios from "axios"
import Icon from "react-crypto-icons"

const NoBorderCell = withStyles({
  root: {
    borderBottom: "none",
    textAlign: "center",
  },
})(TableCell)

let timer

export default function Dashboard() {
  useEffect(() => {
    timer = setInterval(() => {
      axios
      .get(`https://api.coincap.io/v2/assets?offset=${page*20}&limit=20`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log("err occured:", err));
    }, 2000)
    
    return () => {
      clearInterval(timer)
    }
  }, []);

  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const handlePagination = (e, num) => {
    setPage(num-1)
    clearInterval(timer)
    timer = setInterval(() => {
      axios
      .get(
        `https://api.coincap.io/v2/assets?offset=${(num - 1) * 20}&limit=20`
      )
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => console.log("err occured:", err));
    }, 2000)  
  };

  return (
    <Box p={3} pt={0}>
      <Box textAlign="center" mb={2}>
        <Typography variant="h3">Cryptocurrency Price</Typography>
      </Box>
      {data.length > 0 ? (
        <TableContainer
          component={Paper}
          style={{ backgroundColor: "#05182b" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <NoBorderCell>#</NoBorderCell>
                <NoBorderCell align="right">Name</NoBorderCell>
                <NoBorderCell align="right">Icon</NoBorderCell>
                <NoBorderCell align="right">Symbol</NoBorderCell>
                <NoBorderCell align="right">Price(USD)</NoBorderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <NoBorderCell component="th" scope="row">
                    {page * 20 + i + 1}
                  </NoBorderCell>
                  <NoBorderCell align="right">{row.name}</NoBorderCell>
                  <NoBorderCell align="right">
                    <Icon name={row.symbol.toLowerCase()} size={25} />
                  </NoBorderCell>
                  <NoBorderCell align="right">{row.symbol}</NoBorderCell>
                  <NoBorderCell align="right">
                    {parseFloat(row.priceUsd).toFixed(2)}$
                  </NoBorderCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" style={{ color: "yellow" }}>
            Loading...
          </Typography>
        </Box>
      )}
      <Grid container justifyContent="flex-end" style={{ marginTop: "10px" }}>
        <Pagination count={100} color="primary" onChange={handlePagination} />
      </Grid>
    </Box>
  );
}
