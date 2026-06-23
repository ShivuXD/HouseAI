export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 scale-105"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />      
      <div className="absolute inset-0 bg-black/22" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.8) 100%)",
        }}
      />
    </div>
  );
}
