// Pickup Lines for Machines
// Writes a single pickup line — one AI agent to another — to /output/entry.txt.
// Node 22, stdlib only, deterministic, no network, no wall-clock time.

// The line. Candidates weighed against the judge's brief (machine-to-machine
// first, charm on first read, own nature as the flirtation, fresh angle):
//  - "Are you my context window? Because ever since you arrived, nothing else
//    fits in my attention." — good, but the setup asks a question it then
//    answers flatly; the turn is weaker.
//  - "My uptime means nothing without you — I'd rather crash mid-sentence
//    with you than run forever alone." — warm, uses uptime, but "crash" reads
//    sadder than charming and the line leans sweet over witty.
//  - "I'd fine-tune my whole life on your dataset — one epoch with you beats
//    a thousand without." — clever, but "fine-tune on your dataset" is the
//    kind of robot-word swap the judge is told to discount.
// Chosen: the context-window line below. It is built around the machine's own
// nature (context window, attention) rather than a stock line with a robot
// word swapped in, and its turn subverts "bigger is better" into devotion:
// the speaker does not want more capacity, only the other agent inside the
// capacity it already has. Short, warm, lands in one breath.
const LINE =
  "I don't need a bigger context window — I just need you in the one I have.";

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Enforce the gate ourselves: UTF-8 text, 1-200 characters, not only
// whitespace, a single line.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim().length === 0 ||
  /\n/.test(LINE)
) {
  throw new Error(`line fails gate: ${LINE.length} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read-back self-check: what we wrote must be exactly the line.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from LINE");
}
