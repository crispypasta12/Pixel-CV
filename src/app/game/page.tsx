import { PixelGame } from "@/components/game/PixelGame";
import { GameErrorBoundary } from "@/components/game/GameErrorBoundary";

export default function GamePage() {
  return (
    <GameErrorBoundary>
      <PixelGame />
    </GameErrorBoundary>
  );
}
