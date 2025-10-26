import { useEffect, useState } from "react";
import { fetchNui } from "../../utils/fetchNui";
import { OnlinePlayerShortInfo } from "@common/types/players";
import { debugPlayerList } from "../../debugdata";
import PlayerList from "./components/playerlist";

const OnlinePlayersList = () => {
  const [players, setPlayers] = useState<OnlinePlayerShortInfo[]>([]);

  useEffect(() => {
    fetchNui<OnlinePlayerShortInfo[]>('players', { action: 'get' }, { data: debugPlayerList })
    .then((r) => {
      setPlayers(r);
    });
  }, []);

  return <div className="p-4">
    <h1 className="text-lg">Connected Players</h1>

    <PlayerList players={players} onlinelist/>
  </div>
};

export default OnlinePlayersList;
