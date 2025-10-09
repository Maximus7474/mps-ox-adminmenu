import { useEffect, useState } from "react";
import { ChevronDown, ChevronsUpDown, ChevronUp, EyeIcon } from "lucide-react";
import { fetchNui } from "../../utils/fetchNui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";

interface Group {
  name: string;
  label: string;
  type?: string;
  colour?: number;
  hasAccount?: boolean;
}

type FilterTypes = 'name' | 'label' | 'type';

interface Filter {
  field: FilterTypes;
  asc: boolean;
}

const debugGroups: Group[] = [
  {
    name: 'police',
    label: 'Police Department',
    type: 'job',
  },
  {
    name: 'ambulance',
    label: 'Emergency Response',
    type: 'job',
  },
];

const getIconForHeader = (field: FilterTypes, curFilter: Filter | null) => {
  if (!curFilter || field !== curFilter.field) return <ChevronsUpDown />;

  if (curFilter.asc) return <ChevronUp />;
  else return <ChevronDown />;
}

const GroupsList: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filter, setFilter] = useState<Filter | null>(null);

  const filterGroups = (field: FilterTypes) => {
    const newAsc = filter?.field === field ? !filter.asc : true;

    const sortedGroups = [...groups].sort((a: Group, b: Group) => {
      const aValue = (a[field] ?? '').toString();
      const bValue = (b[field] ?? '').toString();

      const comparison = aValue.localeCompare(bValue);

      return newAsc ? comparison : -comparison;
    });

    setGroups(sortedGroups);
    setFilter({ field, asc: newAsc });
  };

  useEffect(() => {
    fetchNui<Group[]>('groups', { action: 'get' }, { data: debugGroups })
    .then((r) => {
      setGroups(r);
    });
  }, []);

  return <div className="p-4">
    <h1>Groups Page</h1>

    <Table className="w-[80%] mx-auto">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead onClick={() => filterGroups('name')}>
            <div className="flex justify-center items-center gap-2">
              <span>Group</span>
              {getIconForHeader('name', filter)}
            </div>
          </TableHead>
          <TableHead onClick={() => filterGroups('label')}>
            <div className="flex justify-center items-center gap-2">
              <span>Label</span>
              {getIconForHeader('label', filter)}
            </div>
          </TableHead>
          <TableHead onClick={() => filterGroups('type')}>
            <div className="flex justify-center items-center gap-2">
              <span>Type</span>
              {getIconForHeader('type', filter)}
            </div>
          </TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group, idx) => (
          <TableRow key={idx}>
            <TableCell>{group.name}</TableCell>
            <TableCell>{group.label}</TableCell>
            <TableCell>{group.type ?? 'N/A'}</TableCell>
            <TableCell className="flex justify-center">
              <Button variant='outline'>
                <EyeIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
};

export default GroupsList;
