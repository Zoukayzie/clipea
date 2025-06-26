"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Link, Sparkles, Download, Play, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Clip {
  id: string
  title: string
  subtitle: string
  startTime: number
  endTime: number
  duration: number
  transcript: string
  score: number
  thumbnail: string
}

export default function Clipea() {
  const [activeTab, setActiveTab] = useState("upload")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState("")
  const [progress, setProgress] = useState(0)
  const [clips, setClips] = useState<Clip[]>([])
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setUploadedFile(file)
    }
  }

  const processVideo = async () => {
    setIsProcessing(true)
    setProgress(0)

    // Simulation du processus de traitement
    const steps = [
      "Analyse de la vidéo...",
      "Transcription audio avec Whisper...",
      "Détection des moments clés...",
      "Génération des titres avec GPT-4...",
      "Création des clips...",
      "Génération des sous-titres...",
    ]

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i])
      setProgress(((i + 1) / steps.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    // Simulation de clips générés
    const mockClips: Clip[] = [
      {
        id: "1",
        title: "Le secret du succès révélé",
        subtitle: "Une technique révolutionnaire",
        startTime: 120,
        endTime: 180,
        duration: 60,
        transcript:
          "Le vrai secret du succès, c'est la persévérance. Beaucoup de gens abandonnent juste avant le moment où ils auraient réussi.",
        score: 95,
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "2",
        title: "Erreur fatale à éviter",
        subtitle: "Ne faites jamais ça !",
        startTime: 300,
        endTime: 375,
        duration: 75,
        transcript:
          "L'erreur que font 90% des entrepreneurs, c'est de vouloir tout faire parfaitement dès le début. C'est une perte de temps énorme.",
        score: 88,
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "3",
        title: "Astuce méconnue des pros",
        subtitle: "Technique avancée",
        startTime: 450,
        endTime: 495,
        duration: 45,
        transcript:
          "Voici une astuce que peu de gens connaissent : commencez toujours par la fin. Visualisez votre objectif final.",
        score: 82,
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
    ]

    setClips(mockClips)
    setIsProcessing(false)
    setProcessingStep("")
  }

  const exportClip = async (clip: Clip) => {
    // Simulation de l'export
    const link = document.createElement("a")
    link.href = "#"
    link.download = `${clip.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-purple-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Clipea
              </h1>
            </div>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              Beta
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isProcessing && clips.length === 0 && (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Transformez vos vidéos longues en clips viraux
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                IA avancée pour détecter automatiquement les meilleurs moments, générer des titres accrocheurs et créer
                des clips optimisés pour les réseaux sociaux.
              </p>
            </div>

            {/* Upload Section */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <span>Commencer avec votre vidéo</span>
                </CardTitle>
                <CardDescription>
                  Uploadez votre vidéo ou collez un lien YouTube pour générer automatiquement des clips courts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                    <TabsTrigger value="upload" className="data-[state=active]:bg-purple-600">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Vidéo
                    </TabsTrigger>
                    <TabsTrigger value="youtube" className="data-[state=active]:bg-purple-600">
                      <Link className="h-4 w-4 mr-2" />
                      Lien YouTube
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                      <Label htmlFor="video-upload" className="cursor-pointer">
                        <span className="text-lg font-medium">Cliquez pour uploader</span>
                        <p className="text-sm text-gray-500 mt-2">MP4, MOV, AVI jusqu'à 2GB</p>
                      </Label>
                      <Input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>
                    {uploadedFile && (
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-400">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <Button onClick={processVideo} className="bg-purple-600 hover:bg-purple-700">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Générer les clips
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="youtube" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="youtube-url">URL YouTube</Label>
                      <Input
                        id="youtube-url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <Button
                      onClick={processVideo}
                      disabled={!youtubeUrl}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyser la vidéo YouTube
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-gray-900/30 border-gray-800">
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-purple-400 mb-2" />
                  <CardTitle>IA Avancée</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Détection automatique des moments clés, émotions et punchlines avec une précision de 95%
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/30 border-gray-800">
                <CardHeader>
                  <Scissors className="h-8 w-8 text-pink-400 mb-2" />
                  <CardTitle>Découpage Intelligent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Clips de 30-90 secondes optimisés pour TikTok, Instagram Reels et YouTube Shorts
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/30 border-gray-800">
                <CardHeader>
                  <Download className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle>Export Facile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Sous-titres dynamiques, format vertical et branding personnalisé inclus
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8">
                <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6"></div>
                <h3 className="text-2xl font-bold mb-4">Génération en cours...</h3>
                <p className="text-gray-400 mb-6">{processingStep}</p>
                <Progress value={progress} className="mb-4" />
                <p className="text-sm text-gray-500">{Math.round(progress)}% terminé</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results */}
        {clips.length > 0 && !isProcessing && (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold mb-2">Clips générés</h3>
                <p className="text-gray-400">{clips.length} clips détectés et optimisés</p>
              </div>
              <Button
                onClick={() => {
                  setClips([])
                  setUploadedFile(null)
                  setYoutubeUrl("")
                }}
                variant="outline"
                className="border-gray-700"
              >
                Nouvelle vidéo
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clips.map((clip) => (
                <Card
                  key={clip.id}
                  className="bg-gray-900/50 border-gray-800 hover:border-purple-500 transition-colors"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={clip.thumbnail || "/placeholder.svg"}
                        alt={clip.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500/20 text-green-400">Score: {clip.score}%</Badge>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary" className="bg-black/50">
                          {clip.duration}s
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-lg mb-2 line-clamp-2">{clip.title}</h4>
                      <p className="text-purple-400 text-sm mb-3">{clip.subtitle}</p>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{clip.transcript}</p>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedClip(clip)}
                          className="flex-1 border-gray-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Prévisualiser
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => exportClip(clip)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {selectedClip && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="bg-gray-900 border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedClip.title}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedClip(null)}>
                    ✕
                  </Button>
                </div>
                <CardDescription>{selectedClip.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-[9/16] bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400">Prévisualisation du clip</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {Math.floor(selectedClip.startTime / 60)}:
                      {(selectedClip.startTime % 60).toString().padStart(2, "0")} -
                      {Math.floor(selectedClip.endTime / 60)}:{(selectedClip.endTime % 60).toString().padStart(2, "0")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Titre du clip</Label>
                    <Input value={selectedClip.title} className="bg-gray-800 border-gray-700 mt-1" />
                  </div>

                  <div>
                    <Label>Sous-titre</Label>
                    <Input value={selectedClip.subtitle} className="bg-gray-800 border-gray-700 mt-1" />
                  </div>

                  <div>
                    <Label>Transcription</Label>
                    <Textarea value={selectedClip.transcript} className="bg-gray-800 border-gray-700 mt-1" rows={4} />
                  </div>

                  <div>
                    <Label>Format d'export</Label>
                    <Select defaultValue="vertical">
                      <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vertical">Vertical (9:16) - TikTok/Reels</SelectItem>
                        <SelectItem value="square">Carré (1:1) - Instagram</SelectItem>
                        <SelectItem value="horizontal">Horizontal (16:9) - YouTube</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700 bg-transparent"
                    onClick={() => setSelectedClip(null)}
                  >
                    Fermer
                  </Button>
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => exportClip(selectedClip)}>
                    <Download className="h-4 w-4 mr-2" />
                    Exporter le clip
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
