import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";
import { NavbarContext } from "../../context";
import { blue, green, pink, red, yellow } from "../../utils";
import Dog from "./Dog";
import {
  AnimatedSpan,
  DogContainer,
  HomeWrapper,
  Name,
  Position,
  TextContainer,
} from "./Home.styled";

const TAGLINES = [
  { text: "Creative Builder", color: blue["50"] },
  { text: "Traveler", color: pink["50"] },
  { text: "Team Player", color: green["50"] },
  { text: "Leader", color: yellow["40"] },
  { text: "Storyteller", color: red["60"] },
];

const TAGLINE_DURATION = 3200;

export const Home = () => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const setPage = useContext(NavbarContext);
  const controlsRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Raycaster component to detect 3D object hits
  const RaycastDetector = () => {
    const { scene, camera } = useThree();

    useEffect(() => {
      sceneRef.current = scene;
      cameraRef.current = camera;
    }, [scene, camera]);

    return null;
  };

  const handlePointerDown = (event) => {
    if (!controlsRef.current || !sceneRef.current || !cameraRef.current) return;

    // Always allow multi-touch (pinch to zoom)
    const touches = event.touches || [];
    if (touches.length > 1) {
      return;
    }

    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();

    // Convert to normalized coordinates
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Create raycaster with tighter precision
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    // Only get mesh objects, be more selective
    const meshes = [];
    sceneRef.current.traverse((child) => {
      if (child.isMesh && child.geometry) {
        meshes.push(child);
      }
    });

    // Check for intersections
    const intersects = raycaster.intersectObjects(meshes, true);

    // Default to scroll-friendly: disable rotation unless clearly touching object
    controlsRef.current.enableRotate = false;

    // Only enable rotation if we have a clear hit on a 3D object
    if (intersects.length > 0) {
      // Add a small delay to distinguish from scroll intent
      setTimeout(() => {
        if (controlsRef.current) {
          controlsRef.current.enableRotate = true;
        }
      }, 150);
    } else {
      // Re-enable after a short delay to reset state
      setTimeout(() => {
        if (controlsRef.current) {
          controlsRef.current.enableRotate = true;
        }
      }, 200);
    }
  };

  useEffect(() => {
    if (inView) {
      setPage("home");
    }
  }, [inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, TAGLINE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const produceSpans = (name) => {
    return name.split("").map((letter, index) => (
      <AnimatedSpan
        index={index}
        letter={letter}
        aria-hidden="true"
        key={index}
      >
        {letter}
      </AnimatedSpan>
    ));
  };

  const activeTagline = TAGLINES[taglineIndex];

  return (
    <HomeWrapper ref={ref} id="home-page">
      <TextContainer>
        <Name>Ashton Holland</Name>
        <Position aria-live="polite">
          <div
            key={activeTagline.text}
            className="text"
            aria-label={activeTagline.text}
            style={{ color: activeTagline.color }}
          >
            {produceSpans(activeTagline.text)}
          </div>
        </Position>
      </TextContainer>
      <DogContainer>
        <Canvas
          camera={{ position: [0, 2, 5] }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          onPointerDown={handlePointerDown}
          style={{ touchAction: "pan-y" }}
        >
          <RaycastDetector />
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={8}
            target={[0, 0, 0]}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
            rotateSpeed={0.5}
            zoomSpeed={0.8}
            enableDamping={true}
            dampingFactor={0.05}
          />
          <Dog />
        </Canvas>
      </DogContainer>
    </HomeWrapper>
  );
};

