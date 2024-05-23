import { Session } from "./session/sessionModel";
import { User } from "./user/userModel";

// Inyectar todos los modelos.
export const ModelsDependencies = [User, Session];
