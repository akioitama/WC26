"use client";

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GROUP_LETTERS, type GroupLetter } from "@/lib/types";
import { useSimStore } from "@/store/simStore";
import { TeamSimCard } from "./TeamSimCard";

function SortableTeam({
  id,
  name,
  rank,
}: {
  id: string;
  name: string;
  rank: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : undefined,
      }}
    >
      <TeamSimCard
        name={name}
        rank={rank}
        dragHandle={
          <button
            type="button"
            className="cursor-grab touch-none px-1 text-[var(--fg)]/35 hover:text-[var(--accent)] active:cursor-grabbing"
            aria-label={`Drag to reorder ${name}`}
            {...attributes}
            {...listeners}
          >
            ⠿
          </button>
        }
      />
    </div>
  );
}

function GroupCard({ group, idx }: { group: GroupLetter; idx: number }) {
  const order = useSimStore((s) => s.groupRankings[group]);
  const setGroupOrder = useSimStore((s) => s.setGroupOrder);
  const mode = useSimStore((s) => s.mode);
  const ids = order.map((_, i) => `${group}:${i}`);

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    setGroupOrder(group, arrayMove(order, oldIndex, newIndex));
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  );

  return (
    <motion.article
      id={`group-${group}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.45, delay: idx * 0.03 }}
      className="surface overflow-hidden rounded-2xl"
    >
      <div className="flex items-center justify-between border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_88%,black)] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="display text-3xl text-[var(--accent)]">{group}</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--fg)]/55">
            Group {group}
          </span>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--fg)]/40">
          Drag to rank
        </span>
      </div>

      <div className="space-y-1.5 p-3">
        {mode === "manual" ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
              {order.map((name, i) => (
                <SortableTeam
                  key={`${group}-${name}`}
                  id={`${group}:${i}`}
                  name={name}
                  rank={i}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          order.map((name, i) => (
            <TeamSimCard key={name} name={name} rank={i} />
          ))
        )}
      </div>

      <div className="border-t border-[var(--line)] px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[var(--fg)]/40">
        1st & 2nd → R32 · 3rd may advance · 4th out
      </div>
    </motion.article>
  );
}

export function GroupRankingPanel() {
  const mode = useSimStore((s) => s.mode);

  return (
    <section className="space-y-6">
      <header className="border-b border-[var(--line)] pb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
          Phase 1 · Group stage
        </p>
        <h2 className="display mt-2 text-4xl text-[var(--fg)] sm:text-5xl">
          Rank your groups
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--fg)]/65">
          {mode === "manual"
            ? "Drag teams into 1st–4th place in each group. No score entry needed — the bracket builds automatically."
            : "AI has predicted group standings based on ELO, FIFA rankings, form, injuries, and squad strength."}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {GROUP_LETTERS.map((g, idx) => (
          <GroupCard key={g} group={g} idx={idx} />
        ))}
      </div>
    </section>
  );
}
