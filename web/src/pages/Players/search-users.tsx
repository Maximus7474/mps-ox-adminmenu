import { useEffect, useState } from "react";
import { fetchNui } from "../../utils/fetchNui";
import { PlayerShortInfo } from "@common/types/players";
import { debugPlayerList } from "../../debugdata";
import PlayerList from "./components/playerlist";
import { Input } from "../../components/ui/input";
import { isEnvBrowser } from "../../utils/misc";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

const PlayerSearch = () => {
  const [search, setSearchText] = useState<string>('');
  const [players, setPlayers] = useState<PlayerShortInfo[]>([]);

  useEffect(() => {
    if (search.length > 2) {
      if (isEnvBrowser()) {
        setPlayers(debugPlayerList.filter(
          (player) => (
                player.name.includes(search)
            || `${player.character.firstname} ${player.character.lastname}`.includes(search)
          )
        ));
      } else {
        fetchNui<PlayerShortInfo[]>('players', { action: 'search', value: '' }, { data: debugPlayerList })
        .then((r) => {
          setPlayers(r);
        });
      }
    } else {
      setPlayers([]);
    }
  }, [search]);

  return <div className="p-4">
    <div className="mb-8 w-full max-w-lg mx-auto">
      <Input
        // Full width within its max-width container, prominent
        className="w-full h-12 px-4 text-base shadow-sm"
        placeholder="Search by Name, Character Name, or ID..."
        type="search"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>

    <PlayerList players={players} />

    {players.length === 0 && search.length > 2 && (
      <Alert variant="destructive" className="w-full max-w-xl mx-auto py-4 mt-8">
        <AlertTitle className="text-xl text-center">
          No Players Found
        </AlertTitle>
        <AlertDescription className="mt-2 text-center text-md">
          <p>No results matched <code>"{search}"</code>. Try a different name or ID.</p>
        </AlertDescription>
      </Alert>
    )}
  </div>
};

export default PlayerSearch;
