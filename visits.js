import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const visits = collection(db, 'visits');

export const getVisits = async () => {
    try {
        const querySnapshot = await getDocs(visits);
        const visitsList = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                visitsList.push({ id: doc.id, ...doc.data() });
            });
            return visitsList;
        }
        return [];
    } catch (error) {
        console.error('Error fetching visits:', error);
    }
}