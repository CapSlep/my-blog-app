import { Firestore } from "firebase/firestore";
import { createContext } from "react";

export const FirestoreContext = createContext<Firestore>(Firestore.prototype);
