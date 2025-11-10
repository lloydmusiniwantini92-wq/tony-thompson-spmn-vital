import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import "@babylonjs/materials";

import logoTT from "../assets/images/logoTT.png";
import logoFull from "../assets/images/logoFull.png";

export default function OrbitLogos() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // === Initialize Babylon engine & scene ===
        const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // transparent background

        // === Camera setup ===
        const camera = new BABYLON.ArcRotateCamera(
            "camera",
            Math.PI / 2,
            Math.PI / 2.4,
            4.5,
            new BABYLON.Vector3(0, 0, 0),
            scene
        );
        camera.attachControl(canvas, true);
        camera.lowerRadiusLimit = 3;
        camera.upperRadiusLimit = 5.5;
        camera.wheelPrecision = 40;
        camera.panningSensibility = 0;

        // === Lighting ===
        const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.85;

        const pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 0, 0), scene);
        pointLight.intensity = 1.4;
        pointLight.diffuse = new BABYLON.Color3(0.6, 0.2, 0.9);

        // === Central glowing line ===
        const lineHeight = 2.5;
        const line = BABYLON.MeshBuilder.CreateBox("centerLine", {
            height: lineHeight,
            width: 0.05,
            depth: 0.05,
        }, scene);
        const lineMat = new BABYLON.StandardMaterial("lineMat", scene);
        lineMat.emissiveColor = new BABYLON.Color3(0.6, 0.2, 0.9); // Tony purple glow
        line.material = lineMat;

        // === Glow layer for soft light ===
        const gl = new BABYLON.GlowLayer("glow", scene, { intensity: 0.8 });
        gl.addIncludedOnlyMesh(line);

        // === Logo planes ===
        const planeSize = 0.9;
        const ttPlane = BABYLON.MeshBuilder.CreatePlane("ttPlane", { size: planeSize }, scene);
        const fullPlane = BABYLON.MeshBuilder.CreatePlane("fullPlane", { size: planeSize * 1.5 }, scene);

        const ttMat = new BABYLON.StandardMaterial("ttMat", scene);
        ttMat.diffuseTexture = new BABYLON.Texture(logoTT, scene);
        ttMat.opacityTexture = new BABYLON.Texture(logoTT, scene);
        ttMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
        ttPlane.material = ttMat;

        const fullMat = new BABYLON.StandardMaterial("fullMat", scene);
        fullMat.diffuseTexture = new BABYLON.Texture(logoFull, scene);
        fullMat.opacityTexture = new BABYLON.Texture(logoFull, scene);
        fullMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
        fullPlane.material = fullMat;

        // === Initial positions ===
        ttPlane.position.x = 1.5;
        ttPlane.position.y = 0.4;
        ttPlane.rotation.y = Math.PI;

        fullPlane.position.x = -1.5;
        fullPlane.position.y = -0.4;

        // === Animate orbits ===
        let angle = 0;
        scene.onBeforeRenderObservable.add(() => {
            angle += engine.getDeltaTime() * 0.001; // orbit speed
            const radius = 1.6;

            ttPlane.position.x = Math.cos(angle) * radius;
            ttPlane.position.z = Math.sin(angle) * radius;
            ttPlane.rotation.y = -angle + Math.PI;

            fullPlane.position.x = Math.cos(angle + Math.PI) * radius;
            fullPlane.position.z = Math.sin(angle + Math.PI) * radius;
            fullPlane.rotation.y = -(angle + Math.PI);

            // gentle bobbing
            ttPlane.position.y = Math.sin(angle * 2) * 0.25;
            fullPlane.position.y = Math.sin(angle * 2 + Math.PI) * 0.25;

            // glow pulse
            lineMat.emissiveColor = new BABYLON.Color3(
                0.6 + Math.sin(angle * 2) * 0.2,
                0.2,
                0.9 + Math.cos(angle * 2) * 0.1
            );
        });

        // === Resize handling ===
        window.addEventListener("resize", () => engine.resize());
        engine.runRenderLoop(() => scene.render());

        return () => {
            engine.stopRenderLoop();
            engine.dispose();
        };
    }, []);

    return (
        <div className="relative w-[150px] h-[150px]" style={{ overflow: "visible" }}>
            <canvas ref={canvasRef} style={{ width: "150px", height: "150px" }} />
        </div>
    );
}
