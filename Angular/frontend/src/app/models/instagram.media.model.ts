export interface InstagramMedia {
    src: string;
    thumb: string;
}

export interface InstagramMediaWithType extends InstagramMedia {
    type: 'image' | 'video';
}
