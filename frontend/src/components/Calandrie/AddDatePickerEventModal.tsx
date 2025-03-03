import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  MenuItem,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { HexColorPicker } from "react-colorful";

export interface IDatePickerEventFormData {
  courseName: string;
  start?: Date;
  end?: Date;
  classId: string;
  color: string;
  recurrenceRule?: string;
}

interface IProps {
  open: boolean;
  handleClose: () => void;
  datePickerEventFormData: IDatePickerEventFormData;
  setDatePickerEventFormData: Dispatch<SetStateAction<IDatePickerEventFormData>>;
  onAddEvent: (formData: IDatePickerEventFormData) => Promise<void>;
  classes: { _id: string; name: string }[];
}

const AddDatePickerEventModal: React.FC<IProps> = ({
  open,
  handleClose,
  datePickerEventFormData,
  setDatePickerEventFormData,
  onAddEvent,
  classes,
}) => {
  const { courseName, start, end, classId, color, recurrenceRule } = datePickerEventFormData;

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDatePickerEventFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (newValue: Date | null) => {
    setDatePickerEventFormData(prev => ({ ...prev, start: newValue ?? undefined }));
  };

  const handleEndDateChange = (newValue: Date | null) => {
    setDatePickerEventFormData(prev => ({ ...prev, end: newValue ?? undefined }));
  };

  const handleColorChange = (newColor: string) => {
    setDatePickerEventFormData(prev => ({ ...prev, color: newColor }));
  };

  const isDisabled = () => {
    return !courseName.trim() || !start || !end || !classId;
  };

  const handleSubmit = async () => {
    await onAddEvent(datePickerEventFormData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the fields below to create a course.
        </DialogContentText>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            label="Course Name"
            name="courseName"
            value={courseName}
            onChange={handleTextChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ mt: 3 }}>
              <DateTimePicker
                label="Start Date"
                value={start || null}
                onChange={handleStartDateChange}
                ampm
                slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <DateTimePicker
                label="End Date"
                value={end || null}
                onChange={handleEndDateChange}
                ampm
                slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
              />
            </Box>
          </LocalizationProvider>
          <TextField
            select
            label="Select Class"
            name="classId"
            value={classId}
            onChange={handleTextChange}
            fullWidth
            margin="dense"
            variant="outlined"
          >
            {classes.map(cls => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2">Choose Course Color</Typography>
            <HexColorPicker color={color} onChange={handleColorChange} />
            <Box
              sx={{
                mt: 1,
                height: 40,
                width: 40,
                borderRadius: 1,
                border: "1px solid #ccc",
              }}
              style={{ backgroundColor: color }}
            />
          </Box>
          <TextField
            label="Recurrence Rule (optional)"
            name="recurrenceRule"
            value={recurrenceRule || ""}
            onChange={handleTextChange}
            fullWidth
            margin="dense"
            variant="outlined"
            helperText='For weekly recurrence, e.g., "FREQ=WEEKLY"'
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={isDisabled()} color="success" onClick={handleSubmit}>
          Add Course
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDatePickerEventModal;
