import React, { useEffect, useMemo, useState } from 'react';
// import API from '../api/axios';
import { Button, FormControl, InputLabel, MenuItem } from '@mui/material';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Book from '../common/utils';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const HomePage: React.FC = () => {
  const [booklist, setBookList] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<string>('10');

  useEffect(() => {
    getBooksList();
  }, []);

  const getBooksList = async (): Promise<void> => {
    const { data, status } = await axios.get(
      `http://localhost:3000/booklist?bookname=${query}`
    );
    if (status === 200) {
      setBookList(data);
      console.log(Math.ceil(data.length / parseInt(pageSize)));
      setCount(Math.ceil(data.length / parseInt(pageSize)));
    }
  };
  const pageData = useMemo<Book[]>(() => {
    return booklist.slice(
      parseInt(pageSize) * (page - 1),
      parseInt(pageSize) * page
    );
  }, [booklist, pageSize, page]);

  const filteredData = useMemo<Book[]>(() => {
    return pageData.filter(
      (item) =>
        item.authorname.toLowerCase().includes(query.toLowerCase()) ||
        item.bookname.toLowerCase().includes(query.toLowerCase()) ||
        item.status.toLowerCase().includes(query.toLowerCase())
    );
  }, [pageData, query]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setCount(Math.ceil(booklist.length / parseInt(pageSize, 10)));
  }, [booklist, pageSize]);

  const handleChangePageSize = (event: SelectChangeEvent) => {
    setPageSize(event.target.value as string);
    setPage(1);
  };

  return (
    <div className="flex flex-col justify-center align-top w-full h-full p-10">
      <div className="flex flex-col w-full border-b-black border-2 h-full justify-center align-top p-10 mb-10">
        <div className="flex flex-row w-full h-full justify-start align-middle mb-10">
          <Input
            placeholder="Search Book"
            className="w-[300px] border-1border-b-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-row w-full h-[400px] justify-center align-middle mb-10 overflow-auto">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: '950px' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Book Name</TableCell>
                  <TableCell align="right">Author Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 &&
                  filteredData.map((row, rowid) => {
                    return (
                      <TableRow
                        key={rowid}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row?.bookname}
                        </TableCell>
                        <TableCell align="right">{row?.authorname}</TableCell>
                        <TableCell align="right">{row?.status}</TableCell>
                        <TableCell align="right">
                          <Button>Action</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="flex flex-row justify-center align-middle">
          <FormControl>
            <InputLabel id="demo-simple-select-label">Page Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageSize}
              label="Page Size"
              onChange={handleChangePageSize}
              style={{
                width: '100px',
                height: '40px',
                color: 'black',
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <Pagination count={count} page={page} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
