import { useEffect, useState } from "react";
import { fetchNui } from "../../utils/fetchNui";
import { PlayerCharacterShort, type PlayerRecap } from "@common/types/players";
import { useNavigate, useParams } from "react-router-dom";
import { debugPlayerRecap } from "../../debugdata";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { CheckIcon, Loader, TriangleAlert, X } from "lucide-react";
import { ButtonGroup } from "../../components/ui/button-group";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { formatDate, formatTimeDifference } from "../../utils/misc";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

const displayLastPlayed = (characters: PlayerCharacterShort[]) => {
  let latestDate = characters[0].lastPlayed;

  for (let i = 1; i < characters.length; i++) {
    if (latestDate < characters[i].lastPlayed) {
      latestDate = characters[i].lastPlayed
    }
  }

  return `${formatDate(latestDate * 1_000)} (${formatTimeDifference(latestDate * 1_000)})`;
}

const PlayerView = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [player, setPlayer] = useState<PlayerRecap>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNui<PlayerRecap | null>('player', { action: 'get', userid }, { data: debugPlayerRecap, delay: 1_000 })
    .then((r) => {
      if (r) setPlayer(r);
    })
    .finally(() => setLoading(false));
  }, []);

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
            <Button variant='outline' onClick={() => navigate('/players/search/')}>Player search</Button>
            <Button variant='outline' onClick={() => navigate('/')}>Homepage</Button>
          </ButtonGroup>
        </AlertDescription>
      </Alert>
    </div>
  }

  if (!player) {
    return <div className="mt-4 mx-auto w-[40%] text-start">
      <Alert variant="destructive">
        <AlertTitle>
          <h1 className="text-xl text-center">No player was found</h1>
        </AlertTitle>
        <AlertDescription className="flex flex-col items-center mt-2 pt-2 border-t-2 border-destructive/25">
          <p className="text-center">Return to</p>
          <ButtonGroup>
            <Button variant='outline' onClick={() => navigate('/players/search/')}>Group List</Button>
            <Button variant='outline' onClick={() => navigate('/')}>Homepage</Button>
          </ButtonGroup>
        </AlertDescription>
      </Alert>
    </div>
  }

  return <div className="p-4">
    {/* <div className="flex flex-row-reverse gap-2 items-center">
      <ButtonGroup>
        <Button variant='outline' onClick={() => navigate('/players/search')}>Search</Button>
        <Button variant='outline' onClick={() => navigate('/')}>Homepage</Button>
      </ButtonGroup>
      <p>Back to</p>
    </div> */}
    
    <div className="grid grid-cols-2 gap-4 max-h-full">
      <div>
        <h2 className="text-lg font-bold">Details</h2>
        
        <p>Username: {player.username}</p>
        <p>Last played: {displayLastPlayed(player.characters)}</p>

        <Separator className="my-2" />

        <h3 className="font-bold">Identifiers</h3>
        <p>License2: {player.license2}</p>
        <p>Steam: {player.steam ?? 'not found'}</p>
        <p>Discord: {player.discord ?? 'not found'}</p>

        {player.banned && (<>
          <Separator className="my-2" />

          <div className="flex flex-row gap-2">
            <TriangleAlert color="red" />
            <h3 className="font-bold items-center">Player is Banned</h3>
          </div>
          
          <p>Reason: {player.banned.reason}</p>
          <p>Banned on: {formatDate(player.banned.banned_at * 1000)} ({formatTimeDifference(player.banned.banned_at * 1000)})</p>
          {player.banned.unban_at
            ? <p>Unbanned on: {formatDate(player.banned.unban_at * 1000)} ({formatTimeDifference(player.banned.unban_at * 1000)})</p>
            : <p>Permanent.</p>
          }
        </>)}
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-bold">Characters</h2>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {player.characters.map((char, idx) => (
            <AccordionItem value={char.stateId} key={idx}>
              <AccordionTrigger>{char.fullName}</AccordionTrigger>
              <AccordionContent>
                <p>Character ID: {char.charId}</p>
                <p>State ID: {char.stateId}</p>
                <p>Gender: {char.gender}</p>
                <div className="flex flex-row gap-2 items-center">
                  <p>Deleted:</p>
                  {char.deleted ? <CheckIcon color="red" /> : <X color="green" />}
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p>Is dead:</p>
                  {char.isDead ? <CheckIcon color="red" /> : <X color="green" />}
                </div>
                <p>Last played: {displayLastPlayed([char])}</p>

                <Separator className="my-2"/>

                <div className="flex justify-center">
                  <Button variant='outline' onClick={() => navigate(`/players/${userid}/character/${char.charId}`)}>
                    View Character
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </div>
};

export default PlayerView;
