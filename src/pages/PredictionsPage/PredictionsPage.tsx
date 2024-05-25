import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useFetchMainData } from "../../hooks/useFetchMainData";
import { notReachable } from "../../utils/notReachable";
import { Edit, Delete, Add } from "@mui/icons-material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Prediction } from "../../domains/Prediction";
type MatchType = "group" | "play_off";

export const PredictionsPage = () => {
  const data = useFetchMainData();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Prediction | null>(null);
  const [matchType, setMatchType] = useState<MatchType>("group");

  const handleDeleteClickOpen = (item: Prediction) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = () => {
    // Обработать удаление item
    handleDeleteDialogClose();
  };

  const handleEditClickOpen = (item: Prediction) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditDialogSave = () => {
    // Обработать изменение item
    setIsEditDialogOpen(false);
  };

  const handleAddClickOpen = () => {
    setSelectedItem({
      id: "",
      type: "",
      userId: "",
      matchId: "",
      hostScore: "",
      guestScore: "",
      hostScoreExtra: "",
      guestScoreExtra: "",
      hostScorePenalty: "",
      guestScorePenalty: "",
    } as any);
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
    setSelectedItem(null);
  };

  const handleAddDialogSave = () => {
    // Обработать добавление нового item
    setIsAddDialogOpen(false);
  };

  switch (data.type) {
    case "loading":
      return (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Predictions Loading...
          </Typography>
        </Box>
      );
    case "loaded":
      return (
        <Box sx={{ padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Predictions
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginRight: "10px" }}
              >
                ADD
              </Typography>
              <IconButton
                color="primary"
                aria-label="add"
                style={{ marginTop: "-6px" }}
                onClick={handleAddClickOpen}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>
          <Grid
            container
            spacing={1}
            sx={{
              marginBottom: 1,
              paddingBottom: 1,
              borderBottom: "1px solid lightgrey",
              alignItems: "center",
            }}
          >
            <Grid item md={1.5}>
              <Typography>
                <strong>ID:</strong>
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography>
                <strong>Type:</strong>
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography>
                <strong>UserId:</strong>
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography>
                <strong>MatchId:</strong>
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography>
                <strong>HostScore:</strong>
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography>
                <strong>GuestScore:</strong>
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography>
                <strong>HostScoreExtra:</strong>
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography>
                <strong>GuestScoreExtra:</strong>
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography>
                <strong>HostScorePenalty:</strong>
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography>
                <strong>GuestScorePenalty:</strong>
              </Typography>
            </Grid>
          </Grid>
          {data.data.predictions.map((item) => (
            <Grid
              container
              spacing={1}
              key={item.id}
              sx={{
                marginBottom: 1,
                paddingBottom: 1,
                borderBottom: "1px solid lightgrey",
                alignItems: "center",
              }}
            >
              <Grid item md={1.5}>
                <Typography>{item.id}</Typography>
              </Grid>
              <Grid item md={1.5}>
                <Typography>{item.type}</Typography>
              </Grid>
              <Grid item md={1.5}>
                <Typography>{item.userId}</Typography>
              </Grid>
              <Grid item md={1.5}>
                <Typography>{item.matchId}</Typography>
              </Grid>
              <Grid item md={1.5}>
                <Typography>{item.hostScore}</Typography>
              </Grid>
              <Grid item md={1.5}>
                <Typography>{item.guestScore}</Typography>
              </Grid>
              {/*<Grid item md={1.5}>
                <Typography>{item.extra?.type}</Typography>
              </Grid>
              <Grid item md={1.5}>

              </Grid>
              <Grid item md={1.5}>
                <Typography>{item.guestScoreExtra}</Typography>
              </Grid>
              <Grid item md={1.5}>
                <Typography>{item.guestScoreExtra}</Typography>
              </Grid>
              <Grid item md={1.5}>
                <Typography>{item.guestScorePenalty}</Typography>
              </Grid>*/}

              <Grid
                item
                md={1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "right",
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="edit"
                  onClick={() => handleEditClickOpen(item)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  aria-label="delete"
                  onClick={() => handleDeleteClickOpen(item)}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          {/*Попап на кнопку удаления*/}

          <Dialog
            open={isDeleteDialogOpen}
            onClose={handleDeleteDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Ты точно хочешь удалить этот элемент?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteItem} style={{ color: "#000000" }}>
                Да
              </Button>
              <Button
                onClick={handleDeleteDialogClose}
                style={{ color: "red" }}
              >
                Нет
              </Button>
            </DialogActions>
          </Dialog>

          {/*Попап на кнопку изменения*/}

          <Dialog
            open={isEditDialogOpen}
            onClose={handleEditDialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              {selectedItem && (
                <Box>
                  <TextField
                    margin="dense"
                    id="id"
                    label="ID"
                    fullWidth
                    value={selectedItem.id}
                    disabled
                  />
                  <TextField
                    margin="dense"
                    id="type"
                    label="Type"
                    fullWidth
                    value={selectedItem.type}
                  />
                  {/*<TextField
                    margin="dense"
                    id="guestId"
                    label="GuestId"
                    fullWidth
                    value={selectedItem.guestId}
                  />
                  <TextField
                    margin="dense"
                    id="hostId"
                    label="HostId"
                    fullWidth
                    value={selectedItem.hostId}
                  />
                  <TextField
                    margin="dense"
                    id="startTime"
                    label="StartTime"
                    fullWidth
                    value={selectedItem.startTime}
                  />
                  <TextField
                    margin="dense"
                    id="gameDay"
                    label="GameDay"
                    fullWidth
                    value={selectedItem.gameDay}
                  />
                  <TextField
                    margin="dense"
                    id="isCloseForPrediction"
                    label="IsCloseForPrediction"
                    fullWidth
                    value={selectedItem.isCloseForPrediction}
                  />*/}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose} style={{ color: "red" }}>
                Отмена
              </Button>
              <Button onClick={handleEditDialogSave} style={{ color: "green" }}>
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>

          {/* Попап на кнопку добавления */}

          <Dialog
            open={isAddDialogOpen}
            onClose={handleAddDialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              {selectedItem && (
                <Box>
                  <TextField
                    margin="dense"
                    id="id"
                    label="ID"
                    fullWidth
                    value={selectedItem.id}
                    disabled
                  />
                  <TextField
                    margin="dense"
                    id="type"
                    label="Type"
                    fullWidth
                    value={selectedItem.type}
                  />
                  {/*<TextField
                    margin="dense"
                    id="guestId"
                    label="GuestId"
                    fullWidth
                    value={selectedItem.guestId}
                  />
                  <TextField
                    margin="dense"
                    id="hostId"
                    label="HostId"
                    fullWidth
                    value={selectedItem.hostId}
                  />
                  <TextField
                    margin="dense"
                    id="startTime"
                    label="StartTime"
                    fullWidth
                    value={selectedItem.startTime}
                  />
                  <TextField
                    margin="dense"
                    id="gameDay"
                    label="GameDay"
                    fullWidth
                    value={selectedItem.gameDay}
                  />
                  <TextField
                    margin="dense"
                    id="isCloseForPrediction"
                    label="IsCloseForPrediction"
                    fullWidth
                    value={selectedItem.isCloseForPrediction}
                  />*/}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddDialogClose} style={{ color: "red" }}>
                Отмена
              </Button>
              <Button onClick={handleAddDialogSave} style={{ color: "green" }}>
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      );
    case "error":
      return (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Predictions Error
          </Typography>
        </Box>
      );
    default:
      return notReachable(data);
  }
};
