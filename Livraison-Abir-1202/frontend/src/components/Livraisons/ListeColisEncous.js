import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  
  Drawer,
  Checkbox,
  FormControlLabel,
  TextField,
  TablePagination,
} from "@mui/material";
import {  CheckCircle, Delete, FilterList, ArrowDownward, ArrowUpward, Print, FileDownload } from "@mui/icons-material";
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";  // Importation de la bibliothèque XLSX

export default function RueList() {
  const [comptes, setComptes] = useState([]);
  
  const [openFilter, setOpenFilter] = useState(false); // Drawer pour le filtrage
  const [filters, setFilters] = useState({
    code: "",
    expediteur: "",
    nom_client: "",
    description: "",
    
  });
  const [selectedFields, setSelectedFields] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // État pour l'ordre de tri

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4); // Nombre de lignes par page

  // État pour les cases à cocher
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchComptes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/livraisons/api/encourlivraison");
      console.log(response.data);
      setComptes(response.data);
      console.log(comptes);
    } catch (error) {
      console.error("Erreur lors de la récupération des comptes comptables :", error);
    }
  };

  const handleDelete = async (id) => {
    let values1={ typeliv: 'A'};
    try {
      await axios.put(`http://localhost:5000/livraisons/${id}`, values1);
      fetchComptes();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleValid = async (id) => {
    let values1={ typeliv: 'D'};
    try {
      await axios.put(`http://localhost:5000/livraisons/${id}`, values1);
      fetchComptes();
    } catch (error) {
      console.error("Erreur lors de Validation :", error);
    }
  };



  
  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleFieldSelection = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleApplyFilter = () => {
    console.log("Filtres appliqués", filters);
    setOpenFilter(false);
  };

  const handleClearFilter = () => {
    setFilters({
        code: "",
        expediteur: "",
        nom_client: "",
        description: "",
      
    });
    setSelectedFields([]);
  };

  // Fonction pour gérer le changement de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Fonction pour gérer le changement du nombre de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Revenir à la première page quand on change le nombre de lignes
  };

  // Fonction pour gérer le tri du libellé
  const handleSortLibelle = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Changer la direction du tri
    setSortOrder(newSortOrder);

    const sortedComptes = [...comptes].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.code.localeCompare(b.code);
      } else {
        return b.code.localeCompare(a.code);
      }
    });


    setComptes(sortedComptes);
  };

  const handleSortexpediteur = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Changer la direction du tri
    setSortOrder(newSortOrder);

    const sortedComptes = [...comptes].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.expediteur.localeCompare(b.expediteur);
      } else {
        return b.expediteur.localeCompare(a.expediteur);
      }
    });
    

    setComptes(sortedComptes);
  };

  

  // Fonction pour gérer la sélection/désélection d'une ligne
  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((row) => row !== id) : [...prevSelected, id]
    );
  };

  // Fonction pour sélectionner/désélectionner toutes les lignes
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(comptes.map((compte) => compte._id));
    } else {
      setSelectedRows([]);
    }
  };

  // Fonction pour imprimer en PDF
  const handlePrintPDF = () => {
    const doc = new jsPDF();

    // Ajouter un titre
    doc.setFontSize(16);
    doc.text("Liste des Comptes Comptables", 14, 20);

    // Ajouter les en-têtes de la table
    const headers = ["code","expediteur","nom_client","description"];
    const rows = comptes.map(compte => [
      compte.code,
      compte.expediteur,
      compte.nom_client,
      compte.description,
      
    ]);

    // Ajouter la table
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30,
    });

    // Sauvegarder le PDF
    doc.save("comptes_comptables.pdf");
  };

  // Fonction pour exporter en Excel
  const handleExportExcel = () => {
    // Format des données pour Excel
    const exportData = comptes.map((compte) => ({
      "code":compte.code,
      "expediteur":compte.expediteur,
      "client":compte.nom_client,
      "description":compte.description,
    }));

    // Création d'un tableau de travail (workbook)
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Comptes");

    // Exportation du fichier Excel
    XLSX.writeFile(wb, "comptes_comptables.xlsx");
  };

  useEffect(() => {
    fetchComptes();
  }, []);

  return (
    <Container sx={{ backgroundColor: "#f6f2f1", padding: 2 , marginTop: 15,maxWidth: "100%",overflowX: "auto", paddingTop: 2}} >
       <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#333", fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
        >
          Liste des Colis en Attente
        </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      

        
         
          {/* Bouton d'impression PDF */}
          <IconButton
            sx={{ marginLeft: 2 }}
            color="primary"
            onClick={handlePrintPDF}
          >
            <Print />
          </IconButton>

          {/* Bouton d'exportation Excel */}
          <IconButton
            sx={{ marginLeft: 2 }}
            color="primary"
            onClick={handleExportExcel}
          >
            <FileDownload />
          </IconButton>
          <IconButton
            sx={{ marginLeft: 2 }}
            color="primary"
            onClick={() => setOpenFilter(true)}
          >
            <FilterList />
          </IconButton>
        </Box>
   

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          marginTop: 2,
        }}
      >
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ backgroundColor: "#3498db" }}>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedRows.length === comptes.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", width: { xs: "40%", sm: "40%" }, cursor: "pointer" }}
                onClick={handleSortLibelle}
              >
                Code
                {sortOrder === "asc" ? (
                  <ArrowDownward sx={{ fontSize: 14, marginLeft: 1 }} />
                ) : (
                  <ArrowUpward sx={{ fontSize: 14, marginLeft: 1 }} />
                )}
              </TableCell>
             <TableCell
                sx={{ fontWeight: "bold", width: { xs: "40%", sm: "40%" }, cursor: "pointer" }}
                onClick={handleSortexpediteur}
              >
                Expediteur
                {sortOrder === "asc" ? (
                  <ArrowDownward sx={{ fontSize: 14, marginLeft: 1 }} />
                ) : (
                  <ArrowUpward sx={{ fontSize: 14, marginLeft: 1 }} />
                )}
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", width: { xs: "40%", sm: "40%" }, cursor: "pointer" }}
               
              >
                Client
                
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", width: { xs: "40%", sm: "40%" }, cursor: "pointer" }}
                
              >
                description
                
              </TableCell>

             </TableRow>
          </TableHead>
          <TableBody>
            {comptes
              .filter((compte) => {
                return Object.keys(filters).every((key) => {
                  return (
                    !filters[key] ||
                    compte[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
                  );
                });
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Application de la pagination
              .map((compte) => (
                <TableRow
                  key={compte._id}
                  sx={{
                    "&:hover": { backgroundColor: "#f1f1f1" },
                  }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(compte._id)}
                      onChange={() => handleRowSelect(compte._id)}
                    />
                  </TableCell>
                  <TableCell sx={{ width: { xs: "25%", sm: "20%" } }}>{compte.code}</TableCell>
                  <TableCell sx={{ width: { xs: "25%", sm: "20%" } }}>{compte.expediteur}</TableCell>
                  <TableCell sx={{ width: { xs: "25%", sm: "20%" } }}>{compte.nom_client}</TableCell>
                  <TableCell sx={{ width: { xs: "25%", sm: "20%" } }}>{compte.description}</TableCell>
                  
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[4]}  // 4 lignes par page
        component="div"
        count={comptes.length}  // Nombre total de comptes
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page"
      />

      

      {/* Drawer pour le filtrage */}
      <Drawer
        anchor="right"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6">Filtre par Champs</Typography>
          <Box sx={{ marginTop: 2 }}>
            {["code","expediteur","nom_client","description"].map((field) => (
              <Box key={field} sx={{ marginBottom: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedFields.includes(field)}
                      onChange={() => handleFieldSelection(field)}
                    />
                  }
                  label={field}
                />
                {selectedFields.includes(field) && (
                  <TextField
                    label={`Filtrer par ${field}`}
                    variant="outlined"
                    fullWidth
                    value={filters[field]}
                    onChange={(e) => handleFilterChange(field, e.target.value)}
                    sx={{ marginTop: 1 }}
                  />
                )}
              </Box>
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleApplyFilter}
          >
            Appliquer
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ marginTop: 2, marginLeft: 1 }}
            onClick={handleClearFilter}
          >
            Effacer
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
}
