// EventInfo.tsx
import React from "react";
import { Typography, Box, List, ListItem } from "@mui/material";
import { IEventInfo } from "./EventCalendar";

interface MatiereDoc {
  _id: string;
  name: string;
}

interface IProps {
  event: IEventInfo;
}

const EventInfo = ({ event }: IProps) => {
  const {
    name,
    matiere,
    description,
    datedebut,
    datefin,
    etudiants = [],
  } = event;

  // If matiere can be string or an object, define a fallback
  // If it's an object, use its .name; otherwise treat as string or 'N/A'
  const matiereString =
    typeof matiere === "object"
      ? matiere.name
      : matiere || "N/A";

  // Convert dates
  const startDate = datedebut ? new Date(datedebut).toLocaleString() : "N/A";
  const endDate = datefin ? new Date(datefin).toLocaleString() : "N/A";

  return (
    <Box sx={{ p: 1 }}>
      {/* Course name */}
      <Typography variant="h6" gutterBottom>
        {name || "Untitled Course"}
      </Typography>

      {/* Matiere & Dates */}
      <Typography variant="body1">
        <strong>Matière:</strong> {matiereString}
      </Typography>
      <Typography variant="body2">
        <strong>Start:</strong> {startDate}
      </Typography>
      <Typography variant="body2">
        <strong>End:</strong> {endDate}
      </Typography>


      {/* Enrolled students */}
      <Box mt={2}>
        <Typography variant="subtitle1">
          Enrolled Students ({etudiants.length})
        </Typography>
        {etudiants.length === 0 ? (
          <Typography variant="body2">None enrolled.</Typography>
        ) : (
          <List disablePadding sx={{ ml: 2 }}>
            {etudiants.map((student) => (
              <ListItem key={student.enfantId?.toString()}>
                • {student.enfantName}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default EventInfo;
