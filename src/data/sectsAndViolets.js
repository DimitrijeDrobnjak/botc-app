import clockmaker from "../assets/roles/snv/clockmaker_g.webp";
import dreamer from "../assets/roles/snv/dreamer_g.webp";
import snakeCharmer from "../assets/roles/snv/snakecharmer_g.webp";
import mathematician from "../assets/roles/snv/mathematician_g.webp";
import flowergirl from "../assets/roles/snv/flowergirl_g.webp";
import townCrier from "../assets/roles/snv/towncrier_g.webp";
import oracle from "../assets/roles/snv/oracle_g.webp";
import savant from "../assets/roles/snv/savant_g.webp";
import seamstress from "../assets/roles/snv/seamstress_g.webp";
import philosopher from "../assets/roles/snv/philosopher_g.webp";
import artist from "../assets/roles/snv/artist_g.webp";
import juggler from "../assets/roles/snv/juggler_g.webp";
import sage from "../assets/roles/snv/sage_g.webp";

import mutant from "../assets/roles/snv/mutant_g.webp";
import sweetheart from "../assets/roles/snv/sweetheart_g.webp";
import barber from "../assets/roles/snv/barber_g.webp";
import klutz from "../assets/roles/snv/klutz_g.webp";

import evilTwin from "../assets/roles/snv/eviltwin_e.webp";
import witch from "../assets/roles/snv/witch_e.webp";
import cerenovus from "../assets/roles/snv/cerenovus_e.webp";
import pitHag from "../assets/roles/snv/pithag_e.webp";

import fangGu from "../assets/roles/snv/fanggu_e.webp";
import vigormortis from "../assets/roles/snv/vigormortis_e.webp";
import noDashii from "../assets/roles/snv/nodashii_e.webp";
import vortox from "../assets/roles/snv/vortox_e.webp";

export const sectsAndViolets = {
  townsfolk: [
    {
      name: "Clockmaker",
      icon: clockmaker,
      description:
        "You start knowing how many steps are between the Demon and the closest Minion.",
    },
    {
      name: "Dreamer",
      icon: dreamer,
      description:
        "Each night, choose a player: you learn 1 good and 1 evil character, 1 of which is correct.",
    },
    {
      name: "Snake Charmer",
      icon: snakeCharmer,
      description:
        "Each night, choose a player: a chosen Demon swaps characters & aligments with you & is then poisoned.",
    },
    {
      name: "Mathematician",
      icon: mathematician,
      description:
        "Each night, you learn how many players abilities worked abnormally (since dawn) due to another character's ability.",
    },
    {
      name: "Flowergirl",
      icon: flowergirl,
      description:
        "Each night*, you learn if the Demon voted today.",
    },
    {
      name: "Town Crier",
      icon: townCrier,
      description:
        "Each night*, you learn if a Minion nominated today.",
    },
    {
      name: "Oracle",
      icon: oracle,
      description:
        "Each night*, you learn how many dead players are evil.",
    },
    {
      name: "Savant",
      icon: savant,
      description:
        "Each day, you may visit the Storyteller to learn 2 things in private: 1 is true & 1 is false.",
    },
    {
      name: "Seamstress",
      icon: seamstress,
      description:
        "Once per game, at night, choose 2 players (not yourself): you learn if they are the same aligment.",
    },
    {
      name: "Philosopher",
      icon: philosopher,
      description:
        "Once per game, at night, choose a good character: gain that ability. If this character is in play, they are drunk.",
    },
    {
      name: "Artist",
      icon: artist,
      description:
        "Once per game, privately ask the Storyteller any yes/no question.",
    },
    {
      name: "Juggler",
      icon: juggler,
      description:
        "On your first day, publicly guess 5 players characters. That night, you learn how many you got correct.",
    },
    {
      name: "Sage",
      icon: sage,
      description:
        "If the Demon kills you, you learn that it is 1 of 2 players.",
    },
  ],

  outsiders: [
    {
      name: "Mutant",
      icon: mutant,
      description:
        "If you are mad about being an Outsider, you might be executed.",
    },
    {
      name: "Sweetheart",
      icon: sweetheart,
      description:
        "When you die, one player is drunk from now on.",
    },
    {
      name: "Barber",
      icon: barber,
      description:
        "If you died today or tonight, the Demon may choose 2 players (not another Demon) to swap characters.",
    },
    {
      name: "Klutz",
      icon: klutz,
      description:
        "When you learn you died, you must publicly choose 1 alive player. If they are evil, your team loses.",
    },
  ],

  minions: [
    {
      name: "Evil Twin",
      icon: evilTwin,
      description:
        "You & an opposing player know each other. If the good player is executed, evil wins. Good can't win if you both live.",
    },
    {
      name: "Witch",
      icon: witch,
      description:
        "Each night, choose a player: if they nominate tomorrow, they die. If just 3 players are alive, you lose this ability.",
    },
    {
      name: "Cerenovus",
      icon: cerenovus,
      description:
        "Each night, choose a player & a good character: they must be mad about being this character tommorow, or might be executed.",
    },
    {
      name: "Pit-Hag",
      icon: pitHag,
      description:
        "Each night*, choose a player & a character they become (if not in play). If a Demon is made, death tonight are arbitrary.",
    },
  ],

  demon: [
    {
      name: "Fang Gu",
      icon: fangGu,
      description:
        "Each night*, choose a player: they die. The 1st Outsider you kills becomes an evil Fang Gu & you die instead. [+1 Outsider]",
    },
    {
      name: "Vigormortis",
      icon: vigormortis,
      description:
        "Each night*, choose a player: they die. Minions you kill keep their ability & poison 1 Townsfolk neighbour. [-1 Outsider]",
    },
    {
      name: "No Dashii",
      icon: noDashii,
      description:
        "Each night*, choose a player: they die. Your 2 Townsfolk neighbours are poisoned.",
    },
    {
      name: "Vortox",
      icon: vortox,
      description:
        "Each night*, choose a player: they die. Townsfolk abilities yield false info. Each day, if no-one is executed evil wins.",
    },
  ],
};