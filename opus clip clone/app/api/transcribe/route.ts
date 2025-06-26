import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { audioUrl } = await request.json()

    // Ici vous intégreriez l'API Whisper d'OpenAI
    // ou un service de transcription comme AssemblyAI

    const mockTranscription = {
      text: "Bonjour et bienvenue dans cette vidéo où je vais vous expliquer les secrets du succès. Le premier point important c'est la persévérance...",
      segments: [
        {
          start: 0,
          end: 5.2,
          text: "Bonjour et bienvenue dans cette vidéo",
        },
        {
          start: 5.2,
          end: 12.8,
          text: "où je vais vous expliquer les secrets du succès",
        },
      ],
    }

    return NextResponse.json(mockTranscription)
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la transcription" }, { status: 500 })
  }
}
