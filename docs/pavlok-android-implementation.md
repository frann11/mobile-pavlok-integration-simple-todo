# Pavlok 3 + Android todo habit builder: implementation recommendations

## Product concept recap
Build a simple Android todo app where tasks are scoped per day. At the end of the day, if any tasks remain incomplete, trigger a Pavlok “zap” (haptic shock/buzz) via the Pavlok 3 API to reinforce habit completion.

## Recommended architecture (two safe options)
- **Option A: Backend + Android app (recommended for safety)**
  - **Why:** Keeps Pavlok credentials off-device and allows centralized rate limits, auditing, and safety checks.
  - **Android app (Kotlin, MVVM)** as the client for tasks, schedules, and user settings.
  - **Backend service** handles Pavlok API calls, stores Pavlok tokens, and records zap history.
- **Option B: Direct API from Android (only for prototypes)**
  - Use only for short-lived prototypes or private builds.
  - Requires obfuscation and secure storage, but still risks token exposure.
  - Strongly recommend upgrading to Option A before public release.

## Core Android stack
- **Android app (Kotlin, MVVM)**
  - UI: Jetpack Compose (fast iteration for the todo list and daily completion state).
  - State: ViewModel + StateFlow for today’s tasks and completion progress.
  - Storage: Room database (tasks, completions, daily summaries).
- **Scheduler/trigger logic**
  - App schedules a daily “end-of-day” check using WorkManager.
  - Use a unique WorkManager chain with “replace” policy to prevent duplicates.
  - On check, app calls backend endpoint to trigger zap if incomplete tasks exist.
  - Support user-configured time zone and end-of-day time.

## Data model suggestions
- **Task**: id, title, notes, createdAt, isActive
- **DailyTaskCompletion**: id, taskId, date (YYYY-MM-DD), isCompleted, completedAt
- **DailySummary**: date, totalTasks, completedTasks, completionRate
- **ZapHistory**: id, date, intensity, duration, reason, status, createdAt

## End-of-day zap logic (reference algorithm)
1. Determine **target date** using user’s end-of-day time and time zone.
2. Fetch daily completion for that date.
3. If `completedTasks < totalTasks`, trigger zap.
4. Mark daily summary as “zapSent” to avoid duplicates.
5. If `totalTasks == 0`, skip zap (no tasks = no penalty).

Add **safety checks**:
- Prevent multiple zaps in a single day.
- Cap intensity and duration to safe, user-controlled levels.
- Allow a “grace period” (e.g., 15–30 minutes).
- Add a “panic cancel” toggle to disable zaps for 24 hours if needed.

## Pavlok API integration notes
- Store Pavlok access token on the backend; mobile app authenticates via its own login.
- Provide backend endpoints:
  - `POST /zap`: body includes `userId`, `intensity`, `duration`, `reason`.
  - `GET /status`: verify device pairing and readiness.
  - `GET /history`: return recent zaps for audit/UI history.
- Log zap requests for auditing and user transparency.
- Use server-side rate limits and a per-user daily zap cap (e.g., 1/day).

## Backend implementation suggestions
- **Lightweight stack:** Node/Express or Firebase Functions.
- **Auth:** App login with JWT; map app user -> Pavlok device.
- **Secrets:** Store Pavlok tokens in a secrets manager or encrypted DB field.
- **Observability:** Structured logs for zap attempts, failures, and outcomes.

## Habit-building features to consider (high impact)
1. **Daily intent setting**: Each morning, prompt user to confirm top 3 tasks.
2. **Streak tracking**: Visual streak for days without zap.
3. **Partial credit**: Reduce zap intensity if >70% completion.
4. **Reflection prompt**: If zapped, ask “What blocked you today?”
5. **Rewards**: Give positive reinforcement for 100% days (badges or notes).
6. **Optional escalation**: Increase intensity only after repeated misses.
7. **Timeboxing**: Offer “focus blocks” and encourage a single priority task.
8. **Accountability export**: Weekly summary you can share or review.

## Privacy & safety
- Explicit user consent for shock/zap features.
- Offer “safe mode” (buzz-only) for new users.
- Clear disclaimers and opt-out controls.
- Include a first-run wizard that explains how zap logic works.

## Suggested MVP scope
- Tasks list (add/complete/remove).
- Daily completion view.
- End-of-day scheduler.
- Backend zap endpoint.
- Basic zap logging/history.
- Settings: end-of-day time, timezone override, intensity level.

## Technical risks / mitigations
- **Battery/background restrictions**: Use WorkManager + exact alarm fallback.
- **Time zone changes**: Store tasks with local date + offset.
- **Token security**: Use backend with short-lived tokens or server-side token storage.
- **Device pairing issues**: Add a guided pairing/verification flow.

## Next steps
1. Confirm Pavlok 3 API docs and auth flow.
2. Design minimal backend (e.g., Node/Express or Firebase Functions).
3. Create Android app skeleton with Room + Compose.
4. Implement daily scheduler and test for multiple time zones.
5. Validate zap safety logic with user settings.
6. Add a small beta cohort to tune intensity defaults and messaging tone.
