import { troubleBrewing } from "./troubleBrewing";
import { badMoonRising } from "./badMoonRising";
import { sectsAndViolets } from "./sectsAndViolets";

/* CUSTOM ICONS */
import acrobat from "../assets/roles/custom/acrobat_g.webp";
import alchemist from "../assets/roles/custom/alchemist_g.webp";
import alsaahir from "../assets/roles/custom/alsaahir_g.webp";
import amnesiac from "../assets/roles/custom/amnesiac_g.webp";
import atheist from "../assets/roles/custom/atheist_g.webp";
import balloonist from "../assets/roles/custom/balloonist_g.webp";
import banshee from "../assets/roles/custom/banshee_g.webp";
import bountyhunter from "../assets/roles/custom/bountyhunter_g.webp";
import cannibal from "../assets/roles/custom/cannibal_g.webp";
import choirboy from "../assets/roles/custom/choirboy_g.webp";
import cultleader from "../assets/roles/custom/cultleader_g.webp";
import engineer from "../assets/roles/custom/engineer_g.webp";
import farmer from "../assets/roles/custom/farmer_g.webp";
import fisherman from "../assets/roles/custom/fisherman_g.webp";
import general from "../assets/roles/custom/general_g.webp";
import highpriestess from "../assets/roles/custom/highpriestess_g.webp";
import huntsman from "../assets/roles/custom/huntsman_g.webp";
import king from "../assets/roles/custom/king_g.webp";
import knight from "../assets/roles/custom/knight_g.webp";
import lycanthrope from "../assets/roles/custom/lycanthrope_g.webp";
import magician from "../assets/roles/custom/magician_g.webp";
import nightwatchman from "../assets/roles/custom/nightwatchman_g.webp";
import noble from "../assets/roles/custom/noble_g.webp";
import pixie from "../assets/roles/custom/pixie_g.webp";
import poppygrower from "../assets/roles/custom/poppygrower_g.webp";
import preacher from "../assets/roles/custom/preacher_g.webp";
import princess from "../assets/roles/custom/princess_g.webp";
import shugenja from "../assets/roles/custom/shugenja_g.webp";
import steward from "../assets/roles/custom/steward_g.webp";
import villageidiot from "../assets/roles/custom/villageidiot_g.webp";

import damsel from "../assets/roles/custom/damsel_g.webp";
import golem from "../assets/roles/custom/golem_g.webp";
import hatter from "../assets/roles/custom/hatter_g.webp";
import heretic from "../assets/roles/custom/heretic_g.webp";
import hermit from "../assets/roles/custom/hermit_g.webp";
import ogre from "../assets/roles/custom/ogre_g.webp";
import plagueDoctor from "../assets/roles/custom/plaguedoctor_g.webp";
import politician from "../assets/roles/custom/politician_g.webp";
import puzzlemaster from "../assets/roles/custom/puzzlemaster_g.webp";
import snitch from "../assets/roles/custom/snitch_g.webp";
import zealot from "../assets/roles/custom/zealot_g.webp";
import boffin from "../assets/roles/custom/boffin_e.webp";
import boomdandy from "../assets/roles/custom/boomdandy_e.webp";
import fearmonger from "../assets/roles/custom/fearmonger_e.webp";
import goblin from "../assets/roles/custom/goblin_e.webp";
import harpy from "../assets/roles/custom/harpy_e.webp";
import marionette from "../assets/roles/custom/marionette_e.webp";
import mezepheles from "../assets/roles/custom/mezepheles_e.webp";
import organGrinder from "../assets/roles/custom/organgrinder_e.webp";
import psychopath from "../assets/roles/custom/psychopath_e.webp";
import summoner from "../assets/roles/custom/summoner_e.webp";
import vizier from "../assets/roles/custom/vizier_e.webp";
import widow from "../assets/roles/custom/widow_e.webp";
import wizard from "../assets/roles/custom/wizard_e.webp";
import wraith from "../assets/roles/custom/wraith_e.webp";
import xaan from "../assets/roles/custom/xaan_e.webp";

import alhadikhia from "../assets/roles/custom/alhadikhia_e.webp";
import kazali from "../assets/roles/custom/kazali_e.webp";
import legion from "../assets/roles/custom/legion_e.webp";
import leviathan from "../assets/roles/custom/leviathan_e.webp";
import lilmonsta from "../assets/roles/custom/lilmonsta_e.webp";
import lleech from "../assets/roles/custom/lleech_e.webp";
import lordoftyphon from "../assets/roles/custom/lordoftyphon_e.webp";
import ojo from "../assets/roles/custom/ojo_e.webp";
import riot from "../assets/roles/custom/riot_e.webp";
import yaggababble from "../assets/roles/custom/yaggababble_e.webp";

