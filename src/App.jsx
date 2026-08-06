import { useState, useEffect, useRef } from "react";

import { troubleBrewing } from "./data/troubleBrewing";
import { badMoonRising } from "./data/badMoonRising";
import { sectsAndViolets } from "./data/sectsAndViolets";
import { customScript } from "./data/custom";

import ccc from "./assets/ccc.png";
import botcText from "./assets/botctext.webp"

import tbLogo from "./assets/editions/tb_logo.webp";
import bmrLogo from "./assets/editions/bmr_logo.webp";
import snvLogo from "./assets/editions/snv_logo.webp";
import customLogo from "./assets/editions/custom_logo.webp";

import circle from "./assets/grimoire/circle.png";
import reminderToken from "./assets/grimoire/reminderToken.png";
import trashEmoji from "./assets/grimoire/trashEmoji.jpg";
import deathMark from "./assets/grimoire/death.png";

import b_snv from "./assets/backgrounds/b_snv.png";
import b_bmr from "./assets/backgrounds/b_bmr.png";
import b_tb from "./assets/backgrounds/b_tb.png";
import b_custom from "./assets/backgrounds/b_custom.png";
import gameTable from "./assets/backgrounds/game.png"

import tbSheet from "./assets/sheets/tb_script.png";
import bmrSheet from "./assets/sheets/bmr_script.png";
import snvSheet from "./assets/sheets/snv_script.png";
import playerCountImage from "./assets/sheets/playerCount.jpeg";
import drunkIcon from "./assets/roles/tb/drunk_g.webp";

export default function App() {
  
  const [screen, setScreen] = useState("menu");
  const [script, setScript] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [showAllRolesMenu, setShowAllRolesMenu] = useState(false);
  const [gamePhase, setGamePhase] = useState("menu");
  const [assignedRoles, setAssignedRoles] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showNightOrder, setShowNightOrder] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [drunkEnabled, setDrunkEnabled] = useState(0);
  const [reminderPositions, setReminderPositions] = useState({});
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [tokenPositions, setTokenPositions] = useState({});
  const [pendingRoles, setPendingRoles] = useState([]);
const [customOrderPicks, setCustomOrderPicks] = useState([]);
  const [dragging, setDragging] = useState({ id: null, type: null });
  const [playerStatus, setPlayerStatus] = useState({});
  const [showCharacterSheet, setShowCharacterSheet] = useState(false);
  const [jugglerMap, setJugglerMap] = useState({});
    const [oracleMap, setOracleMap] = useState({});
  const [mathematicianMap, setMathematicianMap] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [temporaryRoles, setTemporaryRoles] = useState([]);
  const [moved, setMoved] = useState(false);
  const [showBluffs, setShowBluffs] = useState(false);
const [showBluffRolePicker, setShowBluffRolePicker] = useState(false);
const [activeBluffIndex, setActiveBluffIndex] = useState(null);
const [bluffs, setBluffs] = useState([null, null, null]);
  const [tokenMark, setTokenMark] = useState({});
  const [showPromptMenu, setShowPromptMenu] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [customReminders, setCustomReminders] = useState([]);
  const [deletedReminders, setDeletedReminders] = useState([]);
  const [reminderRoles, setReminderRoles] = useState([]);
  const [overTrash, setOverTrash] = useState(false);
  const [deathMarks, setDeathMarks] = useState([]);
  const [roleChangeIndex, setRoleChangeIndex] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [roleChangePick, setRoleChangePick] = useState(null);
  const [customScriptRoles, setCustomScriptRoles] = useState(() => {
  const saved = localStorage.getItem("customScriptRoles");
  return saved ? JSON.parse(saved) : [];
});

const [customScriptDraft, setCustomScriptDraft] = useState([]);
useEffect(() => {
  localStorage.setItem(
    "customScriptRoles",
    JSON.stringify(customScriptRoles)
  );
}, [customScriptRoles]);

// ---- GAME AUTO-SAVE / RESTORE ----
const GAME_SAVE_KEY = "botc_game_save";
const isFirstMount = useRef(true);

useEffect(() => {
  try {
    const saved = localStorage.getItem(GAME_SAVE_KEY);
    if (!saved) return;
    const state = JSON.parse(saved);
    setScreen(state.screen ?? "menu");
    setScript(state.script ?? null);
    setSelectedRoles(state.selectedRoles ?? []);
    setGamePhase(state.gamePhase ?? "menu");
    setAssignedRoles(state.assignedRoles ?? []);
    setCurrentPlayer(state.currentPlayer ?? 0);
    setRevealed(state.revealed ?? false);
    setDrunkEnabled(state.drunkEnabled ?? 0);
    setReminderPositions(state.reminderPositions ?? {});
    setTokenPositions(state.tokenPositions ?? {});
    setPlayerStatus(state.playerStatus ?? {});
    setJugglerMap(state.jugglerMap ?? {});
    setOracleMap(state.oracleMap ?? {});
    setMathematicianMap(state.mathematicianMap ?? {});
    setTemporaryRoles(state.temporaryRoles ?? []);
    setBluffs(state.bluffs ?? [null, null, null]);
    setTokenMark(state.tokenMark ?? {});
    setCustomReminders(state.customReminders ?? []);
    setDeletedReminders(state.deletedReminders ?? []);
    setReminderRoles(state.reminderRoles ?? []);
    setDeathMarks(state.deathMarks ?? []);
  } catch (e) {
    console.error("Failed to restore saved game:", e);
  }
}, []);

useEffect(() => {
  if (isFirstMount.current) {
    isFirstMount.current = false;
    return;
  }
  const state = {
    screen,
    script,
    selectedRoles,
    gamePhase,
    assignedRoles,
    currentPlayer,
    revealed,
    drunkEnabled,
    reminderPositions,
    tokenPositions,
    playerStatus,
    jugglerMap,
    oracleMap,
    mathematicianMap,
    temporaryRoles,
    bluffs,
    tokenMark,
    customReminders,
    deletedReminders,
    reminderRoles,
    deathMarks,
  };
  localStorage.setItem(GAME_SAVE_KEY, JSON.stringify(state));
}, [
  screen,
  script,
  selectedRoles,
  gamePhase,
  assignedRoles,
  currentPlayer,
  revealed,
  drunkEnabled,
  reminderPositions,
  tokenPositions,
  playerStatus,
  jugglerMap,
  oracleMap,
  mathematicianMap,
  temporaryRoles,
  bluffs,
  tokenMark,
  customReminders,
  deletedReminders,
  reminderRoles,
  deathMarks,
]);


  const closeModal = () => {
  setSelectedRole(null);
  setShowAllRoles(false);
};

  const reminderKey = (name) => `reminder_${name}`;

// Zamenjuje rolu dodeljenu igraču na indeksu roleChangeIndex novom rolom,
  // čuvajući poziciju tokena na grimoaru (preseli poziciju sa starog na novi ključ).
  const applyRoleChange = (index, newRole, playerName) => {
  if (index === null || index === undefined || !newRole) return;

  setAssignedRoles((prev) => {
    const oldRole = prev[index];
    if (!oldRole) return prev;

    const next = [...prev];

    next[index] = {
      ...newRole,
      playerName: playerName,
    };

    const oldKey = reminderKey(oldRole.name);
    const newKey = reminderKey(newRole.name);

    setTokenPositions((prevPositions) => {
      if (!(oldKey in prevPositions)) return prevPositions;

      const updated = { ...prevPositions };
      updated[newKey] = updated[oldKey];

      if (oldKey !== newKey) delete updated[oldKey];

      return updated;
    });

    setReminderRoles((prevReminderRoles) =>
      prevReminderRoles.map((r) =>
        r.name === oldRole.name ? newRole : r
      )
    );

    return next;
  });

  setRoleChangeIndex(null);
  setRoleChangePick(null);
  setPlayerNameInput("");
};

  const roles =
    script === "TB"
      ? troubleBrewing
      : script === "BMR"
      ? badMoonRising
      : script === "SNV"
      ? sectsAndViolets
      : script === "CUSTOM"
      ? customScript
      : null;

  const flatRoles = roles ? Object.values(roles).flat() : [];
  const visibleRoles =
  script === "CUSTOM" && customScriptRoles.length > 0
    ? Object.fromEntries(
        Object.entries(customScript).map(([category, list]) => [
          category,
          list.filter((role) =>
            customScriptRoles.includes(role.name)
          ),
        ])
      )
    : roles;

const visibleFlatRoles = visibleRoles
  ? Object.values(visibleRoles).flat()
  : [];

  const menuBackground = b_snv;

  const tipTokena = 0;

  const gameBackground =
  script === "TB"
    ? b_tb
    : script === "BMR"
    ? b_bmr
    : script === "CUSTOM"
    ? b_custom // ili tvoj custom background ako imaš poseban
    : b_snv;
  const nightOrderMap = {
  "firstNight": [
    "dusk",
    "angel",
    "buddhist",
    "toymaker",
    "stormcatcher",
    "wraith",
    "lordoftyphon",
    "kazali",
    "apprentice",
    "barista",
    "bureaucrat",
    "thief",
    "boffin",
    "philosopher",
    "alchemist",
    "poppygrower",
    "yaggababble",
    "magician",
    "tor",
    "minioninfo",
    "snitch",
    "lunatic",
    "summoner",
    "demoninfo",
    "king",
    "sailor",
    "marionette",
    "engineer",
    "preacher",
    "lilmonsta",
    "lleech",
    "poisoner",
    "widow",
    "courtier",
    "wizard",
    "snake charmer",
    "godfather",
    "organ grinder",
    "devil's advocate",
    "evil twin",
    "witch",
    "cerenovus",
    "fearmonger",
    "harpy",
    "mezepheles",
    "pukka",
    "pixie",
    "huntsman",
    "damsel",
    "amnesiac",
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "fortune teller",
    "butler",
    "grandmother",
    "clockmaker",
    "dreamer",
    "seamstress",
    "steward",
    "knight",
    "noble",
    "balloonist",
    "shugenja",
    "village idiot",
    "bountyhunter",
    "nightwatchman",
    "cultleader",
    "spy",
    "ogre",
    "highpriestess",
    "general",
    "chambermaid",
    "mathematician",
    "dawn",
    "leviathan",
    "vizier"
  ],
  "otherNight": [
    "dusk",
    "duchess",
    "toymaker",
    "wraith",
    "cacklejack",
    "barista",
    "bureaucrat",
    "thief",
    "harlot",
    "bonecollector",
    "philosopher",
    "poppygrower",
    "sailor",
    "engineer",
    "preacher",
    "poisoner",
    "courtier",
    "innkeeper",
    "wizard",
    "gambler",
    "acrobat",
    "snake charmer",
    "monk",
    "organgrinder",
    "devil's advocate",
    "witch",
    "cerenovus",
    "pit-hag",
    "fearmonger",
    "harpy",
    "mezepheles",
    "scarlet woman",
    "summoner",
    "lunatic",
    "exorcist",
    "lycanthrope",
    "princess",
    "legion",
    "imp",
    "zombuul",
    "pukka",
    "shabaloth",
    "po",
    "fang gu",
    "no dashii",
    "vortox",
    "lord of typhon",
    "vigormortis",
    "ojo",
    "alhadikhia",
    "lleech",
    "lil' monsta",
    "yaggababble",
    "kazali",
    "assassin",
    "godfather",
    "gossip",
    "hatter",
    "barber",
    "sweetheart",
    "plague doctor",
    "sage",
    "banshee",
    "professor",
    "choirboy",
    "huntsman",
    "damsel",
    "amnesiac",
    "farmer",
    "tinker",
    "moonchild",
    "grandmother",
    "tor",
    "ravenkeeper",
    "empath",
    "fortune teller",
    "undertaker",
    "dreamer",
    "flowergirl",
    "town crier",
    "oracle",
    "seamstress",
    "juggler",
    "balloonist",
    "villageidiot",
    "king",
    "bounty hunter",
    "nightwatchman",
    "cult leader",
    "butler",
    "spy",
    "high priestess",
    "general",
    "chambermaid",
    "mathematician",
    "riot",
    "dawn",
    "leviathan"
  ]
}
const roleMap = Object.fromEntries(
  flatRoles.map((r) => [r.name.toLowerCase(), r])
);
function getNightOrderRoles() {
  if (!assignedRoles?.length) {
    return { first: [], other: [] };
  }

  const deadRoles = new Set(
    deathMarks
      .filter((mark) => mark.attachedTo)
      .map((mark) => mark.attachedTo)
  );

  const selected = new Set(
    assignedRoles
      .filter((role) => {
        const key = reminderKey(role.name);
        return !deadRoles.has(key);
      })
      .map((role) => role.name.toLowerCase())
  );

  const first = nightOrderMap.firstNight
    .filter((name) => selected.has(name))
    .map((name) => roleMap[name])
    .filter(Boolean);

  const other = nightOrderMap.otherNight
    .filter((name) => selected.has(name))
    .map((name) => roleMap[name])
    .filter(Boolean);

  return { first, other };
}

