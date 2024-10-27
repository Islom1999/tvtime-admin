import { MovieType, Quality, StatusType } from "../enumerations";
import { ICategory } from "./category";
import { ICountry } from "./country";
import { IMovieGenre } from "./movie_genre";
import { ISounder } from "./sounder";
import { IYear } from "./year";

export interface IMovie{
    id?: string;
    video: string;
    treyler: string;
    name: string;
    descr: string;
    images: string[];
    frame_images: string[];
    movie_type: MovieType;
    quality: Quality;
    min_age: number;
    duration: number;
    language: string;
    status_type: StatusType;
    is_slider: boolean;

    country_id: string;
    year_id: string;
    movie_id?: string;

    country: ICountry;
    year: IYear;

    sounderId?: string;
    categoryId?: string;
    movieGenreId?: string;

    sounder?: ISounder[];
    category?: ICategory[];
    movie_genre?: IMovieGenre[];

    parent_movie?:IMovie
    childen_movie?:IMovie[]

    video_id: string;
    format: number[];
    video_type: string;

    video_file?: IVideo;
}   

export interface IVideo{
    id: string
    folder_name: string
    file_name: string
    format: number[]
    default_format: string
    file_size: number
    used: boolean
    created_at: Date
    updated_at: Date
}   