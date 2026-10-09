# Portfolio Workflow

This is the canonical project instruction file. README and all tracked documentation must be written in English; the Brazilian Portuguese product interface and archived source may remain in their original language.

## Scope and preservation

- Work directly in the default checkout on the actual remote default branch (currently `master`). Do not create branches or worktrees for portfolio maintenance.
- Preserve dirty work and all existing assets. If an existing sibling worktree contains an uncommitted delivery, commit it there in a coherent preservation commit solely for integration, then do subsequent work in the default checkout.
- Integrate preexisting feature branches only after checking their changes and proving they are preserved on the default branch. Detach a clean sibling at its preserved commit before deleting its merged branch; retain the worktree, ignored assets and running demo.
- When the user explicitly requests cleanup, preserve committed code and any ignored local data first, then let the coordinator remove completed non-main worktrees headlessly after accepting worker settlement. Remove Orca project registration only afterward, keeping the default repository and GitHub code intact. Never remove the active worker’s project registration mid-dispatch.
- Delete safely merged local/remote branches normally only after preservation evidence is available. Never use a forced deletion to bypass ancestry checks.
- Never overwrite dirty work, use `reset --hard`, force-push, rewrite published history, kill unrelated processes or touch business repositories.
- Keep changes focused on the requested portfolio delivery. Do not introduce unsolicited redesigns, framework migrations or new product scope.

## Commits and delivery

- The portfolio workflow authorizes coherent atomic commits and normal pushes directly to the default branch. Keep preservation, verification and documentation changes logically separate where useful.
- Inspect remote/default status before integrating; use fast-forward integration when possible. Avoid concurrent edits to this repository.
- Check server-port ownership before starting a server, especially port 5173. Preserve an existing demo and use an available alternative port for verification.
- Run meaningful calculation tests, TypeScript checks and a production build. Exercise the actual flow in the authorized browser when feasible and state any unverified behavior precisely.
- Wait for existing CI after push or document its absence. Do not claim CI ran when only local checks ran.
- Prefix shell commands with `rtk`; use `rtk proxy` for unsupported commands or exact raw output.

## Browser and coordination

- Resolve Orca with the version-matched CLI guide, `orca status --json` and `orca worktree current --json` before browser actions. Reuse a suitable tab from this workspace's `orca tab list --json`, creating one here only when needed.
- Use this worktree's embedded Orca browser exclusively, with stable `browserPageId` values for concurrent tabs. Do not borrow authenticated tabs from another workspace or fall back to external browser automation.
- During a supervised dispatch, do not create nested workers. Send checkpoints, blockers and final evidence through the assigned Orca orchestration commands, and check follow-ups at natural checkpoints.
- Ask the coordinator about blockers instead of opening a user-input UI. Do not post to Slack, GitHub comments or other channels without an explicit instruction.

## Product honesty and artwork

- Rates and caps are editable illustrative scenarios. Never present them as verified current Shopee official rates or provide fiscal advice.
- Preserve the distinction between revenue after fees and profit after modeled costs; quantity represents identical units in a batch.
- Do not fabricate screenshots, GIFs or substitute artwork. The coordinator handles generated README artwork separately; describe the exact remaining visual needs.
- Record tests, commits, branch inventory, integration evidence and remaining screenshot/documentation needs in the delivery report requested by the coordinator.
