import { useState, useEffect } from "react";

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
  const [tokenPositions, setTokenPositions] = useState({});
  const [dragging, setDragging] = useState({ id: null, type: null });
  const [playerStatus, setPlayerStatus] = useState({});
  const [showCharacterSheet, setShowCharacterSheet] = useState(false);
  const [jugglerMap, setJugglerMap] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [temporaryRoles, setTemporaryRoles] = useState([]);
  const [moved, setMoved] = useState(false);
  const [tokenMark, setTokenMark] = useState({});
  const [showPromptMenu, setShowPromptMenu] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [customReminders, setCustomReminders] = useState([]);
  const closeModal = () => {
  setSelectedRole(null);
  setShowAllRoles(false);
};

  const reminderKey = (name) => `reminder_${name}`;

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
    "xaan",
    "poisoner",
    "widow",
    "courtier",
    "wizard",
    "snakecharmer",
    "godfather",
    "organgrinder",
    "devilsadvocate",
    "eviltwin",
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
    "fortuneteller",
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
    "villageidiot",
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
    "xaan",
    "poisoner",
    "courtier",
    "innkeeper",
    "wizard",
    "gambler",
    "acrobat",
    "snakecharmer",
    "monk",
    "organgrinder",
    "devilsadvocate",
    "witch",
    "cerenovus",
    "pithag",
    "fearmonger",
    "harpy",
    "mezepheles",
    "scarletwoman",
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
    "fanggu",
    "nodashii",
    "vortox",
    "lordoftyphon",
    "vigormortis",
    "ojo",
    "alhadikhia",
    "lleech",
    "lilmonsta",
    "yaggababble",
    "kazali",
    "assassin",
    "godfather",
    "gossip",
    "hatter",
    "barber",
    "sweetheart",
    "plaguedoctor",
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
    "fortuneteller",
    "undertaker",
    "dreamer",
    "flowergirl",
    "towncrier",
    "oracle",
    "seamstress",
    "juggler",
    "balloonist",
    "villageidiot",
    "king",
    "bountyhunter",
    "nightwatchman",
    "cultleader",
    "butler",
    "spy",
    "highpriestess",
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
  if (!assignedRoles?.length) return { first: [], other: [] };

  const selected = new Set(
    assignedRoles.map((r) => r.name.toLowerCase())
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
  function handleMove(e) {
    if (!dragging.id) return;
    setMoved(true);
    if (e.cancelable) e.preventDefault();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    if (dragging.type === "reminder") {
      setReminderPositions((prev) => ({
        ...prev,
        [dragging.id]: { x, y },
      }));
    }

    if (dragging.type === "token") {
      setTokenPositions((prev) => ({
        ...prev,
        [dragging.id]: { x, y },
      }));
    }
  }

  function stop() {
    setDragging({ id: null, type: null });
    setMoved(false);
  }

  window.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseup", stop);
  window.addEventListener("touchmove", handleMove);
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
const cy = window.innerHeight / 2;

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

  setTokenPositions(positions);
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
    assignedRoles.some((r) => r.name === name);

  if (script === "TB" || script == "CUSTOM") {
  if (hasRole("Fortune Teller"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Fortune Teller"),
      text: "RED HERRING",
    });

  if (hasRole("Monk"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Monk"),
      text: "SAVED",
    });

  if (hasRole("Slayer"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Slayer"),
      text: "ABILITY",
    });

  if (hasRole("Virgin"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Virgin"),
      text: "ABILITY",
    });

  if (hasRole("Butler"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Butler"),
      text: "MASTER",
    });

  if (drunkEnabled === 1) {
    reminders.push({
      role: {
        name: "Drunk",
        icon: drunkIcon,
      },
      text: "DRUNK",
    });
  }

  if (hasRole("Poisoner"))
    reminders.push({
      role: flatRoles.find((r) => r.name === "Poisoner"),
      text: "POISONED",
    });
}

if (script === "BMR" || script == "CUSTOM") {
  const getRole = (name) =>
    badMoonRising.townsfolk
      .concat(badMoonRising.outsiders)
      .concat(badMoonRising.minions)
      .concat(badMoonRising.demon)
      .find((r) => r.name === name);

  const pushRole = (name, extra = {}) => {
    const role = getRole(name);
    if (!role) return;

    reminders.push({
      role: {
        name: role.name,
        icon: role.icon,
        description: role.description || "",
      },
      text: extra.text || "",
    });
  };

  if (hasRole("Grandmother"))
    reminders.push({
      role: {
        ...getRole("Grandmother"),
        name: "Grandchild",
        description: getRole("Grandmother")?.description || "",
      },
      text: "GRANDCHILD",
    });

  if (hasRole("Sailor"))
    reminders.push({
      role: {
        ...getRole("Sailor"),
        name: "Sailor Drunk",
        description: getRole("Sailor")?.description || "",
      },
      text: "DRUNK",
    });

  if (hasRole("Innkeeper")) {
    reminders.push(
      {
        role: {
          ...getRole("Innkeeper"),
          name: "Innkeeper Drunk",
          description: getRole("Innkeeper")?.description || "",
        },
        text: "DRUNK",
      },
      {
        role: {
          ...getRole("Innkeeper"),
          name: "Innkeeper Saved",
          description: getRole("Innkeeper")?.description || "",
        },
        text: "SAVED",
      }
    );
  }

  if (hasRole("Courtier")) {
    reminders.push(
      {
        role: {
          ...getRole("Courtier"),
          name: "Courtier 1",
          description: getRole("Courtier")?.description || "",
        },
        text: "DRUNK 1",
      },
      {
        role: {
          ...getRole("Courtier"),
          name: "Courtier 2",
          description: getRole("Courtier")?.description || "",
        },
        text: "DRUNK 2",
      },
      {
        role: {
          ...getRole("Courtier"),
          name: "Courtier 3",
          description: getRole("Courtier")?.description || "",
        },
        text: "DRUNK 3",
      }
    );
  }

  if (hasRole("Professor"))
    pushRole("Professor", { text: "ABILITY" });

  if (hasRole("Minstrel"))
    reminders.push({
      role: {
        ...getRole("Minstrel"),
        description: getRole("Minstrel")?.description || "",
      },
      text: "EVERYONE IS DRUNK",
    });

  if (hasRole("Tea Lady")) {
    reminders.push(
      {
        role: {
          ...getRole("Tea Lady"),
          name: "Tea Lady 1",
          description: getRole("Tea Lady")?.description || "",
        },
        text: "SAVED",
      },
      {
        role: {
          ...getRole("Tea Lady"),
          name: "Tea Lady 2",
          description: getRole("Tea Lady")?.description || "",
        },
        text: "SAVED",
      }
    );
  }

  if (hasRole("Fool"))
    reminders.push({
      role: {
        ...getRole("Fool"),
        description: getRole("Fool")?.description || "",
      },
      text: "ABILITY",
    });

    if (hasRole("Gossip"))
    reminders.push({
      role: {
        ...getRole("Gossip"),
        description: getRole("Gossip")?.description || "",
      },
      text: "ABILITY",
    });

  if (hasRole("Goon"))
    reminders.push({
      role: {
        ...getRole("Goon"),
        name: "Goon Drunk",
        description: getRole("Goon")?.description || "",
      },
      text: "DRUNK",
    });

  if (hasRole("Devil's Advocate"))
    reminders.push({
      role: {
        ...getRole("Devil's Advocate"),
        description: getRole("Devil's Advocate")?.description || "",
      },
      text: "SAVED",
    });

  if (hasRole("Assassin"))
    reminders.push({
      role: {
        ...getRole("Assassin"),
        description: getRole("Assassin")?.description || "",
      },
      text: "ABILITY",
    });

  if (hasRole("Pukka"))
    reminders.push({
      role: {
        ...getRole("Pukka"),
        description: getRole("Pukka")?.description || "",
      },
      text: "POISONED",
    });

  if (hasRole("Po"))
    reminders.push({
      role: {
        ...getRole("Po"),
        description: getRole("Po")?.description || "",
      },
      text: "3 ATTACKS",
    });
}
if (script === "SNV" || script == "CUSTOM") {
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

  // Snake Charmer
  if (hasRole("Snake Charmer"))
    pushRole(getRole("Snake Charmer"), "POISONED");

  // Seamstress
  if (hasRole("Seamstress"))
    pushRole(getRole("Seamstress"), "ABILITY");

  // Philosopher (2 reminders)
  if (hasRole("Philosopher")) {
    const r = getRole("Philosopher");
    pushRole(r, "ABILITY");
    pushRole(r, "DRUNK");
  }

  // Artist
  if (hasRole("Artist"))
    pushRole(getRole("Artist"), "ABILITY");

  // Juggler (STATE 0–5)
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

  // Sweetheart
  if (hasRole("Sweetheart"))
    pushRole(getRole("Sweetheart"), "DRUNK");

  // Evil Twin
  if (hasRole("Evil Twin"))
    pushRole(getRole("Evil Twin"), "GOOD TWIN");

  // Witch
  if (hasRole("Witch"))
    pushRole(getRole("Witch"), "ABILITY");

  // Vigormortis (2 reminders)
  if (hasRole("Vigormortis")) {
    const r = getRole("Vigormortis");
    pushRole(r, "POISONED");
    pushRole(r, "ALIVE");
  }

  // No Dashii (2 poison reminders)
  if (hasRole("No Dashii")) {
    const r = getRole("No Dashii");
    pushRole(r, "POISONED");
    pushRole(r, "POISONED");
  }

  // Vortox (2 reminders)
  if (hasRole("Vortox")) {
    const r = getRole("Vortox");
    pushRole(r, "ALL POISONED");
    pushRole(r, "ABILITY");
  }
}
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const reminderRadius = 70;

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
      {/* END GAME */}
      <button
        onClick={() => {
          setGamePhase("menu");
          setScreen("menu");
          setScript(null);
          setSelectedRoles([]);
          setAssignedRoles([]);
          setTemporaryRoles([]);
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
        { label: "Character Sheet", action: () => setShowCharacterSheet(true) },
        { label: "Night Order", action: () => setShowNightOrder(true) },
        { label: "All Roles", action: () => setShowAllRoles(true) },
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

{showNightOrder && (
  <div
    onClick={() => setShowNightOrder(false)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 99999,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "90%",
        maxWidth: 700,
        maxHeight: "85%",
        overflowY: "auto",
        background: "#111",
        border: "1px solid #444",
        borderRadius: 12,
        padding: 20,
        position: "relative",
      }}
    >
      {/* X BUTTON */}
      <button
        onClick={() => setShowNightOrder(false)}
        style={{
  position: "absolute",
  top: 10,
  right: 10,
  width: 40,
  height: 40,
  background: "transparent",
  border: "none",
  outline: "none",
  color: "white",
  fontSize: 26,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
}}
      >
        ✕
      </button>

      <h2 style={{ color: "white" }}>Night Order</h2>

      {(() => {
        const { first, other } = getNightOrderRoles();

        const renderRow = (role) => (
          <div
            key={role.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 8,
              marginBottom: 6,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 10,
              color: "white",
            }}
          >
            <img
              src={role.icon}
              style={{ width: 70, height: 70, objectFit: "contain" }}
            />
            <span>{role.name}</span>
          </div>
        );

        return (
          <>
            <h3 style={{ color: "white", marginTop: 10 }}>
              First Night
            </h3>
            {first.map(renderRow)}

            <h3 style={{ color: "white", marginTop: 20 }}>
              Other Nights
            </h3>
            {other.map(renderRow)}
          </>
        );
      })()}
    </div>
  </div>
)}

{showCharacterSheet && (
  <div
    onClick={() => setShowCharacterSheet(false)}
    style={{
      
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(0,0,0,0.95)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }} 
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "95%",
        maxWidth: 1300,
        maxHeight: "90%",
        overflowY: "auto",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 12,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        Character Sheet
      </h2>

      {assignedRoles.map((role, index) => (
        <div
          key={`${role.name}_${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: 1,
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* TOKEN + NAME */}
<div
  style={{
    width: 50,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 1,
  }}
>
  <div
    style={{
      width: 30,
      height: 30,
      backgroundImage: `url(${circle})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src={role.icon}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  </div>

  <div
    style={{
      color: "white",
      fontSize: 7,
      fontWeight: 550,
      lineHeight: 1.1,
    }}
  >
    {role.name}
  </div>
</div>

          {/* DESCRIPTION */}
          <div
            style={{
              flex: 1,
              color: "white",
              opacity: 0.9,
              lineHeight: 1.2,
              fontSize: 9,
            }}
          >
            {role.description}
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={() => setShowCharacterSheet(false)}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        fontSize: 30,
        background: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
      }}
    >
      ✕
    </button>
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

      {roles &&
  Object.entries(roles).map(([category, list]) => (
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
            onClick={() => setSelectedRole(role)}
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
      onClick={() => setShowPromptMenu(false)}
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
              label: customPrompt || "PROMPT",
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
              label: customPrompt || "PROMPT",
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

    <div
      style={{
        width: "100%",
        padding: 20,
        display: "flex",
        justifyContent: "center",
        gap: 20,
        position: "absolute",
        bottom: 0,
      }}
    >
      {/* PIT-HAG */}
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
              label: "PIT-HAG",
            },
          ]);

          setTokenPositions((prev) => ({
            ...prev,
            [id]: {
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
            },
          }));

          setSelectedRole(null);
          setShowAllRoles(false);
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
        PIT-HAG
      </button>

      {/* CERENOVUS */}
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
              label: "CERENOVUS",
            },
          ]);

          setTokenPositions((prev) => ({
            ...prev,
            [id]: {
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
            },
          }));

          setSelectedRole(null);
          setShowAllRoles(false);
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
        CERENOVUS
      </button>
    </div>
  </div>
)}

      {/* REMINDERS */}
      {/* REMINDERS (DRAGGABLE) */}
{reminders.map((reminder, i) => {
  const key = `${reminder.role?.name}-${i}`;
  const allReminders = [
  ...(reminders || []),
  ...(customReminders || []),
];

const p = reminderPositions[key] || {
    x: cx + Math.cos((i / reminders.length) * Math.PI * 2) * reminderRadius,
    y: cy + Math.sin((i / reminders.length) * Math.PI * 2) * reminderRadius,
  };

  return (
    <div
      key={key}
      onMouseDown={() =>
  setDragging({ id: `${reminder.role?.name}-${i}`, type: "reminder" })
}
      onTouchStart={() =>
        setDragging({ id: `${reminder.role?.name}-${i}`, type: "reminder" })
      }
      onMouseUp={stop}
      onTouchEnd={stop}
      onClick={(e) => {
              e.stopPropagation();

              if (reminder.role.name === "Juggler") {
  setJugglerMap((prev) => {
    const current = prev[key] ?? 0;
    return {
      ...prev,
      [key]: current >= 5 ? 0 : current + 1,
    };
  });
}
            }}
      style={{
        position: "absolute",
        left: p.x,
        top: p.y,
        transform: "translate(-50%, -50%)",
        width: 50,
        height: 50,
        backgroundImage: `url(${circle})`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3,
      }}
    >
      <img
        src={reminder.role?.icon}
        style={{
          width: 52,
          height: 52,
          objectFit: "contain",
        }}
        draggable={false}
      />

      {reminder.text && (
  <div
    style={{
      position: "absolute",
      bottom: 7,
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: 6,
      fontWeight: "bold",
      color: "black",
      textAlign: "center",
      width: "100%",
      lineHeight: 1,
      pointerEvents: "none",
    }}
  >
    {reminder.role.name === "Juggler"
  ? (jugglerMap[key] ?? 0)
  : reminder.text}
  </div>
)}
    </div>
  );
})}

