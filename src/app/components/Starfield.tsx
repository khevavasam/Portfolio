"use client";
import { useEffect, useRef } from "react";

type Star = {
    x: number; y: number; z: number;
    r: number; hue: number; layer: 0 | 1 | 2;
    tw: number; twSpeed: number;
};
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

export default function StarfieldPro() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const el = ref.current;
        if (!el) return;
        let canvas: HTMLCanvasElement = el;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        // ==== ТЮНИНГ (можешь играться) ====
        const DPR_MAX = 2;
        const DENSITY = 0.00027;            // плотность звёзд
        const LAYERS: [number, number, number] = [0.45, 0.9, 1.4];
        const METEOR_RATE = 0.0025;
        const NEAR_R = 120;                  // радиус «созвездий» вокруг курсора
        const MAX_STARS = 1400;

        // СКРОЛЛ-ЭФФЕКТЫ
        const SCROLL_DEPTH_FACTOR = 0.02;    // было 0.002 — делаем заметнее
        const SCROLL_DRIFT = 60;             // пикселей дрейфа по прогрессу
        const WARP_SENSITIVITY = 0.005;      // чем больше — тем сильнее «штрихи»
        const WARP_CAP = 1.2;

        const DPR = Math.min(window.devicePixelRatio || 1, DPR_MAX);
        let w = 0, h = 0, raf = 0;
        let mx = 0, my = 0;            // -1..1
        let cameraZ = 0;               // глубина камеры
        let lastT = performance.now();
        let lastScrollY = window.scrollY;
        let scrollVel = 0;             // px/sec

        const stars: Star[] = [];
        const meteors: Meteor[] = [];

        const rand = (a: number, b: number) => Math.random() * (b - a) + a;

        function resize() {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = Math.floor(w * DPR);
            canvas.height = Math.floor(h * DPR);
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            initStars();
        }

        function initStars() {
            stars.length = 0;
            const target = Math.min(MAX_STARS, Math.max(120, Math.floor(w * h * DENSITY)));
            for (let i = 0; i < target; i++) {
                const layer = (Math.random() < 0.6 ? 0 : Math.random() < 0.75 ? 1 : 2) as 0 | 1 | 2;
                const z = LAYERS[layer] + rand(-0.15, 0.15);
                const hue = rand(200, 260) + rand(-25, 25);
                stars.push({
                    x: rand(-w, 2 * w),
                    y: rand(-h, 2 * h),
                    z,
                    r: layer === 0 ? rand(0.5, 1.0) : layer === 1 ? rand(0.9, 1.7) : rand(1.4, 2.2),
                    hue,
                    layer,
                    tw: rand(0, Math.PI * 2),
                    twSpeed: rand(0.012, 0.035) * (1.6 - z),
                });
            }
        }

        function spawnMeteor() {
            const fromLeft = Math.random() < 0.5;
            const x = fromLeft ? -80 : w + 80;
            const y = rand(h * 0.05, h * 0.45);
            const speed = rand(7, 12);
            const ang = fromLeft ? rand(-0.2, 0.1) : rand(Math.PI - 0.1, Math.PI + 0.2);
            meteors.push({ x, y, vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed, life: rand(0.7, 1.3) });
        }

        const doc = document.documentElement;
        const scrollProgress = () => {
            const max = Math.max(1, doc.scrollHeight - window.innerHeight);
            return Math.min(1, Math.max(0, window.scrollY / max));
        };

        function bg() {
            const g = ctx.createRadialGradient(w * 0.55, h * 0.32, 0, w * 0.5, h * 0.45, Math.max(w, h));
            g.addColorStop(0, "rgba(124,58,237,0.07)");
            g.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        }

        function drawStars(dt: number, progress: number) {
            const driftX = (progress - 0.5) * SCROLL_DRIFT;     // горизонтальный дрейф от прогресса
            const driftY = (0.5 - progress) * SCROLL_DRIFT * 0.6;

            for (const s of stars) {
                s.tw += s.twSpeed * dt * 0.06;

                // параллакс от мыши + дрейф + глубина камеры
                const parX = mx * (20 / s.z) + driftX / s.z + cameraZ * (s.z - 1) * 12;
                const parY = my * (16 / s.z) + driftY / s.z + cameraZ * (s.z - 1) * 10;

                const px = ((s.x + parX) % (w + 240) + (w + 240)) % (w + 240) - 120;
                const py = ((s.y + parY) % (h + 240) + (h + 240)) % (h + 240) - 120;

                const tw = 0.65 + Math.sin(s.tw) * 0.35;
                const alpha = 0.58 * tw;

                // warp — заметнее
                const warp = Math.min(WARP_CAP, Math.abs(scrollVel) * WARP_SENSITIVITY);
                const warpLen = warp * (s.layer + 1) * 14;

                if (warp > 0.02) {
                    ctx.strokeStyle = `hsla(${s.hue}, 90%, 85%, ${alpha})`;
                    ctx.lineWidth = Math.max(1, s.r * 0.85);
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(px - mx * warpLen, py - (my + 0.25) * warpLen);
                    ctx.stroke();
                } else {
                    ctx.fillStyle = `hsla(${s.hue}, 80%, 85%, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(px, py, s.r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        function drawConstellations() {
            const cx = (mx + 1) * 0.5 * w;
            const cy = (my + 1) * 0.5 * h;
            const near: { x: number; y: number; a: number }[] = [];
            for (const s of stars) {
                const px = s.x + mx * (20 / s.z);
                const py = s.y + my * (16 / s.z);
                const dx = ((px % w) + w) % w - cx;
                const dy = ((py % h) + h) % h - cy;
                const d2 = dx * dx + dy * dy;
                if (d2 < NEAR_R * NEAR_R) {
                    near.push({ x: cx + dx, y: cy + dy, a: 1 - Math.sqrt(d2) / NEAR_R });
                }
            }
            if (near.length < 2) return;
            near.sort((a, b) => b.a - a.a);
            const take = Math.min(6, near.length);
            ctx.lineWidth = 1;
            for (let i = 0; i < take - 1; i++) {
                for (let j = i + 1; j < take; j++) {
                    const a = near[i], b = near[j];
                    const opa = Math.min(a.a, b.a) * 0.4;
                    ctx.strokeStyle = `rgba(125,211,252,${opa})`;
                    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                }
            }
        }

        function drawMeteors() {
            if (Math.random() < METEOR_RATE) spawnMeteor();
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.x += m.vx; m.y += m.vy; m.life -= 1 / 60;

                const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 12, m.y - m.vy * 12);
                grad.addColorStop(0, "rgba(255,255,255,.95)");
                grad.addColorStop(1, "rgba(255,255,255,0)");
                ctx.strokeStyle = grad; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 18, m.y - m.vy * 18); ctx.stroke();

                if (m.life <= 0 || m.x < -240 || m.x > w + 240 || m.y < -240 || m.y > h + 240) meteors.splice(i, 1);
            }
        }

        function frame(now: number) {
            const dt = Math.min(32, now - lastT);
            lastT = now;

            // скорость скролла и глубина
            const y = window.scrollY;
            scrollVel = (y - lastScrollY) / (dt / 1000);
            lastScrollY = y;

            const progress = scrollProgress();
            const targetZ = progress * SCROLL_DEPTH_FACTOR;      // 0..SCROLL_DEPTH_FACTOR
            cameraZ += (targetZ - cameraZ) * 0.08;               // сглаживание

            ctx.clearRect(0, 0, w, h);
            bg();
            drawStars(dt, progress);
            drawConstellations();
            drawMeteors();

            raf = requestAnimationFrame(frame);
        }

        // events
        const onMove = (e: MouseEvent) => {
            mx = (e.clientX / w) * 2 - 1;
            my = (e.clientY / h) * 2 - 1;
        };
        const onResize = () => resize();
        const onVisibility = () => {
            if (document.hidden) cancelAnimationFrame(raf);
            else raf = requestAnimationFrame(frame);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);

        resize();
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    return <canvas className="starfield" ref={ref} aria-hidden="true" />;
}
