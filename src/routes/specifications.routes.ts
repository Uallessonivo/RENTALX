import { Router } from "express";

import { createSpecificationControllers } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => {
    return createSpecificationControllers.handle(req, res);
});

export { specificationsRoutes };
