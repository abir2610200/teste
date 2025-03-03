import React from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { IEventInfo } from "./EventCalendar"; // adjust path as needed

interface Props {
  open: boolean;
  handleClose: () => void;
  onDeleteEvent: () => void;
  currentEvent: IEventInfo | null;
  userType?: "prof" | "parent" | null;
  // Optional arrays to resolve names from IDs:
  classes?: { _id: string; name: string }[];
  matieres?: { _id: string; name: string }[];
}

const EventInfoModal: React.FC<Props> = ({
  open,
  handleClose,
  onDeleteEvent,
  currentEvent,
  userType,
  classes,
  matieres,
}) => {
  if (!currentEvent) return null;

  const { _id, name, matiere, description, etudiants = [], class: courseClass, color } = currentEvent;

  // Resolve Matière name.
  const matiereName =
    typeof matiere === "object"
      ? matiere.name
      : matieres
      ? matieres.find((m) => m._id === matiere)?.name || matiere
      : matiere;

  // Resolve Class name.
  const className =
    typeof courseClass === "object"
      ? courseClass.name
      : classes
      ? classes.find((c) => c._id === courseClass)?.name || courseClass
      : courseClass;

  const handleDeleteConfirmation = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      onDeleteEvent();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Course Information</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="subtitle1">Course Name: {name}</Typography>
          {color && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: color,
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <Typography variant="body2">Color: {color}</Typography>
            </Box>
          )}
          <Typography variant="body2">Matière: {matiereName}</Typography>
          <Typography variant="body2">Class: {className}</Typography>
          {description && (
            <Typography variant="body2">Description: {description}</Typography>
          )}
          {etudiants && etudiants.length > 0 && (
            <>
              <Typography variant="subtitle1">
                Enrolled Students ({etudiants.length})
              </Typography>
              <List>
                {etudiants.map((student) => (
                  <ListItem key={student.enfantId}>
                    • {student.enfantName}
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Close
        </Button>
        {userType === "prof" && (
          // For teachers, we do not render the "Add to My Timetable" button
          <Button onClick={handleDeleteConfirmation} color="error">
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EventInfoModal;
