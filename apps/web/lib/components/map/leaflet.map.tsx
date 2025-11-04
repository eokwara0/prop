'use client';
import { useCallback, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { IoSearch } from 'react-icons/io5';
import './index.css';
import { usePropertyFormContext } from '../property/forms/property.form.provider';
import { CreatePropertyDto } from '../../../../../packages/ui/src';

export type GeoResponse = {
  summary: Summary;
  results: GeoResult[];
};

export type Summary = {
  query: string;
  queryType: string;
  queryTime: number;
  numResults: number;
  offset: number;
  totalResults: number;
  fuzzyLevel: number;
};

export type GeoResult = {
  type: string;
  id: string;
  score: number;
  matchConfidence: MatchConfidence;
  address: Address;
  position: Position;
  viewport: Viewport;
  entryPoints: EntryPoint[];
};

export type MatchConfidence = {
  score: number;
};

export type Address = {
  streetNumber?: number;
  streetName?: string;
  municipalitySubdivision?: string;
  municipality?: string;
  neighbourhood?: string;
  countrySecondarySubdivision?: string;
  countrySubdivision?: string;
  countrySubdivisionName?: string;
  countrySubdivisionCode?: string;
  postalCode?: string;
  countryCode?: string;
  country?: string;
  countryCodeISO3?: string;
  freeformAddress?: string;
  localName?: string;
};

export type Position = {
  lat: number;
  lon: number;
};

export type Viewport = {
  topLeftPoint: Position;
  btmRightPoint: Position;
};

export type EntryPoint = {
  type: string;
  position: Position;
};

const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const AZURE_MAPS_KEY = process.env.NEXT_PUBLIC_AZURE_MAPS_KEY;

type FlyToProps = {
  center: LatLngExpression | null;
  zoom: number;
};

export function FlyToLocation({ center, zoom }: FlyToProps) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, {
        duration: 1.5, // seconds
      });
    }
  }, [center, zoom, map]);

  return null;
}
export default function LeafletMap() {
  const [place, setPlace] = useState('johannesburg , south africa');
  const [locations, setLocations] = useState<GeoResult[]>([]);
  const [center, setCenter] = useState<LatLngExpression | null>(null);
  const [zoom, setZoom] = useState(5);
  const { updateData, data } = usePropertyFormContext();

  async function fetchForwardGeocode(query: string): Promise<GeoResult[]> {
    const url = `https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=${AZURE_MAPS_KEY}&query=${encodeURIComponent(
      query,
    )}&limit=1`;

    const res = await fetch(url);
    const data = (await res.json()) as { results: GeoResult[] };
    return data.results || [];
  }

  const handleSearch = useCallback(async () => {
    const results = await fetchForwardGeocode(place);
    if (results.length > 0) {
      const first = results[0];
      if (!first) {
        throw new Error('somethign bad happened');
      } else {
        updateData!({
          ...data,
          address: first.address.freeformAddress,
          city: first.address.municipality,
          state: first.address.countrySubdivision,
          postalCode: first.address.postalCode,
          country: first.address.country,
          streetName: first.address.streetName,
          streetNumber: first.address.streetNumber,
          suburb: first.address.municipalitySubdivision,
        } as CreatePropertyDto);
        setCenter([first!.position.lat, first!.position.lon]);
        setZoom(15);
        setLocations(results);
      }
    }
  }, [data, place, updateData]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="w-full flex flex-col-reverse gap-8">
      {center && (
        <div className="px-5">
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ width: '100%', height: '250px' }}
            className=" rounded-md"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors, HOT"
            />
            {locations.map((loc, i) => {
              console.log(loc);
              return (
                <Marker
                  key={i}
                  position={[loc.position.lat, loc.position.lon]}
                  icon={customIcon}
                >
                  <Popup>{loc.address.freeformAddress}</Popup>
                </Marker>
              );
            })}
            <FlyToLocation center={center} zoom={zoom} />
          </MapContainer>
        </div>
      )}
      <div className="px-5">
        <label
          htmlFor="property-location-search"
          className=" flex ring ring-white gap-1 items-center rounded-md  px-2 mt-1"
        >
          <IoSearch
            className="cursor-pointer"
            size={20}
            onClick={handleSearch}
          />
          <input
            value={place}
            onChange={(e) => setPlace(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            type="text"
            name="property-location-search"
            placeholder="Search for property"
            className="p-2 autofill:bg-transparent w-full  h-7 placeholder:text-xs text-xs rounded-md outline-none"
            id="property-location-search"
          />
          <div className="flex gap-1">
            <div className="flex justify-center items-center rounded size-4 border border-slate-100 text-center p-2">
              <p className="text-xs">≊</p>
            </div>
            <p className="text-xs">+</p>
            <div className="flex justify-center items-center rounded size-4 border border-slate-100 text-center p-2">
              <p className="text-xs">U</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