<>
 {assignedRoles.map((role) => {
  const key = reminderKey(role.name);
  const p = tokenPositions[key] || { x: 100, y: 100 };

  return (
    <div
      key={key}
      onMouseDown={() => setDragging({ id: key, type: "token" })}
      onTouchStart={() => setDragging({ id: key, type: "token" })}
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
      }}
    >
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

      {/* STATUS DOT */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          cycleStatus(key);
        }}
        style={{
  position: "absolute",
  top: 4,
  right: 4,
  width: 17,
  height: 17,
  borderRadius: "50%",
  background:
    playerStatus[key] === "dead_vote"
      ? "purple"
      : playerStatus[key] === "dead_no_vote"
      ? "black"
      : "white",

  border: "1px solid black",
  boxSizing: "border-box",
  cursor: "pointer",
}}
      />
    </div>
  );
})}
</>
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
        setDragging({ id: role.id, type: "token" })
      }
      onTouchStart={() =>
        setDragging({ id: role.id, type: "token" })
      }
      onMouseUp={stop}
      onTouchEnd={stop}
      style={{
        position: "absolute",
        left: p.x,
        top: p.y,
        transform: "translate(-50%, -50%)",
        width: isReminder ? 50 : 75,
        height: isReminder ? 50 : 75,
        zIndex: 50,
        backgroundImage: `url(${circle})`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
  src={role.baseRole.icon}
  width={isReminder ? 45 : 65}
  style={{
    marginTop: isReminder ? 0 : -15,
  }}
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
          fontSize: 10,
          color: "black",
          fontWeight: "bold",
        }}
      >
        {role.label}
      </div>
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
              setScreen("roles");
              setGamePhase("menu");
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

      <button
  onClick={() => setShowAllRolesMenu(true)}
  style={{
    position: "absolute",
    top: 15,
    right: 15,
    padding: "10px 14px",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8,
    cursor: "pointer",
  }}
