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

## Getting Pavlok API credentials (high level)
1. **Create a Pavlok developer account** and register your app/device in their dashboard.
2. **Obtain an API key or OAuth client** (depending on Pavlok’s latest auth flow).
3. **Pair the user’s Pavlok device** and store the resulting access token **only** on the backend.
4. **Rotate credentials** periodically and provide a way to revoke access from the app.

> Note: Exact steps can change; confirm current Pavlok 3 API docs before implementation.

## Backend implementation suggestions
- **Lightweight stack:** Node/Express or Firebase Functions.
- **Auth:** App login with JWT; map app user -> Pavlok device.
- **Secrets:** Store Pavlok tokens in a secrets manager or encrypted DB field.
- **Observability:** Structured logs for zap attempts, failures, and outcomes.

## Local development with .env (backend-only)
For local development, you can keep credentials in a `.env` file **on the backend** (never inside the Android app build).

**Example `.env` file (local only):**
```
PAVLOK_API_BASE_URL=https://api.pavlok.com
PAVLOK_CLIENT_ID=your_client_id
PAVLOK_CLIENT_SECRET=your_client_secret
PAVLOK_ACCESS_TOKEN=your_test_access_token
PAVLOK_DEVICE_ID=your_device_id
```

**Guidelines:**
- Add `.env` to `.gitignore`.
- Load via `dotenv` (Node) or environment config in your backend framework.
- Use test tokens and low-intensity defaults in dev.

## Step-by-step development guide (local)
1. **Clone and open the project.**
   - Ensure you have Android Studio Flamingo+ and JDK 17 installed.
2. **Create your local backend folder (example).**
   - Create a `server/` directory in your workspace (separate from the Android app).
   - Initialize Node/Express or Firebase Functions per your preference.
3. **Add your Pavlok credentials to `.env` (backend only).**
   - Use the sample `.env` above and keep it out of version control.
4. **Implement a minimal `/zap` endpoint.**
   - Accept `userId`, `intensity`, `duration`, and `reason`.
   - Call Pavlok’s API using the access token stored server-side.
5. **Run the backend locally.**
   - Confirm `POST /zap` responds with success for a test user/device.
6. **Configure the Android app for local testing.**
   - Set a dev backend base URL via Gradle property:
     - In `~/.gradle/gradle.properties` add `PAVLOK_DEV_BASE_URL=http://10.0.2.2:3000`
     - Or use `local.properties` (not committed) with the same key.
7. **Build and run the Android app.**
   - Use Android Studio or Gradle: `./gradlew :app:assembleDevDebug`.
8. **Test the end-of-day flow.**
   - Temporarily set the end-of-day time to a few minutes ahead.
   - Confirm the WorkManager job fires and hits your backend.
9. **Verify safety checks.**
   - Confirm only one zap is triggered per day and that intensity caps apply.
10. **Iterate on UI and backend logic.**
   - Add zap history UI, settings, and pairing verification.

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
