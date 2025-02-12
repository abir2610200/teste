const express = require('express');
const GouvernementModel = require('../Models/Gouvernorat');


const router = express.Router();

// Get all gouvernements
router.post("", async (req, res) => {
    try {
      const newGouvernement = new GouvernementModel({
        name: req.body.name,
      });
  
      const savedGouvernement = await newGouvernement.save();
      return res.json(savedGouvernement);
    } catch (error) {
      console.error("Error saving new Gouvernement:", error);
      return res.status(500).json({ error: "Error saving new Gouvernement" });
    }
  });
  
  router.get("/get", async (req, res) => {
    try {
      const gouvernements = await GouvernementModel.find({});
      const totalCountGouvernement = await GouvernementModel.countDocuments({});
      return res.json(gouvernements);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const gouvernementId = req.params.id;
      const deleteGouvernement = await GouvernementModel.findByIdAndDelete(
        gouvernementId
      );
  
      if (!deleteGouvernement) {
        return res.status(404).json({ error: "Gouvernement not found" });
      }
  
      return res.json({ message: "Gouvernement deleted successfully" });
    } catch (error) {
      console.error("Error deleting Gouvernement:", error);
      return res.status(500).json({ error: "Error deleting Gouvernement" });
    }
  });
  
  router.put("/update/:id", async (req, res) => {
    try {
      const GouvernementId = req.params.id;
      const updatedGouvernement = await GouvernementModel.findByIdAndUpdate(
        GouvernementId,
        req.body,
        { new: true }
      );
  
      if (!updatedGouvernement) {
        return res.status(404).json({ error: "Gouvernement not found" });
      }
  
      return res.json(updatedGouvernement);
    } catch (error) {
      console.error("Error updating Gouvernement:", error);
      return res.status(500).json({ error: "Error updating Gouvernement" });
    }
  });
  
  router.get("/check/:gouvernementName", async (req, res) => {
    try {
      const gouvernementName = req.params.gouvernementName;
      const existingGouvernement = await GouvernementModel.findOne({
        name: gouvernementName,
      });
  
      if (existingGouvernement) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking gouvernements:", error);
      return res.status(500).json({ error: "Error checking gouvernements" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const gouvernementId = req.params.id;
      const gouvernement = await GouvernementModel.findById(gouvernementId);
  
      if (!gouvernement) {
        return res.status(404).json({ error: "gouvernement not found" });
      }
  
      return res.json(gouvernement);
    } catch (error) {
      console.error("Error fetching gouvernement:", error);
      return res.status(500).json({ error: "Error fetching gouvernement" });
    }
  });
  

  module.exports = router;
