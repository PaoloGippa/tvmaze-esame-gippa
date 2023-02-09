const BASE_URL = "https://api.tvmaze.com";

type ShowApiResType = {
  show: {
    id: number;
    name: string;
    image?: {
      medium: string;
    };
  };
};

export type ShowType = {
  //esporto quelle di sopra ShowApiResType
  id: number;
  title: string;
  image?: string;
};

export const getShowsBySearch = async (query: string) => {
  query = query.trim(); //.trim() metodo stringhe, rimuove i white space
  if (query.length === 0) {
    return [];
  }
  const res = await fetch(`${BASE_URL}/search/shows?q=${query}`);
  const data: ShowApiResType[] = (await res.json()) as ShowApiResType[];
  const mappedData: ShowType[] = data.map((element) => ({
    //.map() metodo array che ritorna l'array di partenza modificato.
    id: element.show.id,
    title: element.show.name,
    image: element.show.image?.medium,
  }));
  return mappedData;
};

type ShowDetailApiResType = {
  id: number;
  name: string;
  genres: string[];
  premiered?: string;
  ended?: string;
  rating?: {
    average: number;
  };
  image?: {
    original: string;
  };
  summary?: string;
};

export type ShowDetailType = {
  id: number;
  title: string;
  genres: string[];
  startDate?: string;
  endDate?: string;
  avgRating?: number;
  image?: string;
  summary?: string;
};

export const getShowById = async (id: number) => {
  if (id < 0) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/shows/${id}`);
  const data: ShowDetailApiResType = (await res.json()) as ShowDetailApiResType;
  const mappedData: ShowDetailType = {
    id: data.id,
    title: data.name,
    genres: data.genres,
    startDate: data.premiered,
    endDate: data.ended,
    avgRating: data.rating?.average,
    image: data.image?.original,
    summary: data.summary,
  };
  return mappedData;
};
