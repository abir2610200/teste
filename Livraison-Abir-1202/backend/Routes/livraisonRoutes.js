const express = require('express');
const rue = require('../Models/Rue');
const livraison = require('../Models/livraison');
const users = require('../Models/User');
const gouvernement = require('../Models/Gouvernorat');



const router = express.Router();

// Get all livraison
router.get('/', async (req, res) => {
    try {
        const livraisons = await livraison.find();
        console.log(livraisons);
        res.status(200).json(livraisons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get a specific gouvernement by id
router.get('/:id', async (req, res) => {
    try {
        console.log(req);
        const livraisons = await livraison.findById(req.params.id);
        if (livraisons) {
            res.status(200).json(livraisons);
        } else {
            res.status(404).json({ message: "livraison not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new gouvernement
router.post('/', async (req, res) => {

    console.log(req.body);
    const totalCountRegion = await livraison.countDocuments({});
    const ruee=await rue.findById(req.body.rue);
    const gouvernementt=await gouvernement.findById(req.body.gouvernorat);
    const userss =await users.findById(req.body.expediteur);

    const code=2500000000+totalCountRegion+1;
    let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();



// prints date in YYYY-MM-DD format
console.log(year + "-" + month + "-" + date);
    const livraisons = new livraison(
        {
            code:code,

       expediteur:userss.name,
       rsoc:userss.raisonSociale,
       nom_client:req.body.client,
        description:req.body.description,
        numtel1:req.body.numtel1,
        numtel2:req.body.numtel2,

        code_rue:req.body.rue,
        code_expediteur:req.body.expediteur,
        code_gouvernorat:req.body.gouvernement,
        typeliv:"N",
        tentatif:1,

        gouvernorat:gouvernementt.name,

        rue:ruee.name,

        km:req.body.km,
        prixliv:req.body.prixliv,
        qte:req.body.qte,
        montant:req.body.montant,
        dateliv:req.body.dateliv,
        }
    );
    try {
        const reuss = await livraisons.save();
        //res.status(201).json(reuss);
        return res.json(reuss);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a gouvernement
router.put('/:id', async (req, res) => {
    try {
        const livraisons = await livraison.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (livraisons) {
            res.status(200).json(livraisons);
        } else {
            res.status(404).json({ message: "livraison not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/api/enattente', async (req, res) => {
    try {
      
       
      const livraisons = await livraison.find({typeliv:'N'});
        console.log(livraisons);
      res.status(200).json(livraisons);
    } catch (error) {
      console.error("Error checking region:", error);
      return res.status(500).json({ error: "Error checking region" });
    }
  });

  router.get('/api/endepot', async (req, res) => {
    try {
      
       
      const livraisons = await livraison.find({typeliv:'D'});
        console.log(livraisons);
      res.status(200).json(livraisons);
    } catch (error) {
      console.error("Error checking region:", error);
      return res.status(500).json({ error: "Error checking region" });
    }
  });

  router.get('/api/encourlivraison', async (req, res) => {
    try {
      
       
      const livraisons = await livraison.find({typeliv:'E'});
        console.log(livraisons);
      res.status(200).json(livraisons);
    } catch (error) {
      console.error("Error checking region:", error);
      return res.status(500).json({ error: "Error checking region" });
    }
  });

  router.get('/api/livre', async (req, res) => {
    try {
      
       
      const livraisons = await livraison.find({typeliv:'L'});
        console.log(livraisons);
      res.status(200).json(livraisons);
    } catch (error) {
      console.error("Error checking region:", error);
      return res.status(500).json({ error: "Error checking region" });
    }
  });

  router.get('/api/paye', async (req, res) => {
    try {
      
       
      const livraisons = await livraison.find({typeliv:'P'});
        console.log(livraisons);
      res.status(200).json(livraisons);
    } catch (error) {
      console.error("Error checking region:", error);
      return res.status(500).json({ error: "Error checking region" });
    }
  });

  router.get('/api/Retour', async (req, res) => {
    try {
      
       
      const livraisons = await livraison.find({typeliv:'R'});
        console.log(livraisons);
      res.status(200).json(livraisons);
    } catch (error) {
      console.error("Error checking region:", error);
      return res.status(500).json({ error: "Error checking region" });
    }
  });

  router.get('/api/Annuller', async (req, res) => {
    try {
      
       
      const livraisons = await livraison.find({typeliv:'A'});
        console.log(livraisons);
      res.status(200).json(livraisons);
    } catch (error) {
      console.error("Error checking region:", error);
      return res.status(500).json({ error: "Error checking region" });
    }
  });

// Delete a gouvernement
router.delete('/:id', async (req, res) => {
    try {
        const livraisons = await livraison.findByIdAndDelete(req.params.id);
        if (livraisons) {
            res.status(200).json({ message: "livraison deleted" });
        } else {
            res.status(404).json({ message:"livraison not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
