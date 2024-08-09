// src/types/speak-tts.d.ts
declare module 'speak-tts' {
    export class SpeakTTS {
      init(options: any): void;
      speak(options: { text: string }): void;
    }
  }
  