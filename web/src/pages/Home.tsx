import { useEffect, useState } from "react";
import { Separator } from "../components/ui/separator";
import { type PlayerShortInfo } from "@common/types/players";
import { fetchNui } from "../utils/fetchNui";
import { ButtonGroup } from "../components/ui/button-group";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { debugPlayerList } from "../debugdata";

const maxplayers = 48, availablestaff = 5;

const Home: React.FC = () => {
  const [playerlist, setPlayerList] = useState<PlayerShortInfo[]>([]);

  useEffect(() => {
    fetchNui<PlayerShortInfo[]>('home', { action: 'getplayers' }, { data: debugPlayerList, delay: 10_000 })
    .then(setPlayerList)
  })

  return <div className="h-full flex flex-col px-4 py-2">
    <h1 className="text-xl">Homepage</h1>

    <Separator className="my-2" />

    <div className="grid grid-cols-2 gap-4 mb-2">
      <div></div>
      <div className="flex flex-col">
        <h2>Player list</h2>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 flex-1 overflow-auto">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <p className="font-bold">Player Count:</p>
          <span>{playerlist.length}/{maxplayers}</span>
        </div>
        
        <div className="flex gap-2">
          <p className="font-bold">Online Staff:</p>
          <span>{availablestaff}</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2 p-2">        
        {playerlist.length > 0
          ? playerlist.map((player) => (
            <div key={player.source} className="p-2 border rounded">
              <div className="flex flex-row justify-between items-center">
                <p>({player.source}) {player.name}</p>
                <ButtonGroup>
                  <Button variant='destructive'>Kick</Button>
                  <Button variant='outline'>View</Button>
                </ButtonGroup>
              </div>
            </div>
          ))
          : <div className="w-full flex gap-2 justify-center mt-6">
              <Loader2 className="animate-spin" />
              <p>Loading...</p>
            </div>
        }
      </div>
    </div>
  </div>
};

export default Home;
