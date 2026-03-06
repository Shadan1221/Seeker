import { FloatingPathsBackground } from "../components/ui/floating-paths";

export default function FloatingPathsBackgroundExample() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-20">
      <FloatingPathsBackground
        className="aspect-video w-full max-w-4xl flex items-center justify-center border border-white/10 rounded-3xl bg-white/5"
        position={-1}
      >
        <div className="text-center z-10">
          <h1 className="text-5xl font-black font-headline tracking-tighter">SEEKER</h1>
          <p className="text-slate-400 font-mono text-xs mt-4 tracking-widest uppercase">Floating Paths Background Demo</p>
        </div>
      </FloatingPathsBackground>
    </div>
  );
}
