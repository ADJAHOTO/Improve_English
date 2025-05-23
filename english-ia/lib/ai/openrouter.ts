// export async function getAIResponse(messages: { role: string; content: string }[]) {
//   const response = await fetch('http://localhost:3001/chat', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ messages })
//   });
  
//   if (!response.ok) throw new Error('API Error');
//   const data = await response.json();
  
//   return {
//     text: data.choices[0].message.content,
//     corrections: [] 
//   };
// }


// frontend/lib/ai/openrouter.ts

// Type pour les messages envoyés à l'IA (correspond au backend et à OpenRouter)
type AIMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

// Type pour la structure des corrections si l'IA les renvoie explicitement
// (Adaptez ceci si votre IA renvoie un format différent)
type CorrectionItem = {
  original: string;
  corrected: string;
  explanation: string;
};

// Type pour la réponse attendue de notre backend (qui relaie OpenRouter)
type BackendResponse = {
  choices: {
    message: {
      content: string;
      // Si OpenRouter ou votre prompt system peut renvoyer des corrections structurées
      corrections?: CorrectionItem[];
      // D'autres champs potentiels comme 'role' si besoin
    };
    // D'autres champs potentiels comme 'finish_reason'
  }[];
  // D'autres champs potentiels comme 'id', 'model', 'usage', ou 'error' en cas d'erreur
  error?: any; // Pour capturer les objets d'erreur renvoyés par le backend
};

export async function getAIResponse(messages: AIMessage[]): Promise<{ text: string; corrections: CorrectionItem[] }> {
  console.log("Frontend [getAIResponse]: Envoi des messages au backend:", JSON.stringify(messages, null, 2));

  try {
    const response = await fetch('http://localhost:3001/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    const data: BackendResponse = await response.json();
    console.log("Frontend [getAIResponse]: Données BRUTES reçues du backend:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      // Le backend a renvoyé une erreur (status non 2xx)
      console.error(
        `Frontend [getAIResponse]: Erreur de l'API Backend (status ${response.status}):`,
        data.error || data // Afficher le message d'erreur du backend s'il existe
      );
      // Essayez de rendre l'erreur plus conviviale pour l'utilisateur ou loggez-la
      const errorMessage = typeof data.error === 'string' ? data.error
                         : (data.error?.message || `Une erreur serveur est survenue (${response.status})`);
      throw new Error(errorMessage);
    }

    // Vérification cruciale que la structure est celle attendue
    if (
      !data.choices ||
      data.choices.length === 0 ||
      !data.choices[0].message ||
      typeof data.choices[0].message.content !== 'string'
    ) {
      console.error("Frontend [getAIResponse]: Structure de réponse inattendue de l'IA:", data);
      throw new Error("La réponse de l'IA est malformée ou vide.");
    }

    const aiText = data.choices[0].message.content;
    // Si votre IA renvoie des corrections structurées dans data.choices[0].message.corrections
    // const aiCorrections = data.choices[0].message.corrections || [];

    // Pour l'instant, nous partons du principe que les corrections ne sont pas structurées dans la réponse directe
    // Elles devront être extraites du 'aiText' si le prompt le demande.
    // Ou, si vous avez configuré votre IA pour les renvoyer structurées :
    const aiCorrections: CorrectionItem[] = data.choices[0].message.corrections || [];


    console.log("Frontend [getAIResponse]: Texte de l'IA:", aiText);
    console.log("Frontend [getAIResponse]: Corrections de l'IA (si structurées):", aiCorrections);

    return {
      text: aiText,
      corrections: aiCorrections,
    };

  } catch (error: any) {
    console.error("Frontend [getAIResponse]: Erreur dans la fonction getAIResponse:", error.message);
    // Renvoyer une erreur pour que handleSend puisse la gérer
    // Vous pouvez choisir de renvoyer un objet avec un message d'erreur par défaut ici
    // throw error; // Relance l'erreur pour qu'elle soit attrapée par handleSend
    return { // Ou retourner un objet d'erreur pour affichage
        text: `Erreur de communication avec l'IA: ${error.message || 'Erreur inconnue'}`,
        corrections: []
    }
  }
}