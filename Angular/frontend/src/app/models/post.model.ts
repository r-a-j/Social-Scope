export interface PostModel {
    id: number;
    description: string;
    shortCode: string;
    isVideo: boolean;
    commentsDisabled: boolean;
    commentsDisabledForViewer: boolean;
    location?: string;
    viewerCanReshare: boolean;
    isAd: boolean;
    caption?: string;
    likeCount: number;
    postUsername: string;
    postUserFullName: string;
    createdOn: Date;
    downloadedOn: Date;
}
