import svgPaths from "./svg-5g771j36un";

function GameIconsCoffeeBeans() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="game-icons:coffee-beans">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="game-icons:coffee-beans">
          <path d={svgPaths.p34c53200} fill="var(--fill-0, #6C6C6C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Status() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="Status 3">
      <GameIconsCoffeeBeans />
    </div>
  );
}