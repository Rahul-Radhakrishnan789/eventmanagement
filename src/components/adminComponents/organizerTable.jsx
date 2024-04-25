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

const OrganizerTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [organizerData, setOrganizerData] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteOrganizer = (organizerId) => {
    try{
        const response = axios.delete(`/api//deleteorganizer/${organizerId}`)
    
       
        setOrganizerData(prevUserData => prevUserData.filter(organizer => organizer._id !== organizerId));
    
        console.log(response)
    
    }catch(error){
        console.error('Error deleting organizer:', error); 
    }
      
      }
    

  const fetchVendorData = async () => {
    try {
      const organizerData = await axios.get("/api/getallorganizers");

      setOrganizerData(organizerData.data.data);
      console.log("organizerData", organizerData.data.data);
    } catch (err) {
      console.error("vendors fetching error:", err);
      console.log("Response:", err.response);
    }
  };

  React.useEffect(() => {
    fetchVendorData();
  }, []);

  return (
    <>
      {organizerData.length !== 0 ? (
        <div>
          <TableContainers component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Ventor name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Ventor mail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {organizerData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id}>
                      <TableCell sx={{ minWidth: "250px" }}>
                        {row.username}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteOrganizer(row._id)}
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
            count={organizerData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <h1>no organizers to show</h1>
      )}
    </>
  );
};

export default OrganizerTable;
