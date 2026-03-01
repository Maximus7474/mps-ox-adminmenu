import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { type PlayerShortInfo } from "@common/types/players";
import { fetchNui } from "../utils/fetchNui";
import { ButtonGroup } from "../components/ui/button-group";
import { Button } from "../components/ui/button";
import { debugPlayerList } from "../debugdata";
import { useNavigate } from "react-router-dom";

const maxplayers = 48, availablestaff = 5;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [playerlist, setPlayerList] = useState<PlayerShortInfo[]>([]);

  useEffect(() => {
    fetchNui<PlayerShortInfo[]>('home', { action: 'getplayers' }, { data: debugPlayerList, delay: 10_000 })
      .then(setPlayerList)
  }, []);

  return (
    <div className="h-full flex flex-col px-6 py-4 overflow-hidden">

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="col-span-4 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Server Info</h2>
          <div className="grid gap-4">
            <div className="p-4 border rounded-xl bg-card shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">Player Count</p>
              <p className="text-2xl font-bold">{playerlist.length} / {maxplayers}</p>
            </div>
            <div className="p-4 border rounded-xl bg-card shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">Online Staff</p>
              <p className="text-2xl font-bold text-blue-500">{availablestaff}</p>
            </div>
          </div>
        </div>

        <div className="col-span-8 flex flex-col min-h-0 border rounded-xl bg-muted/30">
          <div className="p-4 border-b bg-background/50 backdrop-blur shrink-0 rounded-t-xl">
            <h2 className="text-lg font-semibold">Active Players</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {playerlist.length > 0 ? (
              playerlist.map((player) => (
                <div key={player.source} className="p-3 bg-background border rounded-lg shadow-sm hover:border-primary/50 transition-colors">
                  <div className="flex flex-row justify-between items-center">

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
                        ID: {player.source}
                      </span>

                      <p className="font-medium">{player.name}</p>
                    </div>

                    <ButtonGroup>
                      <Button variant='destructive'>Kick</Button>
                      <Button variant='outline' onClick={() => navigate(`/players/view/${player.source}`)}>View</Button>
                    </ButtonGroup>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="animate-spin mb-2" />
                <p>Fetching player data...</p>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
