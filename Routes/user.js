import express from "express";
import { body } from "express-validator";
import {login , register , updateuserprofile} from "../Controller/User.js";
import { getGames ,getGame ,addGame , buyGame} from "../Controller/Games.js";

const router = express.Router();
import multerConfig from "../midllewares/multer.js";
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/update/:id").put(updateuserprofile);
router.route("/games").get(getGames);
router.route("/games/:id").get(getGame);
router.route("/addgame").post(multerConfig,body('title').isLength({min :5}) , addGame);
router.route("/buygame").post(buyGame);

export default router;