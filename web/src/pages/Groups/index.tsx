import GroupCreate from "./create";
import GroupsList from "./list";
import GroupView from "./view";

// format key value pairs, key being inner path to element
export default {
  'view': GroupsList,
  'create': GroupCreate,
  'view/:groupName': GroupView,
};
