import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { ButtonGroup } from "../../components/ui/button-group";
import { Check, Loader, X } from "lucide-react";

import { type OxGroup } from "@common/types/ox_types";
import { fetchNui } from "../../utils/fetchNui";

const debugGrades: OxGroup['grades'] = [];

for (let i = 6; i <= 15; i++) {
  debugGrades.push({ label: `Grade ${i}`, accountRole: 'owner' });
}

const debugGroup: OxGroup = {
  name: 'generic_name',
  label: 'Generic thing',
  grades: [
    { label: 'Grade 1' },
    { label: 'Grade 2', accountRole: 'viewer' },
    { label: 'Grade 3', accountRole: 'contributor' },
    { label: 'Grade 4', accountRole: 'manager' },
    { label: 'Grade 5', accountRole: 'owner' },
    ...debugGrades
  ],
  type: 'job',
  hasAccount: true,
  colour: 123
}

const GroupView = () => {
  const { groupName } = useParams();
  const navigate = useNavigate();

  const [groupData, setGroupData] = useState<OxGroup>();
  const [loading, setLoading] = useState<boolean>(true);

  /* 
  * @ToDo:
  * - Add current group balance (if applicable)
  * - Add current players within the groupe
  */
  useEffect(() => {
    fetchNui<OxGroup | null>('groups', { action: 'fetch', data: groupName }, { data: debugGroup })
    .then(response => {
      if (response) {
        setGroupData(response);
      }
    })
    .finally(() => setLoading(false));
  }, [groupName]);

  if (loading) {
    return <div className="mt-4 mx-auto w-[40%] text-start">
      <Alert variant="default">
        <AlertTitle>
          <h1 className="text-xl text-center">Loading Data</h1>
        </AlertTitle>
        <AlertDescription className="flex flex-col items-center mt-2 pt-2 border-t-2 border-current/25">
          <Loader className="animate-spin my-2"/>
          <p className="text-center">Return to</p>
          <ButtonGroup>
            <Button variant='outline' onClick={() => navigate('/groups/view/')}>Group List</Button>
            <Button variant='outline' onClick={() => navigate('/')}>Homepage</Button>
          </ButtonGroup>
        </AlertDescription>
      </Alert>
    </div>
  }

  if (!groupData) {
    return <div className="mt-4 mx-auto w-[40%] text-start">
      <Alert variant="destructive">
        <AlertTitle>
          <h1 className="text-xl text-center">No group was found</h1>
        </AlertTitle>
        <AlertDescription className="flex flex-col items-center mt-2 pt-2 border-t-2 border-destructive/25">
          <p className="text-center">Return to</p>
          <ButtonGroup>
            <Button variant='outline' onClick={() => navigate('/groups/view/')}>Group List</Button>
            <Button variant='outline' onClick={() => navigate('/')}>Homepage</Button>
          </ButtonGroup>
        </AlertDescription>
      </Alert>
    </div>
  }

  return <div className="h-full flex flex-col">
    <h1 className="pl-4 text-xl font-bold">Group Information: "<code>{groupData.name}</code>"</h1>
    <div className="p-6 grid grid-cols-2 gap-4 flex-grow overflow-y-auto">
      <div className="space-y-4">
        <div>
          <p className="font-bold">Name:</p>
          <p className="pl-1">{groupData.name}</p>
        </div>
        <div>
          <p className="font-bold">Label:</p>
          <p className="pl-1">{groupData.label}</p>
        </div>
        <div>
          <p className="font-bold">Type:</p>
          {groupData.type
            ? <p className="pl-1">{groupData.type}</p>
            : <p className="pl-1">No Type defined</p>
          }
        </div>
        <div className="flex gap-2">
          <p className="font-bold">Has a bank account:</p>
          {groupData.hasAccount
            ? <Check color="green" />
            : <X color="red" />
          }
        </div>
        {groupData.colour && (
          <div>
            <p className="font-bold">Colour:</p>
            <code className="pl-1">{groupData.colour}</code>
          </div>
        )}
      </div>
      <div>
        <p className="font-bold">Grades</p>

        <div className="space-y-2 mt-2">
          {groupData.grades.map((grade, idx) => (
            <div key={idx}>
              <div className="flex flex-row gap-2">
                <p className="w-4">{idx}.</p>
                <p>{grade.label}</p>
              </div>
              <p className="ml-6">{grade.accountRole
                ? `Account role: ${grade.accountRole}`
                : `No account role`
              }</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <ButtonGroup className="m-4">
      <Button variant='outline' onClick={() => navigate(`/groups/edit/${groupData.name}/`)}>Edit</Button>
      <Button variant='outline' onClick={() => navigate('/groups/view')}>Back</Button>
    </ButtonGroup>
  </div>
}

export default GroupView;
