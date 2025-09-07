import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";
import { NavbarContext } from "../../context";
import Dog from "./Dog";
import {
  AnimatedSpan,
  DogContainer,
  HomeWrapper,
  Name,
  Position,
  TextContainer,
} from "./Home.styled";

export const Home = () => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const setPage = useContext(NavbarContext);
  const controlsRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();

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
    
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    
    // Convert screen coordinates to normalized device coordinates (-1 to +1)
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Create raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);
    
    // Get all mesh objects in the scene
    const meshes = [];
    sceneRef.current.traverse((child) => {
      if (child.isMesh) {
        meshes.push(child);
      }
    });
    
    // Check for intersections
    const intersects = raycaster.intersectObjects(meshes, true);
    
    // If no intersection with 3D objects, disable ALL controls (rotate AND zoom)
    if (intersects.length === 0) {
      controlsRef.current.enableRotate = false;
      controlsRef.current.enableZoom = false;
      setTimeout(() => {
        if (controlsRef.current) {
          controlsRef.current.enableRotate = true;
          controlsRef.current.enableZoom = true;
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (inView) {
      setPage("home");
    }
  }, [inView]);

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
  return (
    <HomeWrapper ref={ref} id="home-page">
      <TextContainer>
        <Name>Ashton Holland</Name>
        <Position>
          <div className="text first" aria-label="Software Engineer">
            {produceSpans("Software Engineer")}
          </div>
          <div className="text second" aria-label="Problem Solver">
            {produceSpans("Problem Solver")}
          </div>
        </Position>
      </TextContainer>
      <DogContainer>
        <Canvas 
          camera={{ position: [0, 2, 5] }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          onPointerDown={handlePointerDown}
          style={{ touchAction: 'pan-y' }}
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