function isInsideTrash(x, y) {
  const trashWidth = 80;
  const trashHeight = 80;
  const margin = 15;

  return (
    x >= window.innerWidth - trashWidth - margin &&
    x <= window.innerWidth - margin &&
    y >= window.innerHeight - trashHeight - margin &&
    y <= window.innerHeight - margin
  );
}

function deleteDraggedItem(item) {
  if (!item.id) return;

  if (item.type === "assignedToken") {
    setAssignedRoles((prev) =>
      prev.filter((role) => reminderKey(role.name) !== item.id)
    );

    setTokenPositions((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });

    setPlayerStatus((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });

    return;
  }

  if (item.type === "temporaryToken") {
    setTemporaryRoles((prev) =>
      prev.filter((role) => role.id !== item.id)
    );

    setTokenPositions((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });

    return;
  }

  if (item.type === "reminder") {
    setDeletedReminders((prev) =>
      prev.includes(item.id) ? prev : [...prev, item.id]
    );

    setReminderPositions((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });

    setJugglerMap((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });
    setOracleMap((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });
    setMathematicianMap((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });
  }
  if (item.type === "deathMark") {
  setDeathMarks((prev) =>
    prev.filter((mark) => mark.id !== item.id)
  );

  return;
}
}

const roleOrder = {
  Townsfolk: 0,
  Outsider: 1,
  Minion: 2,
  Demon: 3,
};

  function toggleRole(roleName) {
    setSelectedRoles((prev) =>
      prev.includes(roleName)
        ? prev.filter((r) => r !== roleName)
        : [...prev, roleName]
    );
  }

  function cycleMark(key) {
  setTokenMark((prev) => {
    const current = prev[key] || "white";

    const next =
      current === "white"
        ? "purple"
        : current === "purple"
        ? "black"
        : "white";

    return { ...prev, [key]: next };
  });
}
  function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

  useEffect(() => {
  function getPointerPosition(e) {
    if (e.touches?.length) {
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }

    if (e.changedTouches?.length) {
      return {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    }

    return {
      x: e.clientX,
      y: e.clientY,
    };
  }

  function handleMove(e) {
  if (!dragging.id) return;

  setMoved(true);

  if (e.cancelable) e.preventDefault();

  const { x, y } = getPointerPosition(e);

  setOverTrash(isInsideTrash(x, y));

  if (dragging.type === "reminder") {
    setReminderPositions((prev) => ({
      ...prev,
      [dragging.id]: { x, y },
    }));
  }

  if (
    dragging.type === "assignedToken" ||
    dragging.type === "temporaryToken"
  ) {
    setTokenPositions((prev) => ({
      ...prev,
      [dragging.id]: { x, y },
    }));
  }

  if (dragging.type === "deathMark") {
    setDeathMarks((prev) =>
      prev.map((mark) =>
        mark.id === dragging.id
          ? {
              ...mark,
              x,
              y,
              attachedTo: null,
            }
          : mark
      )
    );
  }
}
  function stop(e) {
    if (!dragging.id) return;

    const { x, y } = getPointerPosition(e);

if (isInsideTrash(x, y)) {
  deleteDraggedItem(dragging);
} else if (dragging.type === "deathMark") {
  let closestToken = null;
  let closestDistance = Infinity;

  assignedRoles.forEach((role) => {
    const tokenKey = reminderKey(role.name);
    const tokenPosition = tokenPositions[tokenKey];

    if (!tokenPosition) return;

    const dx = tokenPosition.x - x;
    const dy = tokenPosition.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestToken = tokenKey;
    }
  });

  if (closestToken && closestDistance <= 65) {
    setDeathMarks((prev) =>
      prev.map((mark) =>
        mark.id === dragging.id
          ? {
              ...mark,
              attachedTo: closestToken,
            }
          : mark
      )
    );
  }
}

    setDragging({ id: null, type: null });
    setMoved(false);
    setOverTrash(false);
  }

  window.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseup", stop);
  window.addEventListener("touchmove", handleMove, {
    passive: false,
  });
  window.addEventListener("touchend", stop);

  return () => {
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("mouseup", stop);
    window.removeEventListener("touchmove", handleMove);
    window.removeEventListener("touchend", stop);
  };
}, [dragging]);

  // 🔴 GLOBAL BODY LOCK (fix scroll + black edges)
  useEffect(() => {
    if (gamePhase === "game") {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [gamePhase]);

  const pageStyle = (bg) => ({
    minHeight: "100dvh",
    width: "100%",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white",
    paddingBottom: 50,
  });

useEffect(() => {
  if (gamePhase !== "game") return;
  if (!assignedRoles.length) return;

const cx = window.innerWidth / 2;
const cy = window.innerHeight * 0.47;

const rx = window.innerWidth * 0.38;
const ry = window.innerHeight * 0.30;

const twoPi = Math.PI * 2;
const deltaTheta = 0.001;

function computeDpt(r1, r2, theta) {
  const sin = Math.pow(r1 * Math.sin(theta), 2);
  const cos = Math.pow(r2 * Math.cos(theta), 2);
  return Math.sqrt(sin + cos);
}

// 1. izračunaj obim elipse (aproksimacija)
let circ = 0;
for (let theta = 0; theta < twoPi; theta += deltaTheta) {
  circ += computeDpt(rx, ry, theta);
}

// 2. broj tačaka
const n = assignedRoles.length;
const segment = circ / n;

let positions = {};

let run = 0;
let nextPoint = 0;

// start od dna (Math.PI / 2)
let theta = Math.PI / 2;

for (let i = 0; i < Math.floor(twoPi / deltaTheta); i++) {
  theta += deltaTheta;

  const d = computeDpt(rx, ry, theta);
  run += d;

  if (run >= nextPoint * segment) {
    const x = cx + rx * Math.cos(theta);
    const y = cy + ry * Math.sin(theta);

    const role = assignedRoles[nextPoint];
    if (role) {
      positions[reminderKey(role.name)] = { x, y };
    }

    nextPoint++;
    if (nextPoint >= n) break;
  }
}

  setTokenPositions((prev) => {
  const next = { ...prev };

  Object.entries(positions).forEach(([key, position]) => {
    if (!next[key]) {
      next[key] = position;
    }
  });

  return next;
});
}, [gamePhase, assignedRoles]);

  // ---------------- GAME SCREEN ----------------
if (gamePhase === "game") {
  if (!assignedRoles || assignedRoles.length === 0) {
  return (
    <div style={{ color: "white", padding: 20 }}>
      No roles assigned
    </div>
  );
}
  const reminders = [];

  const cycleStatus = (key) => {
  setPlayerStatus((prev) => {
    const current = prev[key] || "alive";

    const next =
      current === "alive"
        ? "dead_vote"
        : current === "dead_vote"
        ? "dead_no_vote"
        : "alive";

    return { ...prev, [key]: next };
  });
};

  const hasRole = (name) =>
  reminderRoles.some((r) => r.name === name);

  if (script === "TB" || script === "CUSTOM") {
  if (hasRole("Butler"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Butler"),
      text: "MASTER",
    });

  if (drunkEnabled === 1)
    reminders.push({
      role: {
        name: "Drunk",
        icon: drunkIcon,
      },
      text: "IS THE DRUNK",
    });

  if (hasRole("Fortune Teller"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Fortune Teller"),
      text: "RED HERRING",
    });

  if (hasRole("Investigator")) {
    reminders.push(
      {
        role: flatRoles.find((r) => r.name === "Investigator"),
        text: "MINION",
      },
      {
        role: flatRoles.find((r) => r.name === "Investigator"),
        text: "WRONG",
      }
    );
  }

  if (hasRole("Librarian")) {
    reminders.push(
      {
        role: flatRoles.find((r) => r.name === "Librarian"),
        text: "OUTSIDER",
      },
      {
        role: flatRoles.find((r) => r.name === "Librarian"),
        text: "WRONG",
      }
    );
  }

  if (hasRole("Monk"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Monk"),
      text: "SAFE",
    });

  if (hasRole("Slayer"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Slayer"),
      text: "NO ABILITY",
    });

  if (hasRole("Undertaker"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Undertaker"),
      text: "DIED TODAY",
    });

  if (hasRole("Virgin"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Virgin"),
      text: "NO ABILITY",
    });

  if (hasRole("Washerwoman")) {
    reminders.push(
      {
        role: flatRoles.find((r) => r.name === "Washerwoman"),
        text: "TOWNSFOLK",
      },
      {
        role: flatRoles.find((r) => r.name === "Washerwoman"),
        text: "WRONG",
      }
    );
  }

  if (hasRole("Poisoner"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Poisoner"),
      text: "POISONED",
    });

  if (hasRole("Scarlet Woman"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Scarlet Woman"),
      text: "IS THE DEMON",
    });
}

if (script === "BMR" || script === "CUSTOM") {
  const getRole = (name) =>
    badMoonRising.townsfolk
      .concat(badMoonRising.outsiders)
      .concat(badMoonRising.minions)
      .concat(badMoonRising.demon)
      .find((r) => r.name === name);

  const addReminder = (roleName, text, uniqueName = null) => {
    const role = getRole(roleName);
    if (!role) return;

    reminders.push({
      role: {
        ...role,
        name: uniqueName || role.name,
        description: role.description || "",
      },
      text,
    });
  };

  // COURTIER
  if (hasRole("Courtier")) {
    addReminder("Courtier", "DRUNK 1", "Courtier Drunk 1");
    addReminder("Courtier", "DRUNK 2", "Courtier Drunk 2");
    addReminder("Courtier", "DRUNK 3", "Courtier Drunk 3");
    addReminder("Courtier", "NO ABILITY", "Courtier No Ability");
  }

  // EXORCIST
  if (hasRole("Exorcist"))
    addReminder("Exorcist", "CHOSEN");

  // FOOL
  if (hasRole("Fool"))
    addReminder("Fool", "NO ABILITY");

  // GAMBLER
  if (hasRole("Gambler"))
    addReminder("Gambler", "DEAD");

  // GOON
  if (hasRole("Goon"))
    addReminder("Goon", "DRUNK");

  // GOSSIP
  if (hasRole("Gossip"))
    addReminder("Gossip", "DEAD");

  // GRANDMOTHER
  if (hasRole("Grandmother")) {
    addReminder("Grandmother", "DEAD", "Grandmother Dead");
    addReminder("Grandmother", "GRANDCHILD", "Grandmother Grandchild");
  }

  // INNKEEPER
  if (hasRole("Innkeeper")) {
    addReminder("Innkeeper", "SAFE", "Innkeeper Safe 1");
    addReminder("Innkeeper", "SAFE", "Innkeeper Safe 2");
    addReminder("Innkeeper", "DRUNK", "Innkeeper Drunk");
  }

  // LUNATIC
  if (hasRole("Lunatic")) {
    addReminder("Lunatic", "CHOSEN", "Lunatic Chosen 1");
    addReminder("Lunatic", "CHOSEN", "Lunatic Chosen 2");
    addReminder("Lunatic", "CHOSEN", "Lunatic Chosen 3");
  }

  // MINSTREL
  if (hasRole("Minstrel"))
    addReminder("Minstrel", "EVERYONE IS DRUNK");

  // MOONCHILD
  if (hasRole("Moonchild"))
    addReminder("Moonchild", "DEAD");

  // PROFESSOR
  if (hasRole("Professor")) {
    addReminder("Professor", "NO ABILITY", "Professor No Ability");
    addReminder("Professor", "ALIVE", "Professor Alive");
  }

  // SAILOR
  if (hasRole("Sailor"))
    addReminder("Sailor", "DRUNK");

  // TEA LADY
  if (hasRole("Tea Lady")) {
    addReminder("Tea Lady", "CANNOT DIE", "Tea Lady Cannot Die 1");
    addReminder("Tea Lady", "CANNOT DIE", "Tea Lady Cannot Die 2");
  }

  // TINKER
  if (hasRole("Tinker"))
    addReminder("Tinker", "DEAD");

  // ASSASSIN
  if (hasRole("Assassin")) {
    addReminder("Assassin", "NO ABILITY", "Assassin No Ability");
    addReminder("Assassin", "DEAD", "Assassin Dead");
  }

  // DEVIL'S ADVOCATE
  if (hasRole("Devil's Advocate"))
    addReminder("Devil's Advocate", "SURVIVES EXECUTION");

  // GODFATHER
  if (hasRole("Godfather")) {
    addReminder("Godfather", "DEAD", "Godfather Dead");
    addReminder("Godfather", "DIED TODAY", "Godfather Died Today");
  }

  // PO
  if (hasRole("Po")) {
    addReminder("Po", "3 ATTACKS", "Po 3 Attacks");
    addReminder("Po", "DEAD", "Po Dead 1");
    addReminder("Po", "DEAD", "Po Dead 2");
    addReminder("Po", "DEAD", "Po Dead 3");
  }

  // PUKKA
  if (hasRole("Pukka")) {
    addReminder("Pukka", "DEAD", "Pukka Dead");
    addReminder("Pukka", "POISONED", "Pukka Poisoned 1");
  }

  // SHABALOTH
  if (hasRole("Shabaloth")) {
    addReminder("Shabaloth", "ALIVE", "Shabaloth Alive");
    addReminder("Shabaloth", "DEAD", "Shabaloth Dead 1");
    addReminder("Shabaloth", "DEAD", "Shabaloth Dead 2");
  }

  // ZOMBUUL
  if (hasRole("Zombuul")) {
    addReminder("Zombuul", "DEAD", "Zombuul Dead");
    addReminder("Zombuul", "DIED TODAY", "Zombuul Died Today");
  }
}

if (script === "SNV" || script === "CUSTOM") {
  const getRole = (name) =>
    sectsAndViolets.townsfolk
      .concat(sectsAndViolets.outsiders)
      .concat(sectsAndViolets.minions)
      .concat(sectsAndViolets.demon)
      .find((r) => r.name === name);

  const pushRole = (role, text) => {
    reminders.push({
      role: {
        ...role,
        description: role?.description || "",
      },
      text,
    });
  };

  const pushCounter = (roleName) => {
    const r = getRole(roleName);
    const key = reminderKey(roleName);
    const value = jugglerMap[key] ?? 0;

    reminders.push({
      role: {
        ...r,
        description: r?.description || "",
      },
      text: String(value),
      isCounter: true,
    });
  };

  // ARTIST
  if (hasRole("Artist"))
    pushRole(getRole("Artist"), "NO ABILITY");

  // BARBER
  if (hasRole("Barber"))
    pushRole(getRole("Barber"), "HAIRCUTS TONIGHT");

  // CERENOVUS
  if (hasRole("Cerenovus"))
    pushRole(getRole("Cerenovus"), "MAD");

  // EVIL TWIN
  if (hasRole("Evil Twin"))
    pushRole(getRole("Evil Twin"), "TWIN");

  // FANG GU
  if (hasRole("Fang Gu")) {
    const r = getRole("Fang Gu");

    pushRole(r, "DEAD");
    pushRole(r, "ONCE");
  }

  // FLOWERGIRL
  if (hasRole("Flowergirl")) {
    const r = getRole("Flowergirl");

    pushRole(r, "DEMON VOTED");
    pushRole(r, "DEMON NOT VOTED");
  }

  // NO DASHII
  if (hasRole("No Dashii")) {
    const r = getRole("No Dashii");

    pushRole(r, "DEAD");
    pushRole(r, "POISONED");
    pushRole(r, "POISONED");
  }

  // PHILOSOPHER
  if (hasRole("Philosopher")) {
    const r = getRole("Philosopher");

    pushRole(r, "DRUNK");
    pushRole(r, "IS THE PHILOSOPHER");
  }

  // SEAMSTRESS
  if (hasRole("Seamstress"))
    pushRole(getRole("Seamstress"), "NO ABILITY");

  // SNAKE CHARMER
  if (hasRole("Snake Charmer"))
    pushRole(getRole("Snake Charmer"), "POISONED");

  // SWEETHEART
  if (hasRole("Sweetheart"))
    pushRole(getRole("Sweetheart"), "DRUNK");

  // TOWN CRIER
  if (hasRole("Town Crier")) {
    const r = getRole("Town Crier");

    pushRole(r, "MINION NOMINATED");
    pushRole(r, "MINION NOT NOMINATED");
  }

  // VIGORMORTIS
  if (hasRole("Vigormortis")) {
    const r = getRole("Vigormortis");

    pushRole(r, "DEAD");
    pushRole(r, "HAS ABILITY");
    pushRole(r, "POISONED");
  }

  // VORTOX
  if (hasRole("Vortox"))
    pushRole(getRole("Vortox"), "DEAD");

  // WITCH
  if (hasRole("Witch"))
    pushRole(getRole("Witch"), "CURSED");

  // JUGGLER — COUNTER 0–5
if (hasRole("Juggler")) {
  const r = getRole("Juggler");
  const key = reminderKey("Juggler");

  const value = jugglerMap[key] ?? 0;

  reminders.push({
    role: {
      ...r,
      description: r?.description || "",
    },
    text: String(value),
    isCounter: true,
  });
}

// MATHEMATICIAN — COUNTER 0–5
if (hasRole("Mathematician")) {
  const r = getRole("Mathematician");
  const key = reminderKey("Mathematician");

  const value = mathematicianMap[key] ?? 0;

  reminders.push({
    role: {
      ...r,
      description: r?.description || "",
    },
    text: String(value),
    isCounter: true,
  });
}

// ORACLE — COUNTER 0–5
if (hasRole("Oracle")) {
  const r = getRole("Oracle");
  const key = reminderKey("Oracle");

  const value = oracleMap[key] ?? 0;

  reminders.push({
    role: {
      ...r,
      description: r?.description || "",
    },
    text: String(value),
    isCounter: true,
  });
}

}

if (script === "CUSTOM") {
  const getRole = (name) =>
    flatRoles.find((r) => r.name === name);

  const addReminder = (roleName, text, uniqueName = null) => {
    const role = getRole(roleName);
    if (!role) return;

    reminders.push({
      role: {
        ...role,
        name: uniqueName || role.name,
        description: role.description || "",
      },
      text,
    });
  };

  // ACROBAT
  if (hasRole("Acrobat")) {
    addReminder("Acrobat", "CHOSEN", "Acrobat Chosen");
    addReminder("Acrobat", "DEAD", "Acrobat Dead");
  }

  // ALCHEMIST
  if (hasRole("Alchemist"))
    addReminder("Alchemist", "IS THE ALCHEMIST");

  // AMNESIAC
  if (hasRole("Amnesiac")){
    addReminder("Amnesiac", "?");
    addReminder("Amnesiac", "?");
    addReminder("Amnesiac", "?");
  }

  // BALLOONIST
  if (hasRole("Balloonist")){
    addReminder("Balloonist", "Seen Demon");
    addReminder("Balloonist", "Seen Minion");
    addReminder("Balloonist", "Seen Outsider");
    addReminder("Balloonist", "Seen Townsfolk");
  }

  // BANSHEE
  if (hasRole("Banshee"))
    addReminder("Banshee", "HAS ABILITY");

  // BOUNTY HUNTER
  if (hasRole("Bounty Hunter"))
    addReminder("Bounty Hunter", "KNOW");

  // CANNIBAL
  if (hasRole("Cannibal")) {
    addReminder("Cannibal", "LUNCH", "Cannibal Lunch");
    addReminder("Cannibal", "POISONED", "Cannibal Poisoned");
  }

  // ENGINEER
  if (hasRole("Engineer"))
    addReminder("Engineer", "NO ABILITY");

  // FISHERMAN
  if (hasRole("Fisherman"))
    addReminder("Fisherman", "NO ABILITY");

  // HUNTSMAN
  if (hasRole("Huntsman"))
    addReminder("Huntsman", "NO ABILITY");

  // KNIGHT
  if (hasRole("Knight")){
    addReminder("Knight", "KNOW");
  addReminder("Knight", "KNOW");
  }
  // LYCANTHROPE
  if (hasRole("Lycanthrope")) {
    addReminder("Lycanthrope", "DEAD", "Lycanthrope Dead");
    addReminder("Lycanthrope", "FAUX PAW", "Lycanthrope Faux Paw");
  }

  // NIGHTWATCHMAN
  if (hasRole("Nightwatchman"))
    addReminder("Nightwatchman", "NO ABILITY");

  // NOBLE
  if (hasRole("Noble"))
    addReminder("Noble", "KNOW");

  // PIXIE
  if (hasRole("Pixie")) {
    addReminder("Pixie", "MAD", "Pixie Mad");
    addReminder("Pixie", "HAS ABILITY", "Pixie Has Ability");
  }

  // POPPY GROWER
  if (hasRole("Poppy Grower"))
    addReminder("Poppy Grower", "EVIL WAKES");

  // PREACHER
  if (hasRole("Preacher")){
    addReminder("Preacher", "NO ABILITY");
    addReminder("Preacher", "NO ABILITY");
    addReminder("Preacher", "NO ABILITY");
  }

  // PRINCESS
  if (hasRole("Princess"))
    addReminder("Princess", "DOESN'T ACT");

  // STEWARD
  if (hasRole("Steward"))
    addReminder("Steward", "KNOW");

  // VILLAGE IDIOT
  if (hasRole("Village Idiot"))
    addReminder("Village Idiot", "DRUNK");

  // DAMSEL
  if (hasRole("Damsel"))
    addReminder("Damsel", "GUESS USED");

  // GOLEM
  if (hasRole("Golem"))
    addReminder("Golem", "MAY NOT NOMINATE");

  // HATTER
  if (hasRole("Hatter"))
    addReminder("Hatter", "TEA PARTY TONIGHT");

  // HERMIT
  if (hasRole("Hermit")) {
    addReminder("Hermit", "1", "Hermit 1");
    addReminder("Hermit", "2", "Hermit 2");
    addReminder("Hermit", "3", "Hermit 3");
  }

  // OGRE
  if (hasRole("Ogre"))
    addReminder("Ogre", "FRIEND");

  // PLAGUE DOCTOR
  if (hasRole("Plague Doctor"))
    addReminder("Plague Doctor", "STORYTELLER ABILITY");

  // PUZZLEMASTER
  if (hasRole("Puzzlemaster")) {
    addReminder("Puzzlemaster", "DRUNK", "Puzzlemaster Drunk");
    addReminder(
      "Puzzlemaster",
      "GUESS USED",
      "Puzzlemaster Guess Used"
    );
  }

  // FEARMONGER
  if (hasRole("Fearmonger"))
    addReminder("Fearmonger", "FEAR");

  // GOBLIN
  if (hasRole("Goblin"))
    addReminder("Goblin", "CLAIMED");

  // HARPY
  if (hasRole("Harpy")) {
    addReminder("Harpy", "MAD", "Harpy Mad");
    addReminder("Harpy", "2ND", "Harpy 2nd");
  }

  // MARIONETTE
  if (hasRole("Marionette"))
    addReminder("Marionette", "IS THE MARIONETTE");

  // MEZEPHELES
  if (hasRole("Mezepheles")) {
    addReminder("Mezepheles", "TURNS EVIL", "Mezepheles Turns Evil");
    addReminder("Mezepheles", "NO ABILITY", "Mezepheles No Ability");
  }

  // ORGAN GRINDER
  if (hasRole("Organ Grinder")) {
    addReminder(
      "Organ Grinder",
      "ABOUT TO DIE",
      "Organ Grinder About To Die"
    );

    addReminder(
      "Organ Grinder",
      "DRUNK",
      "Organ Grinder Drunk"
    );
  }

  // SUMMONER
  if (hasRole("Summoner")) {
    addReminder("Summoner", "NIGHT 1", "Summoner Night 1");
    addReminder("Summoner", "NIGHT 2", "Summoner Night 2");
    addReminder("Summoner", "NIGHT 3", "Summoner Night 3");
  }

  // WIDOW
  if (hasRole("Widow")) {
    addReminder("Widow", "KNOW", "Widow Know");
    addReminder("Widow", "POISONED", "Widow Poisoned");
  }

  // WIZARD
  if (hasRole("Wizard"))
    addReminder("Wizard", "?");

  // XAAN
  if (hasRole("Xaan")) {
    addReminder("Xaan", "NIGHT 0", "Xaan Night 0");
    addReminder("Xaan", "NIGHT 1", "Xaan Night 1");
    addReminder("Xaan", "NIGHT 2", "Xaan Night 2");
    addReminder("Xaan", "NIGHT 3", "Xaan Night 3");
    addReminder("Xaan", "NIGHT 4", "Xaan Night 4");
  }

  // AL-HADIKHIA
  if (hasRole("Al-Hadikhia")) {
    addReminder("Al-Hadikhia", "1", "Al-Hadikhia 1");
    addReminder("Al-Hadikhia", "2", "Al-Hadikhia 2");
    addReminder("Al-Hadikhia", "3", "Al-Hadikhia 3");
  }

  // KAZALI
  if (hasRole("Kazali"))
    addReminder("Kazali", "DEAD");

  // LEGION
  if (hasRole("Legion")) {
    addReminder("Legion", "DEAD", "Legion Dead");
    addReminder("Legion", "ABOUT TO DIE", "Legion About To Die");
  }

  // LEVIATHAN
  if (hasRole("Leviathan")) {
    addReminder("Leviathan", "DAY 1", "Leviathan Day 1");
    addReminder("Leviathan", "DAY 2", "Leviathan Day 2");
    addReminder("Leviathan", "DAY 3", "Leviathan Day 3");
    addReminder("Leviathan", "DAY 4", "Leviathan Day 4");
    addReminder("Leviathan", "DAY 5", "Leviathan Day 5");

    addReminder(
      "Leviathan",
      "GOOD PLAYER EXECUTED",
      "Leviathan Good Player Executed"
    );
  }

  // LIL' MONSTA
  if (hasRole("Lil' Monsta")) {
    addReminder("Lil' Monsta", "IS THE DEMON", "Lil Monsta Is The Demon");
    addReminder("Lil' Monsta", "DEAD", "Lil Monsta Dead");
  }

  // LLEECH
  if (hasRole("Lleech")) {
    addReminder("Lleech", "POISONED", "Lleech Poisoned");
    addReminder("Lleech", "DEAD", "Lleech Dead");
  }

  // LORD OF TYPHON
  if (hasRole("Lord of Typhon"))
    addReminder("Lord of Typhon", "DEAD");

  // OJO
  if (hasRole("Ojo"))
    addReminder("Ojo", "DEAD");

  // RIOT
  if (hasRole("Riot")) {
    addReminder("Riot", "DAY 1", "Riot Day 1");
    addReminder("Riot", "DAY 2", "Riot Day 2");
    addReminder("Riot", "DAY 3", "Riot Day 3");
  }

  // YAGGABABBLE
  if (hasRole("Yaggababble"))
    addReminder("Yaggababble", "DEAD");
}

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.47;
  const reminderRadius = 70;

  const {
  first: firstNightRoles,
  other: otherNightRoles,
} = getNightOrderRoles();

const firstNightNumbers = {};
firstNightRoles.forEach((role, index) => {
  firstNightNumbers[role.name] = index + 1;
});

const otherNightNumbers = {};
otherNightRoles.forEach((role, index) => {
  otherNightNumbers[role.name] = index + 1;
});
  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        backgroundImage: `url(${gameTable})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        touchAction: "none",
      }}
    >
      {/* DEATH MARK POLJE */}
<div
  onMouseDown={(e) => {
    const id =
      crypto?.randomUUID?.() ??
      `${Date.now()}_${Math.random()}`;

    const mark = {
      id,
      x: e.clientX,
      y: e.clientY,
      attachedTo: null,
    };

    setDeathMarks((prev) => [...prev, mark]);

    setDragging({
      id,
      type: "deathMark",
    });

    setMoved(false);
  }}
  onTouchStart={(e) => {
    const touch = e.touches[0];

    const id =
      crypto?.randomUUID?.() ??
      `${Date.now()}_${Math.random()}`;

    const mark = {
      id,
      x: touch.clientX,
      y: touch.clientY,
      attachedTo: null,
    };

    setDeathMarks((prev) => [...prev, mark]);

    setDragging({
      id,
      type: "deathMark",
    });

    setMoved(false);
  }}
  style={{
    position: "absolute",
    left: 15,
    bottom: 15,
    width: 80,
    height: 80,
    zIndex: 5000,
    borderRadius: 16,
    border: "2px solid rgba(255,255,255,0.25)",
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    cursor: "grab",
    touchAction: "none",
  }}
>
  <img
    src={deathMark}
    draggable={false}
    style={{
      width: 55,
      height: 70,
      objectFit: "contain",
      pointerEvents: "none",
    }}
  />
</div>
    <div
  style={{
    position: "absolute",
    right: 15,
    bottom: 15,
    width: 80,
    height: 80,
    zIndex: 5000,
    borderRadius: 16,
    border: overTrash
      ? "3px solid rgba(255,80,80,1)"
      : "2px solid rgba(255,255,255,0.25)",
    background: overTrash
      ? "rgba(160,0,0,0.75)"
      : "rgba(0,0,0,0.55)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: overTrash ? "scale(1.12)" : "scale(1)",
    transition: "transform 0.15s, background 0.15s",
    pointerEvents: "none",
    boxSizing: "border-box",
  }}
>
  <img
    src={trashEmoji}
    draggable={false}
    style={{
      width: 50,
      height: 50,
      objectFit: "contain",
      pointerEvents: "none",
    }}
  />
</div>
      {/* END GAME */}
      <button
        onClick={() => {
          localStorage.removeItem("botc_game_save");
          setGamePhase("menu");
          setScreen("menu");
          setScript(null);
          setSelectedRoles([]);
          setAssignedRoles([]);
          setReminderRoles([]);
          setDeletedReminders([]);
          setTemporaryRoles([]);
          setDeathMarks([]);
          setCurrentPlayer(0);
          setRevealed(false);
          setTokenPositions({});
          setReminderPositions({});
          setDragging({ id: null, type: null });
        }}
        style={{
  position: "absolute",
  top: 10,
  left: 10,
  zIndex: 1000,

  padding: "10px 18px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(120,0,0,0.55)",
  color: "white",
  fontSize: 14,
  fontWeight: 600,
  backdropFilter: "blur(8px)",
  cursor: "pointer",
}}
      >
        End Game
      </button>
{/* MENU BUTTON */}
<div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
  <button
    onClick={() => setMenuOpen((p) => !p)}
    style={{
      padding: "10px 18px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.15)",
      background: "rgba(0,0,0,0.45)",
      color: "white",
      fontSize: 14,
      fontWeight: 600,
      backdropFilter: "blur(8px)",
      cursor: "pointer",
      width: 120,
    }}
  >
    Menu
  </button>

  {menuOpen && (
    <div
      style={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "absolute",
        right: 0,
      }}
    >
      {[
        { label: "All Roles", action: () => setShowAllRoles(true) },
        { label: "Bluffs", action: () => setShowBluffs(true)},
      ].map((item) => (
        <button
          key={item.label}
          onClick={() => {
            item.action();
            setMenuOpen(false);
          }}
          style={{
            width: 160,
            padding: "10px 18px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(0,0,0,0.45)",
            color: "white",
            fontSize: 14,
            fontWeight: 600,
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  )}
</div>

{showBluffs && (
  <div
    onClick={() => setShowBluffs(false)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 99999,
      background: "#000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: 330,
        minHeight: 380,
        background: "#111",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 14,
        padding: 20,
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={() => setShowBluffs(false)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: 26,
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: 0,
        }}
      >
        Bluffs
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyItems: "center",
          gap: 20,
          marginTop: 25,
        }}
      >
        {[0, 1].map((index) => {
          const role = bluffs[index];

          return (
            <div
              key={index}
              onClick={() => {
                setActiveBluffIndex(index);
                setShowBluffRolePicker(true);
              }}
              style={{
                width: 120,
                height: 145,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <div
                style={{
                  width: 105,
                  height: 105,
                  backgroundImage: `url(${circle})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {role ? (
                  <img
                    src={role.icon}
                    draggable={false}
                    style={{
                      width: "82%",
                      height: "82%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: 42,
                      opacity: 0.5,
                    }}
                  >
                    +
                  </span>
                )}
              </div>

              <div
                style={{
                  marginTop: 5,
                  fontSize: 12,
                  textAlign: "center",
                  minHeight: 16,
                }}
              >
                {role ? role.name : "Choose role"}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        {(() => {
          const role = bluffs[2];

          return (
            <div
              onClick={() => {
                setActiveBluffIndex(2);
                setShowBluffRolePicker(true);
              }}
              style={{
                width: 120,
                height: 145,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <div
                style={{
                  width: 105,
                  height: 105,
                  backgroundImage: `url(${circle})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {role ? (
                  <img
                    src={role.icon}
                    draggable={false}
                    style={{
                      width: "82%",
                      height: "82%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: 42,
                      opacity: 0.5,
                    }}
                  >
                    +
                  </span>
                )}
              </div>

              <div
                style={{
                  marginTop: 5,
                  fontSize: 12,
                  textAlign: "center",
                  minHeight: 16,
                }}
              >
                {role ? role.name : "Choose role"}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  </div>
)}

{showBluffRolePicker && (
  <div
    onClick={() => setShowBluffRolePicker(false)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 100000,
      background: "rgba(0,0,0,0.95)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "92%",
        maxWidth: 700,
        maxHeight: "88%",
        overflowY: "auto",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 14,
        padding: 16,
        position: "relative",
      }}
    >
      <button
        onClick={() => setShowBluffRolePicker(false)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: 26,
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: 0,
        }}
      >
        Choose Bluff
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          marginTop: 20,
        }}
      >
        {visibleFlatRoles.map((role) => (
          <div
            key={role.name}
            onClick={() => {
              setBluffs((prev) => {
                const next = [...prev];
                next[activeBluffIndex] = role;
                return next;
              });

              setShowBluffRolePicker(false);
            }}
            style={{
              height: 115,
              padding: 5,
              boxSizing: "border-box",
              borderRadius: 10,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
            }}
          >
            <img
              src={role.icon}
              draggable={false}
              style={{
                width: 75,
                height: 75,
                objectFit: "contain",
              }}
            />

            <div
              style={{
                fontSize: 10,
                textAlign: "center",
                lineHeight: 1.1,
              }}
            >
              {role.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

{showAllRoles && (
  <div
    onClick={() => {
      setShowAllRoles(false);
      setSelectedRole(null);
    }}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      pointerEvents: "auto",
    }}
  >
    {/* X */}
    <button
      onClick={() => {
        setShowAllRoles(false);
        setSelectedRole(null);
      }}
      style={{
        position: "fixed",
        top: 50,
        right: 15,
        zIndex: 10000,
        fontSize: 26,
        background: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
        pointerEvents: "auto",
      }}
    >
      ✕
    </button>

    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "99%",
        height: "90%",
        background: "#111",
        border: "1px solid #444",
        borderRadius: 12,
        overflowY: "auto",
        padding: 20,
      }}
    >
      <h2 style={{ color: "white", textAlign: "center" }}>
        All {script} Roles
      </h2>

      {visibleRoles &&
  Object.entries(visibleRoles).map(([category, list]) => (
    <div key={category}>
      <h3 style={{ color: "white" }}>{category}</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          justifyContent: "center",
        }}
      >
        {list.map((role) => (
          <div
  key={role.name}
  onClick={() => {
    setSelectedRole(role);
    setCustomPrompt("");
    setShowPromptMenu(true);
  }}
  style={{
    width: "100%",
    height: 110,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    color: "white",
    cursor: "pointer",
    padding: 4,
    boxSizing: "border-box",
            }}
          >
            {role.icon && (
              <img
                src={role.icon}
                width={80}
                style={{
                  objectFit: "contain",
                  marginTop: -13,
                }}
              />
            )}

            <p
              style={{
                fontSize: 12,
                margin: 0,
                textAlign: "center",
                lineHeight: 1.1,
                wordBreak: "break-word",
              }}
            >
              {role.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  ))}
    </div>
  </div>
)}
{selectedRole && (
  <div
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setSelectedRole(null);
      }
    }}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 10000,
      background: "rgba(0,0,0,0.95)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* CLOSE */}
    <button
      onClick={() => setSelectedRole(null)}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        fontSize: 28,
        background: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
      }}
    >
      ✕
    </button>

    {/* CENTRAL ROLE (FULL VIEW) */}
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          width: "min(60vw, 320px)",
          height: "min(60vw, 320px)",
          backgroundImage: `url(${circle})`,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={selectedRole.icon}
          style={{
            width: "85%",
            height: "85%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* ROLE NAME */}
      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          textShadow: "0 3px 10px rgba(0,0,0,0.8)",
          letterSpacing: 1,
        }}
      >
        {selectedRole.name}
      </div>
      {/* DESCRIPTION */}
      {selectedRole.description && (
        <div
          style={{
            fontSize: 20,
            color: "white",
            textAlign: "center",
            opacity: 0.8,
            maxWidth: 320,
            lineHeight: 1.3,
            textShadow: "0 2px 6px rgba(0,0,0,0.6)",
          }}
        >
          {selectedRole.description}
        </div>
      )}
    </div>

    {/* BOTTOM ACTIONS */}
    <button
      onClick={() => {
        setCustomPrompt("");
        setShowPromptMenu(true);
      }}
      style={{
        maxWidth: 300,
        width: 180,
        marginBottom: 80,
        padding: 16,
        borderRadius: 12,
        background: "rgba(249, 253, 132, 0.35)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "white",
        fontSize: 14,
        cursor: "pointer",
      }}
    >
      ADD PROMPT
    </button>

    {showPromptMenu && selectedRole && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 11000,
          background: "rgba(0,0,0,0.95)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
      onClick={() => {
        setShowPromptMenu(false);
        setSelectedRole(null);
      }}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        fontSize: 28,
        background: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
      }}
    >
      ✕
    </button>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 20,

            background: "#000",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "min(60vw, 320px)",
              height: "min(60vw, 320px)",
              backgroundImage: `url(${circle})`,
              backgroundSize: "cover",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={selectedRole.icon}
              style={{
                width: "85%",
                height: "85%",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "white",
              textAlign: "center",
            }}
          >
            {selectedRole.name}
          </div>

          <input
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Type anything..."
            style={{
              width: 300,
              padding: 14,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              fontSize: 30,
              textAlign: "center",
            }}
          />
        </div>

        <div
          style={{
            width: "100%",
            padding: 20,
            gap: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => {
              const id =
                crypto?.randomUUID?.() ??
                `${Date.now()}_${Math.random()}`;

              setTemporaryRoles((prev) => [
                ...prev,
                {
                  id,
                  baseRole: selectedRole,
                  label: customPrompt,
                  tipTokena: 1,
                },
              ]);

              setTokenPositions((prev) => ({
                ...prev,
                [id]: {
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                },
              }));
              setShowPromptMenu(false);
              setShowAllRoles(false);
              setSelectedRole(null);
            }}
            style={{
              flex: 1,
              maxWidth: 200,
              padding: 16,
              borderRadius: 12,
              background: "rgba(211, 101, 255, 0.35)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            CREATE REMINDER
          </button>

          <button
            onClick={() => {
              const id =
                crypto?.randomUUID?.() ??
                `${Date.now()}_${Math.random()}`;

              setTemporaryRoles((prev) => [
                ...prev,
                {
                  id,
                  baseRole: selectedRole,
                  label: customPrompt,
                  tipTokena: 0,
                },
              ]);

              setTokenPositions((prev) => ({
                ...prev,
                [id]: {
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                },
              }));
              setShowPromptMenu(false);
              setShowAllRoles(false);
              setSelectedRole(null);
            }}
            style={{
              flex: 1,
              maxWidth: 200,
              padding: 16,
              borderRadius: 12,
              background: "rgba(0,120,120,0.35)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            CREATE TOKEN
          </button>
        </div>
      </div>
    )}
  </div>
)}
      {/* REMINDERS */}
      {/* REMINDERS (DRAGGABLE) */}
      
{reminders
  .map((reminder, i) => ({
    ...reminder,
    reminderId: `${reminder.role?.name}-${i}`,
    originalIndex: i,
  }))
  .filter((reminder) => !deletedReminders.includes(reminder.reminderId))
  .map((reminder) => {
    const key = reminder.reminderId;
    const i = reminder.originalIndex;

const p = reminderPositions[key] || {
    x: cx + Math.cos((i / reminders.length) * Math.PI * 2) * reminderRadius,
    y: cy + Math.sin((i / reminders.length) * Math.PI * 2) * reminderRadius,
  };

  return (
    <div
  key={key}
  onMouseDown={() =>
    setDragging({
      id: `${reminder.role?.name}-${i}`,
      type: "reminder",
    })
  }
  onTouchStart={() =>
    setDragging({
      id: `${reminder.role?.name}-${i}`,
      type: "reminder",
    })
  }
  onMouseUp={stop}
  onTouchEnd={stop}
  onClick={(e) => {
    e.stopPropagation();

    if (reminder.role.name === "Juggler" ) {
      setJugglerMap((prev) => {
        const current = prev[key] ?? 0;

        return {
          ...prev,
          [key]: current >= 5 ? 0 : current + 1,
        };
      });
    }
    if (reminder.role.name === "Oracle") {
  const oracleKey = reminderKey("Oracle");

  setOracleMap((prev) => {
    const current = prev[oracleKey] ?? 0;

    return {
      ...prev,
      [oracleKey]: current >= 5 ? 0 : current + 1,
    };
  });
}
    if (reminder.role.name === "Mathematician") {
  const mathematicianKey = reminderKey("Mathematician");

  setMathematicianMap((prev) => {
    const current = prev[mathematicianKey] ?? 0;

    return {
      ...prev,
      [mathematicianKey]: current >= 5 ? 0 : current + 1,
    };
  });
}
  }}
  style={{
    position: "absolute",
    left: p.x,
    top: p.y,
    transform: "translate(-50%, -50%)",

    width: 68,
    height: 68,

    backgroundImage: `url(${reminderToken})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    zIndex: 3,
    cursor: "grab",
    touchAction: "none",
  }}
>
  {/* IKONICA ROLE */}
<img
  src={reminder.role?.icon}
  draggable={false}
  style={{
    position: "absolute",
    width: 42,
    height: 42,
    objectFit: "contain",

    left: "50%",
    top: "46%",
    transform: "translate(-50%, -50%)",

    pointerEvents: "none",
  }}
/>

{/* ZAOBLJEN TEKST PREKO IKONICE */}
{reminder.text && (
  <svg
    viewBox="0 0 100 100"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      overflow: "visible",
      pointerEvents: "none",
    }}
  >
    <defs>
      <path
        id={`reminderTextPath-${key}`}
        d="M 15 54 A 36 36 0 0 0 85 54"
        fill="none"
      />
    </defs>

    <text
      fill="white"
      fontSize="9"
      fontWeight="500"
      textAnchor="middle"
      stroke="rgba(0,0,0,0.9)"
      strokeWidth="2"
      paintOrder="stroke"
      letterSpacing="-0.5"
    >
      <textPath
        href={`#reminderTextPath-${key}`}
        startOffset="50%"
      >
        {reminder.role.name === "Juggler"
  ? jugglerMap[key] ?? 0
  : reminder.role.name === "Oracle"
  ? oracleMap[reminderKey("Oracle")] ?? 0
  : reminder.role.name === "Mathematician"
  ? mathematicianMap[reminderKey("Mathematician")] ?? 0
  : reminder.text}
      </textPath>
    </text>
  </svg>
)}
</div>
  );
})}

<>
 {assignedRoles.map((role, assignedIndex) => {
  const key = reminderKey(role.name);
  const p = tokenPositions[key] || { x: 100, y: 100 };
  const firstNightNumber = firstNightNumbers[role.name];
const otherNightNumber = otherNightNumbers[role.name];

  return (
  <>

    {/* TOKEN */}
    <div
      key={key}
      onMouseDown={() =>
        setDragging({
          id: key,
          type: "assignedToken",
        })
      }
      onTouchStart={() =>
        setDragging({
          id: key,
          type: "assignedToken",
        })
      }
      onMouseUp={stop}
      onTouchEnd={stop}
      style={{
        position: "absolute",
        left: p.x,
        top: p.y,
        transform: "translate(-50%, -50%)",
        width: 75,
        height: 75,
        backgroundImage: `url(${circle})`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
      }}
    >
      {/* PLAYER NAME (iznad tokena) */}
      {role.playerName && (
        <div
  style={{
    position: "absolute",
    top: -10,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 10,
    fontWeight: 600,
    color: "white",
    textShadow: "0 1px 3px black",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    background: "rgba(0,0,0,0.3)",
    padding: "3px 12px",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    borderRadius: 6,
    zIndex: 6,
  }}
>
  {role.playerName}
</div>
      )}
      {firstNightNumber && (
  <div
    style={{
      position: "absolute",
      left: -12,
      top: "50%",
      transform: "translateY(-50%)",

      width: 22,
      height: 22,

      borderRadius: 6,

      background: "rgba(120,120,120,0.75)",
      border: "1px solid rgba(255,255,255,0.45)",
      backdropFilter: "blur(3px)",

      color: "white",
      fontSize: 12,
      fontWeight: 700,

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      boxShadow: "0 2px 5px rgba(0,0,0,0.35)",
      textShadow: "0 1px 2px black",

      pointerEvents: "none",
    }}
  >
    {firstNightNumber}
  </div>
)}

{otherNightNumber && (
  <div
    style={{
      position: "absolute",
      right: -12,
      top: "50%",
      transform: "translateY(-50%)",

      width: 22,
      height: 22,

      borderRadius: 6,

      background: "rgba(120,120,120,0.75)",
      border: "1px solid rgba(255,255,255,0.45)",
      backdropFilter: "blur(3px)",

      color: "white",
      fontSize: 12,
      fontWeight: 700,

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      boxShadow: "0 2px 5px rgba(0,0,0,0.35)",
      textShadow: "0 1px 2px black",

      pointerEvents: "none",
    }}
  >
    {otherNightNumber}
  </div>
)}

      {/* ICON */}
      {role.icon && (
        <img
          src={role.icon}
          width={65}
          style={{ marginTop: -15 }}
          draggable={false}
        />
      )}

      {/* NAME */}
      <div
        style={{
          fontSize: 10,
          color: "white",
          lineHeight: 1,
          textShadow: "0 1px 2px black",
          maxWidth: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "0 2px",
          marginTop: "-10px",
        }}
      >
        {role.name}
      </div>

      {/* GEAR / SETTINGS - promena rola */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          setRoleChangeIndex(assignedIndex);
          setRoleChangePick(role);
          setPlayerNameInput(
  assignedRoles[assignedIndex]?.playerName || ""
);
        }}
        title="Role Settings"
        style={{
          position: "absolute",
          left: 26,
          bottom: -12,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "rgba(107, 107, 107, 0.8)",
          border: "1px solid rgba(255,255,255,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          lineHeight: 1,
          cursor: "pointer",
          zIndex: 6,
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        ⚙️
      </div>
    </div>
  </>
  );
})}
</>
{/* DEATH MARKOVI */}
{deathMarks.map((mark) => {
  const attachedPosition = mark.attachedTo
    ? tokenPositions[mark.attachedTo]
    : null;

  const isAttached = Boolean(attachedPosition);

  const x = isAttached
    ? attachedPosition.x
    : mark.x;

  const y = isAttached
    ? attachedPosition.y - 37.5
    : mark.y;

  return (
    <img
      key={mark.id}
      src={deathMark}
      draggable={false}
      onMouseDown={(e) => {
        e.stopPropagation();

        setDragging({
          id: mark.id,
          type: "deathMark",
        });

        setMoved(false);
      }}
      onTouchStart={(e) => {
        e.stopPropagation();

        setDragging({
          id: mark.id,
          type: "deathMark",
        });

        setMoved(false);
      }}
      style={{
        position: "absolute",
        left: x,
        top: y-5.5,

        transform: isAttached
          ? "translate(-50%, 0)"
          : "translate(-50%, -50%)",

        width: 100,
        height: 60,
        objectFit: "contain",

        zIndex: 5,
        cursor: "grab",
        touchAction: "none",
      }}
    />
  );
})}

{/* MENI ZA PROMENU ROLE (klik na zupčanik na tokenu) */}
{roleChangeIndex !== null && (
  <div
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setRoleChangeIndex(null);
        setRoleChangePick(null);
        setPlayerNameInput("");
      }
    }}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 12000,
      background: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      pointerEvents: "auto",
    }}
  >
    {/* X */}
    <button
      onClick={() => {
        setRoleChangeIndex(null);
        setRoleChangePick(null);
        setPlayerNameInput("");
      }}
      style={{
        position: "fixed",
        top: 50,
        right: 15,
        zIndex: 12001,
        fontSize: 26,
        background: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
        pointerEvents: "auto",
      }}
    >
      ✕
    </button>

    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "99%",
        maxWidth: 950,
        height: "90%",
        background: "#111",
        border: "1px solid #444",
        borderRadius: 12,
        overflowY: "auto",
        padding: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ color: "white", textAlign: "center", marginTop: 0 }}>
        Role Settings
      </h2>

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  }}
>
  <label style={{ color: "white", fontSize: 18 }}>
    Name:
  </label>

  <input
    type="text"
    maxLength={10}
    value={playerNameInput}
    onChange={(e) => setPlayerNameInput(e.target.value)}
    style={{
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.3)",
      borderRadius: 8,
      color: "white",
      padding: "6px 10px",
      fontSize: 16,
      width: 150,
    }}
  />
