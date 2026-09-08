export const Sound: SoundEngine;
declare class SoundEngine {
	ctx: AudioContext | null;
	master: GainNode | null;
	buffers: Map<string, AudioBuffer>;
	pending: Map<string, Promise<AudioBuffer>>;
	enabled: boolean;
	volume: number;
	listener: {
		x: number;
		y: number;
		z: number;
		yaw: number;
	};
	thunderBuffer: AudioBuffer | null;
	init(): void;
	resume(): void;
	setVolume(v: number): void;
	/** Preloads every clip referenced by the event table. */
	preload(): Promise<void>;
	loadClip(name: string): Promise<AudioBuffer>;
	setListener(x: number, y: number, z: number, yaw: number): void;
	/** Plays a sound event with vanilla-style random variant and pitch. */
	play(event: string, volume?: number, pitch?: number): void;
	/** Positional variant: attenuates and pans relative to the listener. */
	playAt(event: string, x: number, y: number, z: number, volume?: number, pitch?: number): void;
	playThunderAt(x: number, y: number, z: number): void;
}
export const SOUND_EVENTS: {
	"game.player.hurt": string[];
	"game.player.die": string[];
	"game.player.hurt.fall.big": string[];
	"game.player.hurt.fall.small": string[];
	"random.bow": string[];
	"game.potion.smash": string[];
	"random.drink": string[];
	"random.eat": string[];
	"random.burp": string[];
	"random.click": string[];
	"random.pop": string[];
	"random.orb": string[];
	"random.levelup": string[];
	"random.fizz": string[];
	"random.successful_hit": string[];
	"note.pling": string[];
	"mob.endermen.portal": string[];
	"step.stone": string[];
	"step.grass": string[];
	"step.gravel": string[];
	"step.sand": string[];
	"step.cloth": string[];
	"step.wood": string[];
};
export {};
