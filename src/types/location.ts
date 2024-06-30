interface Coordinate {
  lat: number;
  lon: number;
}

interface Location extends Coordinate {
  city: string;
}

export { Location, Coordinate };
