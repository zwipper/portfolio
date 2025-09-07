import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Page } from "../../components/Page";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import college from "../../assets/images/college.png";
import highschool from "../../assets/images/highschool.png";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  const skillsControlsRef = useRef();
  const skillsSceneRef = useRef();
  const skillsCameraRef = useRef();
  
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  // Raycaster component for skills ball
  const SkillsRaycastDetector = () => {
    const { scene, camera } = useThree();
    
    useEffect(() => {
      skillsSceneRef.current = scene;
      skillsCameraRef.current = camera;
    }, [scene, camera]);
    
    return null;
  };

  const handleSkillsPointerDown = (event) => {
    if (!skillsControlsRef.current || !skillsSceneRef.current || !skillsCameraRef.current) return;
    
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    
    // Convert screen coordinates to normalized device coordinates (-1 to +1)
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Create raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, skillsCameraRef.current);
    
    // Get all mesh objects in the scene
    const meshes = [];
    skillsSceneRef.current.traverse((child) => {
      if (child.isMesh) {
        meshes.push(child);
      }
    });
    
    // Check for intersections
    const intersects = raycaster.intersectObjects(meshes, true);
    
    // If no intersection with 3D objects, disable ALL controls (rotate AND zoom)
    if (intersects.length === 0) {
      skillsControlsRef.current.enableRotate = false;
      skillsControlsRef.current.enableZoom = false;
      setTimeout(() => {
        if (skillsControlsRef.current) {
          skillsControlsRef.current.enableRotate = true;
          skillsControlsRef.current.enableZoom = true;
        }
      }, 100);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, []);
  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
            I’m a passionate programmer who’s always looking for new challenges to push myself further. I’m also a team player who’s ready to learn new things and help others whenever I can. 
            <br/> I was born and raised in Arizona, and outside of coding I love competing in sports, improving at chess, watching movies, playing with my dog, and learning new flips!
          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                title: "Georgia Institute of Technology",
                p: "B.S. Computer Science (2023-2026)",
                image: college,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "Peachtree Ridge Highschool",
                p: "High School (2019-2023)",
                image: highschool,
              }}
            />
          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas 
              camera={{ position: [0, 0, 18] }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
              onPointerDown={handleSkillsPointerDown}
              style={{ touchAction: 'pan-y' }}
            >
              <SkillsRaycastDetector />
              <OrbitControls 
                ref={skillsControlsRef}
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={12}
                maxDistance={22}
                target={[0, 0, 0]}
                autoRotate={true}
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI}
                minPolarAngle={0}
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.5}
                zoomSpeed={0.8}
              />
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};
