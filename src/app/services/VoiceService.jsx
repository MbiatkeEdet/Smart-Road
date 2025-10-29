//  'use client'
// import SpeakTTS from 'speak-tts';

// class VoiceService {
//   constructor() {
//     this.speech = new SpeakTTS();
//     this.isInitialized = false;
//     this.isEnabled = true;
    
//     this.init();
//   }

//   async init() {
//     try {
//       await this.speech.init({
//         volume: 0.8,
//         lang: 'en-US',
//         rate: 0.9,
//         pitch: 1.0,
//         splitSentences: true,
//         listeners: {
//           on_voices_changed: (voices) => {
//             console.log('Voices changed', voices);
//           }
//         }
//       });
//       this.isInitialized = true;
//       console.log('Speech synthesis initialized');
//     } catch (error) {
//       console.error('Speech synthesis initialization failed:', error);
//       this.isEnabled = false;
//     }
//   }

//   // Pidgin English alerts with proper pronunciation
//   getAlertMessage(incident) {
//     const messages = {
//       accident: `Alert ahead! Accident don happen for ${incident.locationName}. Make you drive sharp and careful.`,
//       road_works: `Road works dey for ${incident.locationName}. Reduce your speed and follow traffic signs.`,
//       flooding: `Alert ahead! Road dey flood small for ${incident.locationName}. Drive sharp and avoid the area if you fit.`,
//       traffic_jam: `Heavy traffic dey for ${incident.locationName}. Consider alternative route.`,
//       police_checkpoint: `Police checkpoint ahead for ${incident.locationName}. Make you get your documents ready.`,
//       road_closure: `Road don close for ${incident.locationName}. Make you find another way.`,
//       default: `Traffic alert for ${incident.locationName}. Drive with care.`
//     };

//     return messages[incident.type] || messages.default;
//   }

//   async speakAlert(incident) {
//     if (!this.isEnabled || !this.isInitialized) {
//       console.log('Voice alerts disabled or not initialized');
//       return false;
//     }

//     try {
//       const message = this.getAlertMessage(incident);
//       await this.speech.speak({
//         text: message,
//         listeners: {
//           onstart: () => {
//             console.log('Alert started:', message);
//           },
//           onend: () => {
//             console.log('Alert completed');
//           },
//           onerror: (error) => {
//             console.error('Alert error:', error);
//           }
//         }
//       });
//       return true;
//     } catch (error) {
//       console.error('Error speaking alert:', error);
//       return false;
//     }
//   }

//   async testVoice() {
//     const testIncident = {
//       type: 'flooding',
//       locationName: 'Igwuruta-Ali Road'
//     };
//     return await this.speakAlert(testIncident);
//   }

//   enable() {
//     this.isEnabled = true;
//   }

//   disable() {
//     this.isEnabled = false;
//   }

//   setVolume(volume) {
//     if (this.speech && this.speech.setVolume) {
//       this.speech.setVolume(volume);
//     }
//   }

//   setRate(rate) {
//     if (this.speech && this.speech.setRate) {
//       this.speech.setRate(rate);
//     }
//   }
// }

// // Create singleton instance
// const voiceService = new VoiceService();
// export default voiceService;

// src/app/services/VoiceService.jsx

"use client"
import SpeakTTS from 'speak-tts';

class VoiceService {
  constructor() {
    this.speech = null;
    this.isInitialized = false;
    this.isEnabled = true;

    // Only initialize if we're in the browser
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  async init() {
    try {
      if (typeof window === 'undefined') return;

      this.speech = new SpeakTTS();
      await this.speech.init({
        volume: 0.8,
        lang: 'en-US',
        rate: 0.9,
        pitch: 1.0,
        splitSentences: true,
        listeners: {
          on_voices_changed: (voices) => {
            console.log('Voices changed', voices);
          }
        }
      });
      this.isInitialized = true;
      console.log('Speech synthesis initialized');
    } catch (error) {
      console.error('Speech synthesis initialization failed:', error);
      this.isEnabled = false;
    }
  }

  getAlertMessage(incident) {
    const messages = {
      accident: `Alert ahead! Accident don happen for ${incident.locationName}. Make you drive sharp and careful.`,
      road_works: `Road works dey for ${incident.locationName}. Reduce your speed and follow traffic signs.`,
      flooding: `Alert ahead! Road dey flood small for ${incident.locationName}. Drive sharp and avoid the area if you fit.`,
      traffic_jam: `Heavy traffic dey for ${incident.locationName}. Consider alternative route.`,
      police_checkpoint: `Police checkpoint ahead for ${incident.locationName}. Make you get your documents ready.`,
      road_closure: `Road don close for ${incident.locationName}. Make you find another way.`,
      default: `Traffic alert for ${incident.locationName}. Drive with care.`
    };

    return messages[incident.type] || messages.default;
  }

  async speakAlert(incident) {
    if (typeof window === 'undefined' || !this.isEnabled || !this.isInitialized) {
      console.log('Voice alerts disabled or not initialized');
      return false;
    }

    try {
      const message = this.getAlertMessage(incident);
      await this.speech.speak({
        text: message,
        listeners: {
          onstart: () => console.log('Alert started:', message),
          onend: () => console.log('Alert completed'),
          onerror: (error) => console.error('Alert error:', error)
        }
      });
      return true;
    } catch (error) {
      console.error('Error speaking alert:', error);
      return false;
    }
  }

  async testVoice() {
    const testIncident = {
      type: 'flooding',
      locationName: 'Igwuruta-Ali Road'
    };
    return await this.speakAlert(testIncident);
  }

  enable() { this.isEnabled = true; }
  disable() { this.isEnabled = false; }
  setVolume(volume) { if (this.speech?.setVolume) this.speech.setVolume(volume); }
  setRate(rate) { if (this.speech?.setRate) this.speech.setRate(rate); }
}

// Don't instantiate immediately during SSR
let voiceService = null;

if (typeof window !== 'undefined') {
  voiceService = new VoiceService();
}

export default voiceService;
