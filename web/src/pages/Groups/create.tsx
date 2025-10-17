import { useState } from "react";
import { fetchNui } from "../../utils/fetchNui";
import GroupForm, { GroupData } from "./components/groupForm";

import { type NuiFetchResponse } from "@common/types/nuiInterface";

import { useNavigate } from "react-router-dom";

const GroupCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (group: GroupData) => {
    fetchNui<NuiFetchResponse<null>>('group', { action: 'create', data: group })
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

  return <GroupForm
    title="Create Group"
    submit={handleSubmit}
    submitError={error}
  />
}

export default GroupCreate;
