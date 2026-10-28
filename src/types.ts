export type Platform='youtube'|'instagram'|'tiktok';
export type PublishingChannel='youtube-video'|'youtube-short'|'instagram-feed'|'instagram-reel'|'instagram-story'|'tiktok-video';
export type MediaType='video'|'short'|'reel'|'photo'|'carousel';
export type PublicationStatus='draft'|'ready'|'scheduled'|'published'|'failed';
export type ScheduleSlot={weekday:number;time:string};
export const DEFAULT_TIMEZONE='America/Sao_Paulo';

export type PublishHubUser={id:string;name:string;email:string;picture?:string};
export type Project={id:string;ownerEmail:string;name:string;description:string;enabledChannels:PublishingChannel[];integrations:string[];createdAt:string;updatedAt:string;archived?:boolean};
export type MediaItem={id:string;projectId:string;filename:string;title:string;description:string;caption:string;mediaType:MediaType;fileUrl?:string;thumbnailUrl?:string;size?:number;duration?:number;sourceType?:string;sourceId?:string;sourceCreatedAt?:string;importedAt:string;updatedAt:string;tags:string[];hashtags:string[];folder?:string};
export type Publication={id:string;projectId:string;mediaId:string;platform:Platform;channel:PublishingChannel;status:PublicationStatus;scheduledAt?:string;publishedAt?:string;externalPublicationId?:string;position:number};
export type SocialConnection={id:string;projectId:string;platform:Platform;accountName:string;accountId?:string;avatar?:string;status:'connected'|'disconnected'};
export type WorkspaceState={version:'0.2';projects:Project[];media:MediaItem[];publications:Publication[];socialConnections:SocialConnection[]};

export const CHANNEL_LABELS:Record<PublishingChannel,string>={
'youtube-video':'YouTube Video','youtube-short':'YouTube Short','instagram-feed':'Instagram Feed','instagram-reel':'Instagram Reel','instagram-story':'Instagram Story','tiktok-video':'TikTok Video'};
export const CHANNEL_PLATFORM:Record<PublishingChannel,Platform>={
'youtube-video':'youtube','youtube-short':'youtube','instagram-feed':'instagram','instagram-reel':'instagram','instagram-story':'instagram','tiktok-video':'tiktok'};
