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
import { Match } from "../../domains/Match";
import TextField from "@mui/material/TextField";
import { Misc } from "../../domains/Misc";

export const MiscPage = () => {
  const data = useFetchMainData();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Misc | null>(null);

  const handleDeleteClickOpen = (item: Misc) => {
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

  const handleEditClickOpen = (item: Misc) => {
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
      currentGameDay: "",
      isRegistrationOpen: "",
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
            Misc Loading...
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
              Misc
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
                <strong>CurrentGameDay:</strong>
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography>
                <strong>IsRegistrationOpen:</strong>
              </Typography>
            </Grid>
          </Grid>
          {data.data.misc.map((item) => (
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
                <Typography>{item.currentGameDay}</Typography>
              </Grid>
              <Grid item md={1.5}>
                <Typography>{item.isRegistrationOpen.toString()}</Typography>
              </Grid>
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
                    id="currentGameDay"
                    label="CurrentGameDay"
                    fullWidth
                    value={selectedItem.currentGameDay}
                  />
                  <TextField
                    margin="dense"
                    id="isRegistrationOpen"
                    label="IsRegistrationOpen"
                    fullWidth
                    value={selectedItem.isRegistrationOpen}
                  />
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
                    id="currentGameDay"
                    label="CurrentGameDay"
                    fullWidth
                    value={selectedItem.currentGameDay}
                  />
                  <TextField
                    margin="dense"
                    id="isRegistrationOpen"
                    label="IsRegistrationOpen"
                    fullWidth
                    value={selectedItem.isRegistrationOpen}
                  />
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
            Misc Error
          </Typography>
        </Box>
      );
    default:
      return notReachable(data);
  }
};
