import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderStyle:"solid",
  },
});



export default function BasicTable({numOfMeals, earnings, median}) {
const classes = useStyles();
function createData(name, results) {
    return { name, results };
}

const rows = [
    createData('Number of lvl 8 meals served', numOfMeals),
    createData('Earnings', earnings),
    createData('Customer feedback median', median),
];

return (
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>Moira's last 6 months at Schitt's Creek</TableCell>
            <TableCell align="right">Results</TableCell> 
            </TableRow>
        </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align="right">{row.results}</TableCell>
                    </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}