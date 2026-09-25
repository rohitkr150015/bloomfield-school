import { useEffect, useRef } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import { useReducedMotion } from "motion/react";
const animation = {
  v: "5.9.0",
  fr: 30,
  ip: 0,
  op: 25,
  w: 56,
  h: 56,
  nm: "Bloomfield confirmation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Confirmation ring",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [28, 28, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [42, 42] },
              p: { a: 0, k: [0, 0] },
              nm: "Ring",
            },
            {
              ty: "st",
              c: { a: 0, k: [0.09, 0.25, 0.2, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 2 },
              lc: 2,
              lj: 2,
            },
            {
              ty: "tm",
              s: { a: 0, k: 0 },
              e: {
                a: 1,
                k: [
                  {
                    t: 0,
                    s: [0],
                    e: [100],
                    i: { x: [0.5], y: [1] },
                    o: { x: [0.5], y: [0] },
                  },
                  { t: 18, s: [100] },
                ],
              },
              o: { a: 0, k: 0 },
              m: 1,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
            },
          ],
        },
      ],
      ip: 0,
      op: 25,
      st: 0,
      bm: 0,
    },
  ],
};
export default function SuccessAnimation() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reduced || !ref.current) return;
    const player = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: structuredClone(animation),
    });
    return () => player.destroy();
  }, [reduced]);
  return reduced ? null : (
    <span
      ref={ref}
      className="success-animation"
      aria-hidden="true"
      style={{ width: 38, height: 38 }}
    />
  );
}
