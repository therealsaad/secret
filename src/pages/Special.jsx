import { useEffect, useRef, useState } from "react";
import "../styles/special.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const myLocation = [19.8762, 75.3433];
const herLocation = [15.8826, 74.5239];

export default function Special() {
  const mapRef = useRef(null);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const [distance, setDistance] = useState(null);
  const [ending, setEnding] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // 🎵 AUDIO SETUP
    const audio = new Audio("/special.mp3");
    audio.loop = true;
    audioRef.current = audio;

    const ctx = new AudioContext();
    const src = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();
    src.connect(analyser);
    analyser.connect(ctx.destination);

    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    audio.play().then(() => setPlaying(true)).catch(()=>{});

    // 🎧 SOUND WAVE DRAW
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");

    function draw() {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      c.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength;

      dataArray.forEach((v, i) => {
        const h = v / 2;
        const x = i * barWidth;

        c.fillStyle = "rgba(255, 0, 80, 0.7)";
        c.fillRect(x, canvas.height - h, barWidth - 2, h);
      });
    }

    draw();

    // 🎬 MAP
    const map = L.map("map", {
      zoomControl: false,
      attributionControl: false,
    });

    mapRef.current = map;
    map.setView([22, 78], 4);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    ).addTo(map);

    const route = L.polyline([myLocation, herLocation], {
      color: "#ff004f",
      weight: 5,
    }).addTo(map);

    map.fitBounds(route.getBounds(), { padding: [60, 60] });

    const dist = map.distance(myLocation, herLocation) / 1000;
    setDistance(dist.toFixed(0));

    const plane = L.marker(myLocation, {
      icon: L.divIcon({ html: "✈️", className: "plane" }),
    }).addTo(map);

    const heart = L.marker(myLocation, {
      icon: L.divIcon({ html: "💖", className: "heart" }),
    }).addTo(map);

    let progress = 0;

    const animate = setInterval(() => {
      progress += 0.01;

      const lat =
        myLocation[0] + (herLocation[0] - myLocation[0]) * progress;
      const lng =
        myLocation[1] + (herLocation[1] - myLocation[1]) * progress;

      plane.setLatLng([lat, lng]);
      heart.setLatLng([lat, lng]);

      if (progress >= 1) {
        clearInterval(animate);
        setEnding(true);
      }
    }, 40);

    return () => {
      map.remove();
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="special-container">

      <h1 className="title">No matter the distance… ❤️</h1>

      <div id="map"></div>

      {distance && (
        <div className="distance">{distance} KM between our hearts</div>
      )}

      {/* 🎧 SOUND WAVE */}
      <canvas ref={canvasRef} className="wave"></canvas>

      {playing && <div className="nowplaying">🎵 Playing for Arziya</div>}

      {ending && (
        <div className="ending">I’m coming for you ❤️</div>
      )}

      {/* ❤️ EMOTIONAL FOOTER */}
      <div className="emotional-footer">
        Even if the world stands between us…  
        my heart still finds its way to you.
      </div>

    </div>
  );
}
