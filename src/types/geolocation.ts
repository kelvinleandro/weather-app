interface Coordinate {
  lat: number;
  lon: number;
}

interface City extends Coordinate {
  city: string;
}

export { City, Coordinate };
