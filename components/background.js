import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Geometry,
  PointsMaterial,
  Vector3,
  Points,
  AxisHelper,
} from 'three';

function createParticles() {
  const geometry = new Geometry();
  const material = new PointsMaterial({
    size: 2,
    transparent: true,
    opacity: 0.6,
    // vertexColors
    color: 0x00ff00,
  });

  const range = 500;
  for (let i = 0; i < 15000; i++) {
    const particle = new Vector3(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
    );

    geometry.vertices.push(particle);
  }

  const cloud = new Points(geometry, material);
  cloud.name = 'particles';
  return cloud;
}

function init(el) {
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 150;
  const renderer = new WebGLRenderer();
  renderer.setClearColor(new Color(0xEEEEEE));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const axes = new AxisHelper(20);
  scene.add(axes)

  const particles = createParticles();
  scene.add(particles);

  el.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

export default {
  mounted() {
    init(this.$refs.el);
  },
}
