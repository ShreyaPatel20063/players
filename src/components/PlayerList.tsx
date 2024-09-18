import { Player } from "../types/player";

interface PlayerListProps {
  players: Player[];
  onEdit: (player: Player) => void;
}

const PlayerList = ({ players, onEdit }: PlayerListProps) => {
  return (
    <div>
      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <strong>{player.name}</strong> - {player.role} ({player.team}){" "}
            {player.isCaptain && "(Captain)"} {player.isViceCaptain && "(Vice-Captain)"}
            <button onClick={() => onEdit(player)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
