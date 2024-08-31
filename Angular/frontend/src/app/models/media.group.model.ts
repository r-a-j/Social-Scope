import { ImageModel } from "./image.model";
import { VideoModel } from "./video.model";

export interface MediaGroupModel {
    date: Date;
    description: string;
    images: ImageModel[];
    videos: VideoModel[];
}