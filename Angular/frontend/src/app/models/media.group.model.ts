import { ImageModel } from "./image.model";
import { VideoModel } from "./video.model";

export interface MediaGroupModel {
    date: Date;
    images: ImageModel[];
    videos: VideoModel[];
}