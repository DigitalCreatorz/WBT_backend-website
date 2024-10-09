const express = require("express");
const router = express.Router();
const { createcustom_package, getcustom_packages, getcustom_packageById, updatecustom_package, deletecustom_package } = require("../controllers/custom_package_controller");

router.post("/addcustom", createcustom_package);
router.get("/getcustom", getcustom_packages);
router.get("/getcustom/:id", getcustom_packageById);
router.put("/editcustom/:id", updatecustom_package);
router.delete("/removecustom/:id", deletecustom_package);

module.exports = router;
