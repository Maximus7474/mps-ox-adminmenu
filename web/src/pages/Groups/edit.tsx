import { useEffect, useState } from "react";
import { fetchNui } from "../../utils/fetchNui";
import GroupForm from "./components/groupForm";

import { type NuiFetchResponse } from "@common/types/nuiInterface";

import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Loader } from "lucide-react";
import { ButtonGroup } from "../../components/ui/button-group";
import { Button } from "../../components/ui/button";
import { GroupDataDto } from "./types/groupDataDto";
import { debugGroupDataDto } from "../../debugdata/groups";

const GroupEdit = () => {
  const { groupName } = useParams();
  const navigate = useNavigate();

  const [groupData, setGroupData] = useState<GroupDataDto>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNui<GroupDataDto | null>('groups', { action: 'edit', name: groupName }, { data: debugGroupDataDto, delay: 1_000 })
    .then(response => {
      if (response) {
        setGroupData(response);
      }
    })
    .finally(() => setLoading(false));
  },[]);

  const handleSubmit = (group: GroupDataDto) => {
    fetchNui<NuiFetchResponse<null>>('group', { action: 'update', data: group })
    .then(response => {
      if (response.success) {
        navigate(`/groups/view/${group.name}/`);
      } else {
        setError(response.error);
      }
    })
    .catch((err) => {
      setError((err as Error).message);
    });
  };

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

  return <GroupForm
    title="Edit Group"
    submit={handleSubmit}
    group={groupData}
    submitError={error}
  />
}

export default GroupEdit;
