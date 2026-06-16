import washerwoman from "../assets/roles/tb/washerwoman_g.webp";
import librarian from "../assets/roles/tb/librarian_g.webp";
import investigator from "../assets/roles/tb/investigator_g.webp";
import chef from "../assets/roles/tb/chef_g.webp";
import empath from "../assets/roles/tb/empath_g.webp";
import fortuneTeller from "../assets/roles/tb/fortuneteller_g.webp";
import undertaker from "../assets/roles/tb/undertaker_g.webp";
import monk from "../assets/roles/tb/monk_g.webp";
import ravenkeeper from "../assets/roles/tb/ravenkeeper_g.webp";
import virgin from "../assets/roles/tb/virgin_g.webp";
import slayer from "../assets/roles/tb/slayer_g.webp";
import soldier from "../assets/roles/tb/soldier_g.webp";
import mayor from "../assets/roles/tb/mayor_g.webp";

import butler from "../assets/roles/tb/butler_g.webp";
import drunk from "../assets/roles/tb/drunk_g.webp";
import recluse from "../assets/roles/tb/recluse_g.webp";
import saint from "../assets/roles/tb/saint_g.webp";

import poisoner from "../assets/roles/tb/poisoner_e.webp";
import spy from "../assets/roles/tb/spy_e.webp";
import scarletWoman from "../assets/roles/tb/scarletwoman_e.webp";
import baron from "../assets/roles/tb/baron_e.webp";

import imp from "../assets/roles/tb/imp_e.webp";

export const troubleBrewing = {
  townsfolk: [
    {
      name: "Washerwoman",
      icon: washerwoman,
      description:
        "You start knowing that 1 of 2 players is a particular Townsfolk.",
    },
    {
      name: "Librarian",
      icon: librarian,
      description:
        "You start knowing that 1 of 2 players is a particular Outsider. (Or that zero are in play)",
    },
    {
      name: "Investigator",
      icon: investigator,
      description:
        "You start knowing that 1 of 2 players is a particular Minion.",
    },
    {
      name: "Chef",
      icon: chef,
      description:
        "You start knowing how many pairs of evil players there are.",
    },
    {
      name: "Empath",
      icon: empath,
      description:
        "Each night, you learn how many of your 2 alive neighbours are evil.",
    },
    {
      name: "Fortune Teller",
      icon: fortuneTeller,
      description:
        "Each night, choose 2 players, you learn if one of them is the Demon. There is a good player that registers as a Demon to you.",
    },
    {
      name: "Undertaker",
      icon: undertaker,
      description:
        "Each night*, you learn which character was executed today.",
    },
    {
      name: "Monk",
      icon: monk,
      description:
        "Each night*, choose a player (not yourself), they are safe from the Demon tonight.",
    },
    {
      name: "Ravenkeeper",
      icon: ravenkeeper,
      description:
        "If you die at night, you choose a player, you learn their character.",
    },
    {
      name: "Virgin",
      icon: virgin,
      description:
        "The 1st time you are nominated, if the nominator is a Townsfolk, they are executed immediately.",
    },
    {
      name: "Slayer",
      icon: slayer,
      description:
        "Once per game, during the day, publicly choose a player. If they are the Demon, they die.",
    },
    {
      name: "Soldier",
      icon: soldier,
      description: "You are safe from the Demon.",
    },
    {
      name: "Mayor",
      icon: mayor,
      description:
        "If only 3 players live and no execution happens, your team wins. If you die at night, another player might die instead",
    },
  ],

  outsiders: [
    {
      name: "Butler",
      icon: butler,
      description:
        "Each night, choose a player (not yourself). Tommorow you can only vote if they are voting too.",
    },
    {
      name: "Drunk",
      icon: drunk,
      description:
        "You don't know that you are drunk. Your ability is wrong.",
    },
    {
      name: "Recluse",
      icon: recluse,
      description:
        "You might register as evil & as a Minion or Demon, even if dead",
    },
    {
      name: "Saint",
      icon: saint,
      description:
        "If you are executed, your team loses.",
    },
  ],

  minions: [
    {
      name: "Poisoner",
      icon: poisoner,
      description:
        "Each night, choose a player, they are poisoned tonight and tommorow day.",
    },
    {
      name: "Spy",
      icon: spy,
      description:
        "You see the Grimoire every night. You may register as good & as a Townsfolk or Outsider, even if dead.",
    },
    {
      name: "Scarlet Woman",
      icon: scarletWoman,
      description:
        "If the Demon dies and 5+ players are alive, you become the Demon.",
    },
    {
      name: "Baron",
      icon: baron,
      description:
        "There are 2 extra Outsiders in play.",
    },
  ],

  demon: [
    {
      name: "Imp",
      icon: imp,
      description:
        "Each night*, choose a player: they die. If you kill youself this way, a Minion becomes the Imp.",
    },
  ],
};