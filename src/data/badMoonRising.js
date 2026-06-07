import grandmother from "../assets/roles/bmr/grandmother_g.webp";
import sailor from "../assets/roles/bmr/sailor_g.webp";
import chambermaid from "../assets/roles/bmr/chambermaid_g.webp";
import exorcist from "../assets/roles/bmr/exorcist_g.webp";
import innkeeper from "../assets/roles/bmr/innkeeper_g.webp";
import gambler from "../assets/roles/bmr/gambler_g.webp";
import gossip from "../assets/roles/bmr/gossip_g.webp";
import courtier from "../assets/roles/bmr/courtier_g.webp";
import professor from "../assets/roles/bmr/professor_g.webp";
import minstrel from "../assets/roles/bmr/minstrel_g.webp";
import teaLady from "../assets/roles/bmr/tealady_g.webp";
import pacifist from "../assets/roles/bmr/pacifist_g.webp";
import fool from "../assets/roles/bmr/fool_g.webp";

import goon from "../assets/roles/bmr/goon_g.webp";
import lunatic from "../assets/roles/bmr/lunatic_g.webp";
import tinker from "../assets/roles/bmr/tinker_g.webp";
import moonchild from "../assets/roles/bmr/moonchild_g.webp";

import godfather from "../assets/roles/bmr/godfather_e.webp";
import devilsAdvocate from "../assets/roles/bmr/devilsadvocate_e.webp";
import assassin from "../assets/roles/bmr/assassin_e.webp";
import mastermind from "../assets/roles/bmr/mastermind_e.webp";

import zombuul from "../assets/roles/bmr/zombuul_e.webp";
import pukka from "../assets/roles/bmr/pukka_e.webp";
import shabaloth from "../assets/roles/bmr/shabaloth_e.webp";
import po from "../assets/roles/bmr/po_e.webp";

export const badMoonRising = {
  townsfolk: [
    {
      name: "Grandmother",
      icon: grandmother,
      description:
        "You start knowing a good player & their character. If the Demon kills them, you die too.",
    },
    {
      name: "Sailor",
      icon: sailor,
      description:
        "Each night, choose a living player, one of you is drunk until dusk. You can not die.",
    },
    {
      name: "Chambermaid",
      icon: chambermaid,
      description:
        "Each night, choose 2 alive players (not yourself): you learn how many woke tonight due to their ability.",
    },
    {
      name: "Exorcist",
      icon: exorcist,
      description:
        "Each night*, choose a player: the Demon, if chosen, learns who you are then doesn't wake tonight.",
    },
    {
      name: "Innkeeper",
      icon: innkeeper,
      description:
        "Each night*, choose 2 players: they can not die tonight, but 1 is drunk until dusk.",
    },
    {
      name: "Gambler",
      icon: gambler,
      description:
        "Each night*, choose a player & guess their character. If you guess wrong, you die.",
    },
    {
      name: "Gossip",
      icon: gossip,
      description:
        "Each day, make a public statement. Tonight, if true, someone dies tonight.",
    },
    {
      name: "Courtier",
      icon: courtier,
      description:
        "Once per game, at night, choose a character, they are drunk for 3 nights & 3 days.",
    },
    {
      name: "Professor",
      icon: professor,
      description:
        "Once per game, at night*, choose a dead player, if they are Townsfolk, they are ressurected.",
    },
    {
      name: "Minstrel",
      icon: minstrel,
      description:
        "When a Minion dies by execution, all players become drunk until dusk tomorrow.",
    },
    {
      name: "Tea Lady",
      icon: teaLady,
      description:
        "If both your alive neighbors are good, they cannot die.",
    },
    {
      name: "Pacifist",
      icon: pacifist,
      description:
        "Executed good players might not die.",
    },
    {
      name: "Fool",
      icon: fool,
      description:
        "The first time you die, you don't.",
    },
  ],

  outsiders: [
    {
      name: "Goon",
      icon: goon,
      description:
        "Each night, the first player who choose you with their ability is drunk until dusk. You become their alignment.",
    },
    {
      name: "Lunatic",
      icon: lunatic,
      description:
        "You think you are the Demon, but you are not. The Demon knows who you are & who you choose at night.",
    },
    {
      name: "Tinker",
      icon: tinker,
      description:
        "You might die at any time.",
    },
    {
      name: "Moonchild",
      icon: moonchild,
      description:
        "When you learn that you died, publicly choose 1 alive player. Tonight if it was a good player, they die.",
    },
  ],

  minions: [
    {
      name: "Godfather",
      icon: godfather,
      description:
        "You know which Outsiders are in play. If 1 died today, choose a player tonight, they die. [-1 or +1 Outsider]",
    },
    {
      name: "Devil's Advocate",
      icon: devilsAdvocate,
      description:
        "Each night*, choose a living player (different to last night): if executed tommorow, they don't die.",
    },
    {
      name: "Assassin",
      icon: assassin,
      description:
        "Once per game, at night*, choose a player: they die, even if for some reason they could not.",
    },
    {
      name: "Mastermind",
      icon: mastermind,
      description:
        "If the Demon dies by execution (ending the game), play for 1 more day. If a player is then executed, their team loses.",
    },
  ],

  demon: [
    {
      name: "Zombuul",
      icon: zombuul,
      description:
        "Each night*, if no-one died today, choose a player: they die. The 1st time you die, you live but register as dead.",
    },
    {
      name: "Pukka",
      icon: pukka,
      description:
        "Each night, choose a player: they are poisoned. The previously poisoned player dies then becomes healthy.",
    },
    {
      name: "Shabaloth",
      icon: shabaloth,
      description:
        "Each night*, choose 2 players: they die. A dead player you chose last night might be regurgitated",
    },
    {
      name: "Po",
      icon: po,
      description:
        "Each night*, you may choose a player: they die. If your last choice was no-one, choose 3 players tonight.",
    },
  ],
};