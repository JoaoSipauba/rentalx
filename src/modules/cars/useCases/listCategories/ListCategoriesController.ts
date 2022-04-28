import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response) {
    const listCategoryUseCase = container.resolve(ListCategoriesUseCase);

    const all = await listCategoryUseCase.execute();

    response.status(200).json(all);
  }
}

export { ListCategoriesController };
