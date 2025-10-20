import { useEffect, useState } from "react";
import { fetchNui } from "../../utils/fetchNui";
import { PlayerShortInfo } from "@common/types/players";
import { debugPlayerList } from "../../debugdata";
import PlayerList from "./components/playerlist";

const OnlinePlayersList = () => {
  const [players, setPlayers] = useState<PlayerShortInfo[]>([]);

  useEffect(() => {
    fetchNui<PlayerShortInfo[]>('players', { action: 'get' }, { data: debugPlayerList })
    .then((r) => {
      setPlayers(r);
    });
  }, []);

  return <div className="p-4">
    <h1>Players Page</h1>

    <PlayerList players={players} />
  </div>
};

export default OnlinePlayersList;
