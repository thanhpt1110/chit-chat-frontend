import { ExploreItemInListDTO } from "../../types/data.type";

const IMAGE_URLS = [
  "https://i.pinimg.com/736x/38/16/a9/3816a930470cb0e7d784f29421fc93b4.jpg",
  "https://i.pinimg.com/736x/3a/03/65/3a036555a633dee814d4dc5def69e256.jpg",
  "https://i.pinimg.com/736x/21/eb/2d/21eb2d69245780ca72808aa9627115bf.jpg",
  "https://i.pinimg.com/736x/57/c2/86/57c2868a6e20a42e9afd99eac6ed1706.jpg",
  "https://i.pinimg.com/736x/e0/bc/52/e0bc52cd9c0e6f4e089133cd8bf08bb1.jpg",
  "https://i.pinimg.com/736x/b1/f0/c5/b1f0c57b5f97b02447cdd54d16b8c104.jpg",
  "https://i.pinimg.com/736x/b1/f0/c5/b1f0c57b5f97b02447cdd54d16b8c104.jpg",
  "https://i.pinimg.com/736x/b9/88/df/b988dfe9a1d31d32cad9b7aaa36c479c.jpg",
  "https://i.pinimg.com/736x/ee/d5/c2/eed5c2263a92d6134ead28e10b863cbe.jpg",
];

export function generateExploreData(numItems: number): ExploreItemInListDTO[] {
  return Array.from({ length: numItems }, (_, index) => {
    const randomImage =
      IMAGE_URLS[Math.floor(Math.random() * IMAGE_URLS.length)];
    return {
      postId: (index + 1).toString(),
      postImage: {
        key: (index + 1).toString(),
        url: randomImage,
      },
      likeCount: Math.floor(Math.random() * 1000), // Random likes
      commentCount: Math.floor(Math.random() * 500), // Random comments
    };
  });
}
