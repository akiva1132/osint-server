



export type NewsItem = {
  data?:string
  link: string;
  date: string;
  title: string;
  snippet: string;
  source: string;
  imageUrl: string;
  priority: number;
  location?: {
    name?: string;
    coordinates?: any[];
  };
  topic: string
};

