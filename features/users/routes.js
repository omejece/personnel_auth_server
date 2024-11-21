const express = require('express');
const router = express.Router();
const authController = require("../auth/controller");
const controller = require("./controller");


router.get("/initialize",authController.initialize);
router.post("/",authController.verify,controller.create);
router.put("/:id",authController.verify,controller.update);
router.put("/image",authController.verify,controller.changeImage);
router.put("/password",authController.verify,controller.changePassword);
router.get("/password-reset-request/:email",controller.passwordResetRequest);
router.get("/password-reset/:email",controller.resetPassword);
router.delete("/:id",authController.verify,controller.remove);
router.get("/:id",authController.verify,controller.read);
router.get("/",authController.verify,controller.readAll);



module.exports = router;