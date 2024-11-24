import { PaginationREQ } from "../../types/data.type";

export type GetListPostREQ = {
  UserId?: string;
  SearchText?: string;
  Tags?: string;
} & PaginationREQ;

export type CreatePostREQ = {
  Files: Blob[];
  Content: string;
};
