import { Router } from "express";
import { listRoutes } from "@/routes/listRoutes";
import { queueRoutes } from "@/routes/filaRoutes";
import { stackRoutes } from "@/routes/stackRoutes";
import { statsRoutes } from "@/routes/statsRouts";

const routes = Router();

routes.use("/pilha", stackRoutes);
routes.use("/fila", queueRoutes);
routes.use("/lista", listRoutes);
routes.use("/estatisticas", statsRoutes);

export { routes };
