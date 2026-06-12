import { troubleBrewing } from "./troubleBrewing";
import { badMoonRising } from "./badMoonRising";
import { sectsAndViolets } from "./sectsAndViolets";

export const customScript = {
  townsfolk: [
    ...troubleBrewing.townsfolk,
    ...badMoonRising.townsfolk,
    ...sectsAndViolets.townsfolk,
  ],
  outsiders: [
    ...troubleBrewing.outsiders,
    ...badMoonRising.outsiders,
    ...sectsAndViolets.outsiders,
  ],
  minions: [
    ...troubleBrewing.minions,
    ...badMoonRising.minions,
    ...sectsAndViolets.minions,
  ],
  demon: [
    ...troubleBrewing.demon,
    ...badMoonRising.demon,
    ...sectsAndViolets.demon,
  ],
};