import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Player, Role } from "../types/player";

const roles: Role[] = ["Batsman", "Bowler", "All Rounder", "WK"];

const playerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum(roles),
  isCaptain: z.boolean(),
  isViceCaptain: z.boolean(),
  team: z.string().min(1, "Team is required")
});

type PlayerFormData = z.infer<typeof playerSchema>;

interface PlayerFormProps {
  initialData?: Player;
  onSubmit: (data: PlayerFormData) => void;
  teams: string[];
}

const PlayerForm = ({ initialData, onSubmit, teams }: PlayerFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    defaultValues: initialData || { isCaptain: false, isViceCaptain: false }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Role</label>
        <select {...register("role")}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {errors.role && <p>{errors.role.message}</p>}
      </div>
      <div>
        <label>Team</label>
        <select {...register("team")}>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
        {errors.team && <p>{errors.team.message}</p>}
      </div>
      <div>
        <label>Captain</label>
        <input type="checkbox" {...register("isCaptain")} />
      </div>
      <div>
        <label>Vice-Captain</label>
        <input type="checkbox" {...register("isViceCaptain")} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PlayerForm;