>
  All Roles
</button>

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

    {/* ROLES LIST */}
    {roles &&
      Object.entries(roles).map(([category, list]) => (
        <div
          key={category}
          style={{
            width: "120%",
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
              gridTemplateColumns:
                "repeat(auto-fit, minmax(120px, 120px))",
              gap: 12,
              justifyContent: "center",
            }}
          >
            {list.map((role) => (
              <div
                key={role.name}
                onClick={() => toggleRole(role.name)}
                style={{
                  width: 120,
                  height: 150,
                  borderRadius: 12,
                  cursor: "pointer",

                  background: selectedRoles.includes(role.name)
                    ? "rgba(0,255,0,0.18)"
                    : "rgba(255,255,255,0.05)",

                  border: selectedRoles.includes(role.name)
                    ? "2px solid lime"
                    : "1px solid rgba(255,255,255,0.08)",

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0,
                  padding: 2,
                }}
              >
                {role.icon ? (
                  <img
                    src={role.icon}
                    width={110}
                    draggable={false}
                  />
                ) : (
                  <div
                    style={{
                      width: 65,
                      height: 65,
                      background: "#333",
                    }}
                  />
                )}

                <p
  style={{
    fontSize: 14,
    marginBottom: 25,
    textAlign: "center",
    color: "white",
    lineHeight: 1,
    textShadow: "0 1px 3px rgba(0,0,0,0.5)",

    maxWidth: 110,        // isto kao ikonica
    wordBreak: "break-word",
    whiteSpace: "normal",
  }}
>
  {role.name}
</p>
              </div>
            ))}
          </div>
        </div>
      ))}

    {/* FOOTER */}
    <div
      style={{
        marginTop: 20,
        textAlign: "center",
        color: "white",
        paddingBottom: 40,
      }}
    >
      <p
        style={{
          marginBottom: 15,
          fontSize: 18,
          textShadow: "0 1px 3px rgba(0,0,0,0.4)",
        }}
      >
        Selected roles: {selectedRoles.length}
      </p>

      <button
        disabled={selectedRoles.length === 0}
        onClick={() => {
          const picked = selectedRoles
            .filter((name) => name !== "Drunk")
            .map((name) => flatRoles.find((r) => r.name === name))
            .filter(Boolean);

          setAssignedRoles(shuffle(picked));
          setCurrentPlayer(0);
          setRevealed(false);
          setGamePhase("assign");

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