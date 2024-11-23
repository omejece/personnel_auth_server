const express = require('express');
const router = express.Router();
const authController = require("../auth/controller");
const controller = require("./controller");

router.post('/authenticate',controller.authenticate);
router.post("/",controller.create);
router.put("/:id",controller.update);
router.put("/image",controller.changeImage);
router.put("/password",controller.changePassword);
router.get("/password-reset-request/:email",controller.passwordResetRequest);
router.get("/password-reset/:email",controller.resetPassword);
router.delete("/:id",controller.remove);
router.get("/:id",controller.read);
router.get("/",controller.readAll);



module.exports = router;