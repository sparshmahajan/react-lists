import { useState, useEffect } from 'react';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
    },
    TableContainer: {
        maxHeight: 800,
        margin: "1%",
        borderRadius: "10px",
    },
    TableHeaderCell: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: '#000',
        color: '#fff',
    },
    TableRowCell: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
        },
        "&:nth-of-type(even)": {
            backgroundColor: "#fff",
        }
    },
});


const MakeTable = () => {
    const [tableData, setTableData] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:5000/api/data');
            const data = await result.json();
            setTableData(data);
        }
        fetchData();
    }, []);

    return (
        <TableContainer component={Paper} className={classes.TableContainer}>
            <Table className={classes.table} aria-label="simple table" stickyHeader>
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.TableHeaderCell} align="center">Id</TableCell>
                        <TableCell className={classes.TableHeaderCell} align="center"> Name</TableCell>
                        <TableCell className={classes.TableHeaderCell} align="center">Username</TableCell>
                        <TableCell className={classes.TableHeaderCell} align="center">Email</TableCell>
                        <TableCell className={classes.TableHeaderCell} align="center">Address</TableCell>
                        <TableCell className={classes.TableHeaderCell} align="center">Phone</TableCell>
                        <TableCell className={classes.TableHeaderCell} align="center">Website</TableCell>
                        <TableCell className={classes.TableHeaderCell} align="center">Company</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData
                        .map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className={classes.TableRowCell} align="center">{row.id}</TableCell>
                                <TableCell className={classes.TableRowCell} align="center">{row.name}</TableCell>
                                <TableCell className={classes.TableRowCell} align="center">{row.username}</TableCell>
                                <TableCell className={classes.TableRowCell} align="center">{row.email}</TableCell>
                                <TableCell className={classes.TableRowCell} align="center">
                                    <Grid container >
                                        <Grid item xs={10}>
                                            {row.address.street},
                                        </Grid>
                                        <Grid item xs={10}>
                                            {row.address.suite},
                                            {row.address.city},
                                        </Grid>
                                        <Grid item xs={10}>
                                            {row.address.zipcode}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {row.address.geo.lat},
                                            {row.address.geo.lng}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell className={classes.TableRowCell} align="center">{row.phone}</TableCell>
                                <TableCell className={classes.TableRowCell} align="center">{row.website}</TableCell>
                                <TableCell className={classes.TableRowCell} align="center">
                                    <Grid container >
                                        <Grid item xs={10}>
                                            {row.company.name}
                                        </Grid>
                                        <Grid item xs={30} >
                                            {row.company.catchPhrase}
                                        </Grid>
                                        <Grid item xs={30}>
                                            {row.company.bs}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table >
        </TableContainer >
    );
}

export default MakeTable;