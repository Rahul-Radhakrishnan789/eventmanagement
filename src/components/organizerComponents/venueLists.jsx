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

import FoundationIcon from "@mui/icons-material/Foundation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";

const MainContainer = styled(Box)``;
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
  padding-bottom: 30px;
  position: relative;

  .availablility {
    position: absolute;
    right: 2px;
    top: 2px;
    height: fit-content;
    width: fit-content;
    font-size: 12px;
  }
`;

const Lists = styled(List)`
  padding: 0;
  #listSeats {
    width: 200px;
  }
  #listPlace {
    width: 200px;
  }
`;
const ListItems = styled(ListItem)`
  margin-bottom: 1px;
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

const VenueLists = ({ data }) => {
  const navigate = useNavigate();
  console.log("datas", data);

  return (
    <MainContainer>
      {data.length === 0 ? (
        <div>Create a venue first.</div>
      ) : (
        <Grid container spacing={2}>
          {data.map((venue) => (
            <Grid item xs={12} sm={6} lg={3}>
              <Cards onClick={() => navigate(`/organizer/venue/${venue._id}`)}>
                <ImageBox>
                  <img src={venue?.images[0].url} alt="Venue Image" />
                </ImageBox>
                <CardContents>
                  <Chip
                    className="availablility"
                    variant="outlined"
                    label={venue.available ? "available" : "not available"}
                    color={venue.available ? "success" : "warning"}
                  ></Chip>
                  <Lists>
                    <ListItems>
                      <ListItemIcon className="listIcon">
                        <FoundationIcon />
                      </ListItemIcon>
                      <ListItemText id="more" secondary={venue?.title} />
                    </ListItems>
                    <Box sx={{ display: "flex" }}>
                      <ListItems id="listPlace">
                        <ListItemIcon className="listIcon">
                          <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText secondary={venue?.place} />
                      </ListItems>
                      <ListItems>
                        <ListItemIcon className="listIcon">
                          <CurrencyRupeeIcon />
                        </ListItemIcon>
                        <ListItemText secondary={venue?.price} />
                      </ListItems>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <ListItems id="listSeats">
                        <ListItemIcon className="listIcon">
                          <EventSeatIcon />
                        </ListItemIcon>
                        <ListItemText secondary={venue?.maximumSeats} />
                      </ListItems>
                      <ListItems>
                        <ListItemIcon className="listIcon" id="listChair">
                          <DownloadDoneIcon />
                        </ListItemIcon>
                        <ListItemText id="more" secondary={"Ac, Parking lot"} />
                      </ListItems>
                    </Box>
                  </Lists>
                </CardContents>
              </Cards>
            </Grid>
          ))}
        </Grid>
      )}
    </MainContainer>
  );
};

export default VenueLists;
