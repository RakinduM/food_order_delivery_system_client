import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useDriver } from '../contexts/DriverContext';

// In a real app, you would use an environment variable for this
mapboxgl.accessToken = 'pk.eyJ1IjoicmFraW5kdSIsImEiOiJjbTl1dG5oNnIwZGozMmlvaDYxdXU3YXM4In0.juY566i-lUJsbBvIsW6Qyw';

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className = '' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null); // Default to null
  const { currentOrder, sendDriverLocation } = useDriver();
  const userMarker = useRef<mapboxgl.Marker | null>(null); // Ref for the user's location marker
  const pickupMarker = useRef<mapboxgl.Marker | null>(null); // Ref for the pickup location marker
  const dropoffMarker = useRef<mapboxgl.Marker | null>(null); // Ref for the drop-off location marker
  const pickupRouteLayerId = 'pickup-route-layer'; // Layer ID for the route to pickup
  const dropoffRouteLayerId = 'dropoff-route-layer'; // Layer ID for the route to dropoff

  // Function to fetch the route from Mapbox Directions API
  const fetchRoute = async (
    start: [number, number],
    waypoints: [number, number][]
  ) => {
    const coordinates = [start, ...waypoints].map((coord) => coord.join(',')).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      return data.routes[0].geometry; // Return the GeoJSON geometry of the route
    } else {
      console.error('No routes found');
      return null;
    }
  };

  // Function to draw a route on the map
  const drawRoute = (geometry: any, layerId: string, color: string) => {
    if (!map.current) return;

    // Remove existing route layer if it exists
    if (map.current.getLayer(layerId)) {
      map.current.removeLayer(layerId);
      map.current.removeSource(layerId);
    }

    // Add the route as a source and layer
    map.current.addSource(layerId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry,
      },
    });

    map.current.addLayer({
      id: layerId,
      type: 'line',
      source: layerId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': color, // Dynamic color for the route
        'line-width': 4,
      },
    });
  };

  // Initialize the map
  useEffect(() => {
    if (!mapboxgl.supported()) {
      console.error('Your browser does not support Mapbox GL');
      return;
    }

    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: userLocation || [-74.006, 40.7128], // Default to NYC if userLocation is not available
        zoom: 13,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          setUserLocation(newLocation); // Update user location state
          map.current?.setCenter(newLocation); // Center the map to the user's location

          // Add or update the user's location marker
          if (userMarker.current) {
            userMarker.current.setLngLat(newLocation);
          } else {
            userMarker.current = new mapboxgl.Marker({
              color: '#1E90FF', // Blue color for the user's location
            })
              .setLngLat(newLocation)
              .addTo(map.current!);
          }

          sendDriverLocation();
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Fetch and display the routes and markers when currentOrder or userLocation changes
  useEffect(() => {
    const updateRoutesAndMarkers = async () => {
      if (!userLocation || !currentOrder) return;

      const { pickup, dropoff } = currentOrder.coordinates;

      // Add or update the pickup location marker
      if (pickupMarker.current) {
        pickupMarker.current.setLngLat(pickup);
      } else {
        pickupMarker.current = new mapboxgl.Marker({
          color: '#06D6A0', // Green color for the pickup location
        })
          .setLngLat(pickup)
          .setPopup(new mapboxgl.Popup().setHTML('<p>Pickup Location</p>')) // Add a popup
          .addTo(map.current!);
      }

      // Add or update the drop-off location marker
      if (dropoffMarker.current) {
        dropoffMarker.current.setLngLat(dropoff);
      } else {
        dropoffMarker.current = new mapboxgl.Marker({
          color: '#E71D36', // Red color for the drop-off location
        })
          .setLngLat(dropoff)
          .setPopup(new mapboxgl.Popup().setHTML('<p>Drop-off Location</p>')) // Add a popup
          .addTo(map.current!);
      }

      // Fetch and draw the route to the pickup location
      const pickupGeometry = await fetchRoute(userLocation, [pickup]);
      if (pickupGeometry) {
        drawRoute(pickupGeometry, pickupRouteLayerId, '#1DB954'); // Green route to pickup
      }

      // Fetch and draw the route to the dropoff location
      const dropoffGeometry = await fetchRoute(pickup, [dropoff]);
      if (dropoffGeometry) {
        drawRoute(dropoffGeometry, dropoffRouteLayerId, '#FF5733'); // Orange route to dropoff
      }
    };

    updateRoutesAndMarkers();
  }, [userLocation, currentOrder]);

  return <div ref={mapContainer} className={`w-full h-full ${className}`} />;
};

export default Map;