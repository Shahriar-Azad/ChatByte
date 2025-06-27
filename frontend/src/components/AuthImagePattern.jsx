import { Sparkles } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center relative bg-base-200 p-12 overflow-hidden">
      {/* Glowing background */}
      <div className="absolute w-96 h-96 bg-gradient-to-tr from-primary to-purple-500 opacity-20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* Animated Icon Grid */}
      <div className="absolute inset-0 grid grid-cols-4 gap-5 opacity-10 animate-pulse">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 mx-auto my-auto bg-primary/30 rounded-xl blur-sm"
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md text-center space-y-4">
        <div className="flex justify-center">
          <Sparkles className="w-10 h-10 text-primary animate-bounce" />
        </div>
        <h2 className="text-3xl font-extrabold text-base-content">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
