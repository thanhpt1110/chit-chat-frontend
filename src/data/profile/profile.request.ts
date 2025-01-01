import { PaginationREQ } from "../../types/data.type";

export type GetProfileSearchREQ = {
  SearchText: string;
} & PaginationREQ;

export type GetRecommendUserREQ = PaginationREQ;
