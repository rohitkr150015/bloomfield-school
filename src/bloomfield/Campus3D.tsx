import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

/** Deliberately schematic, fictional campus. Always has the adjacent accessible facility list. */
export default function Campus3D({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (slug: string) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<{
    zoom: (scale: number) => void;
    reset: () => void;
  } | null>(null);
  const reduced = useReducedMotion();
  const [error, setError] = useState(false);
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      setError(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor("#e8eedf");
    container.appendChild(renderer.domElement);
    renderer.domElement.setAttribute(
      "aria-label",
      "Interactive fictional campus model. Use the adjacent facility list, or drag to rotate.",
    );
    renderer.domElement.setAttribute("role", "img");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#e8eedf");
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 120);
    camera.position.set(16, 17, 20);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = !reduced;
    controls.enablePan = false;
    controls.minDistance = 14;
    controls.maxDistance = 42;
    controls.minPolarAngle = 0.2;
    controls.maxPolarAngle = Math.PI / 2.3;
    controls.autoRotate = false;
    scene.add(new THREE.AmbientLight("#fff4df", 2));
    const sun = new THREE.DirectionalLight("#ffffff", 3);
    sun.position.set(10, 18, 8);
    scene.add(sun);
    const meshes: THREE.Mesh[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    function block(
      w: number,
      h: number,
      d: number,
      color: string,
      x: number,
      y: number,
      z: number,
      slug?: string,
    ) {
      const geometry = new THREE.BoxGeometry(w, h, d);
      const material = new THREE.MeshStandardMaterial({ color, roughness: 1 });
      geometries.push(geometry);
      materials.push(material);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      if (slug) {
        mesh.userData.slug = slug;
        meshes.push(mesh);
      }
      return mesh;
    }
    block(20, 0.4, 17, "#aec298", 0, -0.4, 0);
    block(2, 0.05, 17, "#e9dfc2", 0, -0.16, 0);
    block(18, 0.05, 1.5, "#e9dfc2", 0, -0.15, 2);
    function building(
      x: number,
      z: number,
      w: number,
      d: number,
      slug: string,
    ) {
      const highlight = active === slug;
      block(w, 2.5, d, highlight ? "#dfb74a" : "#f4edda", x, 1, z, slug);
      block(
        w + 0.3,
        0.22,
        d + 0.3,
        highlight ? "#163f33" : "#65856a",
        x,
        2.36,
        z,
        slug,
      );
      for (let i = 0; i < 3; i++) {
        block(
          0.55,
          0.65,
          0.08,
          "#628f8b",
          x - w / 2 + 0.8 + i * 0.9,
          1.1,
          z + d / 2 + 0.05,
        );
        block(
          0.55,
          0.55,
          0.08,
          "#628f8b",
          x - w / 2 + 0.8 + i * 0.9,
          2,
          z + d / 2 + 0.05,
        );
      }
      block(0.7, 1.1, 0.1, "#315247", x, 0.38, z + d / 2 + 0.06);
    }
    building(-5, 2, 5, 4, "library");
    building(5, 2, 5, 4, "science-wing");
    block(
      9,
      0.07,
      5,
      active === "sports-grounds" ? "#c9be60" : "#80a871",
      0,
      -0.1,
      -5,
      "sports-grounds",
    );
    const fieldLine = new THREE.LineBasicMaterial({ color: "#f9f6db" });
    materials.push(fieldLine);
    const outline = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4, 0.0, -7),
      new THREE.Vector3(4, 0, -7),
      new THREE.Vector3(4, 0, -3),
      new THREE.Vector3(-4, 0, -3),
      new THREE.Vector3(-4, 0, -7),
    ]);
    geometries.push(outline);
    scene.add(new THREE.Line(outline, fieldLine));
    const mid = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -7),
      new THREE.Vector3(0, 0, -3),
    ]);
    geometries.push(mid);
    scene.add(new THREE.Line(mid, fieldLine));
    function tree(x: number, z: number) {
      block(0.17, 1, 0.17, "#83724e", x, 0.3, z);
      const g = new THREE.IcosahedronGeometry(0.75, 0);
      const m = new THREE.MeshStandardMaterial({
        color: "#567d4c",
        roughness: 1,
      });
      geometries.push(g);
      materials.push(m);
      const t = new THREE.Mesh(g, m);
      t.position.set(x, 1.1, z);
      scene.add(t);
    }
    [-8, -5, 5, 8].forEach((x) => tree(x, 6.7));
    [-7, 0, 7].forEach((z) => {
      tree(-9, z);
      tree(9, z);
    });
    block(4, 0.2, 2, "#b6b8a4", 5, -0.1, 6.3);
    [-0.6, 0.4, 1.4].forEach((x) =>
      block(0.08, 0.02, 1.6, "#ffffed", x + 5, 0.02, 6.3),
    );
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let down = { x: 0, y: 0 };
    const onDown = (e: PointerEvent) => {
      down = { x: e.clientX, y: e.clientY };
    };
    const onUp = (e: PointerEvent) => {
      if (Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y) > 8)
        return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        (-(e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(meshes)[0];
      if (hit) selectRef.current(hit.object.userData.slug);
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointerup", onUp);
    const resize = () => {
      const w = container.clientWidth,
        h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(render);
    controller.current = {
      zoom: (factor) => {
        const direction = camera.position
          .clone()
          .sub(controls.target)
          .multiplyScalar(factor);
        direction.clampLength(14, 42);
        camera.position.copy(controls.target).add(direction);
        controls.update();
      },
      reset: () => {
        camera.position.set(16, 17, 20);
        controls.target.set(0, 0, 0);
        controls.update();
      },
    };
    return () => {
      observer.disconnect();
      renderer.setAnimationLoop(null);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      controls.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      controller.current = null;
    };
  }, [active, reduced]);
  if (error)
    return (
      <div className="empty">
        <h3>The photo tour is ready for you.</h3>
        <p>
          Your device could not start the 3D viewer. Use Photos or Campus map to
          explore every facility.
        </p>
      </div>
    );
  return (
    <div className="campus-three">
      <div ref={host} style={{ height: "100%", width: "100%" }} />
      <div className="three-controls">
        <button
          aria-label="Zoom in"
          onClick={() => controller.current?.zoom(0.85)}
        >
          <ZoomIn size={18} />
        </button>
        <button
          aria-label="Zoom out"
          onClick={() => controller.current?.zoom(1.15)}
        >
          <ZoomOut size={18} />
        </button>
        <button
          aria-label="Reset campus view"
          onClick={() => controller.current?.reset()}
        >
          <RotateCcw size={18} />
        </button>
      </div>
      <div className="three-note">
        Fictional 3D concept · Drag to look around · Select a building or use
        the facility list
      </div>
    </div>
  );
}
