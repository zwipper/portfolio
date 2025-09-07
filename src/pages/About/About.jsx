import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect, useRef } from "react";
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
  
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  const handleSkillsPointerDown = (event) => {
    if (!skillsControlsRef.current) return;
    
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const touchX = event.clientX - rect.left;
    const touchY = event.clientY - rect.top;
    
    const distance = Math.sqrt(
      Math.pow(touchX - centerX, 2) + Math.pow(touchY - centerY, 2)
    );
    
    // Get current zoom level (camera distance from target)
    const camera = skillsControlsRef.current.object;
    const currentDistance = camera.position.distanceTo(skillsControlsRef.current.target);
    
    // Scale interaction area based on zoom (closer zoom = larger interaction area)
    const minDistance = 12; // min zoom distance for skills ball
    const maxDistance = 22; // max zoom distance for skills ball
    const zoomFactor = 1 - ((currentDistance - minDistance) / (maxDistance - minDistance));
    const baseInteractionSize = 0.1; // 10% base size (much smaller)
    const scaledInteractionSize = baseInteractionSize + (zoomFactor * 0.15); // up to 25% when fully zoomed in
    
    const maxAllowedDistance = Math.min(rect.width, rect.height) * scaledInteractionSize;
    
    if (distance > maxAllowedDistance) {
      skillsControlsRef.current.enabled = false;
      setTimeout(() => {
        if (skillsControlsRef.current) skillsControlsRef.current.enabled = true;
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
