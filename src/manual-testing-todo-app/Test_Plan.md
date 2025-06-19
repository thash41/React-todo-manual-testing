#  Test Plan – To-Do App (React)

## 1. Objective
To validate the functionality of a React-based To-Do application through manual testing.

## 2. Scope
- In Scope: Task addition, deletion, completion, filtering, priority setting, due date, drag-and-drop.
- Out of Scope: Backend/API, database testing.

## 3. Features to Be Tested
- Add Task
- Delete Task
- Mark Task Complete/Incomplete
- Set Due Date and Priority
- Filter Tasks (All, Active, Completed)
- Reorder Tasks (Drag & Drop)

## 4. Testing Approach
Manual functional testing using Chrome browser on local development server.

## 5. Environment
- OS: Windows 11
- Browser: Google Chrome (Latest)
- Framework: React + Vite
- Tools: Excel, GitHub, Screenshots

## 6. Deliverables
- Test Plan
- Test Cases Document
- Bug Report
- README

## 7. Risk and Mitigation
| Risk                     | Mitigation                  |
|------------------------  |--------------------------   |
| Task not saving properly | Verify logic in `onAddTask` |
| UI breaking on filters   | Test all filter buttons     |
