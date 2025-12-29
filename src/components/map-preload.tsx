"use client";

import { useEffect } from "react";

/**
 * Component to preload initial map tiles for better LCP
 * Preloads the most likely visible tiles at zoom level 2
 */
export function MapTilePreload() {
  useEffect(() => {
    // Preload initial tiles that will be visible at zoom level 2, centered at [20, 0]
    const initialTiles = [
      "https://a.tile.openstreetmap.org/2/1/1.png",
      "https://b.tile.openstreetmap.org/2/2/1.png",
      "https://c.tile.openstreetmap.org/2/1/0.png",
      "https://a.tile.openstreetmap.org/2/2/0.png",
      "https://b.tile.openstreetmap.org/2/0/1.png",
      "https://c.tile.openstreetmap.org/2/3/1.png",
    ];

    // Create link elements with fetchpriority=high
    initialTiles.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = url;
      link.setAttribute("fetchpriority", "high");
      document.head.appendChild(link);
    });
  }, []);

  return null;
}
