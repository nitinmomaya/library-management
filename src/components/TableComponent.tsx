import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { TableHeadersInterface } from '../common/interface';

interface DynamicTableProps<T> {
  headers: TableHeadersInterface[];
  data: T[];
}

const DynamicTable = <T,>({ headers, data }: DynamicTableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header?.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: T, index) => (
            <TableRow key={index}>
              {headers.map((header: TableHeadersInterface, index) => {
                if (header?.key === 'actions') {
                  return (
                    <TableCell key={index}>
                      {(row as { [key: string]: [] })[header?.key]?.map(
                        (action) => {
                          return (
                            <Button
                              sx={{
                                backgroundColor:
                                  action?.label === 'Borrow' ? 'green' : 'red',
                                color: 'white',
                                marginRight: '5px',
                              }}
                              onClick={action?.function(row)}
                              disabled={action.disabled}
                            >
                              {action?.label}
                            </Button>
                          );
                        }
                      )}
                      {/* {(row as { [key: string]: string })['status'] ===
                      'available' ? (
                        <Button
                          sx={{
                            backgroundColor: 'green',
                            color: 'white',
                          }}
                          onClick={() => {
                            borrowFunction(row);
                          }}
                        >
                          Borrow
                        </Button>
                      ) : (
                        <Button
                          sx={{
                            backgroundColor: 'red',
                            color: 'white',
                          }}
                          onClick={() => {
                            returnFunction(row);
                          }}
                        >
                          Return
                        </Button>
                      )} */}
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={index}>
                    {typeof row === 'object' &&
                    row !== null &&
                    header?.key in row
                      ? (row as { [key: string]: string })[header?.key]
                      : null}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
