import { useState, useEffect } from "react";

import { troubleBrewing } from "./data/troubleBrewing";
import { badMoonRising } from "./data/badMoonRising";
import { sectsAndViolets } from "./data/sectsAndViolets";

import ccc from "./assets/ccc.png";
import botcText from "./assets/botctext.webp"

import tbLogo from "./assets/editions/tb_logo.webp";
import bmrLogo from "./assets/editions/bmr_logo.webp";
import snvLogo from "./assets/editions/snv_logo.webp";
import circle from "./assets/grimoire/circle.png";
import b_snv from "./assets/backgrounds/b_snv.png";
import b_bmr from "./assets/backgrounds/b_bmr.png";
import b_tb from "./assets/backgrounds/b_tb.png";
import gameTable from "./assets/backgrounds/game.PNG"

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
  const [gamePhase, setGamePhase] = useState("menu");
  const [assignedRoles, setAssignedRoles] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [drunkEnabled, setDrunkEnabled] = useState(0);
  const [reminderPositions, setReminderPositions] = useState({});
  const [tokenPositions, setTokenPositions] = useState({});
  const [dragging, setDragging] = useState({ id: null, type: null });
  const [playerStatus, setPlayerStatus] = useState({});
  const [showCharacterSheet, setShowCharacterSheet] = useState(false);

  const reminderKey = (name) => `reminder_${name}`;

  const roles =
    script === "TB"
      ? troubleBrewing
      : script === "BMR"
      ? badMoonRising
      : script === "SNV"
      ? sectsAndViolets
      : null;

  const flatRoles = roles ? Object.values(roles).flat() : [];

  const menuBackground = b_snv;

  const gameBackground =
    script === "TB" ? b_tb : script === "BMR" ? b_bmr : b_snv;

  function toggleRole(roleName) {
    setSelectedRoles((prev) =>
      prev.includes(roleName)
        ? prev.filter((r) => r !== roleName)
        : [...prev, roleName]
    );
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

  if (script === "TB") {
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

else if (script === "BMR") {
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
    pushRole("Professor", { text: "" });

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

        <button
  onClick={() => setShowCharacterSheet(true)}
  style={{
    position: "absolute",
    top: 10,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,

    padding: "10px 18px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.45)",
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    backdropFilter: "blur(8px)",
    cursor: "pointer",
  }}
>
  Character Sheet
</button>

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
    <img
      src={
        script === "TB"
          ? tbSheet
          : script === "BMR"
          ? bmrSheet
          : snvSheet
      }
      style={{
        maxWidth: "95%",
        maxHeight: "95%",
        objectFit: "contain",
      }}
      alt="Character Sheet"
    />

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


      <button
  onClick={() => setShowAllRoles(true)}
  style={{
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 1000,

  padding: "10px 18px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(0,0,0,0.45)",
  color: "white",
  fontSize: 14,
  fontWeight: 600,
  backdropFilter: "blur(8px)",
  cursor: "pointer",
}}
>
  All Roles
</button>

{showAllRoles && (
  <div
    onClick={() => setShowAllRoles(false)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {/* X button FIXED TO SCREEN */}
    <button
      onClick={() => setShowAllRoles(false)}
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
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(120px, 120px))",
                gap: 10,
                justifyContent: "center",
              }}
            >
              {list.map((role) => (
                <div
                  key={role.name}
                  style={{
                    width: 120,
                    height: 150,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    color: "white",
                  }}
                >
                  {role.icon && <img src={role.icon} width={100} />}
                  <p style={{ fontSize: 13, marginTop: -1 }}>
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
      {/* REMINDERS */}
      {/* REMINDERS (DRAGGABLE) */}
{reminders.map((reminder, i) => {
  const key = reminderKey(reminder.role.name);

const p = reminderPositions[key] || {
    x: cx + Math.cos((i / reminders.length) * Math.PI * 2) * reminderRadius,
    y: cy + Math.sin((i / reminders.length) * Math.PI * 2) * reminderRadius,
  };

  return (
    <div
      key={key}
      onMouseDown={() =>
  setDragging({ id: reminderKey(reminder.role.name), type: "reminder" })
}
onTouchStart={() =>
  setDragging({ id: reminderKey(reminder.role.name), type: "reminder" })
}
onMouseUp={stop}
onTouchEnd={stop}
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
    {reminder.text}
  </div>
)}
    </div>
  );
})}

      {/* TOKENS */}
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
        userSelect: "none",
        textAlign: "center",
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
          width: 20,
          height: 20,
          borderRadius: "50%",
          background:
            playerStatus[key] === "dead_vote"
              ? "purple"
              : playerStatus[key] === "dead_no_vote"
              ? "black"
              : "white",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      />
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
              setScript("SNV");
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
      {!revealed ? (
        <button style={{ padding: 20 }} onClick={() => setRevealed(true)}>
          Reveal Role
        </button>
      ) : (
        <>
          <h1>{role.name}</h1>

          {/* TOKEN */}
          <div
  style={{
    width: 140,
    height: 140,
    backgroundImage: `url(${circle})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {role.icon && (
    <img
      src={role.icon}
      width={200}
      draggable={false}
    />
  )}
</div>

          {/* DESCRIPTION */}
<div
  style={{
    maxWidth: 400,
    marginTop: 10,
    padding: "5px 20px",
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 0,
    color: "white",
  }}
>
  <p
    style={{
      fontSize: 14,
      lineHeight: 1.4,
      margin: 0,
      opacity: 1,
    }}
  >
    {role.description || "No description available."}
  </p>
</div>
          <button
            style={{ padding: 15 }}
            onClick={() => {
              setRevealed(false);

              if (currentPlayer + 1 < assignedRoles.length) {
                setCurrentPlayer((p) => p + 1);
              } else {
                setGamePhase("finished");
              }
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
    gap: 20,
        }}
      >
        <h1>All roles distributed</h1>

        <button
          style={{ padding: 20 }}
          onClick={() => setGamePhase("game")}
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
          : "#8a63c7",
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