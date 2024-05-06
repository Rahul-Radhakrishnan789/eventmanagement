import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  List,
  Chip,
} from "@mui/material";
import axios from "../../utils/AxiosInstance";

import FoundationIcon from "@mui/icons-material/Foundation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";

const MainContainer = styled(Box)`
  padding: 0;
`;

const SubContainer = styled(Box)`
  padding: 0;
  min-height: 100vh;
`;

const Cards = styled(Card)`
  height: 280px;
  width: 100%;
  cursor: pointer;
  position: relative;
`;
const ImageBox = styled(Box)`
  height: 60%;
  width: 100%;

  img {
    height: 100%;
    width: 100%;
  }
`;
const CardContents = styled(CardContent)`
  height: fit-content;
  padding: 20px;
  position: relative;
`;

const Lists = styled(List)`
  padding: 0;
  #listSeats {
    width: 250px;
  }
  #listPlace {
    width: 250px;
  }
`;
const ListItems = styled(ListItem)`
  margin-bottom: 10px;
  padding: 0;
  .listIcon {
    min-width: 30px;
  }
  #more {
    display: -webkit-box !important;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: pre-line;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px, dis;
  }
`;

const UserEvents = () => {
  const [data, setData] = useState([]);
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getallevents");

      setData(response.data.data);
    } catch (err) {
      console.error("event fetching error:", err);
      console.log("Response:", err.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <MainContainer>
    
      {data.length > 0 ? (
        <SubContainer>
          <Grid container spacing={2} p={4}>
            {data?.map((event) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Cards onClick={() => nav(`/user/events/booking/${event?._id}`)}>
                  <ImageBox>
                    <img src={event?.image?.url} alt="event Image" />
                  </ImageBox>
                  <CardContents>
                    <Lists>
                      <Box sx={{ display: "flex" }}>
                        <ListItems id="listPlace">
                          <ListItemIcon className="listIcon">
                            <FoundationIcon />
                          </ListItemIcon>
                          <ListItemText secondary={event?.title} />
                        </ListItems>
                        <ListItems>
                          <ListItemIcon className="listIcon">
                            <LocationOnIcon />
                          </ListItemIcon>
                          <ListItemText secondary={event?.venue?.place} />
                        </ListItems>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <ListItems id="listSeats">
                          <ListItemIcon className="listIcon">
                            <DateRangeIcon />
                          </ListItemIcon>
                          <ListItemText secondary={event?.date} />
                        </ListItems>
                        <ListItems>
                          <ListItemIcon className="listIcon">
                            <CurrencyRupeeIcon />
                          </ListItemIcon>
                          <ListItemText
                            id="more"
                            secondary={event?.Ticketprice}
                          />
                        </ListItems>
                      </Box>
                    </Lists>
                  </CardContents>
                </Cards>
              </Grid>
            ))}
          </Grid>
        </SubContainer>
      ) : (
       <Box sx={{height:'80vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <h1>no data available</h1>
       </Box>
      )}

     
    </MainContainer>
  );
};

export default UserEvents;
