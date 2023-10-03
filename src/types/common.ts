import { Photo } from 'pexels';

export type IPhoto = Photo;

export interface WithPagination {
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
}

export interface IFeedResponse extends WithPagination {
  photos: IPhoto[];
}