</div>
      <div style={{ flex: 1 }}>
        {visibleRoles &&
          Object.entries(visibleRoles).map(([category, list]) => (
            <div key={category}>
              <h3
                style={{
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                {category}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                {list.map((role) => {
                  const isPicked = roleChangePick?.name === role.name;
                  const isTaken = assignedRoles.some(
                    (r, i) => r.name === role.name && i !== roleChangeIndex
                  );
                  return (
                    <div
                      key={role.name}
                      onClick={() => {
                        if (isTaken) return;
                        setRoleChangePick(role);
                      }}
                      style={{
                        width: "100%",
                        height: 110,
                        background: isPicked
                          ? "rgba(0,255,0,0.16)"
                          : "rgba(255,255,255,0.05)",
                        border: isPicked
                          ? "2px solid lime"
                          : "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        color: "white",
                        cursor: isTaken ? "not-allowed" : "pointer",
                        padding: 4,
                        boxSizing: "border-box",
                        opacity: isTaken ? 0.35 : 1,
                        filter: isTaken ? "grayscale(1)" : "none",
                      }}
                    >
                      {role.icon && (
                        <img
                          src={role.icon}
                          width={80}
                          style={{
                            objectFit: "contain",
                            marginTop: -13,
                          }}
                          draggable={false}
                        />
                      )}

                      <p
                        style={{
                          fontSize: 12,
                          margin: 0,
                          textAlign: "center",
                          lineHeight: 1.1,
                          wordBreak: "break-word",
                        }}
                      >
                        {role.name}
                      </p>

                      {isTaken && (
                        <p
                          style={{
                            fontSize: 9,
                            margin: 0,
                            color: "rgba(255,120,120,0.9)",
                            textAlign: "center",
                          }}
                        >
                          Već u igri
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      {/* SAVE DUGME */}
      <button
        disabled={!roleChangePick}
        onClick={() => applyRoleChange(
  roleChangeIndex,
  roleChangePick,
  playerNameInput
)}
        style={{
          marginTop: 16,
          alignSelf: "center",
          padding: "14px 60px",
          fontSize: 18,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          cursor: !roleChangePick ? "not-allowed" : "pointer",
          opacity: !roleChangePick ? 0.5 : 1,
        }}
      >
        Save
      </button>
    </div>
  </div>
)}
    {temporaryRoles.map((role) => {
      const isReminder = role.tipTokena === 1;
  const p = tokenPositions[role.id] || {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  return (
    <div
      key={role.id}
      onMouseDown={() =>
  setDragging({
    id: role.id,
    type: "temporaryToken",
  })
}
onTouchStart={() =>
  setDragging({
    id: role.id,
    type: "temporaryToken",
  })
}
      onMouseUp={stop}
      onTouchEnd={stop}
      style={{
        position: "absolute",
        left: p.x,
        top: p.y,
        transform: "translate(-50%, -50%)",
        width: isReminder ? 68 : 75,
height: isReminder ? 68 : 75,
backgroundSize: isReminder ? "contain" : "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
        zIndex: 50,
        backgroundImage: `url(${isReminder ? reminderToken : circle})`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isReminder ? (
  <>
    <img
      src={role.baseRole.icon}
      draggable={false}
      style={{
        position: "absolute",
        width: 42,
        height: 42,
        objectFit: "contain",
        left: "50%",
        top: "46%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    />

    <svg
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <defs>
        <path
          id={`tempReminderPath-${role.id}`}
          d="M 15 54 A 36 36 0 0 0 85 54"
          fill="none"
        />
      </defs>

      <text
        fill="white"
        fontSize="9"
        fontWeight="500"
        textAnchor="middle"
        stroke="rgba(0,0,0,0.9)"
        strokeWidth="2"
        paintOrder="stroke"
        letterSpacing="-0.5"
      >
        <textPath
          href={`#tempReminderPath-${role.id}`}
          startOffset="50%"
        >
          {role.label}
        </textPath>
      </text>
    </svg>
  </>
) : (
  <>
    <img
      src={role.baseRole.icon}
      width={65}
      style={{ marginTop: -15 }}
      draggable={false}
    />

    <div
      style={{
        fontSize: 10,
        color: "white",
        textShadow: "0 1px 2px black",
        marginTop: "-10px",
      }}
    >
      {role.baseRole.name}
    </div>

    <div
      style={{
        position: "absolute",
        bottom: -12,
        fontSize: 12,
        color: "black",
      }}
    >
      {role.label}
    </div>
  </>
)}
    </div>
  );
})}

    </div>
  );
}

if (screen === "menu") {
  return (
    <div style={pageStyle(menuBackground)}>
      <div style={{ textAlign: "center", paddingTop: 50 }}>
        
        {/* MAIN TITLE */}
        <img
          src={botcText}
          style={{
            width: 360,
            display: "block",
            margin: "0 auto",
            marginTop: "10px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginTop: 30,
            maxWidth: 260,
            marginInline: "auto",
          }}
        >
          <img
            src={tbLogo}
            style={{
              width: 160,
              cursor: "pointer",
              padding: 8,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(0,0,0,0.25)",
              boxShadow: "0 0 10px rgba(0,0,0,0.35)",
            }}
            onClick={() => {
              setSelectedRoles([]);
              setTemporaryRoles([]);
              setScript("TB");
              setScreen("roles");
              setGamePhase("menu");
            }}
          />

          <img
            src={bmrLogo}
            style={{
              width: 160,
              cursor: "pointer",
              padding: 8,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(0,0,0,0.25)",
              boxShadow: "0 0 10px rgba(0,0,0,0.35)",
            }}
            onClick={() => {
              setSelectedRoles([]);
              setTemporaryRoles([]);
              setScript("BMR");
              setScreen("roles");
              setGamePhase("menu");
            }}
          />

          <img
            src={snvLogo}
            style={{
              width: 160,
              cursor: "pointer",
              padding: 8,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(0,0,0,0.25)",
              boxShadow: "0 0 10px rgba(0,0,0,0.35)",
            }}
            onClick={() => {
              setSelectedRoles([]);
              setTemporaryRoles([]);
              setScript("SNV");
              setScreen("roles");
              setGamePhase("menu");
            }}
          />

           <img
            src={customLogo}
            style={{
              width: 160,
              cursor: "pointer",
              display: "block",
              margin: "0 auto",
              padding: 8,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(0,0,0,0.25)",
              boxShadow: "0 0 10px rgba(0,0,0,0.35)",
            }}
            onClick={() => {
  setSelectedRoles([]);
  setTemporaryRoles([]);
  setScript("CUSTOM");
  setGamePhase("menu");

  if (customScriptRoles.length === 0) {
    setCustomScriptDraft([]);
    setScreen("customScriptSetup");
  } else {
    setScreen("roles");
  }
}}
          />

          {/* CCC */}
          <img
            src={ccc}
            style={{
              width: 140,
              marginTop: 20,
              marginBottom: 25,
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ---------------- CUSTOM SCRIPT SETUP ----------------
if (screen === "customScriptSetup") {
  const toggleCustomDraftRole = (roleName) => {
    setCustomScriptDraft((prev) =>
      prev.includes(roleName)
        ? prev.filter((name) => name !== roleName)
        : [...prev, roleName]
    );
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        padding: 20,
        boxSizing: "border-box",
        background: "#669076",
        color: "white",
        position: "relative",
      }}
    >
      <button
        onClick={() => {
          setScreen("menu");
          setScript(null);
          setCustomScriptDraft([]);
        }}
        style={{
          position: "absolute",
          top: 15,
          left: 15,
          padding: "10px 14px",
          background: "rgba(0,0,0,0.25)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Back
      </button>

      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <img src={customLogo} width={180} 
        style={{
  display: "block",
  margin: "0 auto",
}}/>

        <h2 style={{ marginBottom: 5 }}>
          Choose roles for your Custom Script
        </h2>

        <div>
          Selected: {customScriptDraft.length}
        </div>
      </div>

      {Object.entries(customScript).map(([category, list]) => (
  <div
    key={category}
    style={{
  width: "108%",
  maxWidth: 950,
  margin: "0 auto 30px auto",
  transform: "translateX(-14px)",
}}
  >
    <h3
      style={{
        color: "white",
        textAlign: "center",
        marginBottom: 12,
        textTransform: "capitalize",
        letterSpacing: 1,
        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      {category}
    </h3>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        justifyContent: "center",
      }}
    >
      {list.map((role) => {
        const isSelected = customScriptDraft.includes(role.name);

        return (
          <div
            key={role.name}
            onClick={() => toggleCustomDraftRole(role.name)}
            style={{
              width: "100%",
              height: 145,
              padding: "4px 5px",
              borderRadius: 10,
              cursor: "pointer",
              boxSizing: "border-box",

              background: isSelected
                ? "rgba(0,255,0,0.16)"
                : "rgba(255,255,255,0.07)",

              border: isSelected
                ? "2px solid lime"
                : "1px solid rgba(255,255,255,0.12)",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",

              backdropFilter: "blur(4px)",
            }}
          >
            {/* ROLE NAME */}
            <p
              style={{
                margin: "0 0 2px 0",
                minHeight: 20,
                maxWidth: "100%",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: 10,
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
                lineHeight: 1,

                wordBreak: "break-word",
                whiteSpace: "normal",
                textShadow: "0 1px 3px rgba(0,0,0,0.7)",
              }}
            >
              {role.name}
            </p>

            {/* ROLE ICON */}
            {role.icon ? (
              <img
                src={role.icon}
                draggable={false}
                style={{
                  width: 65,
                  height: 65,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: 65,
                  height: 65,
                  background: "rgba(0,0,0,0.35)",
                  borderRadius: 10,
                  flexShrink: 0,
                }}
              />
            )}

            {/* ROLE DESCRIPTION */}
            <p
              style={{
                margin: "3px 0 0 0",
                width: "100%",

                fontSize: 6.5,
                lineHeight: 1.1,
                textAlign: "center",
                color: "rgba(255,255,255,0.86)",

                wordBreak: "break-word",
                whiteSpace: "normal",
                textShadow: "0 1px 2px rgba(0,0,0,0.65)",
              }}
            >
              {role.description || "No description available."}
            </p>
          </div>
        );
      })}
    </div>
  </div>
))}

      <div
        style={{
          textAlign: "center",
          paddingBottom: 40,
        }}
      >
        <button
  disabled={customScriptDraft.length === 0}
  onClick={() => {
    setCustomScriptRoles([...customScriptDraft]);
    setSelectedRoles([]);
    setGamePhase("menu");
    setScreen("roles");
  }}
          style={{
            padding: "16px 60px",
            fontSize: 20,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.12)",
            color: "white",
            cursor: "pointer",
          }}
        >
          ACCEPT
        </button>
      </div>
    </div>
  );
}

if (gamePhase === "distributionChoice") {
  return (
    <div
      style={{
        ...pageStyle(gameBackground),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: 0, color: "white" }}>Role Distribution</h1>

      <button
        onClick={() => {
          const shuffledRoles = shuffle(pendingRoles);
          setAssignedRoles(shuffledRoles);
          setReminderRoles(shuffledRoles);
          setCurrentPlayer(0);
          setRevealed(false);
          setGamePhase("assign");
        }}
        style={{
  padding: "16px 40px",
  fontSize: 18,
  fontWeight: 600,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.25)",
  background: "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
  color: "white",
  cursor: "pointer",
  width: 280,
  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  transition: "0.2s ease",
}}
      >
        Random Roles Distribution
      </button>

      <button
        onClick={() => {
          setCustomOrderPicks([]);
          setGamePhase("customOrder");
        }}
        style={{
  padding: "16px 40px",
  fontSize: 18,
  fontWeight: 600,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.25)",
  background: "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
  color: "white",
  cursor: "pointer",
  width: 280,
  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  transition: "0.2s ease",
}}
      >
        Custom Role Distribution
      </button>
    </div>
  );
}

if (gamePhase === "customOrder") {
  const toggleOrderPick = (role) => {
    setCustomOrderPicks((prev) => {
      const already = prev.some((r) => r.name === role.name);
      if (already) {
        return prev.filter((r) => r.name !== role.name);
      }
      return [...prev, role];
    });
  };

  return (
    <div
      style={{
        ...pageStyle(gameBackground),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        textAlign: "center",
        padding: "24px 16px",
        overflowY: "auto",
      }}
    >
      <h1 style={{ marginTop: 70, color: "white" }}>Custom Role Distribution</h1>
      <p style={{ color: "white", opacity: 0.7, maxWidth: 420 }}>
        Select the roles in the order you want players to receive them (first click = Player 1, second click = Player 2, and so on).
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          maxWidth: 480,
          width: "100%",
        }}
      >
        {pendingRoles.map((role) => {
          const orderIndex = customOrderPicks.findIndex(
            (r) => r.name === role.name
          );
          const isPicked = orderIndex !== -1;

          return (
            <div
              key={role.name}
              onClick={() => toggleOrderPick(role)}
              style={{
                position: "relative",
                width: "100%",
                height: 110,
                background: isPicked
                  ? "rgba(0,255,0,0.16)"
                  : "rgba(255,255,255,0.05)",
                border: isPicked
                  ? "2px solid lime"
                  : "1px solid rgba(255,255,255,0.2)",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                color: "white",
                cursor: "pointer",
                padding: 4,
                boxSizing: "border-box",
              }}
            >
              {isPicked && (
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    left: 4,
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: "lime",
                    color: "black",
                    fontSize: 12,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {orderIndex + 1}
                </div>
              )}

              {role.icon && (
                <img
                  src={role.icon}
                  width={80}
                  style={{ objectFit: "contain", marginTop: -13 }}
                  draggable={false}
                />
              )}

              <p
                style={{
                  fontSize: 12,
                  margin: 0,
                  textAlign: "center",
                  lineHeight: 1.1,
                  wordBreak: "break-word",
                }}
              >
                {role.name}
              </p>
            </div>
          );
        })}
      </div>

      <button
        disabled={customOrderPicks.length !== pendingRoles.length}
        onClick={() => {
          setAssignedRoles(customOrderPicks);
          setReminderRoles(customOrderPicks);
          setCurrentPlayer(0);
          setRevealed(false);
          setGamePhase("assign");
        }}
        style={{
          marginTop: 8,
          padding: "16px 60px",
          fontSize: 18,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          cursor:
            customOrderPicks.length !== pendingRoles.length
              ? "not-allowed"
              : "pointer",
          opacity:
            customOrderPicks.length !== pendingRoles.length ? 0.5 : 1,
        }}
      >
        Confirm ({customOrderPicks.length}/{pendingRoles.length})
      </button>
    </div>
  );
}

  // ---------------- ASSIGN ----------------
  if (gamePhase === "assign") {
  const role = assignedRoles[currentPlayer];

  const getRoleType = (name) => {
    if (troubleBrewing?.townsfolk?.some((r) => r.name === name)) return "Townsfolk";
    if (troubleBrewing?.outsiders?.some((r) => r.name === name)) return "Outsider";
    if (troubleBrewing?.minions?.some((r) => r.name === name)) return "Minion";
    if (troubleBrewing?.demon?.some((r) => r.name === name)) return "Demon";

    if (badMoonRising?.townsfolk?.some((r) => r.name === name)) return "Townsfolk";
    if (badMoonRising?.outsiders?.some((r) => r.name === name)) return "Outsider";
    if (badMoonRising?.minions?.some((r) => r.name === name)) return "Minion";
    if (badMoonRising?.demon?.some((r) => r.name === name)) return "Demon";

    if (sectsAndViolets?.townsfolk?.some((r) => r.name === name)) return "Townsfolk";
    if (sectsAndViolets?.outsiders?.some((r) => r.name === name)) return "Outsider";
    if (sectsAndViolets?.minions?.some((r) => r.name === name)) return "Minion";
    if (sectsAndViolets?.demon?.some((r) => r.name === name)) return "Demon";

    if (customScript?.townsfolk?.some((r) => r.name === name)) return "Townsfolk";
    if (customScript?.outsiders?.some((r) => r.name === name)) return "Outsider";
    if (customScript?.minions?.some((r) => r.name === name)) return "Minion";
    if (customScript?.demon?.some((r) => r.name === name)) return "Demon";

    return "";
  };

  const roleType = getRoleType(role.name);

  return (
    <div
      style={{
        ...pageStyle(gameBackground),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        textAlign: "center",
      }}
    >
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          style={{
            padding: "14px 26px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}
        >
          Reveal Role
        </button>
      ) : (
        <>
          <h1 style={{ margin: 0 }}>{role.name}</h1>

          {/* ROLE TYPE */}
          <div
            style={{
              color: "white",
              fontSize: 16,
              opacity: 0.7,
              letterSpacing: 1,
              marginTop: -8,
            }}
          >
            {roleType}
          </div>

          {/* TOKEN */}
          <div
            style={{
              width: 150,
              height: 150,
              backgroundImage: `url(${circle})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))",
            }}
          >
            {role.icon && (
              <img
                src={role.icon}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                }}
                draggable={false}
              />
            )}
          </div>

          {/* DESCRIPTION */}
          <div
            style={{
              maxWidth: 420,
              marginTop: 8,
              padding: "12px 16px",
              background: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 12,
              color: "white",
            }}
          >
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {role.description || "No description available."}
            </p>
          </div>

          {/* HIDE BUTTON */}
          <button
            onClick={() => {
              setRevealed(false);

              if (currentPlayer + 1 < assignedRoles.length) {
                setCurrentPlayer((p) => p + 1);
              } else {
                setGamePhase("finished");
              }
            }}
            style={{
              padding: "14px 26px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(120,0,0,0.55)",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            Hide Role
          </button>
        </>
      )}
    </div>
  );
}

  // ---------------- FINISHED ----------------
  if (gamePhase === "finished") {
  return (
    <div
      style={{
        ...pageStyle(gameBackground),
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 18,
        color: "white",
      }}
    >
      <h1 style={{ margin: 0 }}>All roles distributed</h1>

      <button
        onClick={() => setGamePhase("game")}
        style={{
          padding: "16px 32px",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(80,0,120,0.5))",
          color: "white",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          transition: "0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      >
        Start Game
      </button>
    </div>
  );
}
// ---------------- ROLES ----------------
return (
  <div
  style={{
    minHeight: "100dvh",
    width: "100%",
    padding: 20,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    background:
      script === "TB"
        ? "#c75a5a"
        : script === "BMR"
        ? "#cf8a45"
        : script === "SNV"
        ? "#8a63c7"
        : "#669076",
  }}
>
    {/* BACK BUTTON */}
    <button
      onClick={() => {
        setScreen("menu");
        setSelectedRoles([]);
        setGamePhase("menu");
        setScript(null);
      }}
      style={{
        position: "absolute",
        top: 15,
        left: 15,
        padding: "10px 14px",
        background: "rgba(0,0,0,0.25)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 8,
      }}
    >
      Back
    </button>

    {script === "CUSTOM" && (
  <button
    onClick={() => {
  setCustomScriptDraft([]);
  setCustomScriptRoles([]);
  setSelectedRoles([]);
  setScreen("customScriptSetup");
}}
    style={{
      position: "absolute",
      top: 15,
      right: 15,
      padding: "10px 14px",
      background: "rgba(120,0,0,0.55)",
      color: "white",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: 8,
      cursor: "pointer",
      zIndex: 10,
    }}
  >
    Reset Script
  </button>
)}

{showAllRolesMenu && (
  <div
    onClick={() => setShowAllRolesMenu(false)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.9)",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "90%",
        maxWidth: 1000,
        maxHeight: "90%",
        overflowY: "auto",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 12,
        padding: 20,
        position: "relative",
      }}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={() => setShowAllRolesMenu(false)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 34,
          height: 34,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.4)",
          color: "white",
          cursor: "pointer",
          fontSize: 18,
          lineHeight: "34px",
        }}
      >
        ×
      </button>

      <h2 style={{ color: "white", textAlign: "center" }}>
        All Roles
      </h2>

      {roles &&
        Object.entries(roles).map(([category, list]) => (
          <div key={category} style={{ marginTop: 20 }}>
            <h3 style={{ color: "white", textAlign: "center" }}>
              {category}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
  {list.map((role) => (
    <div
      key={role.name}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: 10,
        borderRadius: 10,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 80,
          marginLeft: -10,
        }}
      >
        {role.icon ? (
          <img
            src={role.icon}
            width={50}
            height={50}
            style={{ objectFit: "contain" }}
            draggable={false}
          />
        ) : (
          <div
            style={{
              width: 50,
              height: 50,
              background: "#333",
              borderRadius: 6,
            }}
          />
        )}

        <div
          style={{
            color: "white",
            fontSize: 10,
            fontWeight: 500,
            textAlign: "center",
            marginTop: 4,
          }}
        >
          {role.name}
        </div>
      </div>

      {/* RIGHT SIDE (DESCRIPTION) */}
      <div
        style={{
          flex: 1,
          color: "rgba(255,255,255,0.75)",
          fontSize: 12,
          lineHeight: 1.2,
          textAlign: "left",
        }}
      >
        {role.description || "No description available."}
      </div>
    </div>
  ))}
</div>
          </div>
        ))}
    </div>
  </div>
)}

    {/* HEADER LOGO */}
    <div
      style={{
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      {script === "TB" && <img src={tbLogo} width={180} />}
      {script === "BMR" && <img src={bmrLogo} width={180} />}
      {script === "SNV" && <img src={snvLogo} width={180} />}
       {script === "CUSTOM" && <img src={customLogo} width={180} />}
    </div>

    {/* ROLES LIST */}
{visibleRoles &&
  Object.entries(visibleRoles).map(([category, list]) => (
        <div
          key={category}
          style={{
            width: "108%",
            maxWidth: 950,
            marginBottom: 30,
          }}
        >
          <h3
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: 12,
              textTransform: "capitalize",
              letterSpacing: 1,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {category}
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {list.map((role) => (
  <div
    key={role.name}
    onClick={() => toggleRole(role.name)}
    style={{
  width: "100%",
height: 145,
padding: "4px 5px",
borderRadius: 10,

  background: selectedRoles.includes(role.name)
    ? "rgba(0,255,0,0.16)"
    : "rgba(255,255,255,0.07)",

  border: selectedRoles.includes(role.name)
    ? "2px solid lime"
    : "1px solid rgba(255,255,255,0.12)",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",

  padding: "6px 8px",
  boxSizing: "border-box",

  backdropFilter: "blur(4px)",
}}
  >
    {/* ROLE NAME */}
    <p
      style={{
  fontSize: 10,
minHeight: 20,
maxWidth: "100%",
margin: "0 0 2px 0",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  fontWeight: "bold",
  textAlign: "center",
  color: "white",
  lineHeight: 1,

  wordBreak: "break-word",
  whiteSpace: "normal",
  textShadow: "0 1px 3px rgba(0,0,0,0.7)",
}}
    >
      {role.name}
    </p>

    {/* ROLE ICON */}
    {role.icon ? (
      <img
        src={role.icon}
        draggable={false}
        style={{
  width: 65,
height: 65,
  objectFit: "contain",
  flexShrink: 0,
}}
      />
    ) : (
      <div
        style={{
          width: 105,
          height: 105,
          background: "rgba(0,0,0,0.35)",
          borderRadius: 10,
          flexShrink: 0,
        }}
      />
    )}

    {/* ROLE DESCRIPTION */}
    <p
      style={{
  margin: "4px 0 0 0",
  width: "100%",

  fontSize: 7,
  lineHeight: 1.2,
  textAlign: "center",
  color: "rgba(255,255,255,0.86)",

  wordBreak: "break-word",
  whiteSpace: "normal",
  textShadow: "0 1px 2px rgba(0,0,0,0.65)",
}}
    >
      {role.description || "No description available."}
    </p>
  </div>
))}
          </div>
        </div>
      ))}

      {/* PLAYER COUNT INFO */}
<div
  style={{
    marginBottom: 15,
    padding: "8px 14px",
    borderRadius: 10,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    fontSize: 13,
    textAlign: "center",
  }}
>
  {playerCountImage && (
    <img
      src={playerCountImage}
      style={{
        width: 300,
        height: "auto",
        display: "block",
        margin: "0 auto",
      }}
      draggable={false}
    />
  )}
</div>

    {/* FOOTER */}
    <div
      style={{
        marginTop: 20,
        textAlign: "center",
        color: "white",
        paddingBottom: 40,
      }}
    >
      <div
  style={{
    marginBottom: 15,
    fontSize: 16,
    lineHeight: 1.5,
    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
  }}
>
  <div
    style={{
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    }}
  >
    Selected roles:
  </div>

  <div>
    Townsfolk -{" "}
    {roles?.townsfolk?.filter((role) =>
      selectedRoles.includes(role.name)
    ).length || 0}
  </div>

  <div>
    Outsiders -{" "}
    {roles?.outsiders?.filter((role) =>
      selectedRoles.includes(role.name)
    ).length || 0}
  </div>

  <div>
    Minions -{" "}
    {roles?.minions?.filter((role) =>
      selectedRoles.includes(role.name)
    ).length || 0}
  </div>

  <div>
    Demons -{" "}
    {roles?.demon?.filter((role) =>
      selectedRoles.includes(role.name)
    ).length || 0}
  </div>
</div>

      <button
        disabled={selectedRoles.length === 0}
        onClick={() => {
          const picked = selectedRoles
            .filter((name) => name !== "Drunk")
            .map((name) => visibleFlatRoles.find((r) => r.name === name))
            .filter(Boolean);

          setPendingRoles(picked);
          setCustomOrderPicks([]);
          setCurrentPlayer(0);
          setRevealed(false);
          setGamePhase("distributionChoice");

          const hasDrunk = selectedRoles.includes("Drunk");
          setDrunkEnabled(hasDrunk ? 1 : 0);
        }}
        style={{
          padding: "16px 60px",
          fontSize: 20,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          cursor:
            selectedRoles.length === 0
              ? "not-allowed"
              : "pointer",
          opacity: selectedRoles.length === 0 ? 0.5 : 1,
        }}
      >
        Accept
      </button>
    </div>
  </div>
);
}