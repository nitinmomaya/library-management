import React, { useEffect, useMemo, useState } from 'react';
// import API from '../api/axios';
import { FormControl, InputLabel, MenuItem, Typography } from '@mui/material';
import Input from '@mui/material/Input';
// import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import API from '../api/axios';
import { BorrowedBook, TableHeadersInterface } from '../common/interface';
import { BookActionsInterface, BookDataInterface } from '../common/utils';
import DynamicTable from '../components/TableComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


const HomePage: React.FC = () => {
  const [booklist, setBookList] = useState<BookDataInterface[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<string>('10');
  const [openBorrowModal, setOpenBorrowModal] = useState<boolean>(false);
  const [openReturnModal, setOpenReturnModal] = useState<boolean>(false);
  const [bookData, setBookData] = useState<BookDataInterface>();
  const headers: TableHeadersInterface[] = [
    { label: 'Book Name', key: 'bookname' },
    { label: 'Author Name', key: 'authorname' },
    { label: 'Status', key: 'status' },
    { label: 'Actions', key: 'actions' },
  ];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  console.log(isAuthenticated, user);

  useEffect(() => {
    getBooksList();
  }, []);

  const getBooksList = async (): Promise<void> => {
    const { data, status } = await API.get(`/booklist`);
    if (status === 200) {
      // setBookList(data);
      convertBookData(data as BookDataInterface[]);
      setCount(Math.ceil(data.length / parseInt(pageSize)));
    }
  };

  const convertBookData = (data: BookDataInterface[]) => {
    const d: BookDataInterface[] = [...data];
    const convertedData: BookDataInterface[] = d?.map((book) => {
      const action: BookActionsInterface[] = [];
      const borrowAction: BookActionsInterface = {
        type: 'Button',
        label: 'Borrow',
        function: () => handleOpenBorrow,
        disabled: book?.status !== 'available',
      };
      const returnAction: BookActionsInterface = {
        type: 'Button',
        label: 'Return',
        function: () => handleOpenReturn,
        disabled: book?.status === 'available',
      };
      action.push(borrowAction);
      action.push(returnAction);
      book = { ...book, actions: [...action] };
      return book;
    });
    console.log(convertedData);
    setBookList(convertedData);
  };
  const pageData = useMemo<BookDataInterface[]>(() => {
    return booklist.slice(
      parseInt(pageSize) * (page - 1),
      parseInt(pageSize) * page
    );
  }, [booklist, pageSize, page]);

  const filteredData = useMemo<BookDataInterface[]>(() => {
    return pageData.filter(
      (item: BookDataInterface) =>
        item?.authorname.toLowerCase().includes(query.toLowerCase()) ||
        item?.bookname.toLowerCase().includes(query.toLowerCase()) ||
        item?.status.toLowerCase().includes(query.toLowerCase())
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

  const handleOpenBorrow = (book: BookDataInterface) => {
    setBookData(book);
    setOpenBorrowModal(true);
  };

  const handleOpenReturn = (book: BookDataInterface) => {
    setBookData(book);
    setOpenReturnModal(true);
  };

  const handleBorrow = async () => {
    const b: BookDataInterface = { ...bookData };
    b.status = 'borrowed';
    await API.patch(`/booklist/${b.id}`, b).then(async (r) => {
      if (r.status === 200) {
        const borrowedBook: BorrowedBook = {
          id: Date.now().toString(),
          bookid: b?.id as string,
          userid: user?.id,
          borrowed_date: new Date(),
          return_date: new Date(),
          actual_return_date: null,
          overdue_amount: 0,
        };
        await API.post('/borrowedtracking', borrowedBook).then((res) => {
          console.log(res);
          if (res.status === 201) {
            getBooksList();
            setOpenBorrowModal(false);
            setBookData({} as BookDataInterface);
          }
        });
      }
    });
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
          {/* <TableContainer component={Paper}>
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
          </TableContainer> */}

          <DynamicTable<BookDataInterface>
            headers={headers}
            data={filteredData}
          />
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

      {/* Borrow Modal */}
      <Modal
        open={openBorrowModal}
        onClose={() => {
          setOpenBorrowModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure You want to Borrow the Book?
          </Typography>
          <div className="flex flex-row w-full">
            <Button onClick={handleBorrow}>Borrow</Button>
            <Button
              onClick={() => {
                setOpenBorrowModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
      {/* Return Modal */}
      <Modal
        open={openReturnModal}
        onClose={() => {
          setOpenReturnModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure You want to Return the Book?
          </Typography>
          <div className="flex flex-row w-full">
            <Button onClick={handleBorrow}>Return</Button>
            <Button
              onClick={() => {
                setOpenReturnModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default HomePage;
