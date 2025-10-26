import OnlinePlayersList from "./connected-list";
import PlayerView from "./player-view";
import PlayerSearch from "./search-users";

// format key value pairs, key being inner path to element
export default {
  'view': OnlinePlayersList,
  'search': PlayerSearch,
  'view/:userid': PlayerView,
  // 'view/:userid/character/:charid': CharacterView,
};
