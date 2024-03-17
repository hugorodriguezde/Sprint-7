export interface Starship{
  id:string;
  name: string,
  url: string,
  model: string,
  manufacturer: string,
  cost_in_credits:string,
  length:string,
  max_atmosphering_speed:string,
  crew:string,
  passengers:string,
  cargo_capacity:string,
  consumables:string,
  hyperdrive_rating:string,
  MGLT:string,
  starship_class:string,
  pilots:string[],
  films:string[],
  created:string,
  edited:string,
}

export interface Starships {
  count: number,
  next: string,
  previous?: string;
  results: Starship[];
}

export interface Pilot {
  name: string;
  url: string;
  imageUrl?: string;
}

export interface Movie {
  title: string;
  episode_id: number;
  url: string;
}
