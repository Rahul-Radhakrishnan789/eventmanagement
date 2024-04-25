import * as React from "react";
import { Table, styled,Button } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import axios from "../../utils/AxiosInstance";

const TableContainers = styled(TableContainer)`
  min-height: 323px;
`;

const TablePaginations = styled(TablePagination)`
  .MuiToolbar-root {
    justify-content: center;
  }

  .MuiTablePagination-spacer {
    display: none;
  }
`;

const UserTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [userData, setUserData] = React.useState([]);
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleDeleteUser = (userId) => {
try{
    const response = axios.delete(`/api/deleteuser/${userId}`)

   
    setUserData(prevUserData => prevUserData.filter(user => user._id !== userId));

    console.log(response)

}catch(error){
    console.error('Error deleting user:', error); 
}
  
  }


  const fetchUserData = async () => {
    try {
      const userData = await axios.get("/api/getallusers");

      setUserData(userData.data.data);
      console.log("userData", userData.data.data);
    } catch (err) {
      console.error("users fetching error:", err);
      console.log("Response:", err.response);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {userData.length !== 0 ? (
        <div>
          <TableContainers component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>User name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>User mail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id}>
                      <TableCell sx={{ minWidth: "15 0px" }}>
                        {row.username}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteUser(row._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainers>
          <TablePaginations
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <h1>No users to show</h1>
      )}
    </>
  );
};

export default UserTable;
