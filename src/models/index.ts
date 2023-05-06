export interface IStory {
    id: string,
    orderId: number,
    title: string,
    subStories: IStory[]
}