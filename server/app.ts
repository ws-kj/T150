import UserConcept from "./concepts/user";
import WebSessionConcept from "./concepts/websession";
import WorkoutConcept from "./concepts/workout";
import MeterConcept from "./concepts/meters";
import PRConcept from "./concepts/prs";

// App Definition using concepts
export const User = new UserConcept();
export const WebSession = new WebSessionConcept();
export const Workout = new WorkoutConcept();
export const Meter = new MeterConcept();
export const PR = new PRConcept();
