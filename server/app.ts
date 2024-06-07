import UserConcept from "./concepts/user";
import WebSessionConcept from "./concepts/websession";
import WorkoutConcept from "./concepts/workout";
import RecordConcept from "./concepts/records";

// App Definition using concepts
export const User = new UserConcept();
export const WebSession = new WebSessionConcept();
export const Workout = new WorkoutConcept();
export const Record = new RecordConcept();
