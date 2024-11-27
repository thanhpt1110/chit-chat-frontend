import { PaginationREQ } from "../../types/data.type";

export type GetListExploreREQ = {
  SearchText: string;
  IsTag: boolean;
} & PaginationREQ;
