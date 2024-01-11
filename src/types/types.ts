

 export interface Details {
      title: string;
      link: string;
      snippet: string;
      date: string;
      source: string;
      imageUrl: string;
      priority?: number;
      location?: {
        name: string;
        coordinates?: number[];
    }
  }

export type NewsItem = {
    data: Details | string
    topic: string
  };