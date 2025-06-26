// Utilitaires pour le traitement vidéo

export interface VideoMetadata {
  duration: number
  width: number
  height: number
  fps: number
  format: string
}

export interface ClipSegment {
  startTime: number
  endTime: number
  score: number
  keywords: string[]
  emotion: string
  transcript: string
}

export class VideoAnalyzer {
  static async extractMetadata(file: File): Promise<VideoMetadata> {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.preload = "metadata"

      video.onloadedmetadata = () => {
        resolve({
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          fps: 30, // Estimation par défaut
          format: file.type,
        })
      }

      video.src = URL.createObjectURL(file)
    })
  }

  static async detectKeyMoments(transcript: string): Promise<ClipSegment[]> {
    // Simulation de détection de moments clés
    // Dans un vrai projet, vous utiliseriez une IA pour analyser le contenu

    const segments: ClipSegment[] = []
    const sentences = transcript.split(/[.!?]+/)

    sentences.forEach((sentence, index) => {
      const startTime = index * 10 // Estimation
      const endTime = startTime + 60 // Clips de 60 secondes

      // Détection de mots-clés émotionnels
      const emotionalWords = ["incroyable", "secret", "erreur", "astuce", "révélé"]
      const hasEmotionalContent = emotionalWords.some((word) => sentence.toLowerCase().includes(word))

      if (hasEmotionalContent) {
        segments.push({
          startTime,
          endTime,
          score: Math.random() * 40 + 60, // Score entre 60-100
          keywords: emotionalWords.filter((word) => sentence.toLowerCase().includes(word)),
          emotion: "excitement",
          transcript: sentence.trim(),
        })
      }
    })

    return segments.slice(0, 5) // Maximum 5 clips
  }

  static generateTitle(segment: ClipSegment): string {
    const templates = [
      `${segment.keywords[0]?.toUpperCase()} révélé !`,
      `Cette ${segment.keywords[0]} va vous choquer`,
      `L'${segment.keywords[0]} que personne ne connaît`,
      `ATTENTION: ${segment.keywords[0]} importante !`,
    ]

    return templates[Math.floor(Math.random() * templates.length)]
  }
}

export class SubtitleGenerator {
  static generateSRT(segments: any[]): string {
    let srt = ""

    segments.forEach((segment, index) => {
      const startTime = this.formatTime(segment.start)
      const endTime = this.formatTime(segment.end)

      srt += `${index + 1}\n`
      srt += `${startTime} --> ${endTime}\n`
      srt += `${segment.text}\n\n`
    })

    return srt
  }

  private static formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    const ms = Math.floor((seconds % 1) * 1000)

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")},${ms.toString().padStart(3, "0")}`
  }
}
