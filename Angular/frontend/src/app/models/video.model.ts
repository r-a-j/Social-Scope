export interface VideoModel {
    id: number;
    url: string;
    postId: number;  // Foreign key to link the video to a post
}
