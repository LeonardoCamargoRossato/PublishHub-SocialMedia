export type ContentSource='webseer'|'personal'|'foton'|'generic';
export type MediaType='video'|'short'|'reel'|'photo'|'carousel';
export type MediaStatus='draft'|'ready'|'scheduled'|'published'|'failed';
export type Platform='youtube'|'instagram'|'tiktok';
export type MediaItem={id:string;source:ContentSource;mediaType:MediaType;title:string;description:string;caption:string;thumbnailUrl:string;tags:string[];hashtags:string[];status:MediaStatus;platforms:Platform[];createdAt:string;updatedAt:string};
export type QueueItem={id:string;mediaId:string;platform:Platform;scheduledAt:string;status:MediaStatus;position:number};
export type ScheduleSlot={weekday:number;time:string};
export const DEFAULT_TIMEZONE='America/Sao_Paulo';
