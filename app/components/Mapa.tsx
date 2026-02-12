// @ts-nocheck

"use client";

import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Button } from "@tremor/react";
import { RiSearch2Line } from "@remixicon/react";
import Image from "next/image";

const containerStyle = {
  width: "600px",
  height: "400px",
};

const center = {
  lat: 40.022961, // Promedio aproximado de las latitudes de las ubicaciones
  lng: -105.258313, // Promedio aproximado de las longitudes de las ubicaciones
};

const locations = [
  { lat: 40.019029202242116, lng: -105.2626646739601 }, // Folsom
  { lat: 40.026993950936536, lng: -105.25426364327721 }, // Red Rocks Limited
];

export default function Mapa() {
  const [folson, setFolson] = useState(true); // Corregido aquí

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBIG_DOzlf4NHs9J1BcCM3sAd_wsF-WCo8",
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((loc) => {
      bounds.extend(loc);
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const moveToLocation = (lat, lng, isFolson) => {
    map?.panTo({ lat, lng });
    map?.setZoom(15);
    setFolson(isFolson); // Actualizar el estado basado en qué botón se presionó
  };

  return isLoaded ? (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full h-fit p-4 rounded-lg bg-white shadow-sm border border-black/5">
        <GoogleMap
          mapContainerStyle={{
            ...containerStyle,
            borderRadius: "0.3rem",
            width: "100%",
          }}
          center={center}
          zoom={0.8}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {locations.map((location, index) => (
            <Marker key={index} position={location} />
          ))}
        </GoogleMap>
      </div>

      <div className="w-full h-[315px] bg-white shadow-sm border border-black/5 rounded-lg p-4">
        <div className="flex gap-4">
          <Button
            variant={folson === true ? "primary" : "secondary"}
            // icon={RiSearch2Line}
            onClick={() =>
              moveToLocation(locations[0].lat, locations[0].lng, true)
            }
            className="h-min"
          >
            Folsom
          </Button>
          <Button
            variant={folson === false ? "primary" : "secondary"}
            // icon={RiSearch2Line}
            onClick={() =>
              moveToLocation(locations[1].lat, locations[1].lng, false)
            }
            className="h-min "
          >
            30th Street
          </Button>
        </div>
        {folson ? (
          <div className="mt-4 flex gap-4 items-start">
            <Image
              src="/Folsom Street.jpg"
              width={320}
              height={500}
              alt="Folsom Street"
            />

            <div className="flex flex-col justify-start items-start py-2 px-6 w-full h-max">
              <h2 className="text-2xl font-semibold mb-4">Snapshot Fondo</h2>
              <p className="text-lg mb-2">
                <span className="font-semibold">Tipo de proyecto: </span>
                Multifamily
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Unidades estimadas: </span>
                227
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Equity total:</span> USD
                $10.200.000
              </p>
              <p className="text-lg">
                <span className="font-semibold">Entrega Estimada: </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex gap-4 items-start">
            <Image src="/30 street.jpg" width={420} height={440} alt="d" />

            <div className="flex flex-col justify-start items-start py-2 px-6 w-full h-max">
              <h2 className="text-2xl font-semibold mb-4">Snapshot Fondo</h2>
              <p className="text-lg mb-2">
                <span className="font-semibold">Tipo de proyecto: </span>
                Multifamily
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Unidades estimadas: </span>
                227
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Equity total:</span> USD
                $10.200.000
              </p>
              <p className="text-lg">
                <span className="font-semibold">Entrega Estimada:</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}
