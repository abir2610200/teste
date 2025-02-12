import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, useMediaQuery, Card, CardContent, Stack, Drawer, TextField, FormControlLabel, Checkbox, TablePagination } from "@mui/material";
import { Add, Edit, Delete, Print, FileDownload} from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";  // Importation de la bibliothèque XLSX
import axios from "axios";
import AddEditSociete from "./AddSociete";  // Assurez-vous que ce composant existe pour l'ajout et l'édition des sociétés

export default function SocieteList() {
  const [societes, setSocietes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSociete, setSelectedSociete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
const [filters, setFilters] = useState({
  code: "",
  raisonSociale: "",
  type: "",
  adresse: "",
});


// Fonction pour réinitialiser les filtres

console.log("societe" , societes)
  const isMobile = useMediaQuery("(max-width:600px)");

  // Récupérer les sociétés depuis l'API
  const fetchSocietes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/societes", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      setSocietes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des sociétés :", error);
    }
  };

  useEffect(() => {
    fetchSocietes();
  }, [page, rowsPerPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/societes/${id}`);
      fetchSocietes();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (societe) => {
    setSelectedSociete(societe);
    setOpenDialog(true);
  };

  const handleAdd = () => {
    setSelectedSociete(null);
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Fonction pour imprimer en PDF
  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Liste des Sociétés", 14, 20);
    const headers = ["Code", "Raison Sociale", "Type", "Adresse"];
    const rows = societes.map(societe => [
      societe.code,
      societe.raisonSociale,
      societe.type,
      societe.adresse,
    ]);
    doc.autoTable({ head: [headers], body: rows, startY: 30 });
    doc.save("societes.pdf");
  };

  // Fonction pour exporter en Excel
  const handleExportExcel = () => {
    const exportData = societes.map((societe) => ({
      "Code": societe.code,
      "Raison Sociale": societe.raisonSociale,
      "Type": societe.type,
      "Adresse": societe.adresse,
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "societes");
    XLSX.writeFile(wb, "societes.xlsx");
  };

  return (
    <Container sx={{ backgroundColor: "#f6f2f1", padding: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: 15,color: "#333" }}>
        Liste des Sociétés
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>Ajouter une Société</Button>
        <Box>
          <IconButton color="primary" onClick={handlePrintPDF}>
            <Print />
          </IconButton>
          <IconButton color="primary" onClick={handleExportExcel}>
            <FileDownload />
          </IconButton>
        </Box>
      </Box>

      {isMobile ? (
        <Stack spacing={2}>
          {societes.map((societe) => (
            <Card key={societe._id}>
              <CardContent>
                <Typography variant="h6">{societe.code}</Typography>
                <Typography variant="body1">{societe.raisonSociale}</Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                  <IconButton onClick={() => handleEdit(societe)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(societe._id)}><Delete /></IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Raison Sociale</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {societes.map((societe) => (
                <TableRow key={societe._id}>
                  <TableCell>{societe.code}</TableCell>
                  <TableCell>{societe.raisonSociale}</TableCell>
                  <TableCell>{societe.type}</TableCell>
                  <TableCell>{societe.adresse}</TableCell>
                  <TableCell>
  {}
  <TableCell>
  {societe?.logo?.data && (
    <img
      src={`data:image/png;base64,${btoa(String.fromCharCode(...societe.logo.data))}`}
      alt="Logo"
      style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "5px" }}
    />
  )}
</TableCell>

</TableCell>               
  <TableCell>
                    <IconButton onClick={() => handleEdit(societe)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(societe._id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[4, 10, 25]}
        component="div"
        count={societes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {openDialog && (
        <AddEditSociete
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fetchSocietes={fetchSocietes}
          societe={selectedSociete}
        />
      )}
    </Container>
  );
}
