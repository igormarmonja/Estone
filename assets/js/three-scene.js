(function () {
  const canvas = document.getElementById('slabCanvas');
  if (!canvas || typeof THREE === 'undefined') return;
  if (window.innerWidth <= 860) return;

  const wrap = canvas.closest('.hero-canvas-wrap');
  let width = wrap.clientWidth;
  let height = wrap.clientHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
  camera.position.set(0.4, 1.9, 8.2);
  camera.lookAt(0.2, -0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(4, 6, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.7);
  fill.position.set(-3, 2, 4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xc9a05a, 0.9);
  rim.position.set(-5, 2, -4);
  scene.add(rim);

  // Procedural marble/granite-like texture painted on a canvas
  function makeStoneTexture() {
    const size = 1024;
    const c = document.createElement('canvas');
    c.width = size; c.height = size;
    const ctx = c.getContext('2d');

    const base = ctx.createLinearGradient(0, 0, size, size);
    base.addColorStop(0, '#eeece6');
    base.addColorStop(0.5, '#e2ddd2');
    base.addColorStop(1, '#d3ccbd');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);

    // veins
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 26; i++) {
      ctx.strokeStyle = i % 3 === 0 ? '#7c766a' : '#a39c8c';
      ctx.lineWidth = Math.random() * 2 + 0.4;
      ctx.beginPath();
      let x = Math.random() * size;
      let y = 0;
      ctx.moveTo(x, y);
      while (y < size) {
        x += (Math.random() - 0.5) * 90;
        y += Math.random() * 60 + 20;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // fine speckle
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 6000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#555' : '#fff';
      const r = Math.random() * 1.4;
      ctx.beginPath();
      ctx.arc(Math.random() * size, Math.random() * size, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    return tex;
  }

  const stoneTexture = makeStoneTexture();

  const slabGeo = new THREE.BoxGeometry(3.4, 0.26, 2.2, 1, 1, 1);
  const topMat = new THREE.MeshStandardMaterial({
    map: stoneTexture,
    roughness: 0.28,
    metalness: 0.05,
    envMapIntensity: 0.6
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xcfc8ba,
    roughness: 0.5,
    metalness: 0.05
  });
  const materials = [edgeMat, edgeMat, topMat, edgeMat, edgeMat, edgeMat];
  const slab = new THREE.Mesh(slabGeo, materials);
  slab.position.set(0.4, -0.3, 0);
  slab.rotation.x = -0.32;
  slab.rotation.y = 1.05;
  scene.add(slab);

  // subtle ground reflection glow
  const glowGeo = new THREE.CircleGeometry(3.2, 48);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xc9a05a, transparent: true, opacity: 0.08
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.rotation.x = -Math.PI / 2;
  glow.position.set(0.2, -1.7, 0);
  scene.add(glow);

  let targetRotY = slab.rotation.y;
  let targetRotX = slab.rotation.x;

  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;
    targetRotY = 1.05 + nx * 0.5;
    targetRotX = -0.32 + ny * 0.2;
  });

  function resize() {
    width = wrap.clientWidth;
    height = wrap.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    slab.rotation.y += (targetRotY - slab.rotation.y) * 0.04;
    slab.rotation.x += (targetRotX - slab.rotation.x) * 0.04;
    slab.position.y = Math.sin(t * 0.6) * 0.08;

    renderer.render(scene, camera);
  }
  animate();
})();
