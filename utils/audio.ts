export const playAchievementSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    // Synth chord
    const playNote = (freq: number, startTime: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05); // quick fade in
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5); // long fade out
        
        osc.start(startTime);
        osc.stop(startTime + 0.5);
    };

    const now = audioCtx.currentTime;
    
    // Play a nice "achievement unlocked" arpeggio (C Major)
    playNote(523.25, now);       // C5
    playNote(659.25, now + 0.1); // E5
    playNote(783.99, now + 0.2); // G5
    playNote(1046.50, now + 0.3); // C6

  } catch (e) {
    console.warn("AudioContext block / not supported", e);
  }
};