export const customScript = {
  townsfolk: [
    ...troubleBrewing.townsfolk,
    ...badMoonRising.townsfolk,
    ...sectsAndViolets.townsfolk,

    { name: "Acrobat", icon: acrobat, description: "Each night*, choose a player: if they are drunk or poisoned, or they become drunk or poisoned tonight, you die." },
    { name: "Alchemist", icon: alchemist, description: "You have a minion ability. When using this the Storryteller may prompt you to choose differently." },
    { name: "Alsaahir", icon: alsaahir, description: "Each day, if you publicly guess which players are Minion(s) and which are Demon(s), good wins." },
    { name: "Amnesiac", icon: amnesiac, description: "You do not know what your ability is. Each day, privately guess what it is: you learn how accurate you are." },
    { name: "Atheist", icon: atheist, description: "The Storyteller can break the game rules, and if executed, good wins, even if you are dead [No evil characters]." },
    { name: "Balloonist", icon: balloonist, description: "Each night, you learn a player of a different character type than last night. [+0 or +1 Outsider]" },
    { name: "Banshee", icon: banshee, description: "If the Demon kills you, all players learn this. From now on, you may nominate twice per day and vote twice per nomination." },
    { name: "Bounty Hunter", icon: bountyhunter, description: "You start knowing 1 evil player. If the player you know dies, you learn another evil player tonight. [1 Townsfolk is evil]" },
    { name: "Cannibal", icon: cannibal, description: "You have the ability of the recently killed executee. If they are evil, you are poisoned until a good player dies by execution." },
    { name: "Choirboy", icon: choirboy, description: "If the Demon kills the King, you learn which player is the Demon. [+ the King]" },
    { name: "Cult Leader", icon: cultleader, description: "Each night, you become alignment of an alive character. If all good players choose to join your cult, your team wins." },
    { name: "Engineer", icon: engineer, description: "Once per game, at night, choose which Minions or which Demon is in play." },
    { name: "Farmer", icon: farmer, description: "When you die at night, an alive good player becomes a Farmer." },
    { name: "Fisherman", icon: fisherman, description: "Once per game, during the day, visit the Storyteller for some advice to help your team win." },
    { name: "General", icon: general, description: "Each night, you learn which alignment the Storyteller believes is winning: good, evil or neither." },
    { name: "High Priestess", icon: highpriestess, description: "Each night, learn which player the Storyteller believes yoou should talk to most." },
    { name: "Huntsman", icon: huntsman, description: "Once per game, at night, choose a living player: the Damsel, if chosen, becomes a not-in-play Townsfolk. [+the Damsel]" },
    { name: "King", icon: king, description: "Each night, if the dead equal or outnumber the living, you learn 1 alive character. The Demon knows you are the King." },
    { name: "Knight", icon: knight, description: "You start knowing 2 players that are not the Demon." },
    { name: "Lycanthrope", icon: lycanthrope, description: "Each night*, choose an alive player. If good, they die & the Demon doesn't kill tonight. One good layer registers as evil." },
    { name: "Magician", icon: magician, description: "The Demon thinks you are a Minion. Minions think you are a Demon." },
    { name: "Nightwatchman", icon: nightwatchman, description: "Once per game, at night, choose a player: they learn you are the Nightwatchman." },
    { name: "Noble", icon: noble, description: "You start knowing 3 players, 1 and only 1 of which is evil." },
    { name: "Pixie", icon: pixie, description: "You start knowing 1 in-play Townsfolk. If you were mad that you were this character, you gain their ability when they die." },
    { name: "Poppygrower", icon: poppygrower, description: "Minions & Demons do not know each other. If you die, they learn who each other are that night." },
    { name: "Preacher", icon: preacher, description: "Each night, choose a player: a Minion, if chosen, learns this. All chosen Minions have no ability." },
    { name: "Princess", icon: princess, description: "On your 1st day, if you nominated & executed a player, the Demon doesn't kill tonight." },
    { name: "Shugenja", icon: shugenja, description: "You start knowing if your closest evil player is clockwise or anti-clockwise. If equidistant, this info is arbitrary." },
    { name: "Steward", icon: steward, description: "You start knowing 1 good player." },
    { name: "Village Idiot", icon: villageidiot, description: "Each night, choose a player: you learn their alignment [+0 to +2 Village Idiots. 1 of the extras is drunk]." },
  ],

  outsiders: [
    ...troubleBrewing.outsiders,
    ...badMoonRising.outsiders,
    ...sectsAndViolets.outsiders,

    { name: "Damsel", icon: damsel, description: "All minions know a Damsel is in play. If a Minion publicly guesses you (once), your team loses." },
    { name: "Golem", icon: golem, description: "You may only nominate once per game. When you do, if the nominee is not the Demon, they die." },
    { name: "Hatter", icon: hatter, description: "If you died today or tonight, the Minion & Demon players may choose new Minion & Demon characters to be." },
    { name: "Heretic", icon: heretic, description: "Whoever wins, loses & whoever loses, wins, even if you are dead." },
    { name: "Hermit", icon: hermit, description: "You have all Outsider abilities. [-0 or -1 Outsider]" },
    { name: "Ogre", icon: ogre, description: "On your 1st night, choose a player (not youself): you become their alignment (you don't know which) even if drunk or poisoned." },
    { name: "Plague Doctor", icon: plagueDoctor, description: "When you die, the Storyteller gains a Minion ability." },
    { name: "Politician", icon: politician, description: "If you were the player most responsible for your team losing, you change alignment & win, even if dead." },
    { name: "Puzzlemaster", icon: puzzlemaster, description: "1 player is drunk, even if you die. If you guess (once) who it is, learn the Demon player, but guess wrong & get false info." },
    { name: "Snitch", icon: snitch, description: "Each Minion gets 3 bluffs." },
    { name: "Zealot", icon: zealot, description: "If there are 5 or more players alive, you must vote for every nomination." },
  ],

  minions: [
    ...troubleBrewing.minions,
    ...badMoonRising.minions,
    ...sectsAndViolets.minions,

    { name: "Boffin", icon: boffin, description: "The Demon (even if drunk or poisoned) has a not-in-play good character's ability. You both know which." },
    { name: "Boomdandy", icon: boomdandy, description: "If you are executed, all but 3 players die. After a 10 to 1 countdown, the player with the most players pointing at them, dies." },
    { name: "Fearmonger", icon: fearmonger, description: "Each night, choose a player: if you nominate & execute them, their team loses. All players know if you choose a new player." },
    { name: "Goblin", icon: goblin, description: "If you publicly claim to be the Goblin when nominated & are executed that day, your team wins." },
    { name: "Harpy", icon: harpy, description: "Each night, choose 2 players: tommorow, the 1st player is mad that the 2nd is evil, or one or both might die." },
    { name: "Marionette", icon: marionette, description: "You think you are a good character, but you are not. The Demon knows who you are. [You neighbor the Demon]" },
    { name: "Mezepheles", icon: mezepheles, description: "You start knowing a secret word. The 1st good player to say this word becomes evil that night." },
    { name: "Organ Grinder", icon: organGrinder, description: "All players keep their eyes closed when voting and the voting and the vote tally is secret. Each night, choose if you are drunk until dusk." },
    { name: "Psychopath", icon: psychopath, description: "Each day, before nominationsm, you may publicly choose a player, they die. If executed, you only die if you lose rock-paper-scissors." },
    { name: "Summoner", icon: summoner, description: "You get 3 bluffs. On the 3rd night, choose a player: they become an evil Demon of your choice. [No Demon]" },
    { name: "Vizier", icon: vizier, description: "All players know you are the Vizier. You cannot die during the day. If good voted, you may choose to execute immediately." },
    { name: "Widow", icon: widow, description: "On your 1st night, look at the Grimoire & choose a player: they are poisoned. 1 good player knows a Widow is in play." },
    { name: "Wizard", icon: wizard, description: "Once per game, choose to make a wish. If granted, it might have a price & leave a clue as to its nature." },
    { name: "Wraith", icon: wraith, description: "You may choose to open your eyes at night at any moment. You are woken when other evil players do." },
    { name: "Xaan", icon: xaan, description: "On night X, all Townsfolk are poisoned unitl dusk. [X Outsiders]" },
  ],

  demon: [
    ...troubleBrewing.demon,
    ...badMoonRising.demon,
    ...sectsAndViolets.demon,
    { name: "Alhadikhia", icon: alhadikhia, description: "Each night*, you may choose 3 players (all players learn who): each silently chooses to live or die, but if all live, all die." },
    { name: "Kazali", icon: kazali, description: "Each night*, choose a player: they die. [You choose which players are which Minions. -? to +? Outsiders]" },
    { name: "Legion", icon: legion, description: "Each night*, a player might die. Executions fail if only evil voted. You register as a Minion too. [Most players are Legion]" },
    { name: "Leviathan", icon: leviathan, description: "If more than 1 good player is executed, evil wins. All players know you are in play. After day 5, evil wins." },
    { name: "Lil' Monsta", icon: lilmonsta, description: "Each night, Minions choose who babysits Lil'Monsta & is the Demon. Each night*, a player might die. [+1 Minion]" },
    { name: "Lleech", icon: lleech, description: "Each night*, choose a player: they die. You start by choosing a player: they are poisoned. You die if & only if they are dead." },
    { name: "Lord of Typhon", icon: lordoftyphon, description: "Each night*, choose a player: they die. [Evil characters are in a line. You are in the middle. +1 Minion. -? to +? Outsiders]" },
    { name: "Ojo", icon: ojo, description: "Each night*, choose a character: they die. If they are not in play, the Storyteller chooses who dies." },
    { name: "Riot", icon: riot, description: "On day 3, Minions become Riot & nominees die but nominate an alive player immediately. This must happen." },
    { name: "Yaggababble", icon: yaggababble, description: "You start knowing a secret phrase. For each tiem you said it publicly today, a player might die." },
  ],
};