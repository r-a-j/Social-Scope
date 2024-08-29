export interface ImageModel {
    id: number;
    url: string;
    postId: number;  // Foreign key to link the image to a post
}
