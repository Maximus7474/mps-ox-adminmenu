import GroupForm from "./components/groupForm";

const GroupCreate = () => {
  return <GroupForm title="Create Group" submit={(group) => alert(`Submitted: \n ${JSON.stringify(group, null, 4)}`)} submitError="Demo Error message for the system"/>
}

export default GroupCreate;
