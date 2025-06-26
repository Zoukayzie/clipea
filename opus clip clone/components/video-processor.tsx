"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VideoProcessorProps {
  file?: File
  youtubeUrl?: string
  onComplete: (clips: any[]) => void
}

export function VideoProcessor({ file, youtubeUrl, onComplete }: VideoProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState("")
  const [progress, setProgress] = useState(0)

  const processVideo = async () => {
    setIsProcessing(true)

    try {
      // Étape 1: Upload/Récupération de la vidéo
      setCurrentStep("Préparation de la vidéo...")
      setProgress(10)

      // Étape 2: Extraction audio et transcription
      setCurrentStep("Transcription avec Whisper AI...")
      setProgress(30)

      const transcriptionResponse = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audioUrl: file ? URL.createObjectURL(file) : youtubeUrl,
        }),
      })

      const transcription = await transcriptionResponse.json()

      // Étape 3: Analyse du contenu
      setCurrentStep("Analyse intelligente du contenu...")
      setProgress(50)

      const analysisResponse = await fetch("/api/analyze-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: transcription.text }),
      })

      const analysis = await analysisResponse.json()

      // Étape 4: Génération des clips
      setCurrentStep("Génération des clips optimisés...")
      setProgress(70)

      const clips = []
      for (const moment of analysis.keyMoments) {
        const clipResponse = await fetch("/api/generate-clip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            videoUrl: file ? URL.createObjectURL(file) : youtubeUrl,
            startTime: moment.startTime,
            endTime: moment.endTime,
            title: analysis.suggestedTitles[clips.length] || "Clip généré",
            subtitle: moment.reason,
          }),
        })

        const clip = await clipResponse.json()
        clips.push({
          ...clip,
          score: moment.score,
          transcript: transcription.segments
            .filter((s) => s.start >= moment.startTime && s.end <= moment.endTime)
            .map((s) => s.text)
            .join(" "),
        })
      }

      setCurrentStep("Finalisation...")
      setProgress(100)

      setTimeout(() => {
        onComplete(clips)
        setIsProcessing(false)
      }, 1000)
    } catch (error) {
      console.error("Erreur lors du traitement:", error)
      setIsProcessing(false)
    }
  }

  if (!isProcessing) {
    return (
      <Button onClick={processVideo} className="w-full bg-purple-600 hover:bg-purple-700">
        Commencer le traitement
      </Button>
    )
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle>Traitement en cours...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">{currentStep}</p>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500 text-center">{progress}% terminé</p>
        </div>
      </CardContent>
    </Card>
  )
}
