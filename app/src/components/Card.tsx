import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
interface CardProps {
  id: number;
  list: boolean;
}

interface Location {
  street: { number: number; name: string };
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: { latitude: string; longitude: string };
  timezone: { offset: string; description: string };
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface Result {
  gender: string;
  name: { title: string; first: string; last: string };
  location: Location;
  email: string;
  phone: string;
  cell: string;
  picture: Picture;
  nat: string;
}

interface Info {
  results: Result[];
  info: Record<string, never>;
}

export default function Card({ id, list }: CardProps) {
  const [info, setInfo] = useState<Info>();

  useEffect(() => {
    void (async () => {
      const req = await fetch("https://randomuser.me/api/");
      const data = await req.json() as Info | undefined;

      setInfo(data);
    })();
  }, []);

  return info ? (
    <>
      <div
        id={String(id)}
        className="relative w-full max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow"
        >
          <Badge variant="outline" className="absolute top-2 right-2">{Math.floor(Math.random() * 49 + 1) * 10} $/hr</Badge>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 mt-2 rounded-full shadow-lg font-bold"
            src={info.results[0]?.picture.medium}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl text-gray-900 font-bold">
            {info.results[0]?.name.first} {info.results[0]?.name.last}
          </h5>
          <span className="text-sm text-gray-500 font-bold">
            {info.results[0]?.location.city}
            {", "}
            {info.results[0]?.location.country}
          </span>
          {list &&
          <div className="flex mt-4 space-x-3 md:mt-6 font-bold">
            <a
              href={`/list/card/${id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-gray-900 hover:bg-gray-800 focus:ring-gray-200"
            >
              Book a meeting
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-bold text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
            >
              Learn More
            </a>
          </div>
        }
        </div>
      </div>
    </>
  ) : (
    <div key={Math.random().toString()}></div>
  );
}
