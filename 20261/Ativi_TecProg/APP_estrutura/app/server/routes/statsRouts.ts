import {Router} from "express";
import {statsController} from "@/controller/StatsController";

const statsRoutes = Router();
const controller = new statsController();

statsRoutes.get("/", (req, res) => controller.getStats(req, res));

export {statsRoutes};