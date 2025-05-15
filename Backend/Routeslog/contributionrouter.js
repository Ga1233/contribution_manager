const express=require("express");
const router=express.Router();
const ContributionController=require("../Controllerslog/contributioncontroller");
const authMiddleware = require("../Middlewares/Auth");
router.post("/contributionpost",  authMiddleware, ContributionController.createContribution);
router.get("/contributionfetch",  authMiddleware, ContributionController.getAllContribution);
router.put("/contributionupdate/:id",  authMiddleware, ContributionController.updateContribution);
router.delete("/contributiondelete/:id",  authMiddleware, ContributionController.deleteContribution);

module.exports=router;