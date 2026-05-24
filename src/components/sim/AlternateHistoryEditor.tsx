"use client";

import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { GROUP_LETTERS, type GroupLetter } from "@/lib/types";
import { useGroupsStore } from "@/store/groupsStore";
import { useSimStore } from "@/store/simStore";
import { TEAMS_BY_NAME } from "@/data/teams";
import { Button } from "@/components/ui/Button";
import { TeamFlag } from "@/components/ui/OfficialFlag";

type ItemId = `${GroupLetter}:${number}`;

function parseId(id: string): { group: GroupLetter; index: number } {
  const [g, i] = id.split(":");
  return { group: g as GroupLetter, index: Number(i) };
}

export function AlternateHistoryEditor() {
  const groups = useGroupsStore((s) => s.groups);
  const swap = useGroupsStore((s) => s.swap);
  const reset = useGroupsStore((s) => s.reset);
  const modified = useGroupsStore((s) => s.isModified());
  const resetSim = useSimStore((s) => s.resetAll);
  const [active, setActive] = useState<ItemId | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function onStart(e: DragStartEvent) {
    setActive(e.active.id as ItemId);
  }
  function onEnd(e: DragEndEvent) {
    setActive(null);
    if (!e.over) return;
    const a = parseId(String(e.active.id));
    const b = parseId(String(e.over.id));
    if (a.group === b.group && a.index === b.index) return;
    swap(a, b);
    resetSim();
  }

  return (
    <section className="surface relative overflow-hidden rounded-3xl p-6">
      <span aria-hidden className="absolute inset-0 grid-fade opacity-30" />
      <header className="relative flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--electric)]">
            What if mode
          </p>
          <h2 className="display mt-2 text-3xl text-white sm:text-4xl">
            Alternate <span className="electric-sweep">history.</span>
          </h2>
          <p className="mt-1 max-w-xl text-xs text-white/60">
            Drag any team into another slot to rewrite the draw. The simulator
            will rebuild every result from scratch.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {modified && (
            <span className="rounded-full bg-[var(--electric)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--electric)]">
              Draw modified
            </span>
          )}
          <Button onClick={reset} variant="ghost" size="sm">
            Restore real draw
          </Button>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onStart}
        onDragEnd={onEnd}
      >
        <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GROUP_LETTERS.map((g) => (
            <GroupCard key={g} g={g} teams={groups[g].teams} />
          ))}
        </div>
        <DragOverlay>
          {active ? <FloatingChip name={teamFromId(active)} /> : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}

function teamFromId(id: ItemId): string {
  const { group, index } = parseId(id);
  return useGroupsStore.getState().groups[group].teams[index];
}

function GroupCard({ g, teams }: { g: GroupLetter; teams: string[] }) {
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_88%,black)] p-3">
      <div className="flex items-center gap-2 px-1 pb-2">
        <span className="display text-2xl text-[var(--electric)]">{g}</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
          Group {g}
        </span>
      </div>
      <ul className="space-y-1.5">
        <AnimatePresence initial={false}>
          {teams.map((name, i) => (
            <Slot key={`${g}:${i}-${name}`} g={g} index={i} name={name} />
          ))}
        </AnimatePresence>
      </ul>
    </article>
  );
}

function Slot({
  g,
  index,
  name,
}: {
  g: GroupLetter;
  index: number;
  name: string;
}) {
  const id = `${g}:${index}` as ItemId;
  const { setNodeRef: setDrop, isOver } = useDroppable({ id });
  const { attributes, listeners, setNodeRef: setDrag, isDragging } = useDraggable({ id });

  function combinedRef(node: HTMLLIElement | null) {
    setDrop(node);
    setDrag(node);
  }

  const t = TEAMS_BY_NAME[name];
  return (
    <motion.li
      layout
      ref={combinedRef}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className={`flex cursor-grab items-center gap-2 rounded-lg border px-2 py-1.5 text-sm transition active:cursor-grabbing ${
        isOver
          ? "border-[var(--electric)] bg-[var(--electric)]/10 glow-electric"
          : "border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_70%,black)] hover:border-white/25"
      } ${isDragging ? "opacity-25" : ""}`}
    >
      {t ? (
        <TeamFlag team={t} size={12} variant="circle" />
      ) : (
        <span
          aria-hidden
          className="inline-block h-3 w-3 shrink-0 rounded-full bg-[var(--line)]"
        />
      )}
      <span className="truncate text-white/90">{name}</span>
      <span className="ml-auto text-[10px] font-mono text-white/35">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.li>
  );
}

function FloatingChip({ name }: { name: string }) {
  const t = TEAMS_BY_NAME[name];
  return (
    <div className="glow-electric flex items-center gap-2 rounded-lg border border-[var(--electric)] bg-[color-mix(in_oklab,var(--bg)_70%,black)] px-3 py-2 text-sm shadow-2xl">
      {t ? (
        <TeamFlag team={t} size={14} variant="circle" />
      ) : (
        <span
          aria-hidden
          className="inline-block h-3.5 w-3.5 rounded-full bg-[var(--line)]"
        />
      )}
      <span className="font-medium text-white">{name}</span>
    </div>
  );
}
