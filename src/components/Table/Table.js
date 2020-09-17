import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import axios from 'axios';
import TablePaginationActions from './TablePaginationActions';

class TableData extends Component {
    state = {
        per_page: 10,
        page: 1,
        query: 'nodejs',
        response: {
            items: [],
            total_count: 0,
        },
        maxItems: 1000,
    };

    getTableData = (page) => {
        const { per_page, query } = this.state;
        axios.get(`http://api.github.com/search/repositories?q=${query}&page=${page}&per_page=${per_page}`)
            .then((response) => {
                this.setState({
                    page,
                    response: response.data
                });
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    
    componentDidMount() {
        this.getTableData(this.state.page);
    }

    handleChangePage = (_, newPage) => {
        this.getTableData(newPage + 1);
    };

    render() {
        const { response, per_page, page, maxItems } = this.state;
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Repo Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Link</TableCell>
                            <TableCell align="right">Stars</TableCell>
                            <TableCell align="right">Watchers</TableCell>
                            <TableCell align="right">Forks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {response.items.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.full_name}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right"><a href={row.html_url}>URL</a></TableCell>
                                <TableCell align="right">{row.stargazers_count}</TableCell>
                                <TableCell align="right">{row.watchers_count}</TableCell>
                                <TableCell align="right">{row.forks_count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10]}
                            colSpan={3}
                            count={response.total_count > maxItems ? maxItems : response.total_count}
                            rowsPerPage={per_page}
                            page={page - 1}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={this.handleChangePage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
    }
}

export default TableData;

