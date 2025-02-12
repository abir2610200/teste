const express = require('express');
const RegionModel = require('../Models/Region');


const router = express.Router();

// Get all regions
router.post("", async (req, res) => {
    try {
      // Create a new user instance using the clients
      const newRegion = new RegionModel({
        name: req.body.name,
      });
  
      // Save the new user to the database
      const savedRegion = await newRegion.save();
  
      // Return the saved user data as a response
      return res.json(savedRegion);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving new user:", error);
      return res.status(500).json({ error: "Error saving new user" });
    }
  });
  
  router.get("/get", async (req, res) => {
    try {
      const regions = await RegionModel.find({});
      const totalCountRegion = await RegionModel.countDocuments({});
  
      return res.json(regions);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const regionId = req.params.id;
      const deleteRegion = await RegionModel.findByIdAndDelete(regionId);
  
      if (!deleteRegion) {
        return res.status(404).json({ error: "region not found" });
      }
  
      return res.json({ message: "Banque deleted successfully" });
    } catch (error) {
      console.error("Error deleting banque:", error);
      return res.status(500).json({ error: "Error deleting banque" });
    }
  });
  
  router.put("/update/:id", async (req, res) => {
    try {
      const regionId = req.params.id;
      const updatedRegion = await RegionModel.findByIdAndUpdate(
        regionId,
        req.body,
        { new: true }
      );
  
      if (!updatedRegion) {
        return res.status(404).json({ error: "region not found" });
      }
  
      return res.json(updatedRegion);
    } catch (error) {
      console.error("Error updating region:", error);
      return res.status(500).json({ error: "Error updating region" });
    }
  });
  router.get("/check/:regionName", async (req, res) => {
    try {
      const regionName = req.params.regionName;
      const existingRegion = await RegionModel.findOne({ name: regionName });
  
      if (existingRegion) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking region:", error);
      return res.status(500).json({ error: "Error checking region" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const regionId = req.params.id;
      const region = await RegionModel.findById(regionId);
  
      if (!region) {
        return res.status(404).json({ error: "region not found" });
      }
  
      return res.json(region);
    } catch (error) {
      console.error("Error fetching region:", error);
      return res.status(500).json({ error: "Error fetching region" });
    }
  });
  
  module.exports = router;



