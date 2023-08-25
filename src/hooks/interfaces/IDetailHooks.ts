export interface IDetailHooks {
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  spoken_languages: [
    {
      english_name: "English";
      iso_639_1: "en";
      name: "English";
    }
  ];
  title: string;
  vote_average: number;
  vote_count: number;
}
