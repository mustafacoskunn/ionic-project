export class Movie{ //apidaki modeller
    id:number;
    title:string;
    poster_path:string;
    backdrop_path:string;
    vote_count:number;
    vote_average:number;
    popularity:number;
    overview:string;
    genre_ids:Array<number>
    genres:string
}
export class Results{

    results:Array<Movie>
    page:number;
    total_results:number;
}