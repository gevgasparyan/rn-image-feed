import { createClient, PaginationParams } from 'pexels';
import { IFeedResponse, IPhoto } from 'src/types';

const client = createClient('GaW68D15YNo5AziK21ie78jiCG4ltr1pCytTLmBWDO7rJinwrvTk1q0e');

class FeedApi {
  getFeed = (params: PaginationParams): Promise<IFeedResponse> => {
    return client.photos.curated(params).then((photos) => {
      return photos as any as IFeedResponse;
    });
  };

  getPhotoById = (id: number): Promise<IPhoto> => {
    return client.photos.show({ id }).then((photo) => {
      return photo as IPhoto;
    });
  };
}

export default new FeedApi();
