"use client";

import { auth, db } from "@/lib/firebase/config";
import { useEffect } from "react";

export default function TestFirebase() {
  useEffect(() => {
    if (auth && db) {
      console.log("Firebase Auth:", auth);
      console.log("Firebase Firestore:", db);
    } else {
      console.log("Firebase n'est pas initialisé côté client");
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Test Firebase</h1>
      <p>Vérifiez la console pour les objets Firebase</p>
    </div>
  );
}