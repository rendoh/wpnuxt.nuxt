import debounce from 'lodash/debounce';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Geometry,
  PointsMaterial,
  Vector3,
  Points,
} from 'three';

function createParticles() {
  const geometry = new Geometry();
  const material = new PointsMaterial({
    size: 5,
    transparent: true,
    opacity: 0.5,
    // vertexColors
    color: 0x00ff00,
  });

  const range = 1000;
  for (let i = 0; i < 30000; i++) {
    const particle = new Vector3(
      ((Math.random() + Math.random()) / 2) * range - range / 2,
      ((Math.random() + Math.random()) / 2) * range - range / 2,
      ((Math.random() + Math.random()) / 2) * range - range / 2,
    );

    particle.step = {
      x: Math.random() * 10,
      y: Math.random() * 10,
      z: Math.random() * 10,
    };
    particle.velocity = {
      x: Math.random() * 0.075,
      y: Math.random() * 0.075,
      z: Math.random() * 0.075,
    };
    particle.range = {
      x: (Math.random() * 50) - 25,
      y: (Math.random() * 50) - 25,
      z: (Math.random() * 50) - 25,
    };
    particle.initialPosition = {
      x: particle.x,
      y: particle.y,
      z: particle.z,
    };
    geometry.vertices.push(particle);
  }

  const cloud = new Points(geometry, material);
  cloud.name = 'particles';
  return cloud;
}

function init(el) {
  const mousePosition = {
    x: 0,
    y: 0,
  };
  window.addEventListener('mousemove', ({ clientX, clientY }) => {
    mousePosition.x = (clientX / window.innerWidth - 0.5) * 2;
    mousePosition.y = (clientY / window.innerHeight - 0.5) * 2;
  })

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 900;
  const renderer = new WebGLRenderer();
  renderer.setClearColor(new Color(0xEEEEEE));
  renderer.setSize(window.innerWidth, window.innerHeight);

  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', debounce(onResize, 300));

  // particle
  const particles = createParticles();
  scene.add(particles);

  el.appendChild(renderer.domElement);

  function render() {
    particles.geometry.vertices.forEach(v => {
      v.step.x += v.velocity.x;
      v.step.y += v.velocity.y;
      v.step.z += v.velocity.z;
      v.x = v.initialPosition.x + Math.sin(v.step.x) * v.range.x;
      v.y = v.initialPosition.y + Math.sin(v.step.y) * v.range.y;
      v.z = v.initialPosition.z + Math.sin(v.step.z) * v.range.z;
    });

    particles.geometry.verticesNeedUpdate = true;

    particles.rotation.x += 0.01 * mousePosition.y;
    particles.rotation.y += 0.01 * mousePosition.x;
    particles.rotation.z += 0.003;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}

export default {
  mounted() {
    init(this.$refs.el);
  },
}
