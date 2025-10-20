import { useEffect, useState } from "react";
import { ChevronDown, ChevronsUpDown, ChevronUp, EyeIcon } from "lucide-react";
import { fetchNui } from "../../utils/fetchNui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlayerShortInfo } from "@common/types/players";
import { debugPlayerList } from "../../debugdata";

type FilterTypes = 'name' | 'character_name' | 'source' | 'userid' | 'stateid';

interface Filter {
  field: FilterTypes;
  asc: boolean;
}

const getIconForHeader = (field: FilterTypes, curFilter: Filter | null) => {
  if (!curFilter || field !== curFilter.field) return <ChevronsUpDown />;

  if (curFilter.asc) return <ChevronUp />;
  else return <ChevronDown />;
}

const getValueForFilter = (filter: FilterTypes, player: PlayerShortInfo): string | number | null => {
  if (filter === 'name') return player.name;
  if (filter === 'source') return player.source;
  if (filter === 'userid') return player.source;
  if (filter === 'stateid') return player.character.stateid;
  if (filter === 'character_name') return `${player.character.firstname} ${player.character.lastname}`;
  return null;
}

const OnlinePlayersList = () => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState<PlayerShortInfo[]>([]);
  const [filter, setFilter] = useState<Filter | null>(null);

  const filterPlayers = (field: FilterTypes) => {
    const newAsc = filter?.field === field ? !filter.asc : true;

    const sortedPlayers = [...players].sort((a: PlayerShortInfo, b: PlayerShortInfo) => {
      const aValue = (getValueForFilter(field, a) ?? '');
      const bValue = (getValueForFilter(field, b) ?? '');

      let comparison;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = comparison = aValue - bValue;
      } else {
        comparison = (aValue).toString().localeCompare(bValue.toString() as string);
      }

      return newAsc ? comparison : -comparison;
    });

    setPlayers(sortedPlayers);
    setFilter({ field, asc: newAsc });
  };

  useEffect(() => {
    fetchNui<PlayerShortInfo[]>('players', { action: 'get' }, { data: debugPlayerList })
    .then((r) => {
      setPlayers(r);
    });
  }, []);

  return <div className="p-4">
    <h1>Players Page</h1>

    <Table className="w-[80%] mx-auto">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead onClick={() => filterPlayers('source')}>
            <div className="flex justify-center items-center gap-2">
              <span>Server Id</span>
              {getIconForHeader('source', filter)}
            </div>
          </TableHead>
          <TableHead onClick={() => filterPlayers('userid')}>
            <div className="flex justify-center items-center gap-2">
              <span>User Id</span>
              {getIconForHeader('userid', filter)}
            </div>
          </TableHead>
          <TableHead onClick={() => filterPlayers('name')}>
            <div className="flex justify-center items-center gap-2">
              <span>Name</span>
              {getIconForHeader('name', filter)}
            </div>
          </TableHead>
          <TableHead onClick={() => filterPlayers('stateid')}>
            <div className="flex justify-center items-center gap-2">
              <span>State Id</span>
              {getIconForHeader('stateid', filter)}
            </div>
          </TableHead>
          <TableHead onClick={() => filterPlayers('character_name')}>
            <div className="flex justify-center items-center gap-2">
              <span>Character Name</span>
              {getIconForHeader('character_name', filter)}
            </div>
          </TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player, idx) => (
          <TableRow key={idx}>
            <TableCell>{player.source}</TableCell>
            <TableCell>{player.userid}</TableCell>
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.character.stateid}</TableCell>
            <TableCell>{player.character.firstname} {player.character.lastname}</TableCell>
            <TableCell className="flex justify-center">
              <Button variant='outline' onClick={() => navigate(`/players/view/${player.userid}/`)}>
                <EyeIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
};

export default OnlinePlayersList;
