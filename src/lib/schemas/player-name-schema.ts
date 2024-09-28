import { z } from "zod";

const playerNameSchema = z.object({
  playerName: z.string().regex(/^\S+$/, {
    message: "Player name must not contain spaces",
  }),
});

type PlayerNameSchemaType = z.infer<typeof playerNameSchema>;

export { playerNameSchema };
export { type PlayerNameSchemaType };
