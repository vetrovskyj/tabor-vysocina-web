import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo from "../img/logo.png";

const GallerySlider = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://google-photos-api-5ivj.onrender.com/albums")
      .then((response) => response.json())
      .then((data) => {
        const uniqueAlbums = Array.from(
          new Map(data.map((album) => [album.id, album])).values()
        );
        setAlbums(uniqueAlbums);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // This runs AFTER albums has been updated
    if (albums.length > 0) {
      console.log("Albums updated:", albums);
    }
  }, [albums]);

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const filterAndRenderAlbums = (keyword, name) => {
    const filteredAlbums = albums.filter((album) =>
      album.name.toLowerCase().includes(keyword)
    );

    // Sort albums by year extracted from the name (newest first)
    filteredAlbums.sort((a, b) => {
      const yearA = a.name.replace(keyword, "").match(/\d{4}/)?.[0] || "0"; // Extract year from name
      const yearB = b.name.replace(keyword, "").match(/\d{4}/)?.[0] || "0"; // Extract year from name
      return yearB - yearA; // Newest first
    });

    if (filteredAlbums.length === 0) return null;

    return (
      <div className="years-section">
        <h2>{name}</h2>
        {filteredAlbums.length > 1 ? (
          <Slider {...settings}>
            {filteredAlbums.map((album) => (
              <div key={album.id} className="years-item-container">
                <Link
                  className="gallery-carousel-container"
                  key={album.name}
                  to={`/galerie/${encodeURIComponent(album.name)}`}
                  state={{ album }}
                >
                  <img
                    alt={album.name}
                    src={album.starredFiles[0]?.previewUrl || logo}
                  />
                  <div className="gallery-carousel-text">
                    {album.name.replace(keyword, "")}
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          // If only one album, render without a slider
          <div className="years-item-container">
            <Link
              className="gallery-carousel-container"
              key={filteredAlbums[0].name}
              to={`/galerie/${encodeURIComponent(filteredAlbums[0].name)}`}
              state={{ album: filteredAlbums[0] }}
            >
              <img
                alt={filteredAlbums[0].name}
                src={filteredAlbums[0].highResCoverPhoto || logo}
              />
              <div className="gallery-carousel-text">
                {filteredAlbums[0].name.replace(keyword, "")}
              </div>
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {albums.length > 0 && filterAndRenderAlbums("leto", "Léto")}
      {albums.length > 0 && filterAndRenderAlbums("velikonoce", "Velikonoce")}
    </div>
  );
};

export default GallerySlider;
